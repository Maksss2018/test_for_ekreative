import React from 'react'
import {connect} from 'react-redux'
import {getByID,getListOfProjects} from '../../actions'
import cookie from 'react-cookies'
import {dbPromise, idbKeyval} from '../../utils/index.js'
let keysList = async()=>{
    let dt = await idbKeyval.keys();
    return (dt)
}

class Main extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            projects:null|| this.props.projects
        };
    }
    componentDidMount () {
        if (cookie.load("password")&&cookie.load("username")) {
            let {projects}=this.props;
            this.props.getListOfProjects();
            this.setState({projects});
           /* keysList().then((res)=>{
                console.log(" res "+JSON.stringify(res));*/
                /*kl!==undefined?kl.map((k)=>{this.props.getByID(k,projects);
                    return k
                }):null;
            });*/

        } else {
            this.props.history.push('/')
        }
        // if (!localStorage.getItem('Token')) { this.props.history.push('/') }
    }



    componentDidUpdate (prevProps, prevState, snapshot) {
      if ( prevProps.projects!==this.props.projects) {
          let {projects}=this.props;
          console.log("let {projects}"+JSON.stringify(projects));
       this.setState({projects});
      }
    }
    render () {
        let {projects} = this.state/*,
            kl,
            ListOfProjects = projects!==null?projects.map((project,ind)=>{
                return(
                   <li key={` projects-${ind}`}>
                       {JSON.stringify(project)}
                   </li>
                )
            }):" Loading... "*/;
        console.log(" GET_PROJECTS_LIST __ render"+JSON.stringify(this.props.projects));
        return (
            <ul>
                <li>
                    {JSON.stringify( projects)}
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: Object.assign({},state.auth),
        projects: Object.assign({},state.projects)
    }
};
const mapDispatchToProps = (dispatch) => ({
    getListOfProjects: ()=>dispatch(getListOfProjects())
    //getByID : (i,crnt)=>dispatch(getByID(i,crnt))
    //  listViewData: () => dispatch(listViewData())
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
