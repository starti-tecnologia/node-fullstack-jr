import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  max-width: 1000px;
  margin-left: 182px;
  margin-top: -37px;

  footer {
    margin-top:30px;
    display:flex;
    justify-content:space-between;
    align-items:center;

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background .2s;
    }
  }
`;

export const ProductTable = styled.table`
  width:100%;

  thead th {
    color: #999;
    text-align:left;
    padding:12px;
  }

  tbody td {
    padding:12px;
    border-bottom: 1px solid #eee;
  }

  strong {
    color: #333;
    display:block;
  }

  span{
    display:block;
    font-size: 18px;
    font-weight: bold;
  }

  .box-button{
    display:flex;
    align-items:center;

    input{
      border: 1px solid #ddd;
      border-radius:4px;
      color:#666;
      padding:6px;
      width:50px;
    }
  }

  button {
    background:none;
    border:0;
    padding:6px;

    .mais {
      margin-left: 20px;
    }
  }
`


export const Total = styled.div`
  display:flex;
  align-items:baseline;

  span{
    color:#999;
    font-weight:bold;
  }

  strong{
    font-size:24px;
    margin-left: 5px;
  }
`
