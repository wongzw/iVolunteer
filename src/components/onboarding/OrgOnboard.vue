<template>
  <img
    style="margin-top: 2vh"
    alt="Logo of IVolunteer"
    src="../../assets/ivolunteer_logo.svg"
  />
  <div class="box">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      @submit.prevent="updateData"
    >
      <a-form-item>
        <h1 id="loginHeader" style="font-weight: 900">Onboarding</h1>
        <label class="fontLogin">Organisation Name</label><br />
        <a-input
          class="input"
          required
          style="width: 60%; margin-bottom: 10px"
          v-model:value="orgName"
          placeholder="Enter your Organisation Name"
        ></a-input>
        <label class="fontLogin">Organisation Type</label><br />
        <a-select
          required
          v-model:value="orgType"
          mode="tags"
          style="width: 60%; height: 50%; margin-bottom: 40px"
          :token-separators="[',']"
          placeholder="Press tab to add another interest"
          ><a-select-option value="Elderly" label="elderly"></a-select-option>
          <a-select-option value="Children" label="children"></a-select-option>
          <a-select-option value="Animal" label="animal"></a-select-option>
        </a-select>
        <div id="ant-button">
          <a-button
            htmlType="submit"
            class="register"
            size="large"
            type="primary"
            danger
            >Continue to Dashboard
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
  
  <script>
/* eslint-disable */
import { db } from "../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

export default {
  name: "OrgOnboard",
  data() {
    return {
      orgName: "",
      orgType: [],
    };
  },
  methods: {
    updateData() {
      if (this.orgType.length == 0) {
        alert("Please enter organisation type");
      } else {
        this.updateDb(this.$store.state.id);
        this.$router.push({ path: "/organisation", replace: true });
      }
    },
    async updateDb(oid) {
      const orgRef = doc(db, "organisation", oid);
      await updateDoc(orgRef, {
        orgName: this.orgName,
        orgType: this.orgType,
      });
    },
  },
};
</script>
  
  <style scoped>
.box {
  background-color: white;
  align-items: center;
  border-radius: 2px;
  margin-top: 2%;
  margin-left: 35%;
  margin-right: 35%;
  padding-top: 30px;
  padding-bottom: 30px;
  filter: drop-shadow(1px 1px 1px black);
}

#box2 {
  margin-top: 20px;
  text-align: center;
  padding-top: -30px;
  height: 10px;
  margin-bottom: 10%;
  vertical-align: middle;
  font-weight: bold;
  line-height: 5px;
}

.fontLogin {
  color: #020957;
  margin-left: 20%;
  display: flex;
  align-items: flex-start;
  font-weight: bold;
  margin-bottom: -10px;
}

#loginHeader {
  font-size: 40px;
  color: #020957;
}

#ant-button {
  margin-bottom: 10px;
}

.register {
  width: 60%;
  margin-bottom: -5px;
}

input:required:focus {
  border: 1px solid red;
  outline: none;
}
</style>
  >
  