import React, { Component } from 'react';
import Pageheader from '../../templates/pageHeader/Pageheader';
import Input from '../../templates/input/Input';
import Grid from '../../templates/grid/Grid';
import Button from '../../templates/button/Button';
import axios from 'axios';
import TableProdutos from '../../templates/tableProdutos/TableProdutos';
import './crudprodutos.css';

const URL = 'http://localhost:3333/';
export default class CRUDProdutos extends Component{
  constructor(props){
    super(props);
    this.state = { id:'', nome: '', quantidade: '', valor_unitario: '', list: [] };
    this.carregaDados = this.carregaDados.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeValor = this.changeValor.bind(this);
    this.changeQtd = this.changeQtd.bind(this);
    this.botaoProduto = this.botaoProduto.bind(this);
    this.deletaProduto = this.deletaProduto.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.validateForm = this.validateForm.bind(this);
    
    this.carregaDados();
  }

  async carregaDados(){
    const { data: produtos } = await axios.get(URL+'crudprodutos');
    this.setState({
      id: '',
      nome: '', 
      valor_unitario: '', 
      quantidade: '',
      list : produtos,
      botao: 'Adicionar'
    })
  }

  changeName(event){
    this.setState({ nome: event.target.value });
  }

  changeValor(event){
    this.setState({ valor_unitario: event.target.value });
  }

  changeQtd(event){
    this.setState({ quantidade: event.target.value });
  }

  botaoProduto(){
    if(this.validateForm()){
      if(this.state.botao === "Adicionar"){
      axios.post(URL+'cadastroProduto', null, { params: {
        nome: this.state.nome,
        valor_unitario: this.state.valor_unitario,
        quantidade: this.state.quantidade
        }}).then(resp => this.carregaDados());
      } else {
        axios.put(URL+'atualizaProduto', null, { params: {
          id: this.state.id,
          nome: this.state.nome,
          valor_unitario: this.state.valor_unitario,
          quantidade: this.state.quantidade
        }}).then(resp => this.carregaDados());
      }
    }
  }

  deletaProduto(produto){
    axios.delete(URL+'deletaProduto',{ params: {
        id: produto.id
    }}).then(resp => this.carregaDados());
  }

  updateProduto(produto){
    this.setState({
      id: produto.id,
      nome: produto.nome,
      valor_unitario: produto.valor_unitario,
      quantidade: produto.quantidade,
      botao: 'Atualizar'
    })
  }

  validateForm(){
    if(this.state.nome === "" || this.state.valor_unitario === "" || this.state.quantidade === ""){
      alert("Favor preencher todos os campos");
      return false;
    }
    return true;
  }

  render(){
    return (
      <div className='container crud-produtos'>
        <Pageheader name="Produtos" small="Manutenção"></Pageheader>
        <Grid>
          <Input value={this.state.nome} onChange={this.changeName} type="text" col="col-4" label="Nome" placeholder="Digite o nome do produto"></Input>
          <Input value={this.state.valor_unitario} onChange={this.changeValor} type="number" col="col-4" label="Valor Unitário" placeholder="Digite o valor do produto"></Input>
          <Input value={this.state.quantidade} onChange={this.changeQtd} type="number" col="col-4" label="Quantidade" placeholder="Digite a quantidade do produto"></Input>
          <Button col="col-3" classes="btn btn-primary ml-auto" texto={this.state.botao} onClick={this.botaoProduto}></Button>
        </Grid>
        <TableProdutos update={this.updateProduto} delete={this.deletaProduto} list={this.state.list}></TableProdutos>
      </div>
    )
  }
}