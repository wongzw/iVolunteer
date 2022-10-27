<template>
  <div>
    <header class="app-header">
      <Navbar />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Cabin");
@import url("https://fonts.googleapis.com/css?family=Poppins");
@import url("https://fonts.googleapis.com/css?family=Mulish");

#app {
  font-family: "Cabin", "Mulish", "Poppins";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #020957;
  background-color: #fef8f3;
  min-height: 100vh;
  overflow: hidden;
}
</style>






