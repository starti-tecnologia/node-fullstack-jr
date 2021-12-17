export function createPedidoRequest(values) {
  return {
    type: '@pedido/CREATE_PEDIDO_REQUEST',
    payload: { values },
  };
}

export function getByIdPedidoRequest(data) {
  return {
    type: '@pedido/GET_BYID_PEDIDO_REQUEST',
    payload: { data },
  };
}

export function getByIdPedidoSuccess(data) {
  return {
    type: '@pedido/GET_BYID_PEDIDO_SUCCESS',
    payload: { data },
  };
}

export function findAllPedidoRequest(data) {
  return {
    type: '@pedido/FIND_ALL_PEDIDO_REQUEST',
    payload: { data },
  };
}

export function findAllPedidoSuccess(data) {
  return {
    type: '@pedido/FIND_ALL_PEDIDO_SUCCESS',
    payload: { data },
  };
}

export function updatePedidoRequest(data) {
  return {
    type: '@pedido/UPDATE_PEDIDO_REQUEST',
    payload: { data },
  };
}

export function updatePedidoSuccess(data) {
  return {
    type: '@pedido/UPDATE_PEDIDO_SUCCESS',
    payload: { data },
  };
}

export function deletePedidoRequest(data) {
  return {
    type: '@pedido/DELETE_PEDIDO_REQUEST',
    payload: { data },
  };
}

export function pedidoFailure() {
  return {
    type: '@pedido/PEDIDO_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@pedido/RESET_FORM',
  };
}
