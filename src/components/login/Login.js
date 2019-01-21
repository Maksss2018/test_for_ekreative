import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Form,
    FormGroup, Label, Input, Button } from 'reactstrap'
import {logingIn} from '../../actions'
import cookie from 'react-cookies'
class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            globalError:false,
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
    componentDidMount () {
        if (cookie.load("password")&&cookie.load("username")) {
            this.props.history.push('/logged')
        }
        // if (!localStorage.getItem('Token')) { this.props.history.push('/') }
    }

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
                rez = emailRex.test(value) && 12 >= value.length!==0&&  value.length <= 12 ;
                break;
            case "password":
                rez =  value.length <= 8 &&value.length !==0 ;
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
            let {auth} = this.props,
                {login,password}= this.state;
            this.setState({auth});
            if (auth.error&&!auth.auth&&!auth.loading) {
             //   this.props.history.push('/');
                this.setState({globalError:true});
            } else {
                cookie.save('password', password.value);
                cookie.save('username', login.value);
                this.props.history.push('/logged');
            }
        }
    }



    render () {
        let {login,password, auth,globalError} = this.state,
            {error,loading}=auth;
        return (<Col id={'loginForm'} className={` h-100 `} >
            <Row className={` h-100 d-flex align-items-center `} >
                <Col/>
                <Col  xs={12} md={8}>
                    <Form
                        onSubmit={(e)=>{
                            e.preventDefault();
                            login.valid&&password.valid?this.props.logingIn({login:login.value,password:password.value.toString()})
                                :console.log(" unvalid form");

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

                        <Col className={`h5 py-3 h-100 d-flex  justify-content-center content- align-items-center `}>
                            <small className={` text-${!globalError?"dark":"danger"} `}>
                                {!globalError?"Please enter user name and password":
                                    " Try to use other password or  user name else sign-in"}
                            </small>
                        </Col>

                        <Col className={`h-100 d-flex  justify-content-center content- align-items-center `}>
                            {!globalError?"":<Button
                                className={`mx-auto mx-md-3 btn-warning btn-custom-md-rounded `}
                            > Sign-in </Button>}
                            <Button
                            className={`mx-auto mx-md-3 btn-${loading?"warning":error?"danger":"info"} btn-custom-md-rounded `}
                            > {loading?"loading ...":"Enter"} </Button>
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
};
const mapDispatchToProps = (dispatch) => ({
    logingIn: ({login,password}) => dispatch(logingIn({login,password}))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login)
