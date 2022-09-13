import React from "react"
import { Link } from "react-router-dom"
import _ from 'lodash'
import axios from "axios"
import { isCreator, getLoggedInUserId } from '../../lib/auth.js'
import baseUrl from "../../config"


export default function PostElement(singlePostDataProp) {
  const [commentContent, setCommentContent] = React.useState('')
  // const [newComment, setNewComment] = React.useState(singlePostDataProp.userComments)
  const [hiddenCommentsNumber, setHiddenCommentsNumber] = React.useState([]) //used to keep track of which posts have show comments clicked on to show comments


  //handles Show Comments button
  function handleShowCommentsButton(postID) {
    hiddenCommentsNumber.includes(postID)
      ? setHiddenCommentsNumber(_.remove(hiddenCommentsNumber, (postCheck) => postCheck._id !== postID._id))
      : setHiddenCommentsNumber([...hiddenCommentsNumber, postID])
  }


  //handles post deleting
  async function deletePostHandle() {
    try {
      const deletePost = await axios.delete(`${baseUrl}/posts/${singlePostDataProp._id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      if (deletePost.status === 204) {
        singlePostDataProp.setAllUserPosts(singlePostDataProp.allUserPosts.filter((post) =>
          post._id !== singlePostDataProp._id
        ))
      }
    } catch (e) {
      console.log(e)
    }
  }

  //handles comment sumbission to backend

  async function handleComment(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${baseUrl}/posts/${singlePostDataProp._id}/comment`,
        { content: commentContent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )

      singlePostDataProp.getPostData()
      console.log(data);
      setCommentContent('')
    } catch (e) {
      console.log(e)
    }
  }

  //handles comment delete query to backend
  async function deleteComment(commentID) {

    try {
      const deleteThisComment = await axios.delete(
        `${baseUrl}/posts/${singlePostDataProp._id}/${commentID}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      console.log(deleteThisComment);
      singlePostDataProp.getPostData()
    } catch (e) {
      console.log(e)
    }
  }



  //submits query to backed for like/upvote
  async function handleUpvote() {
    try {
      const { data } = await fetch(`${baseUrl}/posts/${singlePostDataProp._id}/vote`,
        {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        })
      singlePostDataProp.getPostData()
      console.log(data);
    } catch (err) {
      console.log(err.response.data);
    }
  }


  return <div className="card my-3">
    <div className="section">
      <div className="container">
        <div className="">
          <p className="title is-4">
            {singlePostDataProp.user ? singlePostDataProp.user.username : "Unknown user posted"}:
          </p>
          <small className="">
            posted at {singlePostDataProp.createdAt.replace('T', ' - ').slice(0, - 8)}</small>
          {singlePostDataProp.tags.length > 0 &&
            <h5 className="level-right">
              Tags:
            </h5>}
          <div className="tags level-right">
            {singlePostDataProp.tags.map((tag, index) => {
              return <div key={index} className="tag is-link mx-1 is-light">
                {tag}
              </div>
            })}
          </div>
          {singlePostDataProp.postContent &&
            <div className="is-grouped">
              <hr />
              <p className="">{singlePostDataProp.postContent}</p>
              <hr />
            </div>
          }
        </div>

        {singlePostDataProp.downvotedBy.map((tag, index) => {
          return <div key={index} className="tag is-link mx-1 is-light">
            {tag}
          </div>
        })}



        {/* {edit and delete buttons if creator} */}
        {isCreator(singlePostDataProp.user._id)
          && <div className="level-right">
            <Link to={`/postedit/${singlePostDataProp._id}`}>
              <button className="button is-rounded is-small level-right is-info is-light mx-2 my-2" >
                Edit </button>
            </Link>
            <button className="button is-rounded is-small level-right is-warning is-light mx-2 my-2" onClick={deletePostHandle} >
              Delete </button>
          </div>
        }
        {singlePostDataProp.upvotedBy.length > 0
          &&
          <small className="level-right my-2">
            {`Upvoted by ${singlePostDataProp.upvotedBy[0]} and ${singlePostDataProp.upvotedBy.length - 1} others`}
          </small>
        }
        {singlePostDataProp.upvotedBy.length}
        <button className="button is-rounded is-small is-info is-light mx-3" onClick={handleUpvote}  >
          Upvote
        </button>

        <button className="button is-rounded is-small is-info is-light" onClick={
          () => handleShowCommentsButton(singlePostDataProp._id)}>

          {singlePostDataProp.userComments.length > 0 ?
            `Show ${_.size(singlePostDataProp.userComments)} Comments`
            : 'Comment'
          }
        </button>
        {getLoggedInUserId() && <article className="media">

          <form className="media-content" onClick={handleComment}>
            <div className="field">
              <p className="control">

                <input
                  className="input is-rounded my-2"
                  type="text"
                  placeholder="Make a comment.."
                  onChange={(event) => setCommentContent(event.target.value)}
                />
                <div className="field">
                  <p className="control">
                    <button
                      className="button is-info button is-rounded is-light mx-3"
                      type="submit"
                    >
                      Submit
                    </button>
                  </p>
                </div>
              </p>
            </div>

          </form>
        </article>}

        <div className={hiddenCommentsNumber.includes(singlePostDataProp._id) ? null : `is-hidden`}>

          {singlePostDataProp.userComments ? singlePostDataProp.userComments.map(comment => {
            return <article key={comment._id} className="media">
              <div className="media-content box my-2">
                <div className="content">
                  <p className="subtitle">
                    {comment.user && comment.user.username}
                  </p><small className="">
                    posted at {singlePostDataProp.createdAt.replace('T', ' - ').slice(0, - 8)}:</small>

                  {isCreator(singlePostDataProp.user._id) && <div className="level-right" >
                    <button className="button is-rounded is-small level-right is-warning is-light mx-2 my-2" onClick={() => deleteComment(comment._id)} >
                      Delete </button>
                  </div>
                  }
                  <p className="my-2">{comment.content}</p>
                </div>
              </div>
            </article>
          }) : <p>Loading comments </p>}
          <br />


        </div>

      </div>
    </div>
  </div >
}
