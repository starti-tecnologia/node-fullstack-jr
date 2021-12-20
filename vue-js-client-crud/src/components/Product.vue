<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>Product</h4>
    <form>
      <div class="form-group mb-3">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentProduct.name"
        />
      </div>
      <div class="form-group mb-3">
        <label for="unitaryValue">Unitary value (R$)</label>
        <input type="number" class="form-control" id="unitaryValue"
          v-model="currentProduct.unitaryValue"
        />
      </div>
      <div class="form-group mb-3">
        <label for="quantity">Quantity</label>
        <input type="number" class="form-control" id="quantity"
          v-model="currentProduct.quantity"
        />
      </div>

    </form>

    <button class="btn btn-danger mt-3 me-2 px-4"
      @click="deleteProduct"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-success mt-3 me-2 px-4"
      @click="updateProduct"
    >
      Update
    </button>
    <p class="mt-5 text-center">{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      message: ''
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.get(id)
        .then(response => {
          this.currentProduct = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
          alert("Error: 404 - Not Found")
        });
    },

    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
        .then(response => {
          console.log(response.data);
          this.message = 'The product was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "products" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getProduct(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>