<template>
  <div>
    <header class="app-header">
      <Navbar/>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <Footer/>
  </div>
</template>

<script>

export default {
    name: "App",
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Cabin');

  #app {
    font-family: Cabin;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #020957;
    background-color: #FEF8F3;
  }

  body {
    background-color: #FEF8F3;
    min-height: 100vh;
  }
</style>






