import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RegistroPedido from '~/pages/RegistroPedido';
import RegistroProdutos from '~/pages/RegistroProdutos'

function RoutesApp() {
  return (
    <Switch>
      <Route  path="/" exact component={RegistroPedido} />
      <Route  path="/pedido/:id" exact component={RegistroPedido} />
      <Route  path="/registroProduto" exact component={RegistroProdutos} />
      <Route  path="/produto/:id" exact component={RegistroProdutos} />
    </Switch>
  );
}

export default RoutesApp;
