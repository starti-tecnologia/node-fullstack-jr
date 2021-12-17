import produce from 'immer';

const INITIAL_STATE = {
  produtosList: [],
  form: {
    id: undefined,
    name: '',
    valor: '',
    quantidade: '',
  }
};

export default function produto(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@produto/RESET_FORM': {
        draft.form = {
          id: undefined,
          name: '',
          valor: '',
          quantidade: '',
        };
        break;
      }
      case '@produto/FIND_ALL_PRODUTO_SUCCESS': {
        draft.produtosList = action.payload.data;
        break;
      }
      case '@produto/GET_BYID_PRDOTUTO_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      default:
    }
  });
}
