<template>
  <HeaderComponent />
  <div id="app">
    <router-view />
  </div>
  <FooterComponent />
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
@import "../src/assets/fonts/icomoon/style.css"; /* Import icon fonts */
/* @import '../src/assets/css/owl.carousel.min.css';  Import Owl Carousel */
@import "../src/assets/css/bootstrap.min.css"; /* Import Bootstrap */
@import "../src/assets/css/style.css"; /* Import Main CSS */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
  height: 100vh;
}

</style>
