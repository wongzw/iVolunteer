<template>
  <div id="nav">
    <router-link to="/volunteer-login"></router-link> 
  </div>
  <router-view/>
</template>

<script>

export default {
    name: "App",
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #020957;
  min-height: 100vh;
  background-color: #FEF8F3
}

</style>
