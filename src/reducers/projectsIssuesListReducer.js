import {idbKeyval} from '../utils/index.js'
import {
    GET_ISSUES_ALL,
    GET_ISSUE_ALL_COMMENTS,SET_ISSUE_COMMENT_BY_ISSUES_ID,DELETE_ISSUE_COMMENT_BY_ISSUES_ID
} from '../constants/index.js'
export default  (state = null /* = getCookie('Token')*/, action) => {
    switch (action.type) {
        case GET_ISSUES_ALL:
            console.log(" GET_ISSUES_ALL"+typeof(action.payload));
            return (action.payload);
        default:
            return state;
    }
}