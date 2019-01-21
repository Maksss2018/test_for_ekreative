import {
    GET_ISSUES_ALL
} from '../constants/index.js'
export default  (state = null /* = getCookie('Token')*/, action) => {
    switch (action.type) {
        case GET_ISSUES_ALL:
            return (action.payload);
        default:
            return state;
    }
}