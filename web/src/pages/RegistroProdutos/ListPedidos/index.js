import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { FcEmptyTrash } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';

import { connect, useDispatch } from 'react-redux';

import {
  findAllPedidoRequest,
  deletePedidoRequest
} from '../../../store/modules/pedido/actions';
import { deleteProdutoRequest } from '~/store/modules/produto/actions';

import { Container } from './styles';

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

const ListPedidos = ({ pedidosList, handlerRemovePedido, handlerRemoveProduto }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onLoad() {
      dispatch(findAllPedidoRequest());
    }
    onLoad();
  }, [dispatch]);

  //formatção do preço do produto
  function currencyFormat(num) {
    if (num) {
      return (
        'R$' +
        parseFloat(num)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      );
    }
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">{row.name}
          </TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right" 
                    style={{ color: (row.status === 'em-aberto' && 'red') || 
                    (row.status === 'pago' && 'green') || 
                    (row.status === 'cancelado' && 'black')}}
        >
            {(row.status === 'em-aberto' && 'em-aberto') || 
             (row.status === 'pago' && 'Pago') || 
             (row.status === 'cancelado' && 'Cancelado')}
            </TableCell>
          <TableCell align="right">
            <button>
              <Link to={`/pedido/${row.id}`}>
                <BiEdit />
              </Link>
            </button>
          </TableCell>
          <TableCell align="right">
            <button
              onClick={(e) => handlerRemovePedido(e, row.id)}>
              <FcEmptyTrash />
            </button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Produtos
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name </TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell align="right">Quantidade</TableCell>
                      <TableCell align="center">Editar</TableCell>
                      <TableCell align="center" color="#fff">Excluir</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {[].concat(row.produto).map((produtos, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">{produtos.name}</TableCell>
                      <TableCell>{currencyFormat(produtos.valor)}</TableCell>
                      <TableCell  align="right">{produtos.quantidade}</TableCell>
                      <TableCell align="right">
                        <button>
                          <Link to={`/produto/${produtos.id}`}>
                            <BiEdit />
                          </Link>
                        </button>
                      </TableCell>
                      <TableCell align="right">
                        <button
                          onClick={(e) => handlerRemoveProduto(e, produtos.id)}>
                          <FcEmptyTrash />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Container>
      <div className="header-list">
        <form className="form-table">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Nome Cliente</TableCell>
                    <TableCell align="right">Email Cliente</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Excluir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {[].concat(pedidosList).map((pedidos, i) => (
                    <Row key={i} row={pedidos} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>        
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    pedidosList: state.pedido.pedidosList ? state.pedido.pedidosList : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlerRemoveProduto: async (e, id) => {
      e.preventDefault();
      const confirm = window.confirm(
        'Tem certeza que deseja remover esse pedido?'
      );
      if (confirm) {
        dispatch(deleteProdutoRequest(id));
      }
    },
    handlerRemovePedido: async (e, id) => {
      e.preventDefault();
      const confirm = window.confirm(
        'Tem certeza que deseja remover esse parcela?'
      );
      if (confirm) {
        dispatch(deletePedidoRequest(id));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPedidos);
