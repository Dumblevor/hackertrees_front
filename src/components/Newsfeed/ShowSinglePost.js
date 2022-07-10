import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { isCreator, getLoggedInUserId } from '../lib/auth'
import axios from 'axios'

import baseUrl from '../../config.js'

export default function ShowSinglePost() {
  const [postData, setPostData] = React.useState(undefined)
  const [commentContent, setCommentContent] = useState('')
  const { postID } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchOnePost() {
      fetch(`${baseUrl}/posts/${postID}`)
        .then(respo => respo.json())
        .then(data => setPostData(data))
    }

    fetchOnePost()

    setInterval(() => {
      fetchOnePost()
    }, 1000)

  }, [postID])


  async function handleComment() {
    try {
      const { data } = await axios.post(
        `${baseUrl}/post/${postData._id}/comment`,
        { content: commentContent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      setPostData(data)
    } catch (e) {
      console.log(e)
    }
  }


  async function handleDelete() {
    try {
      await axios.delete(`${baseUrl}/posts/${postData._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem(`token`)} ` },
      })
      navigate(`/newsfeed`)
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <section className="section">
      <div className="container">

        {postData ? (

          < div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={postData.userName.profilePicture} alt={postData.user.userName + " profile picture"} />
              </figure>
            </div>

            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{postData.user.username}</p>
                  <p className="">{postData.postContent}</p>
                  {postData.tags.map((tag, index) => {
                    return <div key={index} className="tag is-link mx-1 is-light">
                      {tag}
                    </div>
                  })}

                  {postData.upvotedBy.map((tag, index) => {
                    return <div key={index} className="tag is-link mx-1 is-light">
                      {tag}
                    </div>
                  })}
                  {postData.downvotedBy.map((tag, index) => {
                    return <div key={index} className="tag is-link mx-1 is-light">
                      {tag}
                    </div>
                  })}
                  {<p className="">{postData.createdAt}</p>}
                  {<p className="">{postData.updatedAt}</p>}
                </div>
              </div>
            </div>

            {isCreator(postData.user._id) && <button
              className="button is-danger"
              onClick={handleDelete}>

              Delete Post </button>}

            {postData.userComments && postData.userComments.map(comment => {
              return <article key={comment._id} className="media">
                <div className="media-content">
                  <div className="content">
                    <p className="subtitle">
                      {comment.user.username}
                    </p>

                    <p className="subtitle">
                      {comment.createdAt}
                    </p>

                    <p>{comment.content}</p>
                  </div>
                </div>
              </article>
            })}

            {
              getLoggedInUserId() && <article className="media">
                <div className="media-content">
                  <div className="field">
                    <p className="control">
                      <textarea
                        className="textarea"
                        placeholder="Type your comment here"
                        onChange={(event) => setCommentContent(event.target.value)}
                      >
                      </textarea>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button
                        className="button is-info"
                        onClick={handleComment}
                      >
                        Comment
                      </button>
                    </p>
                  </div>
                </div>
              </article>
            }
          </div >
        ) : (
          <p>Loading post, ID: {postID}</p>
        )}
      </div>
    </section>
  )
}