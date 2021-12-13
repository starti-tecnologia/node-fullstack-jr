<template>
	<v-app>
		<div class="novo-pedido">
			<div class="botao-nav">
				<router-link :to="{name: 'NovoPedido', params: {id:'semId', isEdit: false}}">
					<v-btn class="btn-novo-pedido" depressed color="#00771A">
						<v-icon> mdi-plus </v-icon>
						<span>Novo Pedido</span>
					</v-btn>
				</router-link>
			</div>
		</div>
		<div class="tabela-pedidos">
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-center">Nº Pedido</th>
							<th class="text-center">Cliente</th>
							<th class="text-center">Email</th>
							<th class="text-center">Status</th>
							<th class="text-center"></th>
							<th class="text-center"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="ped in pedidos" :key="ped.id">
							<td>{{ ped.num_pedido }}</td>
							<td>{{ ped.nome_cliente }}</td>
							<td>{{ ped.email }}</td>
							<td>{{ ped.status }}</td>
							<td>
								<DialogDeletarPedido :pedidoIn="ped" />
								
									<router-link
									
									:to="{name: 'NovoPedido', params: {id: ped.num_pedido, isEdit: true}}"
									>
										<v-btn icon color="black">
											<v-icon> mdi-pencil-outline </v-icon>
										</v-btn>
									</router-link>
								
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
	</v-app>
</template>

<script>
	import pedidosController from "../../services/PedidosService";
	import DialogDeletarPedido from "../../components/pedidos/DialogDeletarPedido.vue";

	export default {
		components: {
			DialogDeletarPedido,
		},

		data() {
			return {
				pedido: {
					nome: null,
					valor_unitario: null,
					quantidade: null,
				},
				carregando: true,
				pedidos: [],
			};
		},
		mounted() {
			pedidosController
				.buscarTodosPedidos()
				.then((res) => res.data)
				.then((data) => {
					this.pedidos = data;
					this.carregando = false;
				})
				.catch((err) => alert(err));
		},
	};
</script>

<style>
	a{
		text-decoration: none;
	}
	.tabela-pedidos {
		margin: 0 18%;
	}

	.novo-pedido {
		display: flex;
		flex-direction: row;
		justify-content: end;
		margin: 0 20%;
	}

	.btn-novo-pedido span {
		color: white;
	}
</style>