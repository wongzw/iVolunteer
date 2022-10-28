<template>
  <a-layout class="a-layout">
    <a-layout-header class="a-header"><TheNavbar /></a-layout-header>
    <a-layout class="a-content">
      <a-layout-sider class="a-sidebar" width="250"
        ><TheSidebar
      /></a-layout-sider>
      <a-layout-content class="a-main-content"
        ><router-view></router-view
      ></a-layout-content>
    </a-layout>
    <a-layout-footer class="a-footer"><TheFooter /></a-layout-footer>
  </a-layout>
</template>
  
<script>
import TheFooter from "@/components/global/TheFooter.vue";
import TheNavbar from "@/components/global/TheNavbar.vue";
import TheSidebar from "@/components/TheSidebar.vue";
export default {
  name: "OrgShell",
  components: { TheFooter, TheNavbar, TheSidebar },
};
</script>


<style scoped>
.a-layout {
  height: 100vh;
}

.a-header {
  height: 8%;
}

.a-content {
  margin-bottom: 0px;
  min-height: 90vh;
}

.a-sidebar {
  background-color: #ffefe2;
}

.a-main-content {
}

.a-footer {
  padding: 0px 0px 0px 0px;
  height: 25%;
  width: 100%;
}
</style>