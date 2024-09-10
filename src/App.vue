<template>
  <div id="app">
    <ManagerProjects />
  </div>
</template>

<script>
import ManagerProjects from './components/Admin/ManagerProjects.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

export default {
  name: 'App',
  components: {
    ManagerProjects
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
