//import {getCookie} from '../utility/cookie'
/*TODO:
* new functions for store
* */
import {
  REQ_SEND_ENTER, REQ_GET_ENTER, REQ_ERROR_ENTER
} from '../constants/index.js'
export default (state = {loading: false, error: false, auth: false}/* = getCookie('Token')*/, action) => {
  switch (action.type) {
    case REQ_SEND_ENTER:
      return (action.payload);
    case REQ_GET_ENTER:
      return (action.payload);
    case  REQ_ERROR_ENTER:
      return (action.payload);
    default:
      return state
  }
}
