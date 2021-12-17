<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group mb-3">
        <label for="clientName">Client Name</label>
        <input
          type="text"
          class="form-control"
          id="clientName"
          required
          v-model="order.clientName"
          name="clientName"
        />
      </div>

      <div class="form-group mb-3">
        <label for="orderNumber">Order Number</label>
        <input
          type= "number"
          class="form-control"
          id="orderNumber"
          required
          v-model="order.orderNumber"
          name="orderNumber"
        />
      </div>

      <div class="form-group mb-3">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="order.email"
          name="email"
        />
      </div>

      <div class="form-group mb-3">
        <label for="status">Status</label>
          <select 
            class="form-select" 
            id="status" 
            name="status" 
            v-model="order.status"
          >
              <option value="" disabled selected>Please choose an option</option>
              <option value="1">opened</option>
              <option value="2">paid</option>
              <option value="3">canceled</option>
          </select>
      </div>

      <div class="form-group mb-3">
        <label for="productId">Product ID</label>
        <input
          type="text"
          class="form-control"
          id="productId"
          v-model="order.productId"
          name="productId"
        />
      </div>     
      

      <button @click="saveOrder" class="btn btn-success py-1 px-3">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newOrder">Add a new order</button>
    </div>
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  name: "addorder",
  data() {
    return {
      order: {
        id: null,
        clientName: "",
        orderNumber: "",
        email:"",
        status:"",
        productId:"",
      },
      submitted: false
    };
  },
  methods: {
    saveOrder() {
      var data = {
        clientName: this.order.clientName,
        orderNumber: this.order.orderNumber,
        email: this.order.email,
        status: this.order.status,
        productId: this.order.productId,
      };

      OrderDataService.create(data)
        .then(response => {
          this.order.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newOrder() {
      this.submitted = false;
      this.order = {};
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