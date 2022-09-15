import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth.js'
import styles from "../styles/Profile.module.css"
import baseUrl from "../config"

// import { Link } from "react-router-dom"


export default function Profile() {

  const [formData, setFormData] = React.useState({
    profilePicture: "",
    bioUser: "",
    firstName: "",
    lastName: "",
    position: "",
    companyRepresented: "",
    yearsExp: "",
  })

  const navigate = useNavigate()

  // const [profile, setProfile] = React.useState(undefined)

  const getData = async () => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${baseUrl}/profile/${getLoggedInUserId()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setFormData(data)
  }
  React.useEffect(() => {
    getData()
  }, [])



  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  function handleCancel () {
    navigate(`/newsfeed`)
  }

  // function handleForm(e) {
  //   registering === false ? setRegistering(true) : handleRegistrationConfirm(e)
  // }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    console.log(formData)
    try {
      const { data } = await axios.put(`${baseUrl}/profile/${getLoggedInUserId()}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(data._id)
      getData()
    } catch (err) {
      console.log(err.response.data)
    }
  }

  function stringWords(field) {
    const stringResult = field[0].toUpperCase() + field.slice(1)
    return stringResult.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
  }


  return (
    <section className="section">
      <div className="columns is-multiline is-mobile">
        <div className="column is-half-tablet is-half-mobile">
          <div className={`card mx-4 my-4 ${styles.profiles}`}>
            <div className={`card-content ${styles.profiles}`}>
              <div className="media">
                <div className="media-content">
                  <h4 className="title is-3">{formData && formData.firstName + " " + formData.lastName}</h4>
                  <p className="subtitle is-5">{formData && "Bio: " + formData.bioUser}</p>
                  <p className="subtitle is-5">{formData && "Position: " + formData.position}</p>
                  <p className="subtitle is-5">{formData && "Company: " + formData.companyRepresented}</p>
                  <p className="subtitle is-5">{formData && "Years of Experience: " + formData.yearsExp}</p>
                  <p className="subtitle is-5">{formData && "Last update: " + formData.lastUpdated}</p>
                </div>
              </div>
            </div>
            <div className="card-image">
              <figure className="image">
                <img src={formData && formData.profilePicture} alt={"profiles"} />
              </figure>
            </div>
          </div>
        </div>
        <div className="column is-half-tablet is-half-mobile mt-4">
          <form onSubmit={handleSubmit}>
            {['profilePicture', 'bioUser', 'firstName', 'lastName', 'position', 'companyRepresented', 'yearsExp' ].map(field => {
              return <div key={field} className="field">
                <label className="label">
                  {stringWords(field)}
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={formData[field]}
                    onChange={handleChange}
                    name={field}
                  />
                </div>
              </div>
            })}
            <button className={`button mt-5 ${styles.saveButton}`}>Save</button>
          </form>
          <button onClick={handleCancel} className={`button mt-5 ${styles.cancelButton}`}>
          Cancel</button>
        </div>
      </div>
    </section>
  )
}
