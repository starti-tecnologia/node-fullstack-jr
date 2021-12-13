<template>
	<v-app>
		<div class="novo-produto">
			<DialogProduto :produtoIn="produto" />
		</div>
		<div class="tabela-produtos">
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
								<DialogDeletarProduto :produtoIn="prod" />
								<DialogEditarProduto :produtoIn="prod" />
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
	</v-app>
</template>

<script>
	import produtosController from "../services/ProdutosService";
	import DialogProduto from "../components/produtos/DialogProduto.vue";
	import DialogEditarProduto from "../components/produtos/DialogEditarProduto.vue";
	import DialogDeletarProduto from "../components/produtos/DialogDeletarProduto.vue";
	export default {
		components: {
			DialogProduto,
			DialogEditarProduto,
			DialogDeletarProduto,
		},

		data() {
			return {
				produto: {
					nome: null,
					valor_unitario: null,
					quantidade: null,
				},
				carregando: true,
				produtos: [],
			};
		},
		mounted() {
			produtosController
				.buscarTodosProdutos()
				.then((res) => res.data)
				.then((data) => {
					this.produtos = data;
					this.carregando = false;
				})
				.catch((err) => console.log(err.message));
		},
	};
</script>

<style>
	.tabela-produtos {
		margin: 0 20%;
	}

	.novo-produto {
		display: flex;
		flex-direction: row;
		justify-content: end;
		margin: 0 20%;
	}

	.btn-novo-produto span {
		color: white;
	}
</style>