import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import PostElement from './Post'
import axios from 'axios'
import Select from 'react-select'
import tags from '../../data/tags'
// import { set } from 'lodash'
import baseUrl from "../../config"


export default function Newsfeed() {
  const [allUserPosts, setAllUserPosts] = useState([])
  // const [selectedTag, setSelectedTag] = React.useState(false)

  const [search, setSearch] = React.useState("")
  const [formData, setFormData] = useState({
    postContent: "",
    tags: [],
  })

  //handles search
  // handle posts filter
  function postsFilter() {
    return allUserPosts.filter((post) => {
      return post.postContent.toLowerCase().includes(search.toLowerCase())
    }
      // && (selectedTag && [...post.tags].includes(selectedTag[0].value))) 
    )
  }

  //handles input changes for a new post
  function handleChange(e) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  //handles submitting new post
  async function handleSubmit(event) {
    event.preventDefault()
    const newFormData = {
      ...formData,
      tags: formData.tags.map(tag => tag.value),
    }
    try {
      const { data } = await axios.post(`${baseUrl}/posts/`, newFormData, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      getPostData()
      console.log(data._id)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  //gets data about posts from API db
  const getPostData = async () => {
    const { data } = await axios.get(`${baseUrl}/posts/`,
      {
        headers: { "authorization": `Bearer ${localStorage.getItem("token")}` },
      })
    setAllUserPosts(data)
    console.log(data)
  }

  useEffect(() => {
    getPostData()
    setInterval(() => {
      getPostData()
    }, 2000);
  }, [])


  return (
    <section className="section">
      <div className="container">

        <h1 className="title is-1">
          Hacketree Newsbites
        </h1>
        {localStorage.getItem("username") &&
          <h2><small>Welcome back, {localStorage.getItem("username")}.</small></h2>
        }
        <div className="columns ">
          <div className="column ">
            <div className="section">
              <div className="container box">
                <form onSubmit={handleSubmit}>
                  <div className="field ">
                    <label className="label">{`What's`} on your mind?</label>
                    <div className="control">
                      <textarea
                        className="input textarea is-primary"
                        type="text"
                        name={'postContent'}
                        value={formData.postContent}
                        onChange={handleChange}
                        placeholder="Type here to submit a new pos t"
                      />
                    </div>
                  </div>
                  <div className="field ">
                    <h3>Tag it</h3>
                    <Select
                      defaultValue={[]}
                      isMulti
                      name="colors"
                      options={tags}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(tags) => setFormData({ ...formData, tags })}
                      value={formData.tags}
                    />
                  </div>
                  <button className="button is-rounded is-success is-light is-outlined">
                    SEND IT
                  </button>
                </form>

              </div >
            </div >
          </div>

          <div className="column">
            <div className="my-5 level-right">
              <input
                value={search}
                placeholder={"Search Newsfeed"}
                onChange={(e) => setSearch(e.target.value)} />
              <button className={`button is-rounded  ${search.length > 0 ? "" : 'is-hidden'}`} >
                Search futher..
              </button>
            </div>
            {/* 
            <div>
              <Select
                defaultValue={[]}
                isMulti
                name="tags"
                options={tags}
                className="basic-multi-select my-5 level-right"
                classNamePrefix="select"
                onChange={(tag) => setSelectedTag(tag)}
                value={selectedTag}
                placeholder={"Filter by tag"}
              />

            </div> */}

            {allUserPosts ? postsFilter().map((post, index) => {
              return <div key={index} className="">
                <PostElement
                  {...post}
                  getPostData={getPostData}
                  allUserPosts={allUserPosts}
                  setAllUserPosts={setAllUserPosts} />
              </div>
            }
            ) : <p> Loading posts</p>}
          </div>

        </div>
      </div>
    </section >


  )

}