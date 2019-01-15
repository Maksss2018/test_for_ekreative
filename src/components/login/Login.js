import React from 'react'
import {connect} from 'react-redux'
import {Container, Row, Col, Form,
    FormGroup, Label, Input, Button } from 'reactstrap'
import {logingIn} from '../../actions'
class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            login: null,
            password: null,
        };
    }
    /*TODO:
     * - chack  for local sotreg pass login
     * if  true redirect to /logged else return /
     *
     * */
    componentDidMount () {
        if (this.props.auth) {
            this.props.history.push('/logged')
        }
        // if (!localStorage.getItem('Token')) { this.props.history.push('/') }
    }

    // // onSignOut () {
    // //   request
    // //     .post('http://172.19.4.109:8000/auth/logout/')
    // //     // .send({'username': this.state.email, 'password': this.state.password}) // sends a JSON post body
    // //     .set('Authorization', 'Token ' + getCookie('Token'))
    // //     .end((err, res) => {
    // //       if (err) console.log(err)
    // //       else {
    // //         console.log(res.body.key)
    // //         setCookie('Token', '', true)
    // //         // localStorage.setItem('Token', res.body.key)
    // //         this.props.history.push('/')
    // //       }
    // //     })
    // // }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (!this.props.auth) {
            this.props.history.push('/')
        } else {
            this.props.history.push('/logged')
        }
    }



    render () {
        return (<Container>
            <Row>
                <Col>
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="myemail@email.com"
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="********"
                                />
                            </FormGroup>
                        </Col>
                        <Button>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>)
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => ({
    logingIn: (login,pass) => dispatch(logingIn(login,pass))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
