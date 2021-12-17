import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .header-main {
    background: none;
    width: 100%;
    max-width: 50rem;
    box-sizing: border-box;
    box-shadow: none;
    border-radius: 0.8rem;
    margin: 6rem auto 3.2rem;
    padding-top: 3rem;
    overflow: hidden;   

  input {
    font: 1rem Archivo;
    border-radius: 0.5rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
    border: 2px solid #8945de;
    font-weight: bold;
    color: #9c98a6;

  }

  select {  
    font: 1rem Archivo;
    border-radius: 0.5rem;
    width: 13.5rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
    border: 2px solid #8945de;
    font-weight: bold;
    color: #9c98a6;
  }

  .form-input {
    padding: 0 2.4rem;
    margin-top: 0.1rem;
   }
  }

    .salvar {
      background: none;
      border: 0;
      color: #9c98a6;
      font: 700 1.6rem Archivo;
      cursor: pointer;
      transition: color 0.2s;
      margin-top: 50px;

      &:hover {
        color: ${darken(0.03, '#9c98a6')};
        transform: scale(1.1);
        transition: all 0.5s;
      }
  }

  .header-title {

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 1fr;
    grid-template-areas:
        'campo1 campo2'
        'button button';

    .campo1 {
      grid-area: campo1;
      margin-left: 70px;
    }
    .campo2 {
      grid-area: campo2;
      margin-left: 70px;
    }
    .buttons-container {
      grid-area: button;
    } 


    label {
      font: 700 1.4rem Archivo;
      color: #8945de;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 1rem;
      margin-top: 0.5rem;
    }

`;
