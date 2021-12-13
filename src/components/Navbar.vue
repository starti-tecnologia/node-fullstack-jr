<template>
  <v-app id="nav">
    <v-app-bar class="d-flex" density="compact" color="#E3F2FD">

      <v-app-bar-title>
          <img id="img-navBar" :src="logoImage" width="180" height="90"/>
      </v-app-bar-title>
  
      <v-spacer></v-spacer>

     
        <div id="botaoNav" color="#E3F2FD">
           <router-link to="/pedidos">  Pedidos  </router-link>
        </div>
     
      

      <div id="botaoNav" color="#E3F2FD">
           <router-link to="/produtos">  Produtos  </router-link>
        </div>
     
    </v-app-bar>
  </v-app>
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


<style >
#nav{
  height: 10vh;
}
#botaoNav{
  display: flex;
  padding: 2%;
}
#img-navBar{
  display: flex;
}

</style>

