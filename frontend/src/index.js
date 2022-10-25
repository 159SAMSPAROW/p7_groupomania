import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './sass/index.scss'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { getUsers } from './actions/users.actions'
//dev tools
import { composeWithDevTools } from 'redux-devtools-extension'
import { getPosts } from './actions/post.actions'

import reportWebVitals from './reportWebVitals'

const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(thunk)),
)

store.dispatch(getUsers())
store.dispatch(getPosts())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
