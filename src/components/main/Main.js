import React from 'react'
import {connect} from 'react-redux'
import {getByID,getListOfProjects,getListOfProjectIssues} from '../../actions'
import cookie from 'react-cookies'
import {ListGroup, ListGroupItem, Progress, Badge, Row, Col} from 'reactstrap';
import {dbPromise, idbKeyval} from '../../utils/index.js'
import CommentsContainer from '../../components/commentsContainer/CommentsContainer'
///root/Desktop/test_EKreative/src/components/commentsContainer/CommentsContainer.js

let keysList = async()=>{
    let dt = await idbKeyval.keys();
    return (dt)
}

class Main extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            projects:null,
            currentProject : null
        };
        this.handelClickPrj = this.handelClickPrj.bind(this);
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
        if(this.state.currentProject!==this.props.projectsIssues  ){
            this.setState({currentProject:this.props.projectsIssues});
        }
    }
    handelClickPrj (e){
        e.preventDefault();
        let id = e.target.id,
            getId = id.split("-"),
            trueId= Number(getId[Number(getId.length-1)]);
        this.props.getListOfProjectIssues(
            trueId,
            {
                login:cookie.load("username"),
                password:cookie.load("password")
            }
        )
    }
    render () {
        let {projects,currentProject} = this.state,
            currentProjectIssuesList = currentProject!==null?currentProject.map((issue,ind)=>{
             /*json struct
             let obj =
                {  "id":27008,
                    "project":{"id":378,"name":"Test Project"},
                    "tracker":{"id":4,"name":"Task"},
                    "status":{"id":1,"name":"New"},
                    "priority":{"id":2,"name":"Normal"},
                    "author":{"id":261,"name":"Test User"},
                    "parent":{"id":27002},
                    "subject":"Subtask 3",
                    "description":"",
                    "start_date":"2017-07-04",
                    "done_ratio":0,
                    "custom_fields":[{"id":4,"name":"Fixed Version","value":""}],
                    "created_on":"2017-07-04T08:08:08Z","updated_on":"2017-07-05T22:03:47Z"};
             */
                const started = new Date(issue["created_on"]),
                 updated = new Date(issue["updated_on"]),
                    startedFull =`${started}`,
                    updatedFull =`${updated}`;
                let statusBg, done;
             switch(issue["status"].name){
                 case "New":
                     statusBg = "success";
                 break;
                 case "Testing":
                     statusBg = "dark";
                     break;
                 case "On Hold":
                     statusBg = "warning";
                     break;
                 case "In Progress":
                     statusBg = "primary";
                     break;
                 default:
                     statusBg = "secondary";
             }

             switch (true) {
                 case issue["done_ratio"] >= 1&& issue["done_ratio"] <=25:
                     done =` first quarter `;
                     break;
                 case issue["done_ratio"] >= 26&& issue["done_ratio"] <=50:
                     done =` half of the way`;
                     break;
                 case issue["done_ratio"] >= 51&& issue["done_ratio"] <=75:
                     done =` fourth  quarter`;
                     break;
                 case issue["done_ratio"] >= 76&& issue["done_ratio"] <= 99:
                     done =` almost done`;
                     break;
                 case  issue["done_ratio"] === 100:
                     done =` at the finish line `;
                     break;
                     default: done = <span className={"text-body"}>
                          still waiting for the weather from the sea
                     </span>;

             }
             let  created =issue["created_on"].split("-");
                return (<ListGroupItem key={`issue-${ind}`}>

                    <Row>
                        <Col xs={12} md={4}>
                            <ListGroup className={"border-all-none"} >
                                <ListGroupItem className={" pl-0 py-1 border-all-none"} >
                                    name:  {issue["author"].name}
                                </ListGroupItem>
                                <ListGroupItem className={"pl-0 py-1 border-all-none"} >
                                    priority:  {issue["priority"].name}
                                </ListGroupItem>
                                <ListGroupItem  className={"pl-0 py-1 border-all-none"}>
                                    created : <br/>   {`${startedFull}`.split(" ").slice(0,5).join(" ")}
                                </ListGroupItem>
                                <ListGroupItem className={"pl-0 py-1 border-all-none"} >
                                    last updated : <br/>{`${updatedFull}`.split(" ").slice(0,5).join(" ")}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col xs={12} md={8}>
                            <Row className={" h-100 "}>
                                <Col xs={12}>
                                    <Badge
                                        className={"mb-2"}
                                        color={`${statusBg}`} >
                                        {issue["status"].name} {issue["tracker"].name}
                                        : {`"${issue["subject"].length>=50?issue["subject"].slice(0,50)+"...":issue["subject"]}"`}
                                    </Badge><br/>
                                    <Progress
                                        animated
                                        className={"mb-4"}
                                        color={`${statusBg}`}
                                        value={Number(issue["done_ratio"])}>{done}</Progress>
                                </Col>
                                <Col  xs={12}>
                                   <span>
                                {issue["description"]}
                                    </span>
                                </Col>
                                <Col className={" mt-auto "} xs={12}>
                                    <CommentsContainer/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </ListGroupItem>)
                }):"no issues ",
            ListOfProjects = projects!==null?projects.map((project,ind)=>{
                return(
                    <ListGroupItem
                        onClick={this.handelClickPrj}
                        id={`project-id-${project.id}`}
                        key={`project-list-items-${ind}`}

                        className={`bg-${project.status!==1?"green":"white"} text-${project.status!==1?"danger":"body"} justify-content-between`}>
                        {project.name}
                        <Badge
                            className={"bg-warning"} pill>id: {project.id}</Badge>
                        <br/>
                         <span>Description : </span><br/>
                        <span className={" bg-warning "}>
                            {project.description}
                        </span>
                        <ListGroup>
                            {
                                project["custom_fields"].map((li,ind)=>{
                                    return(<ListGroupItem key={`fields-${project.id}-${ind}`} className="justify-content-between">
                                        {li.name} : {li.value}
                                    </ListGroupItem>)
                                })
                            }
                        </ListGroup>
                    </ListGroupItem>
                )
            }):" Loading... ";
        return (
            <Col id={'loginForm'} className={` h-100 `} >
                <Row className={` h-100`} >
                    <Col xs={12} md={4}>
                        <ListGroup>
                            {ListOfProjects}
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={8}>
                        <ListGroup className={"w-100"}>
                            {currentProjectIssuesList}
                        </ListGroup>
                    </Col>
                </Row>
            </Col>
                        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: Object.assign({},state.auth),
        projects: Object.assign([],state.projects),
        projectsIssues:Object.assign([],state.projectsIssues)
    }
};
const mapDispatchToProps = (dispatch) => ({
    getListOfProjects: ()=>dispatch(getListOfProjects()),
    getListOfProjectIssues :(id,cookies)=>dispatch(getListOfProjectIssues(id,cookies))
    //getByID : (i,crnt)=>dispatch(getByID(i,crnt))
    //  listViewData: () => dispatch(listViewData())
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
