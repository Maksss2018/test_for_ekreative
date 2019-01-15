import request from 'request'
//import request from 'request-promise'
//import {setCookie, getCookie} from '../utility/cookie'
import {API} from './config.json'
import {
  REQ_SEND_ENTER, REQ_GET_ENTER, REQ_ERROR_ENTER
} from '../constants/index.js'
//async
export const logingIn = (username="test", password="testtask") => {
    return async (dispatch) => {
        let options = {
            url: `${API}`,
            method: 'POST',
            multipart: {
            chunked: false,
                data: [
                {
                    'content-type': 'application/json',
                    body:{ "username" : username,
                        "password" : password}
                }
            ]
        }
    };
        dispatch({
            type: REQ_SEND_ENTER,
            payload: {loading: true, error: false, auth: false}
        });
        try {
            const rezult = await request(options);
            dispatch({
                type: REQ_GET_ENTER,
                payload: {loading: false, error: false, auth: true, data:rezult}
            });
        } catch (err){
            dispatch({
                type: REQ_ERROR_ENTER,
                payload: {loading: false, error: false, auth: true}
            });
        }
    }
};
/*
//Promise`s
export const logingIn = (username, password) => {
  return (dispatch) => {
    let options = {
      url : `${API}`
    };
      dispatch({
          type: 'REQ_SEND_ENTER',
          payload: { loading:true, error:false, auth:false }
      });
      request(options).then((res) => {
         // setCookie('Token', res.body.key, true)
            REQ_ERROR_ENTER
          dispatch({
              type: 'REQ_GET_ENTER',
              payload: { loading:false, error:false, auth:true }
          });
      }).catch((err) => {
          dispatch({
              type: 'REQ_ERROR_ENTER',
              payload: { loading:false, error:true, auth:false }
          });
            // localStorage.setItem('Token', res.body.key)

        })
  }
};

*/