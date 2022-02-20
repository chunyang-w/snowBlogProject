import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../navbar/Navbar.jsx'
// import HomePage from '../homepage/HomePage.jsx'
import { Navigate, Outlet } from "react-router-dom";
import style from './App.css'
import { blog } from '../../../config/config'



export class App extends React.Component {
  render () {
    return (
      <div>
        <NavBar className={ style.navBar } blogName={blog.blogName}/>
        <div className={ style.spacer }></div>
        <Outlet />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    needLogin: state.adminLogin.needLogin,
    token: state.adminLogin.token
  }
}

export default connect(mapStateToProps)(App)