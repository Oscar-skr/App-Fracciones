import { createStore, combineReducers } from 'redux';
import soundReducer from './reducers/soundReducer';
import contadorReducer from './reducers/contadorReducer';

const rootReducer = combineReducers({
    sound: soundReducer,
    contador: contadorReducer // Añade el reducer del contador aquí
});

const store = createStore(rootReducer);

export default store;
