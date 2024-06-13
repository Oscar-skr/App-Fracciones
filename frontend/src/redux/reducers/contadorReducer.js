import { AUMENTAR_CONTADOR, DECREMENTAR_CONTADOR } from '../actions/contadorActions';

const initialState = {
    contador: 0
};

const contadorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUMENTAR_CONTADOR':
            return {
                ...state,
                contador: state.contador + 1
            };
        case 'DECREMENTAR_CONTADOR':
            return {
                ...state,
                contador: state.contador - 1
            };
        default:
            return state;
    }
};

export default contadorReducer;
