import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import Select from 'react-select'
import postTags from '../../data/tags'
import { useNavigate } from 'react-router-dom'
import tags from '../../data/tags'
import baseUrl from "../../config"



export default function EditPost() {
  const navigate = useNavigate()
  const { postID } = useParams()

  const [formDataInput, setformDataInput] = useState({
    postContent: "",
    tags: [],
  })

  useEffect(() => {
    const getPostData = async () => {
      const { data } = await axios.get(`${baseUrl}/posts/${postID}`, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setformDataInput({
        postContent: `${data.postContent}`,
        tags: tags.filter((word) => data.tags.includes(word.value)),
      })
    }

    getPostData()
  }, [])


  //updates the post on button click via API
  async function handlePostUpdate(e) {
    const newFormData = {
      ...formDataInput,
      tags: formDataInput.tags.map(tag => tag.value),
    }

    try {
      e.preventDefault(formDataInput)
      console.log(newFormData);

      const { data } = await axios.put(`${baseUrl}/posts/${postID}`, newFormData, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log(data);
      navigate('/newsfeed')


    } catch (e) {
      console.log(e);
    }
  }

  //handles input changes in the fields
  function handleChange(e) {
    setformDataInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  function handleCancel() {
    navigate(`/newsfeed/`)
  }

  return <div className="section">
    <div className="container">
      <form onSubmit={handlePostUpdate}>
        <div className="field ">
          <label className="label">Post</label>
          <div className="control">
            <input
              className="input textarea is-primary"
              type="text"
              name={'postContent'}
              value={formDataInput.postContent}
              onChange={handleChange}
              placeholder="Make it count"
            />
          </div>
        </div>

        <div className="field ">
          <h2>Tag it</h2>
          <Select
            defaultValue={[]}
            isMulti
            name="tags"
            options={postTags}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(tags) => setformDataInput({ ...formDataInput, tags })}
            value={formDataInput.tags}
          />



        </div>
        <br />
        <br />
        <button type="submit" className="button is-light is-outlined is-rounded is-primary mx-1">
          Save Post </button>
        <button onClick={handleCancel} className="button is-rounded is-warning is-light is-outlined  mx-1">
          Cancel Edit </button>
      </form>
    </div >
  </div >
}
