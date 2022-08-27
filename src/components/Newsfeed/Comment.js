import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function CommentElement(comment) {

  // async function deleteCommentHandle() {
  //   try {
  //     const deletePost = await axios.delete(`/api/posts/${comment._id}`)
  //     if (deletePost.status === 204) {
  //       postData.updatePostsOnDelete(postData._id)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  return (
    <article className="card my-5 mx-5">
      <div key={comment._id + 0}> {/* double keys due to mapping so adding 'salt' with 0 to avoid conflict when rendering */}
        {/* <Link to={`/users/${comment.owner._id}`}> */}
        {/* <h6>{comment.user.username} </h6> */}
        {/* </Link> */}
        {/* <figure className="media-left"><p><img /></p></figure> */}
        <div className="card-content">
          <div className="content">
            <p><strong>{comment.user ? comment.user : 'Username missing'}:</strong></p>
            <p>{comment.content}</p>
            {/* <p>{comment.likedBy.length} upvotes</p> */}
          </div>
          <div className="level-right" >
            <Link to={`/commentEdit/${comment._id}`}>
              <button className="button is-rounded is-small is-info is-light mx-1 my-1" >
                Edit </button>
            </Link>

            <button className="button is-rounded is-small is-warning is-light mx-1 my-1" onClick={() => console.log(comment.PostIDProp)} >
              Delete</button>
          </div>
          <button className="button is-rounded is-small is-info is-light mx-3">
            Upvote {/* onClick={upVoteChangeHandle} */}
          </button>
        </div>

      </div>
    </article >
  )
}
4