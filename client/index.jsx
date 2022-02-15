import React from 'react'
import ReactDom from 'react-dom'
import store from './store/index'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import './global.css'
import './global.js'

import RootContainer from './components/RootContainer.jsx'

// import App from './components/app/App.jsx'
// import HomePage from './components/homepage/HomePage.jsx'
// import ArticleList from './components/articleList/ArticleList.jsx'
// import BlackBoard from './components/blackBoard/BlackBoard.jsx'
// import Admin from './components/admin/Admin.jsx'

ReactDom.render(
  <BrowserRouter>
    <Provider store={ store }>
      <RootContainer/>
    </Provider>
  </BrowserRouter>
  , document.getElementById('app')
)