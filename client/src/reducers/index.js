import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import listReducer from './listReducer';

const reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    list: listReducer
});

export default reducers;