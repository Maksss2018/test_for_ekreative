import React from 'react'
import {connect} from 'react-redux'
import {Card, CardBody, ListGroup, ListGroupItem} from 'reactstrap';


class CommentsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: false,
            issueId: null,
            comments:null
        };
        this.onSending =this.onSending.bind(this);
        this.onTyping = this.onTyping.bind(this);

    }

    onTyping(e) {
        e.preventDefault();
        let text = e.target.value;
        this.setState({ text });
    }
    onSending(e) {
        e.preventDefault();
        this.setState({ status: 'Opening...' });
    }
    render() {
       let {text} = this.props;
        return ( <ListGroup className={" bg-transparent"}>
            <ListGroupItem
                className={" border-all-none bg-transparent"}>
                name:Author ,
                date:--/--/--/
            </ListGroupItem>
            <ListGroupItem
                className={" border-all-none bg-transparent"}>
                <Card>
                    <CardBody>
                        {text}
                    </CardBody>
                </Card>
            </ListGroupItem>
        </ListGroup>);
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
    //getListOfProjects: ()=>dispatch(getListOfProjects()),
    //getListOfProjectIssues :(id,cookies)=>dispatch(getListOfProjectIssues(id,cookies))
    //getByID : (i,crnt)=>dispatch(getByID(i,crnt))
    //  listViewData: () => dispatch(listViewData())
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentsItem);
