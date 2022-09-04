import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import styles from "../styles/UserView.module.css"
import baseUrl from "../config"

export default function UserView() {

  const [users, setUsers] = React.useState([])

  const getData = async () => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${baseUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(data)
    setUsers(data)
  }
  React.useEffect(() => {
    getData()
  }, [])


  return <section className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {users.map((user, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <div className={`card ${styles.profiles}`}>
              <div className={`card-content ${styles.profiles}`}>
                <div className="media">
                  <div className="media-content">
                    <h4 className="title is-3">{user && user.firstName + " " + user.lastName}</h4>
                    <p className="subtitle is-5">{user && "Bio: " + user.bioUser}</p>
                    <p className="subtitle is-5">{user && "Position: " + user.position}</p>
                    <p className="subtitle is-5">{user && "Company: " + user.companyRepresented}</p>
                    <p className="subtitle is-5">{user && "Years of Experience: " + user.yearsExp}</p>
                    <p className="subtitle is-5">{user && "Last update: " + user.lastUpdated}</p>
                  </div>
                </div>
              </div>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={user.profilePicture} alt={user.lastName} />
                </figure>
              </div>
            </div>
            {/* </Link> */}
          </div>
        })}
      </div>
    </div>
  </section>

}