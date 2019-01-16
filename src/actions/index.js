import request from 'request'
//import request from 'request-promise'
//import {setCookie, getCookie} from '../utility/cookie'
import {API,Users} from './config.json'
import {
  REQ_SEND_ENTER, REQ_GET_ENTER, REQ_ERROR_ENTER
} from '../constants/index.js'

export const logingIn = (opt) => {
//https://easyredmine.docs.apiary.io/#reference/issues/issues-collection/list-all-issues
    const  doRequest =  (opt,parameters) => {
        return new Promise( (resolve, reject) => {
            console.log("login with :"+JSON.stringify(opt.login)+" "+opt.password);
            if(Users[opt.login][opt.password]!==undefined){
                request.get(`${API}/issues.json${parameters} `,{
                    headers:{
                        "X-Redmine-API-Key" : Users[opt.login][opt.password],
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
            }else{
                reject("Unknown User! please sign-in first")
            }
        });
    }

    return async (dispatch) => {
        let parameters = ["?sort=true","offset=0","limit=25","page=1"].join("&"),
            options = {
            url:"https://redmine.ekreative.com",// `${API}`,
            method: 'POST',
            multipart: {
            chunked: false,
                data: [
                {
                    'content-type': 'application/json',
                    body:{ "username" : opt.login,
                        "password" : opt.password}
                }
            ]
        }
    };
        doRequest(opt,parameters);

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