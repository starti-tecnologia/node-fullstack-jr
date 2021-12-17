import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import List from './ListPedidos';

import { Container } from './styles';

import {
  createProdutoRequest,
  getByIdProdutoRequest,
  resetFormulario,
  updateProdutoRequest } from '~/store/modules/produto/actions';

export default function RegistroProdutos(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const form = useSelector((state) => state.produto.form);
  
  useEffect(() => {
    if (id) {
      dispatch(getByIdProdutoRequest(id));
    } else {
      dispatch(resetFormulario());
    }
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    try {
      let body = JSON.parse(JSON.stringify(values));

      if (id) {
        dispatch(updateProdutoRequest({ id: id , values: body}));
      } else {
        dispatch(createProdutoRequest(values));
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  return (
    <Container>
      <div className="header-main">
        <Formik 
            onSubmit={handleSubmit} 
            enableReinitialize={true} 
            initialValues={form} >

            <Form className="form-input">
              <div id="container-input" className="header-title">

                <div className="campo1">
                  <label htmlFor="name">Nome produto</label>
                  <Field  name="name"  />

                  <label htmlFor="valor">Valor produto</label>
                  <Field name="valor" />
                </div>

                <div className="campo2">
                  <label htmlFor="quantidade">Quantidade</label>
                  <Field  name="quantidade" /> 
                  <button type="submit">Salvar</button>
                </div>              
              </div>
            </Form>
        </Formik>
      </div>
      <List />
    </Container>
  );
}
