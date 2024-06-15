import { AUMENTAR_CONTADOR, DECREMENTAR_CONTADOR, TOGGLE_VISIBILIDAD_CONTADOR } from '../actions/contadorActions';

const initialState = {
    contador: 0,
    visibilidad: true
};

const contadorReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUMENTAR_CONTADOR:
            return {
                ...state,
                contador: state.contador + 1
            };
        case DECREMENTAR_CONTADOR:
            return {
                ...state,
                contador: state.contador - 1
            };
        case TOGGLE_VISIBILIDAD_CONTADOR:
            return {
                ...state,
                visibilidad: !state.visibilidad
            };
        default:
            return state;
    }
};

export default contadorReducer;
