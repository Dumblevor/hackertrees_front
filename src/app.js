import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from "./components//Home"
// import About from "./components/About"
import Navbar from "./components/UI/Navbar"
import Newsfeed from "./components/Newsfeed/Newsfeed"
import CreateJob from './components/Jobs/CreateJob'
import JobIndex from './components/Jobs/JobIndex'
import ShowJob from './components/Jobs/ShowJob'
import EditJob from './components/Jobs/EditJob'
import About from "./components/About"
import Contact from './components/Contact'
import EditPost from './components/Newsfeed/EditPost'
import Profile from './components/Profile'
import styles from "./styles/Footer.module.css"
import UserView from './components/UserView'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsfeed" element={<Newsfeed />} />
          <Route path="/postedit/:postID" element={<EditPost />} />
          <Route path="/jobs/index" element={<JobIndex />} />
          <Route path="/jobs/create" element={<CreateJob />} />
          <Route path="/jobs/:jobId" element={<ShowJob />} />
          <Route path="/jobs/edit/:jobId" element={<EditJob />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<UserView />} />
        </Routes>
        <footer className={`footer column is-narrow ${styles.footerArea}`}>
          <div className="box content has-text-centered">
            Companies looking to hire:
            <Link to={`/jobs/create`}> Post a new Job</Link><br />
            ⎔ Devs can
            <Link to={`/jobs/index`}> see current listings.</Link><br />
            <br />
            <div className="content has-text-centered ">
              <p>
                <strong>HackerTrees.com</strong> proudly developed by
                <Link to="https://github.com/Dumblevor" className=""> Dimitar Vidolov</Link>,
                <Link to="https://github.com/dancfc84" className=""> Daniel Whittock</Link> and
                <Link to="https://github.com/Qshan888" className=""> Cody Shan </Link>
                as part of Software Engineering Immersive 23 at
                <Link to="https://generalassemb.ly" className=""> General Assembly</Link>.
              </p>
            </div>
          </div>
        </footer>
      </Router>


    </>
  )
}

export default App