import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer'
import projectsListReducer from '../reducers/projectsListReducer'
import  projectsIssuesListReducer  from '../reducers/projectsIssuesListReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        auth: authReducer,
        projects: projectsListReducer,
        projectsIssues: projectsIssuesListReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);

export default  store;
