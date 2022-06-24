import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import JobComment from "../Jobs/JobComment"
import axios from "axios"

export default function ShowJob() {

  const navigate = useNavigate()



  const [formDataInput, setformDataInput] = useState({
    content: "",
  })


  const [job, setJob] = useState(undefined)
  const { jobId } = useParams()


  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then(resp => resp.json())
      .then(data => setJob(data))
  }, [])


  async function handleDelete () {
    const deleteJob = await axios.delete(`/api/jobs/${jobId}`)
    navigate("/jobs/index")
    console.log(deleteJob);
  }

  async function handleCommentPost (e) {
    e.preventDefault()
    const addComment =  await axios.post(`/api/jobs/${jobId}/comment`, formDataInput)
    console.log(addComment);
  } 

  function handleChangeEvent(e) {
    console.log(e);
    setformDataInput({
      [e.target.name]: e.target.value,
    })
  }
  return (
    <section className="section">
      <div className="container">
        {job ? (
          <div>
            <h2 className="title has-text-centered">{job.JobTitle}</h2>
            <hr />
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <img src={job.companyImage} alt={job.companyName} />
                </figure>
                {/* {isCreator(job.user._id) && */} 
                <button
                  className="button is-danger"
                  onClick={handleDelete}
                >
                  Delete job
                </button>
            
                <Link to={`/jobs/edit/${jobId}`}>
                  <button className="button is-warning">
                    Edit Job
                  </button>
                </Link>

              </div>
              <div className="column is-half">
                <h4 className="title is-4">
                  Job Description
                </h4>
                <p>{job.jobDescription}</p>
                <hr />
                <h4 className="title is-4">
                  Salary
                </h4>
                <hr />
                <p>{job.jobSalary}</p>
                <hr />
                <h4 className="title is-4">
                  Job Location
                </h4>
                <p>{job.jobLocation}</p>
                <hr />
                <h4 className="title is-4">
                  Job Type
                </h4>
                <hr />
                <p>{job.jobType}</p>
                <hr />
                <h4 className="title is-4">
                  Job Added By
                </h4>
                <hr />

                {/*<p>{job.user.username}</p> */}

                <div className=" box">
                  <div className="">
                    <form  onSubmit={handleCommentPost} >
                      <div className="field">
                        <div className="control columns">
                          <button className="button mx-4 is-outlined">
                            Post your comment
                          </button>
                          <input
                            className="input column text is-secondary"
                            type="text"
                            name={'content'}
                            value={formDataInput.content}
                            onChange={handleChangeEvent}
                            placeholder="Type Comment Here"
                          />
                        </div>
                      </div>
                    </form>
                  </div >
                </div >
                { job.comments.map((comment) => {
                  {console.log(comment)}
                  return job.comments.length > 0 && <JobComment comments={comment}/> 
                })
                }
              </div>
            </div>
          </div>
        ) : (
          <p>...loading</p>
        )}
      </div>
    </section>
  )

}