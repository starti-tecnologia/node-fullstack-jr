<template>
  <div>
    <v-app-bar height="30" dense color="#E3F2FD" class="top-nav" fixed>
    <img
      width="auto"
      height="50"
      :src="logoImage"
    />
    <v-spacer></v-spacer>

      <div class="botao-nav" >
        <router-link to="/">  Produtos  </router-link>
      </div>

      <div class="botao-nav" >
        <router-link to="/pedidos">  Pedidos  </router-link>
      </div>

     
     
  </v-app-bar>
  </div>
</template>


<script>

import logoImage from '../assets/logoStarti.svg';

export default{
    data: () => {
       return{
           logoImage
       }
    },
    methods: {
    }
}

</script>


<style>
.botao-nav{
  display: flex;
  padding: 2%;
  font-size: 12px;
}

.botao-nav a {
    color: black !important;
    text-decoration: none;
}


.img-navBar{
  display: flex;
}
</style>

