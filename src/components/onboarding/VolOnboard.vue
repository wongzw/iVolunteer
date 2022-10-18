<template>
  <img
    style="margin-top: 2vh"
    alt="Logo of IVolunteer"
    src="../../assets/ivolunteer_logo.svg"
  />
  <div class="box">
    <a-form
      id="formSignUp"
      class="user-layout-signup"
      ref="formSignup"
      @submit.prevent="updateData"
    >
      <h1 id="signUpHeader" style="font-weight: 900">Onboarding</h1>
      <a-form-item class="form">
        <label class="formSignUp">First Name</label><br />
        <a-input
          style="width: 60%; margin-bottom: 10px"
          class="input"
          type="text"
          v-model:value="firstName"
          placeholder="Enter your full name"
        ></a-input>
        <label class="formSignUp">Last Name</label><br />
        <a-input
          style="width: 60%; margin-bottom: 10px"
          class="input"
          type="text"
          v-model:value="lastName"
          placeholder="Enter your last name"
        ></a-input>
        <label class="formSignUp">Interests</label><br />
        <a-select
          v-model:value="interests"
          mode="tags"
          style="width: 60%; height: 35px; margin-bottom: 10px"
          :token-separators="[',']"
          placeholder="Press tab to add another interest"
          ><a-select-option value="Elderly" label="elderly"></a-select-option>
          <a-select-option value="Children" label="children"></a-select-option>
          <a-select-option value="Animal" label="animal"></a-select-option>
        </a-select>
        <label class="formSignUp">Skills</label><br />
        <a-select
          v-model:value="skills"
          mode="tags"
          style="width: 60%; height: 35px; margin-bottom: 40px"
          :token-separators="[',']"
          placeholder="Press tab to add another skill"
          ><a-select-option value="Driving" label="driving"></a-select-option>
          <a-select-option value="Cooking" label="cooking"></a-select-option>
          <a-select-option value="Music" label="music"></a-select-option>
        </a-select>
        <div id="ant-button">
          <a-button
            htmlType="submit"
            class="signUp"
            size="large"
            type="primary"
            danger
            >Continue to Dashboard</a-button
          >
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
    
  <script>
/* eslint-disable */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { db } from "../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

export default {
  name: "VolOnboard",
  data() {
    return {
      firstName: "",
      lastName: "",
      interests: [],
      skills: [],
    };
  },
  methods: {
    updateData() {
      if (this.interests.length == 0 || this.skills.length == 0) {
        alert("Please fill in all fields!");
      } else {
        this.updateDb(this.$store.state.id);
        this.$router.push({ path: "/volunteer", replace: true });
      }
    },
    async updateDb(uid) {
      const volRef = doc(db, "users", uid);
      await updateDoc(volRef, {
        firstName: this.firstName,
        lastName: this.lastName,
        interests: this.interests,
        skills: this.skills,
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

.formSignUp {
  color: #020957;
  margin-left: 20%;
  display: flex;
  align-items: flex-start;
  font-weight: bold;
  margin-bottom: -10px;
}

#signUpHeader {
  font-size: 40px;
  color: #020957;
}

#ant-button {
  margin-bottom: 10px;
}

.signUp {
  width: 60%;
  margin-bottom: -5px;
}

</style>
  