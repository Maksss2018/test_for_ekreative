import request from 'request'
//import request from 'request-promise'
//import {setCookie, getCookie} from '../utility/cookie'
import {API,Users} from './config.json'
import {
  REQ_SEND_ENTER, REQ_GET_ENTER, REQ_ERROR_ENTER
} from '../constants/index.js'
export const doRequest = (opt,parameters,requestFor) => {
    return new Promise( (resolve, reject) => {
            request.get(`${API}/${requestFor}.json${parameters}`,{
                headers:{
                    "X-Redmine-API-Key" : Users[opt.login][opt.password],
                    "Content-Type": "application/json"
                }},( err , res) => {
                if (!err && res.statusCode == 200) {
                    resolve(res.body);
                } else {
                    reject(err);
                }
            })

    });
};
export const logingIn = (opt) => {
//https://easyredmine.docs.apiary.io/#reference/issues/issues-collection/list-all-issues

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
        if(Users[opt.login]!==undefined&&Users[opt.login][opt.password]!==undefined){
            dispatch({
                type: REQ_SEND_ENTER,
                payload: {loading: true, error: false, auth: false}
            });
            try{
                let rez= await  doRequest(opt,parameters,"projects");
                dispatch({
                    type: REQ_GET_ENTER,
                    payload: {loading: false, error: false, auth: true, data:rez}
                });
            }catch(e){
                console.log("ERROR!!!!!!");
                dispatch({
                    type: REQ_ERROR_ENTER,
                    payload: {loading: false, error: true, auth: false}
                });
            }
        }else{
            dispatch({
                type: REQ_ERROR_ENTER,
                payload: {loading: false, error: true, auth: false}
            });
        }
     /*
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
        } catch {
            dispatch({
                type: REQ_ERROR_ENTER,
                payload: {loading: false, error: false, auth: true}
            });
        }
     */
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