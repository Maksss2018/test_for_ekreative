import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from '../components/login/Login'
import Main from '../components/main/Main'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="h-100-per">
          <Route exact path="/" component={Login} />
          <Route exact path="/logged" component={Main} />
      </div>
    </BrowserRouter>)
}
export default AppRouter
