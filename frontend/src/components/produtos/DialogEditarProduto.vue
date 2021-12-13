<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon color="black" v-bind="attrs" v-on="on">
				<v-icon> mdi-pencil-outline </v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="text-h5">Editar Produto</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-row>
							<v-col cols="6" sm="6" md="6">
								<v-text-field
									v-model="produto.nome"
									:rules="produtoRules"
									label="Nome do produto"
									required
								></v-text-field>
							</v-col>

							<v-col cols="3">
								<v-text-field
									v-model="produto.valor_unitario"
									:rules="produtoRules"
									label="Valor unitário"
									required
								></v-text-field>
							</v-col>

							<v-col cols="3">
								<v-text-field
									v-model="produto.quantidade"
									:rules="produtoRules"
									label="Em Estoque"
									required
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">
					Cancelar
				</v-btn>
				<v-btn color="blue darken-1" text @click="editarProduto">
					Salvar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import produtosController from "../../services/ProdutosService";
	export default {
		props: {
			produtoIn: Object,
		},

		data() {
			return {
				produtoRules: [(v) => !!v || "Campo obrigatório"],
				valid: true,
				produto: {
					nome: null,
					valor_unitario: null,
					quantidade: null,
				},
				dialog: false,
			};
		},
		methods: {
			editarProduto() {
				var valido = this.$refs.form.validate();
				if (valido) {
					produtosController
						.editarProduto(this.produtoIn.id, this.produto)
						.then(() => {
							this.dialog = false;
							location.reload();
						})
						.catch((err) => console.log(err));
				}
			},
		},
		watch: {
			produtoIn() {
				this.produto = { ...this.props.produtoIn };
				console.log(this.produto);
			},
		},
	};
</script>