import React from 'react'
import {connect} from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class CommentsForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSending =this.onSending.bind(this);
        this.onTyping = this.onTyping.bind(this);
        this.state = {
            text: false,
            issueId: null
        };
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
        let {issueId} = this.props;
        return (  <Form onSubmit={this.onSending} >
            <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input onChange={this.onTyping}
                       type="textarea"
                       name="text"
                       id={`Text-`} />
            </FormGroup>
            <Button>Submit</Button>
        </Form>);
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
export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);
