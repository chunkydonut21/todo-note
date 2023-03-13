import todos from './todoSlice'
import auth from './authSlice'
import { combineReducers } from 'redux'

export default combineReducers({ todos, auth })
