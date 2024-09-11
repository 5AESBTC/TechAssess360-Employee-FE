<template>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
  </head>
  <div>
    <HeaderComponent/>
  </div>
  <div id="app">
    <AssessPage />
  </div>
  <div>
    <FooterComponent/>
  </div>
</template>

<script>
import AssessPage from './components/AssessPage.vue';
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    AssessPage,
    HeaderComponent,
    FooterComponent
  }
};
</script>

<style>
#app {
  font-family:Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
