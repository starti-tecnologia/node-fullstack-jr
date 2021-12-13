<template>
	<v-dialog v-model="dialog" persistent max-width="380">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" icon color="black">
				<v-icon> mdi-trash-can-outline </v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-card-title class="text-h5">
				Deseja deletar esse produto?
			</v-card-title>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="dialog = false">
					Cancelar
				</v-btn>
				<v-btn color="green darken-1" text @click="deletarProduto">
					Confirmar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import produtosController from "../../services/ProdutosService";

	export default {
		props: { produtoIn: Object },

		data() {
			return {
				dialog: false,
			};
		},

		methods: {
			deletarProduto() {
				produtosController
					.deletarProduto(this.produtoIn.id)
					.then(() => {
						this.dialog = false;
						location.reload();
					})
					.catch((err) => {
						alert("impossivel apagar produto relacionado a um pedido", err);
						this.dialog = false;
						
					});
                
			},
		},
	};
</script>