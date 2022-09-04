import logoFile from '../../assets/HT-logo.ico'
import { NavLink } from "react-router-dom"
import React from "react"
import { useLocation } from "react-router-dom";
import styles from "./Navbar.module.css"
// import { isCreator, getLoggedInUserId } from '../../lib/auth.js'


export default function Navbar() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean(localStorage.getItem("loggedIn")))

  React.useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("loggedIn")))
  }, [location])


  function NavbarChange() {
    window.localStorage.clear()
    setIsLoggedIn(false)
  }

  return (
    <>
      <header className={styles.nav_container}>
        <nav >
          <div className="container-nav ">
            <div className="navbar-brand">
              <NavLink to="/"><img className="logo image image is-128x128 p-1 mx-5" src={logoFile} /></NavLink>
              {isLoggedIn && <NavLink to="/newsfeed" className={`navbar-item is-size-4 has-text-weight-bold ml-3 ${styles.link_styling}`}>
                Newsbites
              </NavLink>}
              {isLoggedIn && <NavLink to="/jobs/index" className={`navbar-item is-size-4 has-text-weight-bold ml-3 ${styles.link_styling}`}>
                Job Listings
              </NavLink>}
              {isLoggedIn && <NavLink to="/jobs/create" className={`navbar-item is-size-4 has-text-weight-bold ml-3 ${styles.link_styling}`}>
                Create Job
              </NavLink>}
              {isLoggedIn && <NavLink to="/community" className={`navbar-item is-size-4 has-text-weight-bold ml-3 ${styles.link_styling}`}>
                Community
              </NavLink>}
              {isLoggedIn && <NavLink to="/profile" className={`navbar-item is-size-4 has-text-weight-bold ml-3 ${styles.link_styling}`}>
                Profile
              </NavLink>}
              <NavLink to="/contact" className={`navbar-item is-size-4 has-text-weight-bold ml-3 ${styles.link_styling}`}>
                Contact
              </NavLink>
              <NavLink to="/about" className={`navbar-item is-size-4 has-text-weight-bold ml-3 ${styles.link_styling}`}>
                About
              </NavLink>
              {isLoggedIn && <NavLink to="/" onClick={NavbarChange} className={`navbar-item is-size-4 has-text-weight-bold ml-3 ${styles.link_styling}`}>
                Logout
              </NavLink>}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}



