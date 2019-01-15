//import {getCookie} from '../utility/cookie'
/*TODO:
* new functions for store
* */
export default (state = false/* = getCookie('Token')*/, action) => {
  switch (action.type) {
    case 'LOGIN':
      return (action.payload);
    case 'LOGOUT':
      return '';
    default:
      return state
  }
}
