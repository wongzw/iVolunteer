<template>
  <TheNavbar v-if="rendered" />
  <div class="block"></div>
  <div class="flexbox">
    <div class="router-view" v-if="rendered">
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
  components: { TheFooter, TheNavbar },
  data() {
    return {
      rendered: false,
    };
  },
  async mounted() {
    var docRef = doc(db, "organisation", this.$store.state.id);
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

.router-view {
  width: 100%;
}

.flexbox {
  display: flex;
}

.the-footer {
  bottom: 0;
}
</style>