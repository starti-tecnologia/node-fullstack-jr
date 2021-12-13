<template>

<div class="botao-nav">
<router-link to="/novopedido">
		<v-btn
			class="btn-novo-pedido"
			depressed
			color="#00771A"
			
		>
			<v-icon> mdi-plus </v-icon>
			<span>Novo Pedido</span>
		</v-btn>
	</router-link>
</div>
	
</template>

<script>
	import pedidosController from "../../services/PedidosService";
	export default {
		props: {
			pedidoIn: Object,
		},

		data() {
			return {
				isEdit: false,
				pedidoRules: [(v) => !!v || "Campo obrigatório"],
				valid: true,
				pedido: {
					nome: null,
					valor_unitario: null,
					quantidade: null,
				},
				dialog: false,
			};
		},
		methods: {
			criarPedido() {
				var valido = this.$refs.form.validate();
				if (valido) {
					pedidosController
						.criarPedido(this.pedido)
						.then(() => {
							this.dialog = false;
							location.reload();
						})
						.catch((err) => console.log(err));
				}
			},
			editarPedido() {
				var valido = this.$refs.form.validate();
				if (valido) {
					pedidosController
						.editarPedido(this.props.pedidoIn.id, this.pedido)
						.then(() => {
							this.dialog = false;
							location.reload();
						})
						.catch((err) => console.log(err));
				}
			},
		},
		watch: {
			pedidoIn() {
				this.pedido = { ...this.props.pedidoIn };
				console.log(this.pedido);
				this.isEdit = true;
			},
		},
	};
</script>