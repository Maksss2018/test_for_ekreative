import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './index.scss'
import './styles/scss/site.scss'
import AppRouter from './approuter/AppRouter'
import registerServiceWorker from './registerServiceWorker'
// import Dashboard from './components/main/Dashboard'

const store = configureStore;

ReactDOM.render(<Provider store={store}>
  <AppRouter />
</Provider>, document.getElementById('root'))
registerServiceWorker()
