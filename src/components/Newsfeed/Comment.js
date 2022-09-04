import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function CommentElement(comment) {



  return (
    <article className="card my-5 mx-5">
      <div key={comment._id + 0}> 
        <div className="card-content">
          <div className="content">
            <p><strong>{comment.user ? comment.user : 'Username missing'}:</strong></p>
            <p>{comment.content}</p>
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
            Upvote
          </button>
        </div>

      </div>
    </article >
  )
}
4