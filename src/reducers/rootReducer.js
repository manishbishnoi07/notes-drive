import modalReducer from './modalReducer'
import folderReducer from './folderReducer'
import fileReducer from './fileReducer'
import {combineReducers} from 'redux'
import authReducer from './authReducer'
import searchReducer from './searchReducer'

const rootReducer=combineReducers({
    file:fileReducer,
    folder:folderReducer,
    modal:modalReducer,
    auth:authReducer,
    search:searchReducer,
})

export default rootReducer 