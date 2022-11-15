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
          style="width: 80%; margin-bottom: 30px"
          v-model:value="orgName"
          placeholder="Enter your Organisation Name"
        ></a-input>
        <label class="fontLogin">Organisation Profile Photo</label><br />
        <div class="fontLogin">
          <input
            type="file"
            name="file"
            style="width: 80%; margin-bottom: 30px"
            @change="previewFile"
          />
        </div>
        <br />
        <label class="fontLogin">Organisation Type</label><br />
        <a-select
          required
          v-model:value="orgType"
          mode="tags"
          style="width: 80%; height: 50%; margin-bottom: 80px"
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
            >Continue to Profile
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
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { h } from "vue";

export default {
  name: "OrgOnboard",
  data() {
    return {
      orgName: "",
      orgType: [],
      photoUrl: "",
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
      if (this.orgType.length == 0 || this.file == null) {
        this.formValidError("Please field in all fields!");
      } else {
        this.updateDb(this.$store.state.id);
      }
    },
    async updateDb(oid) {
      const storage = getStorage();
      const storageRef = ref(storage, "Organisation photos/" + this.file.name);
      uploadBytes(storageRef, this.file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          this.photoUrl = downloadURL;
          const orgRef = doc(db, "organisation", oid);
          updateDoc(orgRef, {
            orgName: this.orgName,
            orgType: this.orgType,
            photoUrl: this.photoUrl,
          });
        });
        this.$router.push({ path: "/organisation/profile", replace: true });
      });
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
  margin-left: 20%;
  margin-right: 20%;
  padding-top: 30px;
  padding-bottom: 30px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
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
  margin-left: 10%;
  display: flex;
  align-items: flex-start;
  font-weight: bold;
  margin-bottom: -10px;
  margin-top: 10px;
  font-size: 15px;
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

.register {
  width: 60%;
  margin-bottom: -5px;
  background-color: #ff5b2e;
  border-color: #ff5b2e;
  border-radius: 5px;
}

.register:hover {
  background-color: #ff3700;
  border-color: #ff3700;
}

.register:focus {
  background-color: #ff5b2e;
  border-color: #ff5b2e;
}
</style>
  
  