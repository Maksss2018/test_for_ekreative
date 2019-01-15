import React from 'react'
import {connect} from 'react-redux'
import {} from '../../actions'

// import ButtonComponent from '../button/buttonComponent'
// import {setCookie, getCookie} from '../../api/cookie'
//import Header from '../header/Header'
class ListView extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            calender: false,
            wibth:null,
            modalGraph:false,
            animationFlag:false
        };
    }



    WindowResize() {
        let width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        this.setState({ width });
    }
    componentDidMount () {
        if (!this.props.auth) { this.props.history.push('/') } else {

        }
        this.WindowResize();
        window.addEventListener("resize", this.WindowResize);


        // if (!localStorage.getItem('Token')) { this.props.history.push('/') }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.WindowResize);
    }

    switchView (event) {
        this.setState((prevState) => { return {calender: !prevState.calender} });
        console.log(" switchView == dashhbord",this.props.listOrCalendar);

        this.props.switchListCalendar({switch:this.props.listOrCalendar});
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
        if (!this.props.auth) { this.props.history.push('/') }

    }

    toggleGraph() {
        this.setState({
            modalGraph: !this.state.modalGraph
        });
    }


    animateSwitchView(e){/*
        let id=e.target.getAttribute("id")!=="choice2",
            text =e.target.innerHTML;
            */
        e.preventDefault();
        let calender = !this.state.calender;
        this.setState({calender});
    }

    render () {
        let alert = <div  className="alert globus-alert-primary text-center d-none" role="alert">
            Alert text here
        </div>;
        let location = window.location.href.split("/"),
         view = location[location.length-1];
        console.log(" location "+location[location.length-1]);
        return (
            <div>
            </div>)
    }
}
/*
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};
const mapDispatchToProps = (dispatch) => ({
  //  listViewData: () => dispatch(listViewData())
});*/
export default ListView
//export default connect(mapStateToProps, mapDispatchToProps)(Main)
