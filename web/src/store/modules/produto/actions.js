export function createProdutoRequest(values) {
  return {
    type: '@produto/CREATE_PRODUTO_REQUEST',
    payload: { values },
  };
}

export function getByIdProdutoRequest(data) {
  return {
    type: '@produto/GET_BYID_PRODUTO_REQUEST',
    payload: { data },
  };
}

export function getByIdProdutoSuccess(data) {
  return {
    type: '@produto/GET_BYID_PRDOTUTO_SUCCESS',
    payload: { data },
  };
}

export function findAllProdutoRequest(data) {
  return {
    type: '@produto/FIND_ALL_PRODUTO_REQUEST',
    payload: { data },
  };
}

export function findAllProdutoSuccess(data) {
  return {
    type: '@produto/FIND_ALL_PRODUTO_SUCCESS',
    payload: { data },
  };
}

export function updateProdutoRequest(data) {
  return {
    type: '@produto/UPDATE_PRODUTO_REQUEST',
    payload: { data },
  };
}

export function updateProdutoSuccess(data) {
  return {
    type: '@produto/UPDATE_PROTUDO_SUCCESS',
    payload: { data },
  };
}

export function deleteProdutoRequest(data) {
  return {
    type: '@produto/DELETE_PRODUTO_REQUEST',
    payload: { data },
  };
}

export function produtoFailure() {
  return {
    type: '@produto/PORTION_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@produto/RESET_FORM',
  };
}
