import logoFile from '../assets/HT-logo.jpg'
import { NavLink } from "react-router-dom"
import React from "react"

function Navbar() {
  return (
    <>
      <header>
        <nav>
          <div className="container-nav ">
            <div className="navbar-brand">
              <NavLink to="/"><img className="logo image image is-64x64 p-1" src={logoFile} /></NavLink>
              <NavLink to="/" className="navbar-item is-size-3 has-text-weight-bold ml-3 is-right">
                Home
              </NavLink>
              <NavLink to="/about" className="navbar-item is-size-3 has-text-weight-bold ml-3">
                About
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar

