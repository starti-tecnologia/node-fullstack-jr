<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="#" class="navbar-brand ms-md-5">Logo</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/products" class="nav-link">products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add Product</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/orders" class="nav-link">Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addorder" class="nav-link">Add Order</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>