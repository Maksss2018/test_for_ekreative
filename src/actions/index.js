import request from 'request'
//import request from 'request-promise'
//import {setCookie, getCookie} from '../utility/cookie'
import {API} from './config.json'
import {
  REQ_SEND_ENTER, REQ_GET_ENTER, REQ_ERROR_ENTER
} from '../constants/index.js'

export const logingIn = (username="test", password="testtask") => {
//https://easyredmine.docs.apiary.io/#reference/issues/issues-collection/list-all-issues
    const  doRequest =  (opt) => {
        return new Promise( (resolve, reject) => {
            request.get(API,{headers:{
                "X-Redmine-API-Key" : "2fda745bb4cdd835fdf41ec1fab82a13ddc1a54c",
                    "Content-Type": "application/json"
            }},( res, err) => {
                if (!err && res.statusCode == 200) {
                    console.log("action rezult");
                    resolve(res.body);
                } else {
                    console.log("action rezult "+JSON.stringify(err));
                    reject(err);
                }
            })
        });
    }

    return async (dispatch) => {
        let options = {
            url:"https://redmine.ekreative.com",// `${API}`,
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
        doRequest({ username,password});

    }
};
/*
export const login = (username, password) => {
    return (dispatch) => {
        request
        // .get('token.json')
            .post(`${API}auth/login/`)
            .send({'username': username, 'password': password}) // sends a JSON post body
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) {
                    dispatch({
                        type: 'LOGINERROR',
                        payload: 'login error'
                    })
                    // localStorage.setItem('Token', res.body.key)
                } else {
                    dispatch({
                        type: 'LOGIN',
                        payload: res.body.key
                    })
                    dispatch({
                        type: 'LOGINERRORCLEAR'
                    })
                    // localStorage.setItem('Token', res.body.key)
                }
            })
    }
*/