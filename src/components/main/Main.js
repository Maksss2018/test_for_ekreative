import React from 'react'
// import ButtonComponent from '../button/buttonComponent'
// import {setCookie, getCookie} from '../../api/cookie'
//import Header from '../header/Header'
import {connect} from 'react-redux'
import {} from '../../actions'
import ListView from '../listview/Listview'
import cookie from 'react-cookies'
class Main extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            width:null
        };
    }
    componentDidMount () {
        if (cookie.load("password")&&cookie.load("username")) {
            console.log("  cookie.load(\"password\") "+cookie.load("password"));
        } else {
            this.props.history.push('/')
        }
        // if (!localStorage.getItem('Token')) { this.props.history.push('/') }
    }



    componentDidUpdate (prevProps, prevState, snapshot) {
  /*      if (!this.props.auth) {  }
*/
    }
    render () {
        let {data}=this.props.auth ,
            ListOfProjects =data.map((project,ind)=>{
                return(
                   <li key={` projects-${ind}`}>
                       {JSON.stringify(project)}
                   </li>
                )
            });
        return (
            <ul>
                {ListOfProjects}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: Object.assign({},state.auth)
    }
}
const mapDispatchToProps = (dispatch) => ({
  //  listViewData: () => dispatch(listViewData())
})
export default connect(mapStateToProps, mapDispatchToProps)(Main)
