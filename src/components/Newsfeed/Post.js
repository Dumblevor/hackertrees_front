import React from "react"
// import { Link } from "react-router-dom"
import _ from 'lodash'
import NewComment from "./NewComment"
import CommentElement from "./Comment"
import axios from "axios"


export default function PostElement(postData) {
  // const user = localStorage.getItem('user')
  const [hiddenCommentsNumber, setHiddenCommentsNumber] = React.useState([]) //used to keep track of which posts have show comments clicked on to show comments
  const [newCommentState, setNewCommentState] = React.useState(postData.userComments)

  function handleShowCommentsButton(postID) { //handles SHow button
    hiddenCommentsNumber.includes(postID)
      ? setHiddenCommentsNumber(_.remove(hiddenCommentsNumber, (postCheck) => postCheck._id !== postID._id))
      : setHiddenCommentsNumber([...hiddenCommentsNumber, postID])
  }

  function setNewState(newComment) {
    const newComArray = [...newCommentState, newComment]
    setNewCommentState(newComArray)
  }


  async function deletePostHandle() {
    try {
      const deletePost = await axios.delete(`/api/posts/${postData._id}`)
      if (deletePost.status === 204) {
        postData.updatePostsOnDelete(postData._id)
      }
      // {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      // }
    } catch (e) {
      console.log(e)
    }
  }

  // async function handlePostUpdateFromModal(posID) {
  //   try {
  //     e.preventDefault()
  //     const { data } = await axios.put(`/api/posts/${propPostId}`, formData)

  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <section className="section">
      <div className="container">

        <div key={postData._id + 0} className=" box mb-5"> {/* double keys due to mapping so adding 'salt' with 0 to avoid conflict when rendering */}
          {/* <img src={postData.owner.profilePic} /> */}
          <div className="content">
            <h4 className="header"> User {localStorage.getItem("userID")}:
              {/* <Link to={`/users/${postData.owner._id}`}>
              {postData.owner.username}
              </Link> */}
              {/* need to format timestamp */}
            </h4>
            <div className="is-grouped">
              <p className="content ">
                {postData.postContent}
              </p>
            </div>

            <p className="level-right">
              posted <br />
              {postData.createdAt}</p>
            {postData.tags.length > 0 && <h5 className="level-right">
              Tags:
            </h5>}

            <div className="tags level-right">
              {postData.tags.map((tag, index) =>
                <span key={index} className="tag is-link mx-1 is-light">
                  {tag}
                </span>)} <br />
            </div>


            <div className="level-right" >
              <button className="button is-small is-info is-light mx-1" >
                Edit
              </button>
              <button className="button is-small is-warning is-light mx-1" onClick={deletePostHandle} >
                Delete
              </button>
            </div>

            <span className="">{5}</span>

            <button className="button is-small is-info is-light mx-5" >
              Upvote
            </button>
            <button className="button is-small is-info is-light" onClick={() => handleShowCommentsButton(postData._id)}>

              {newCommentState.length > 0 ?
                `Show ${_.size(newCommentState)} Comments`
                : 'Comment first'
              }
            </button>

            <div className={hiddenCommentsNumber.includes(postData._id) ? null : `is-hidden`}>

              {newCommentState
                ? newCommentState.map((comment, index) =>
                  <div key={index}>
                    <CommentElement {...comment} />
                    <div className="level-right" >
                      <button className="button is-small is-info is-light mx-1">
                        Edit
                      </button>
                      <button className="button is-small is-warning is-light mx-1" >
                        Delete
                      </button>
                    </div>
                  </div>

                ) : null}
              {/* {newCommentState !== null ? <CommentElement {...newCommentState} /> : null} */}

              <br />
              <NewComment postIDprop={postData._id} setNewState={setNewState} />
            </div>
          </div>
          {/* <h5>Upvotes: {postData.likedBy.length}</h5> */}
        </div>
      </div>
    </section>
  )
}