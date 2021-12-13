import React, {Component} from 'react';
import axios from 'axios';
import './crudpedidoscompra.css';
import Pageheader from '../../templates/pageHeader/Pageheader';
import Grid from '../../templates/grid/Grid';
import Input from '../../templates/input/Input';
import Button from '../../templates/button/Button';
import TablePedidos from '../../templates/tablePedidos/TablePedidos';
import Select from '../../templates/select/Select';
import {MultiSelect} from  'react-multi-select-component'

const URL = "http://localhost:3333/";
export default class CRUDPedidosCompras extends Component{
  constructor(props){
    super(props);
    this.state = {  selectedProdutos : [], id_pedido:'', numeroPedido: '', nomeCliente: '', email: '', produtos: [], status: 'Em Aberto', statusList: [
      { id: 'Em Aberto', text: 'Em Aberto'}, 
      { id: 'Pago', text: 'Pago'}, 
      { id: 'Cancelado', text: 'Cancelado'}
    ], list: [], botao: 'Adicionar' };
    this.carregaDados = this.carregaDados.bind(this);
    this.changeNomeCliente = this.changeNomeCliente.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changenumeroPedido = this.changenumeroPedido.bind(this);
    this.changeProdutos = this.changeProdutos.bind(this);
    this.botaoPedido = this.botaoPedido.bind(this);
    this.deletaPedido = this.deletaPedido.bind(this);
    this.updatePedido = this.updatePedido.bind(this);
    this.validateForm = this.validateForm.bind(this);
    
    this.carregaDados();
  }

  changeNomeCliente(event){
    this.setState({ nomeCliente: event.target.value });
  }

  changeEmail(event){
    this.setState({ email: event.target.value });
  }

  changeStatus(event){
    this.setState({ status: event.target.value });
  }
  
  changenumeroPedido(event){
    this.setState({ numeroPedido: event.target.value });
  }

  changeProdutos(event){
    let arr = []
    event.forEach(prod => {
      arr.push({
        label: prod.value,
        value: prod.value
      });
    })
    this.setState({ selectedProdutos: arr });
  }
  
  async carregaDados(){
    const { data: produtos } = await axios.get(URL+'crudprodutos');
    let produtosMulti = [];
    produtos.forEach(produto => {
      produtosMulti.push({
        label: produto.nome,
        value: produto.nome
      })
    });
    this.setState({ produtos: produtosMulti })
    const { data: pedidos } = await axios.get(URL+'crudpedidos');
    this.setState({
      id:'',  
      nomeCliente: '', 
      numeroPedido: '',
      email: '', 
      status: 'Em Aberto',
      selectedProdutos: [],
      statusList: [
        { id: 'Em Aberto', text: 'Em Aberto'}, 
        { id: 'Pago', text: 'Pago'}, 
        { id: 'Cancelado', text: 'Cancelado'}
      ], 
      list: pedidos,
      botao: 'Adicionar'
    });
  }

  botaoPedido(){
    if(this.validateForm()){
      let prods = [];
      this.state.selectedProdutos.forEach(aux =>{
        prods.push(aux.value);
      });
      prods = prods.join(",");
      if(this.state.botao === 'Adicionar'){
        axios.post(URL+'cadastroPedido', null, { params: {
          nomeCliente: this.state.nomeCliente,
          numeroPedido: this.state.numeroPedido,
          email: this.state.email,
          produtos: prods,
          status: this.state.status,
          botao: 'Adicionar'
        }}).then(resp => this.carregaDados());
      } else {
        axios.put(URL+'atualizaPedido', null, { params: {
          id_pedido: this.state.id_pedido,
          nomeCliente: this.state.nomeCliente,
          numeroPedido: this.state.numeroPedido,
          email: this.state.email,
          produtos: prods,
          status: this.state.status
        }}).then(resp => this.carregaDados());
      }
    }
  }

  deletaPedido(pedido){
    axios.delete(URL+'deletaPedido', { params: {
      id_pedido: pedido.id_pedido
    }}).then(resp => this.carregaDados());
  }

  updatePedido(pedido){
    let prods = [];
    let aux = pedido.produtos.split(",");
    aux.forEach(a => {
      prods.push({
        label: a,
        value: a
      })
    })
    this.setState({
      id_pedido: pedido.id_pedido,
      nomeCliente: pedido.nomeCliente,
      numeroPedido: pedido.numeroPedido,
      email: pedido.email,
      selectedProdutos: prods,
      status: pedido.status,
      botao: 'Atualizar'
    })
  }

  validateForm(){
    if(this.state.nomeCliente === "" || this.state.numeroPedido === "" || this.state.email === "" || this.state.status === ""){
      alert("Favor preencher todos os campos");
      return false;
    }
    return true;
  }

  render(){
    return (
      <div className='container crud-pedidosCompra '>
          <Pageheader name="Pedidos de Compras" small="Manutenção"></Pageheader>
          <Grid>
            <Input value={this.state.nomeCliente} onChange={this.changeNomeCliente} type="text" col="col-6" label="Nome do Cliente" placeholder="Digite o nome do cliente"></Input>
            <Input value={this.state.email} onChange={this.changeEmail} type="text" col="col-6" label="Email" placeholder="Digite o email"></Input>
            <Input value={this.state.numeroPedido} onChange={this.changenumeroPedido} type="text" col="col-4" label="Número do Pedido" placeholder="Digite o número do pedido"></Input>
            <Select value={this.state.status} onChange={this.changeStatus} list={this.state.statusList} col="col-4" label="Status"></Select>
            <div className='col-4'>
              <label htmlFor="">Produtos</label>
              <MultiSelect onChange={this.changeProdutos} value={this.state.selectedProdutos} options={this.state.produtos}></MultiSelect>
            </div>
            <Button col="col-3" classes="btn btn-primary" texto={this.state.botao} onClick={this.botaoPedido}></Button>
          </Grid>
          <TablePedidos update={this.updatePedido} delete={this.deletaPedido} list={this.state.list}></TablePedidos>
      </div>
    )
  }
}  