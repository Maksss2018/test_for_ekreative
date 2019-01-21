import React from 'react'
import {connect} from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {setComment} from '../../actions'



class CommentsForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSending =this.onSending.bind(this);
        this.onTyping = this.onTyping.bind(this);
        this.state = {
            text: null,
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
        let {data,prevIssues} = this.props,
            { text } = this.state;//prjID : issueID

        this.props.setComment({value:[text,...prevIssues], ...data});
        this.props.publishComment;
    }
    render() {

        return (  <Form onSubmit={this.onSending} >
            <FormGroup>
                <Input
                  className={" text-body "}
                    onChange={this.onTyping}
                       type="textarea"
                       name="text"
                       id={`text-`} />
            </FormGroup>
            <Button> Publish </Button>
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
    setComment: (obj)=>dispatch(setComment(obj)), //obj.prjID / obj.issueID / obj.value
    //getListOfProjectIssues :(id,cookies)=>dispatch(getListOfProjectIssues(id,cookies))
    //getByID : (i,crnt)=>dispatch(getByID(i,crnt))
    //  listViewData: () => dispatch(listViewData())
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);
