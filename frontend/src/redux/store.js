import { createStore, combineReducers } from 'redux';
import soundReducer from './reducers/soundReducer';

const rootReducer = combineReducers({
    sound: soundReducer
});

const store = createStore(rootReducer);

export default store;
