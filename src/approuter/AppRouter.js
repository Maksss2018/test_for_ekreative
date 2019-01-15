import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Container, Row} from 'reactstrap'
import Login from '../components/login/Login'
import Main from '../components/main/Main'

const AppRouter = () => {
  return (
      <BrowserRouter>
          <Container className={`h-100`}>
              <Row className="h-100">
                  <Route exact path="/" component={Login} />
                  <Route exact path="/logged" component={Main} />
              </Row>
          </Container>
      </BrowserRouter>)
};
export default AppRouter
