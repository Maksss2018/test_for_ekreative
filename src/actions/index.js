import request from 'request'
//import request from 'request-promise'
//import {setCookie, getCookie} from '../utility/cookie'
import {reactLocalStorage} from 'reactjs-localstorage';
import {API,Users} from './config.json'
import {
    REQ_SEND_ENTER, REQ_GET_ENTER, REQ_ERROR_ENTER,
    /*indexDB START*/
    GET_PROJECTS_LIST,
    GET_ISSUES_BY_ID, GET_ISSUES_ALL,
    GET_ISSUE_ALL_COMMENTS,SET_ISSUE_COMMENT_BY_ISSUES_ID,DELETE_ISSUE_COMMENT_BY_ISSUES_ID
    /*indexDB END*/
} from '../constants/index.js'
import { idbKeyval} from '../utils/index.js'

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

export const getComments = (obj) => {
    return async (dispatch) => {
            let data = await idbKeyval.getComment(Number(`${obj.prjID}${obj.issueID}`))
                .then((r)=>(r))
                .catch((err)=>(null));
        dispatch({
            type: GET_ISSUE_ALL_COMMENTS,
            payload:data
        });
    }
}

export const setComments = (obj) => {
    return async (dispatch) => {
        /* obj.value suposed to be  a  prevData.concat([Newdata]) in the form or here ?  */
        let data = await idbKeyval.setComment(Number(`${obj.prjID}${obj.issueID}`),obj.value)
            .then((r)=>(r))
            .catch((err)=>(null));
        dispatch({
            type: SET_ISSUE_COMMENT_BY_ISSUES_ID,
            payload:data
        });
    }
}


export const logingIn = (opt) => {
//https://easyredmine.docs.apiary.io/#reference/issues/issues-collection/list-all-issues

    return async (dispatch) => {
        let parameters = ["?sort=true","offset=0","limit=25","page=1"].join("&");
        if(Users[opt.login]!==undefined&&Users[opt.login][opt.password]!==undefined){
            dispatch({
                type: REQ_SEND_ENTER,
                payload: {loading: true, error: false, auth: false}
            });
            try{
                let rez= await  doRequest(opt,parameters,"projects").then((res)=>{
                    let rez= JSON.parse(res);
                    rez.projects.map((project,ind)=>{
                        idbKeyval.set(ind,project);
                        return project;
                    });
                });
                reactLocalStorage.set('key', true);
                reactLocalStorage.setObject('key', Users[opt.login][opt.password]);

                //idbKeyval.set();
                dispatch({
                    type: REQ_GET_ENTER,
                    payload: {loading: false, error: false, auth: true}
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
    }
};
export const getListOfProjectsFromDB = async () =>{
    let kList = await idbKeyval.keys();
    let result = kList.map((project)=>{
        let prt = project,
            get = async (prt)=>{
                let data = await idbKeyval.get(prt);
                return data;
            },
            {name,description,id,identifier,status,created_on,updated_on} = get(prt),
            prj  = {name,description,id,identifier,status,created_on,updated_on};
        return prj
    });
    return kList
};

export const  getByID  = async (prt,projects) =>{
    let data = await idbKeyval.get(prt);
    console.log(" async "+JSON.stringify(data));
    return  (dispatch) => {

        console.log(" async "+JSON.stringify(data));
        dispatch({
            type: GET_PROJECTS_LIST,
            payload:projects.concat(data)
        });
    }
}
export const getListOfProjects = () => {

    return async (dispatch) => {
     //async ()=>{
         try{
           let list =  await idbKeyval.keys().then((res)=>{
                 return (res);
             });
             dispatch({
                 type: GET_PROJECTS_LIST,
                 payload:list
             });
         }catch (e) {
             console.log(" ERROR!!!! in reducer ");
         }
     //};

    }
};
export const getListOfProjectIssues = (prjID,cookiesPassLgn) => {

///issues.xml?project_id=2
    return async (dispatch) => {
        let rtg = await doRequest(cookiesPassLgn,
                [`?project_id=${prjID}`],
                "issues").then((res)=>{
                return (JSON.parse(res).issues.map((id)=>id));
            });

        //console.log(" res.issues "+JSON.stringify(rtg));

        dispatch({
            type: GET_ISSUES_ALL,
            payload:rtg
        });
    }
};
