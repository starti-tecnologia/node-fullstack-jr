import produce from 'immer';

const INITIAL_STATE = {
  pedidosList: [],
  form: {
    id: undefined,
    name: '',
    email: '',
    status: 'pendente',
  }
};

export default function pedido(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@pedido/RESET_FORM': {
        draft.form = {
          id: undefined,
          name: '',
          email: '',
          status: 'em-aberto',
        };
        break;
      }
      case '@pedido/FIND_ALL_PEDIDO_SUCCESS': {
        draft.pedidosList = action.payload.data;
        break;
      }
      case '@pedido/GET_BYID_PEDIDO_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      default:
    }
  });
}
