import React from 'react'
import {connect} from 'react-redux'
import {FormFeedback, Row, Col, Form,
    FormGroup, Label, Input, Button } from 'reactstrap'
import {logingIn} from '../../actions'
import h5 from "eslint-plugin-jsx-a11y/src/util/implicitRoles/h5";
class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            auth:{loading: false, error: false, auth: false},
            login:{
                value:null,
                valid:true
            },
            password:{
                value:null,
                valid:true
            }
        };
        this.validate = this.validate.bind(this);
        this.handelInputOnChange = this.handelInputOnChange.bind(this);
    }
    /*TODO:
     * - chack  for local sotreg pass login
     * if  true redirect to /logged else return /
     * https://alligator.io/react/fancy-forms-reactstrap/
     * */
    componentDidMount () {
        /*if (this.props.auth) {
            this.props.history.push('/logged')
        }*/
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
      handelInputOnChange(e){
         e.preventDefault();
         let trg = e.target, name = trg.name, value = trg.value,
         valid = this.validate({name,value});
         this.setState({[name]:{ value, valid}})
      }
    validate(data){
        let {value, name }= data, rez;
        switch(name){
            case "login":
                const emailRex = /([a-zA-Z\-0-9])$/;
                rez = emailRex.test(value) && value.length <= 12;
                break;
            case "password":
                rez = value.length <= 6 ? false : true;
                break;
            default: rez = null;
        }
        return rez;
    }
    componentDidUpdate (prevProps, prevState, snapshot) {
        /*if (!this.props.auth) {
            this.props.history.push('/')
        } else {
            this.props.history.push('/logged')
        }*/
        if(prevProps.auth!==this.props.auth){
            let {auth} = this.props;
            this.setState({auth});
        }
    }



    render () {
        let {login,password, auth} = this.state,
            {error,loading}=auth;
        console.log(error+" "+loading);
        return (<Col id={'loginForm'} className={` h-100 `} >
            <Row className={` h-100 d-flex align-items-center `} >
                <Col/>
                <Col  xs={12} md={8}>
                    <Form
                        onSubmit={(e)=>{
                            e.preventDefault();
                           this.props.logingIn("test","test");
                        }}
                        className="form form-custom-container">
                        <Col>
                            <FormGroup>
                                <Label>Login</Label>
                                <Input
                                    className={`text-dark`}
                                    onChange={this.handelInputOnChange }
                                    type="text"
                                    name="login"
                                    id="loginInput"
                                    placeholder="login"
                                />
                                { login.valid?"":<span className={"h6 text-danger "}  >
                                    login name  not correct (try to use less  then 12 symbols or not  to use special symbols )
                                </span>}
                                </FormGroup>
                            </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    className={`text-dark`}
                                    onChange={this.handelInputOnChange }
                                    type="password"
                                    name="password"
                                    id="inputPassword"
                                    placeholder="********"
                                />
                                { password.valid?"":<span className={" h6 text-danger "}>
                                    password  not correct (try to use less  then 6 symbols)
                                </span>}
                            </FormGroup>
                        </Col>
                        <Col className={`h-100 d-flex  justify-content-center content- align-items-center `}>
                            <Button
                            className={` btn-${loading?"warning":error?"danger":"info"} btn-custom-md-rounded `}
                            > {loading?"loading ...":"Enter"} </Button>
                            {`loading == ${loading}`}
                        </Col>
                    </Form>
                </Col>
                <Col/>
                </Row>
        </Col>)
    }
}

const mapStateToProps = (state) => {
    return {
        auth: Object.assign({}, state.auth)
    }
}
const mapDispatchToProps = (dispatch) => ({
    logingIn: (login,pass) => dispatch(logingIn(login,pass))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
