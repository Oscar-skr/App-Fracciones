import { TOGGLE_SOUND } from '../actions/soundActions';

const initialState = {
    sonido: true
};

const soundReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SOUND:
            return {
                ...state,
                sonido: !state.sonido
            };
        default:
            return state;
    }
};

export default soundReducer;
