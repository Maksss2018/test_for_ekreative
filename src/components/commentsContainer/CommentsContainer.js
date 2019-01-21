import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Collapse, ListGroup, ListGroupItem, CardBody, Card} from 'reactstrap';
import CommentsItem from '../../components/commentsItem/CommentsItem'
import CommentsForm from '../../components/forms/CommentsForm'
import {getComments} from '../../actions/index'
import {idbKeyval} from "../../utils";

class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.loadComments = this.loadComments.bind(this);
        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            status: 'Closed',
            statusComments: 'Comments',
            comments:null
        };
    }

    onEntering() {
        this.setState({ status: 'Opening...' });
    }

    onEntered() {
        this.setState({ status: 'Opened' });
    }

    onExiting() {
        this.setState({ status: 'Closing...' });
    }

    onExited() {
        this.setState({ status: 'Closed' });
    }

   async  toggle() {
        let {collapse, statusComments} =this.state;

        if(collapse!==true){

            this.setState({statusComments:"Loading"});
               let  comments = await this.loadComments();
            this.setState({statusComments:"Close"});
        }else{
            this.setState({comments:null,statusComments:"Comments"});
        }
        this.setState({ collapse: !this.state.collapse });
    }

    async loadComments (){
        let {id}= this.props,
            idStrnToArray=id.split("-"),
            dataKeys ={
                prjID : idStrnToArray[1],
                issueID : idStrnToArray[2]
            },
            comments = await idbKeyval.getComment(Number(`${dataKeys.prjID}${dataKeys.issueID}`))
                .then((r)=>{
                    return [...r]
                })
                .catch((err)=>{
                    return null
                });
        comments = comments!=undefined?comments:null;
        this.setState({comments});
    }
    render() {
        let {collapse,comments,statusComments} = this.state,
            {id}= this.props,
            idStrnToArray=id.split("-"),
             dataKeys ={
                 prjID : idStrnToArray[1],
                 issueID : idStrnToArray[2]
             };
        return (
            <Row>
                <Col xs={12} className={" bg-primary py-1 text-center "}  onClick={this.toggle} style={{ color: 'white' }} >
                    {statusComments}
                </Col>
                <Collapse className={' col-12 '}
                    isOpen={this.state.collapse}
                    onEntering={this.onEntering}
                    onEntered={this.onEntered}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <Row>
                        <Col xs={12} >
                            <Row>
                                <Col xs={12}>
                                    <ListGroup>
                                        {collapse?comments!==null?comments.map((strg,ind)=>{
                                            return (<ListGroupItem key={`${id}-${ind}-comment`}>
                                                <Card>
                                                    <CardBody>
                                                        {strg}
                                                    </CardBody>
                                                </Card>
                                            </ListGroupItem>)
                                            }):<ListGroupItem>
                                                <Card>
                                                    <CardBody>
                                                        There is no comments yet
                                                    </CardBody>
                                                </Card>
                                            </ListGroupItem>:""}
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <CommentsForm  publishComment={this.loadComments()}  prevIssues={comments} data={dataKeys} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Collapse>
            </Row>
        );
    }

}
//prevComments={comments}
const mapStateToProps = (state) => {
    return {
        /*
       auth: Object.assign({},state.auth),
        projects: Object.assign([],state.projects),
        projectsIssues:Object.assign([],state.projectsIssues)
        */
    }
};
const mapDispatchToProps = (dispatch) => ({
    getComments: (keys)=>dispatch(getComments(keys)),
    //getListOfProjectIssues :(id,cookies)=>dispatch(getListOfProjectIssues(id,cookies))
    //getByID : (i,crnt)=>dispatch(getByID(i,crnt))
    //  listViewData: () => dispatch(listViewData())
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
