
import axios from 'axios'
import React, { useState } from 'react'

export default function JobIndex() {
  const [jobs, setJobs] = useState([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("/api/jobs")
        setJobs(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [jobs])

  return (

    <div className="section">
      <h1 className="title">Pokemon Index</h1>
      <div className="container">
        {jobs.map(job => <h2 key={job._id}>{job.name}</h2>)}
      </div>
    </div>

  )
}


