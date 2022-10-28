<template>
  <div class="navbar"><TheNavbar /></div>

  <div class="block"></div>
  <div class="flexbox" v-if="rendered">
    <div class="side-bar">
      <TheSidebar />
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
  <div class="the-footer">
    <TheFooter />
  </div>
</template>
  
<script>
import TheFooter from "@/components/global/TheFooter.vue";
import TheNavbar from "@/components/global/TheNavbar.vue";
import TheSidebar from "@/components/volunteer/TheSidebar.vue";
import { db } from "../../firebase.js";
import { getDoc, doc } from "firebase/firestore";

export default {
  name: "OrgShell",
  components: { TheFooter, TheNavbar, TheSidebar },
  data() {
    return {
      rendered: false,
    };
  },
  async mounted() {
    var docRef = doc(db, "users", this.$store.state.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.$store.state.details = docSnap.data();
      console.log(docSnap.data());
      this.rendered = true;
    }
  },
};
</script>


<style scoped>
.block {
  height: 68px;
  width: 100%;
}

.navbar {
  height: 7vh;
  min-height: 50px;
}

.flexbox {
  display: flex;
  height: 80vh;
}

.the-footer {
  bottom: 0;
  height: 25vh;
  min-height: 150px;
}

.flexbox .side-bar {
  width: 20vw;
  margin-right: 50px
}

.flexbox .router-view {
  width: 75vw;
  height: 62vh;
}
</style>