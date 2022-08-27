import React, { useState } from "react";
// import classes from "./LoginModal.module.css"
import Modal from "./Modal.js";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import baseUrl from "../../config"


const LoginModal = (props) => {
  const navigate = useNavigate()

  const [modalForm, setModalForm] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
  })

  async function handleRegistrationConfirm(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/register`, modalForm);
      console.log(data.message);
      if (data.message === "Login ok") {
        const loginData = {
          email: modalForm.email,
          password: modalForm.password,
        }
        try {
          const { data } = await axios.post(`${baseUrl}/login`, loginData )
          localStorage.setItem('token', data.token)
          localStorage.setItem("loggedIn", true)
          localStorage.setItem("username", data.user.username)
          navigate('/newsfeed')
          
        } catch (error) {
          console.log(error);
        }
      }

    } catch (err) {
      //This error data is the data sent from the api from the middleware
      setErrors(err.response.data.errors)
    }
  }

  function handleModalChange(e) {
    const { name, value } = e.target;
    setModalForm({
      ...modalForm,
      [name]: value,
    })
  }

  return (
    <Modal hideModalHandler={props.hideModalHandler}>
      <div className="container column box">
        <div className="title is-2">Create New Account</div>
        <hr />
        <form onSubmit={handleRegistrationConfirm}>
          <div className="field column">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"email"}
                value={modalForm.email}
                onChange={handleModalChange}
                placeholder="Email"
              />
              {errors.email && <small className="has-text-danger">{errors.email}</small> }
            </div>
          </div>

          <div className="field column">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input "
                type="password"
                name={"password"}
                value={modalForm.password}
                onChange={handleModalChange}
                placeholder="Password"
              />{" "}
              <small>
                Hint:{" "}
                <a href="https://xkcd.com/936/">
                  info on passwords and entropy
                </a>
              </small>
            </div>
            {errors.password && <small className="has-text-danger">{"An error occurred. Please try a different password."}</small> }
          </div>

          <div className="field column">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input "
                type="password"
                name={"passwordConfirmation"}
                value={modalForm.passwordConfirmation}
                onChange={handleModalChange}
                placeholder="Password"
              />{" "}
            </div>
            {errors.passwordConfirmation && <small className="has-text-danger">{errors.passwordConfirmation}</small> }
          </div>

          <div className="field column">
            <label className="label">Usename / Display-name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"username"}
                value={modalForm.username}
                onChange={handleModalChange}
                placeholder="Enter a Display Name / Username"
              />
              {errors.username && <small className="has-text-danger">{errors.username}</small> }
            </div>
          </div>
          <div className="field container">
            <div className="control">
              <button
                type="button"
                className="button is-primary mx-5 my-5"
                onClick={handleRegistrationConfirm}
              >
                Confirm New Account
              </button>
              <button
                type="button"
                className="button is-warning is-light my-5 mx-5 is-outlined"
                onClick={props.hideModalHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
