<template>
	<v-app>
		<div class="area-total-novo-produto">
			<div class="form-cliente">
				<div class="form-novo-pedido">
					<v-card width="400px" elevation="0">
						<v-card-title v-show="!isEdit">
							<span class="text-h5">Novo Pedido</span>
						</v-card-title>
						<v-card-title v-show="isEdit">
							<span class="text-h5">Editar Pedido</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-form ref="form" v-model="valid" lazy-validation>
									<v-row>
										<div class="label-form">Nome do Cliente</div>
										<v-col cols="12" sm="12" md="12">
											<v-sheet
												outlined
												rounded
												shaped
												elevation="0"
												height="50px"
											>
												<v-text-field
													v-model="pedido.nome_cliente"
													:rules="pedidoRules"
													label=""
													required
												></v-text-field>
											</v-sheet>
										</v-col>
										<div class="label-form">Email</div>
										<v-col cols="12" sm="12" md="12">
											<v-sheet
												outlined
												rounded
												shaped
												elevation="0"
												height="50px"
											>
												<v-text-field
													v-model="pedido.email"
													:rules="pedidoRules"
													label=""
													required
												></v-text-field>
											</v-sheet>
										</v-col>
                                        <div class="label-form" v-show="isEdit && emAberto">Status</div>
                                            <v-col cols="12" sm="12" md="12">
											<v-sheet
												v-show="isEdit && emAberto"
												outlined
												rounded
												shaped
												elevation="0"
												height="50px"
											>
												<v-text-field
													v-show="isEdit && emAberto"
													v-model="pedido.status"
													:rules="pedidoRules"
													label=""
													required
												></v-text-field>
											</v-sheet>
                                            </v-col>
									</v-row>
								</v-form>
							</v-container>
						</v-card-text>
					</v-card>
				</div>
				.
			</div>
			<div class="lista-produtos">
				<div class="tabela-produtos">
					<v-virtual-scroll
						:bench="Object.keys(produtos).length"
						:items="produtos"
						height="350"
						item-height="64"
					>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-center">Produto</th>
										<th class="text-center">Valor (R$)</th>
										<th class="text-center">Em estoque</th>
										<th class="text-center"></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="prod in produtos" :key="prod.id">
										<td>{{ prod.nome }}</td>
										<td>{{ prod.valor_unitario }}</td>
										<td>{{ prod.quantidade }}</td>
										<td>
											<v-checkbox
												:name="prod.nome"
												type="checkbox"
												:value="prod"
												v-model="selecionados"
											>
											</v-checkbox>
										</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-virtual-scroll>
				</div>

				<div class="botoes-cancelar-salvar">
					<v-btn class="btn-cancelar" depressed color="#570000">
						<span>Cancelar</span>
					</v-btn>
					<v-btn
						v-show="!isEdit"
						class="btn-salvar"
						depressed
						color="#000231"
						@click="criarPedido"
					>
						<span>Salvar</span>
					</v-btn>
					<v-btn
						v-show="isEdit"
						class="btn-salvar"
						depressed
						color="#000231"
						@click="editarPedido"
					>
						<span>Confirmar</span>
					</v-btn>
				</div>
			</div>
		</div>
	</v-app>
</template>

<script>
	import produtosController from "../../services/ProdutosService";
	import pedidosController from "../../services/PedidosService";
	export default {
		props: {
            
        },
		data() {
			return {
                id: String,
            isEdit: Boolean,
                emAberto: true,
				valid: true,
				pedidoRules: [(v) => !!v || "Campo obrigatório"],
				pedido: {
					nome_cliente: null,
					email: null,
                    status: 'em aberto',
					produtos: [],
				},
				carregando: true,
				produtos: [],
				selecionados: [],
			};
		},
		methods: {
			criarPedido() {
				var valido = this.$refs.form.validate();
				Object.entries(this.selecionados).map(([key, value]) => {
					this.pedido.produtos.push(value.id);
					console.log(key);
				});
				this.pedido.produtos = JSON.stringify(this.pedido.produtos);
				console.log(this.pedido);
				if (valido) {
					pedidosController
						.criarPedido(this.pedido)
						.then(() => {
							alert("cadastrado com sucesso");
							this.$router.push({ name: "Pedidos" });
						})
						.catch((err) => {
							alert(err);
						});
				}
			},
			editarPedido() {
				var valido = this.$refs.form.validate();
				Object.entries(this.selecionados).map(([key, value]) => {
					this.pedido.produtos.push(value.id);
					console.log(key);
				});
				this.pedido.produtos = JSON.stringify(this.pedido.produtos);
				
				if (valido) {
                  console.log(this.pedido.status) 
					pedidosController
						.editarPedido(this.id, this.pedido)
						.then(() => {
							alert("Editado com sucesso");
							this.$router.push({ name: "Pedidos" });
						})
						.catch((err) => {
							alert(err);
						});
				}
			},
		},
		mounted() {
			this.id = this.$route.params.id
            this.isEdit = this.$route.params.isEdit
			produtosController
				.buscarTodosProdutos()
				.then((res) => res.data)
				.then((data) => {
					this.produtos = data;
					this.carregando = false;
				})
				.catch((err) => console.log(err.message));
            if (this.id != 'semId'){
                pedidosController.buscarPedido(this.id)
            .then(res => res.data)
            .then((data)=>{
                if (data[0].status != "em aberto"){
                    this.pedido.status = data[0].status
                    this.emAberto = false;
                }
            })
            .catch((err) => console.log(err.message))
            }
            
		},
	};
</script>

<style>
	.area-total-novo-produto {
		display: grid;
		grid-auto-columns: 1fr;
		grid-auto-rows: 1fr;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 0px 0px;
		grid-template-areas:
			"form-cliente lista-produtos"
			"form-cliente lista-produtos";
	}
	.label-form {
		color: black;
		padding-left: 12px;
	}
	.form-cliente {
		grid-area: form-cliente;
		padding: 5%;
	}
	.lista-produtos {
		grid-area: lista-produtos;
		padding-top: 5%;
	}
	.tabela-produtos {
		margin: 0 15%;
	}

	.novo-produto {
		display: flex;
		flex-direction: row;
		justify-content: end;
		margin: 0 20%;
	}

	.botoes-cancelar-salvar {
		padding-top: 20px;
		display: flex;
		justify-content: space-evenly;
	}
	.btn-cancelar span {
		color: white;
	}
	.btn-salvar span {
		color: white;
	}

	.v-application .rounded {
		border-radius: 4px !important;
		border: 1px solid;
	}
</style>