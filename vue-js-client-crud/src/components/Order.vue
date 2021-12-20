<template>
  <div v-if="currentOrder" class="edit-form">
    <h4>Order</h4>
    <form>
      <div class="form-group mb-3">
        <label for="clientName">Client Name</label>
        <input type="text" class="form-control" id="clientName"
          v-model="currentOrder.clientName"
        />
      </div>
      <div class="form-group mb-3">
        <label for="orderNumber">Order Number</label>
        <input type="number" class="form-control" id="orderNumber"
          v-model="currentOrder.orderNumber"
        />
      </div>
      <div class="form-group mb-3">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email"
          v-model="currentOrder.email"
        />
      </div>
      <div class="form-group mb-3" v-if="currentOrder.status ==='opened'">
        <label for="status">{{`Status: ${currentOrder.status}`}}</label>
          <select 
            class="form-select" 
            id="status" 
            name="status" 
            v-model="currentOrder.status"
          > 
              <option value disabled="1">1 - opened</option>
              <option value="2">2 - paid</option>
              <option value="3">3 - canceled</option>
          </select>
      </div>

      <div class="form-group mb-3" v-else>
        <p>{{`Status: ${translateStatus(currentOrder.status)}, can't be modified`}}</p>
      </div>

      <div class="form-group mb-3">
        <label for="products">Products:</label>
        <ul>
          <li v-for="(item, index) in currentOrder.products" :key="index">{{`Product ID: ${item.id} - ${item.name}`}} </li>
        </ul>        
      </div>
    </form>

    <div class="btn-group btn-group-sm" role="group">
    <button class="btn btn-danger mt-3 me-2 px-4"
      @click="deleteOrder"
    >
      Delete Order
    </button>

    <button type="submit" class="btn btn-success mt-3 me-2 px-4"
      @click="updateOrder"
    >
      Update Order
    </button>
    </div>
    <p class="mt-5 text-center">{{ message }}</p>

<!-- adição da parte da relação -->

    <h4>Add a Product</h4>
    <form>
      <div class="form-group mb-3">
        <label for="productIdToAdd">Type the product Id to be added:</label>
        <input type="number" class="form-control" id="productIdToAdd" name="productId"
            v-model="productIdToAdd"
        />
        <button type="submit" class="btn btn-success mt-3 me-2 px-4"
          @click="addProduct"
        >
          Add
        </button>
      </div>
    </form>

    <h4>Remove a Product</h4>
    <form>
      <div class="form-group mb-3">
        <label for="productIdToRemove">Type the product Id to be removed:</label>
        <input type="number" class="form-control" id="productIdToRemove" name="productId"
            v-model="productIdToRemove"
        />
        <button type="submit" class="btn btn-danger mt-3 me-2 px-4"
          @click="removeProduct"
        >
          Delete
        </button>
      </div>
    </form>

  </div>

  <div v-else>
    <br />
    <p>Please click on a Order...</p>
    
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  name: "order",
 
  data() {
    return {
      currentOrder: null,
      message: '',
      productIdToRemove:"",
      productIdToAdd:"",      
    };
  },
  methods: {
    translateStatus(statusCode){
      console.log(statusCode)
      if (statusCode == 1 || statusCode == 'opened') {
        console.log(1)
        return "opened";
      }
      if (statusCode == 2|| statusCode == 'paid' ){
        console.log(2)
        return "paid"
      }if (statusCode == 3 || statusCode == 'canceled'){
        console.log(3)
        return "canceled"
      }
    },
    removeProduct (){
      const dataa = { productId: this.productIdToRemove }
      OrderDataService.removeProductFromOrder(this.currentOrder.id, dataa)
        .then(response => {
          console.log(response.data);
          this.message = 'The PRODUCT was removed successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    addProduct(){
      const data = {productId: this.productIdToAdd}
      OrderDataService.addProductToOrder(this.currentOrder.id, data)
        .then(response => {
          console.log(response.data);
          this.message = "Product added successfully";
        })
        .catch(e => console.log(e))
      
    },
    getOrder(id) {
      OrderDataService.get(id)
        .then(response => {
          this.currentOrder = response.data;
          console.log(response.data);
          
        })
        .catch(e => {
          console.log(e);          
          alert("Error: 404 - Not Found")
        });
    },
    getProductNames(productArr = this.currentOrder.products){
      for (let index in productArr){
        return productArr[index].name
      }
    },
    updateOrder() {
      OrderDataService.update(this.currentOrder.id, this.currentOrder)
        .then(response => {
          console.log(response.data);
          this.message = 'The order was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteOrder() {
      OrderDataService.delete(this.currentOrder.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "orders" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getOrder(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>