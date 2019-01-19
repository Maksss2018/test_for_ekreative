import React from 'react'
import {connect} from 'react-redux'
import {Row,Col, Collapse, CardBody, Card, ListGroup } from 'reactstrap';
import CommentsItem from '../../components/commentsItem/CommentsItem'
import CommentsForm from '../../components/forms/CommentsForm'
import {getComments} from '../../actions/index'
class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            status: 'Closed' };
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

    toggle() {
        let {collapse} =this.state;
        this.setState({ collapse: !this.state.collapse });

        if(collapse){
            /* TODO:
            * request DB if there somesing like this " commentsDB -> [prjctID][issueID]" return it else return error
            * */
        }
    }

    componentDidMount() {
        let {id}= this.props,
            idStrnToArray=id.split("-"),
            dataKeys ={
                prjID : idStrnToArray[1],
                issueID : idStrnToArray[2]
            }
            this.props.getComments(dataKeys);
    }

    render() {
        let {collapse} = this.state,
            {id}= this.props,
            idStrnToArray=id.split("-"),
             dataKeys ={
                 prjID : idStrnToArray[1],
                 issueID : idStrnToArray[2]
             };
        return (
            <Row>
                <Col className={" bg-primary py-1 text-center "}  onClick={this.toggle} style={{ color: 'white' }} >
                    comments
                </Col>
                <Collapse
                    isOpen={this.state.collapse}
                    onEntering={this.onEntering}
                    onEntered={this.onEntered}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <ListGroup>
                        {collapse?<CommentsItem/>:""}
                    </ListGroup>

                    <CommentsForm data={dataKeys} />
                </Collapse>
            </Row>
        );
    }

}

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
