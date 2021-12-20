<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Orders List</h4>
      <ul class="list-group ">
        <li class="list-group-item" style="cursor:pointer"                    
          :class="{ active: index == currentIndex }"
          v-for="(order, index) in orders"
          :key="index"
          @click="setActiveOrder(order, index)"
        >
          {{ ` ${order.orderNumber} - ${order.clientName}` }}
        </li>
      </ul>

      <button class="my-3 btn btn-sm btn-danger" @click="removeAllOrders">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentOrder">
        <h4>Order</h4>
        <div class="mb-2">
          <label><strong>Client Name:</strong></label> {{ currentOrder.clientName }}
        </div>
        <div class="mb-2">
          <label><strong>Order Number:</strong></label> {{ currentOrder.orderNumber }}
        </div>
        <div class="mb-2">
          <label><strong>Email:</strong></label> {{ currentOrder.email }}
        </div>
        <div class="mb-2">
          <label><strong>Status:</strong></label> {{ currentOrder.status }}
        </div>
        <div class="mb-2">
          <!-- <label><strong>products:</strong></label> {{ getProductNames(currentOrder.products)}} -->
        <label for="products">Products:</label>
        <ul>
          <li v-for="(item, index) in currentOrder.products" :key="index">{{`Product ID: ${item.id} - ${item.name}`}} </li>
        </ul>     
        </div>
        

        <a class=" btn btn-warning px-3 py-1"
          :href="'/orders/' + currentOrder.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Order...</p>
      </div>
    </div>
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  name: "orders-list",  
  data() {
    return {
      orders: [],
      currentOrder: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    getProductNames(productArr){
      for (let index in productArr){
        return productArr[index].name
      }
    },
    retrieveOrders() {
      OrderDataService.getAll()
        .then(response => {
          this.orders = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveOrders();
      this.currentOrder = null;
      this.currentIndex = -1;
    },

    setActiveOrder(order, index) {
      this.currentOrder = order;
      this.currentIndex = index;
    },

    removeAllOrders() {
      OrderDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
  },
  mounted() {
    this.retrieveOrders();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>