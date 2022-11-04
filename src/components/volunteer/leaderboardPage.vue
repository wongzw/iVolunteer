<template>
  <div class="header">
    <h1><b>Leaderboard</b></h1>
  </div>

  <div class="leaderboardTable">
    <a-table :columns="this.columns" :data-source="this.userData"> </a-table>
  </div>
</template>

<script>
import { collection, query, where } from "firebase/firestore";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

export default {
  name: "leaderboardPage",
  data() {
    return {
      userData: [],
      columns: [
        // rank, user, level, experience
        {
          title: "Name",
          name: "User",
          dataIndex: "User",
          key: "User",
        },
        {
          title: "Level",
          name: "Level",
          dataIndex: "Level",
          key: "Level",
          sorter: {
            compare: (a, b) => a.Level - b.Level,
            multiple: 2,
          },
          sortOrder: "descend",
        },
        {
          title: "Experience",
          name: "Experience",
          dataIndex: "Experience",
          key: "Experience",
          sorter: {
            compare: (a, b) => a.Experience - b.Experience,
            multiple: 1,
          },
          sortOrder: "descend",
        },
      ],
    };
  },
  mounted() {
    this.queryDB();
  },

  methods: {
    async queryDB() {
      const userRef = collection(db, "users");
      const userDocSnap = await getDocs(userRef);
      userDocSnap.forEach((doc) => {
        let data = doc.data();
        let userId = doc["id"];
        const userDataPop = {
          User: data["firstName"],
          Level: Math.floor(data["userExp"] / 1000),
          Experience: data["userExp"],
        };
        this.userData.push(userDataPop);
      });

      console.log(this.userData);
    },
  },
};
</script>

<style scoped>
.header h1 {
  padding-top: 30px;
  color: #020957;
  text-align: left;
  margin-bottom: 10px;
}

.leaderboardTable {
  background-color: #ffefe2;
  padding: 20px;
  margin-top: 10px;
}
</style>