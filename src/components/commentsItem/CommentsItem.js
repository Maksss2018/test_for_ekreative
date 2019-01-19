import React from 'react'
import {connect} from 'react-redux'
import {Card, CardBody, ListGroup, ListGroupItem} from 'reactstrap';


class CommentsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: false,
            issueId: null
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
      //  let {issueId} = this.props;
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
                        Anim pariatur cliche reprehenderit,
                        enim eiusmod high life accusamus terry richardson ad squid. Nihil
                        anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident.
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
