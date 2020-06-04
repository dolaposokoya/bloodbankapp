import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducer/allreducer';
const store = compose(applyMiddleware(thunk))(createStore)(allReducers);

export default store;
