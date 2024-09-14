<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <HeaderComponent v-if="$route.path !== '/login' "/>
    <main class="flex-grow-1 p-4">
      <router-view/>
    </main>
    <FooterComponent v-if="$route.path !== '/login' "/>
  </div>
</template>

<script>
import HeaderComponent from "./components/layout/HeaderComponent.vue";
import FooterComponent from "./components/layout/FooterComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}
</style>

<!--<style>-->
<!--@import "../src/assets/fonts/icomoon/style.css";-->
<!--/* Import icon fonts */-->
<!--/* @import '../src/assets/css/owl.carousel.min.css';  Import Owl Carousel */-->
<!--@import "../src/assets/css/bootstrap.min.css";-->
<!--/* Import Bootstrap */-->
<!--@import "../src/assets/css/style.css";-->
<!--/* Import Main CSS */-->

<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--  height: 100vh;-->
<!--}-->
<!--</style>-->
