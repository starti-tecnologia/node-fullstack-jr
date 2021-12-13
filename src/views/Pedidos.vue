<template>
  <v-app>
    <v-container>
      <div v-if="carregando">
        carregando
      </div>
      <div v-else>
        <v-card 
        class="mx-auto"
        max-width="fit-content"
        tile>
          <v-list>
            <v-list-item-group>
              <v-list-item  >
                <v-list-item-content>
                  <div  v-for="pedido in pedidos" :key="pedido.num_pedido">
                      <v-row justify="center" >
                        <v-list-item-title >Nº Pedido: {{pedido.num_pedido}} </v-list-item-title>
                        <v-list-item-title >Cliente: {{pedido.nome_cliente}} </v-list-item-title>
                        <v-list-item-title >Email: {{pedido.email}} </v-list-item-title>
                        <v-list-item-title >Status: {{pedido.status}}        </v-list-item-title>
                        <v-icon large @click="apagar(pedido.num_pedido)"> mdi-trash-can-outline </v-icon>
                        <v-row>
                          <v-dialog hide-overlay v-model="dialog" persistent max-width="fit-content">
                            <template v-slot:activator="{ on }">
                              <v-btn
                                flat
                                color="none"
                                v-on="on"
                              >
                                <v-icon large @click="editar()"> mdi-pencil-outline </v-icon>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title>
                                <span class="text-h5">Editar pedido</span>
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col>
                                      <v-text-field
                                        label="Nome do Cliente*"
                                      ></v-text-field>
                                    </v-col>
                                    
                                    <v-col cols="12">
                                      <v-text-field
                                        label="Email*"
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                      <v-text-field
                                        label="Produtos*"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialog = false" >
                                  Fechar
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="dialog = false">
                                  Salvar
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-row>
                        

                      </v-row>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import pedidosController from '../services/PedidosService';

export default {
  data(){
    return {
      dialog: false,
      carregando: true,
      pedidos: []
    }
  },
  methods: {
    apagar(id){
      pedidosController.deletarPedido(id)
      .then((res) => res)
      .then(location.reload())
      .catch(err => console.log(err))
      console.log("apagado");
    },
    editar(){
      console.log("edit");
    },
    close (name) {
        this.$refs[name].$emit('close')
        setTimeout(() => { this.active = false }, 500)
      }
  },
  mounted(){
    pedidosController.buscarTodosPedidos()
    .then((res) => res.data).
    then((data) =>{
       this.pedidos = data;
       this.carregando = false;
       })
    .catch(err => console.log(err.message))
  },
  
}

</script>

<style>

</style>
