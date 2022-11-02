<template>
    <a-layout-content class="a-content"
      ><router-view></router-view
    ></a-layout-content>
    <a-layout-footer class="a-footer"><TheFooter /></a-layout-footer>
</template>
  
<script>
import TheFooter from "@/components/global/TheFooter.vue";
export default {
  name: "OrgShell",
  components: { TheFooter },
};
</script>


<style scoped>
.a-content {
  margin-bottom: 0px;
}
.a-footer {
  padding: 0px 0px 0px 0px;
  height: 25%;
  width: 100%;
  margin-top: 5%;
}

.a-layout {
  height: 100vh;
}
</style>