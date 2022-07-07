import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginModal from './UI/LoginModal'
import styles from "../styles/Home.module.css"
import baseUrl from "../config"

export default function Home() {
  const navigate = useNavigate()

  // ! Put our form fields in state.
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  })

  const [showRegisterModal, setShowRegisterModal] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const showModalHandler = (state) => {
    console.log(state);
    setShowRegisterModal(true)
  }

  const hideModalHandler = (state) => {
    console.log(state)
    setShowRegisterModal(false)
  }


  async function handleLogin(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/login`, formData)
      localStorage.setItem('token', data.token)
      localStorage.setItem("loggedIn", true)
      localStorage.setItem("username", data.user.username)
      console.log(data.token)
      navigate('/newsfeed')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  return (
    <section className="">
      <p className={`title is-1 has-text-centered has-text-black mt-4 ${styles.titleMessage}`}>
        Hacker Trees 
      </p>
      <p className="title is-4 has-text-centered has-text-black mt-4">Build tech trees, not moats.</p><br />
      <p className="title is-3 has-text-centered has-text-black mt-4">{"Chat, hack and get access to private job opennings."}</p>
      <div className={`columns is-multiline is-mobile ${styles.mainDiv}`}>
        <div className="column is-half-tablet is-half-mobile mt-5">
          <div className={`card mx-4 my-4 ${styles.login}`}>
            <div className={`card-content ${styles.login}`}>
              <div className="media">
                <div className="media-content">
                  <form onSubmit={handleLogin} className="media-content">
                    <div className="field column ">
                      <label className={`label ${styles.labels}`}>Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name={'email'}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                        {errors.email && <small className="has-text-danger">{errors.email}</small>}
                      </div>
                    </div>

                    <div className="field column">
                      <label className={`label ${styles.labels}`}>Password</label>
                      <div className="control">
                        <input
                          className="input "
                          type="password"
                          name={'password'}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        {errors.password && <small className="has-text-danger">{errors.password}</small>}
                      </div>
                    </div>
                    <div className="field container pl-3 pb-2">
                      <div className="control">
                        <button type='submit' className={`button ${styles.loginButton}`}>
                          Log In
                        </button>
                      </div>
                    </div>
                  </form>
                  
                  <div className="field container pl-3">
                    <div className="control">
                      <button type='submit' className={"button"} onClick={showModalHandler}>
                        Create New Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >

        <div className="column is-half-tablet is-half-mobile mt-5">
          <div className="card-image">
            <figure className="image">
              <img className='is-rounded' src="https://static-exp2.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" />
            </figure>
          </div>
        </div>


      </div>

      {
        showRegisterModal && <LoginModal
          handleChange={handleChange}
          setFormData={setFormData}
          hideModalHandler={hideModalHandler}
          formData={formData} />
      }

    </section >
  )
}
