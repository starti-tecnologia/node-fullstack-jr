<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group mb-3">
        <label for="name">Product Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="product.name"
          name="name"
        />
      </div>

      <div class="form-group mb-3">
        <label for="unitaryValue">Unitary value</label>
        <input
          type= "number"
          class="form-control"
          id="unitaryValue"
          required
          v-model="product.unitaryValue"
          name="unitaryValue"
        />
      </div>

      <div class="form-group mb-3">
        <label for="unitaryValue">Quantity</label>
        <input
          type="number"
          class="form-control"
          id="quantity"
          v-model="product.quantity"
          name="quantity"
        />
      </div>

      <button @click="saveProduct" class="btn btn-success py-1 px-3">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduct">Add</button>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "add-product",
  data() {
    return {
      product: {
        id: null,
        name: "",
        unitaryValue: "",
        quantity:"",
      },
      submitted: false
    };
  },
  methods: {
    saveProduct() {
      var data = {
        name: this.product.name,
        unitaryValue: this.product.unitaryValue,
        quantity: this.product.quantity
      };

      ProductDataService.create(data)
        .then(response => {
          this.product.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newProduct() {
      this.submitted = false;
      this.product = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>