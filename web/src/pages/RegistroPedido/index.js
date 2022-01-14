import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from './Cart'
import List from './ListProdutos'

import { Container } from './styles';

import {
  createPedidoRequest,
  getByIdPedidoRequest,
  resetFormulario,
  updatePedidoRequest } from '~/store/modules/pedido/actions';

  function RegistroPedido() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useSelector((state) => state.pedido.form);

  useEffect(() => {
    if (id) {
      dispatch(getByIdPedidoRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    try {
      let body = JSON.parse(JSON.stringify(values));

      if (id) {
        dispatch(updatePedidoRequest({ id: id , values: body}));
      } else {
        dispatch(createPedidoRequest(values));
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  return (
    <Container>
      <div className="header-main">
        <Formik onSubmit={handleSubmit} 
                enableReinitialize={true} 
                initialValues={form}>
            <Form className="form-input">
              <div id="container-input" className="header-title">

                <div className="campo1">
                  <label htmlFor="name">Nome cliente</label>
                  <Field  name="name" />

                  <label htmlFor="data_vencimento">Email cliente</label>
                  <Field   name="email"  type="email" />
                </div>
                
                <div className="campo2">
                  <label htmlFor="status">Status</label>
                  <Field component="select" id="location" name="status">
                    <option value="em-aberto">Em espera</option>
                    <option value="pago">Pago</option>
                    <option value="cancelado">Cancelado</option>
                  </Field>
                  <div className="buttons-container">
                    
                    <button className='salvar' type="submit">Criar Pedido</button>
                  </div>
                </div> 
              </div>
            </Form>
        </Formik>
      </div>
      <Card />
      <List />
    </Container>
  );
}

export default RegistroPedido;
