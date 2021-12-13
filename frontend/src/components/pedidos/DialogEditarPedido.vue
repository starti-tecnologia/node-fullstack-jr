<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon color="black" v-bind="attrs" v-on="on">
				<v-icon> mdi-pencil-outline </v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="text-h5">Editar Pedido</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-row>
							<v-col cols="6" sm="6" md="6">
								<v-text-field
									v-model="pedido.nome_cliente"
									:rules="pedidoRules"
									label="Nome do cliente"
									required
								></v-text-field>
							</v-col>

							<v-col cols="3">
								<v-text-field
									v-model="pedido.email"
									:rules="pedidoRules"
									label="Email"
									required
								></v-text-field>
							</v-col>

							<v-col cols="3" v-show="pedidoIn.status == 'em aberto'">
								<v-text-field
									v-model="pedido.status"
									:rules="pedidoRules"
									label="Status"
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
				<v-btn color="blue darken-1" text @click="editarPedido">
					Salvar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import pedidosController from "../../services/PedidosService";
	export default {
		props: {
			pedidoIn: Object,
		},

		data() {
			return {
				pedidoRules: [(v) => !!v || "Campo obrigatório"],
				valid: true,
				pedido: {
					nome_cliente: null,
					email: null,
                    produtos: null,
					status: null,
				},
				dialog: false,
			};
		},
		methods: {
			editarPedido() {
				var valido = this.$refs.form.validate();
				if (valido) {
					pedidosController
						.editarPedido(this.pedidoIn.num_pedido, this.pedido)
						.then(() => {
							this.dialog = false;
							location.reload();
						})
						.catch((err) => console.log(err));
				}
			},
		},
		mounted(){
            this.pedido = { ...this.pedidoIn };
        }
	};
</script>