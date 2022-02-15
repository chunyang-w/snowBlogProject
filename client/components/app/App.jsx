import React from 'react'
import NavBar from '../navbar/Navbar.jsx'
// import HomePage from '../homepage/HomePage.jsx'
import { Outlet } from "react-router-dom";
import style from './App.css'
import { blog } from '../../../config/config'

export default class App extends React.Component {
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