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
        <label class="formSignUp">Profile Photo</label><br />
        <div class="formSignUp">
          <input type="file" name="file" @change="previewFile" />
        </div>
        <br />
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
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { h } from "vue";

export default {
  name: "VolOnboard",
  data() {
    return {
      firstName: "",
      lastName: "",
      photoUrl: "", 
      interests: [],
      skills: [],
    };
  },

  setup() {
    const formValidError = (msg) => {
      notification.open({
        message: "Error",
        description: msg,
        duration: 3,
        icon: () => h(ExclamationCircleOutlined, { style: "color: #ff3700" }),
      });
    };

    return {
      formValidError,
    };
  },

  methods: {
    updateData() {
      if (this.interests.length == 0 || this.skills.length == 0 || this.file == null) {
        this.formValidError("Please fill in all fields!");
      } else {
        this.updateDb(this.$store.state.id);
        this.$router.push({ path: "/volunteer/profile", replace: true });
      }
    },
    async updateDb(uid) {
      const storage = getStorage();
      const storageRef = ref(storage, "Volunteer photos/" + this.file.name);
      uploadBytes(storageRef, this.file).then( (snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          this.photoUrl = downloadURL;
          const volRef = doc(db, "users", uid);
          updateDoc(volRef, {
            firstName: this.firstName,
            lastName: this.lastName,
            photoUrl: this.photoUrl,
            interests: this.interests,
            skills: this.skills,
          });
        })
      })
    },
    previewFile(profile) {
      this.file = profile.target.files[0];
      console.log(this.file);
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
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
}

.signUp:hover {
  background-color: #ff3700;
  border-color: #ff3700;
}

.signUp:focus {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
}
</style>
  