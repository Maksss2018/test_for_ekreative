import {idbKeyval} from '../utils/index.js'
import {
    GET_PROJECTS_LIST,
    GET_ISSUES_BY_ID, GET_ISSUES_ALL,
    GET_ISSUE_ALL_COMMENTS,SET_ISSUE_COMMENT_BY_ISSUES_ID,DELETE_ISSUE_COMMENT_BY_ISSUES_ID
} from '../constants/index.js'
export default  (state = null /* = getCookie('Token')*/, action) => {
    switch (action.type) {
        case GET_PROJECTS_LIST:
            return (action.payload);
        default:
            return state;
    }
}