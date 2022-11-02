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
      @submit.prevent="checkLogin"
    >
      <h1 id="loginHeader" style="font-weight: 900">Welcome Back!</h1>
      <a-form-item>
        <label class="fontLogin">Email</label><br />
        <a-input
          required
          style="width: 60%; margin-bottom: 10px"
          class="input"
          type="email"
          v-model:value="email"
          placeholder="Enter your email"
        ></a-input>
        <label class="fontLogin">Password</label><br />
        <a-input-password
          required
          style="width: 60%; height: 35px; margin-bottom: 10px"
          v-model:value="password"
          placeholder="Enter your password"
        /><br />
        <label class="fontLogin">Login Type</label><br />
        <a-select
          required="true"
          v-model:value="userType"
          style="width: 60%; margin-bottom: 35px"
        >
          <a-select-option disabled value="">-Select-</a-select-option>
          <a-select-option value="organisation">Organisation</a-select-option>
          <a-select-option value="volunteer">Volunteer</a-select-option>
        </a-select>
        <div id="ant-button">
          <a-button
            htmlType="submit"
            class="sign-in"
            size="large"
            type="primary"
            >Login</a-button
          >
        </div>
      </a-form-item>
    </a-form>
    <GoogleButton style="width: 60%" @click="googleSignIn" />
  </div>
  <div id="box2" class="box">
    New to iVolunteer? <a style="color: #5a4ff3" @click="reroute()">Sign up.</a>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { db } from "../../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import firebaseApp from "../../firebase.js";
import GoogleButton from "./GoogleButton.vue";
import { ref, defineComponent, h } from "vue";
import { notification } from "ant-design-vue";
import {
  SmileOutlined,
  RobotOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";

const auth = getAuth();
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

export default {
  name: "UserLogin",
  components: {
    GoogleButton,
  },
  data() {
    return {
      email: "",
      password: "",
      userType: "",
    };
  },

  setup() {
    const success = (msg) => {
      notification.open({
        message: "Welcome Back!",
        description: msg,
        duration: 3,
        icon: () => h(SmileOutlined, { style: "color: #020957" }),
      });
    };

    const error = (msg) => {
      notification.open({
        message: "Error",
        description: msg,
        duration: 3,
        icon: () => h(RobotOutlined, { style: "color: #ff3700" }),
      });
    };

    const formValidError = (msg) => {
      notification.open({
        message: "Error",
        description: msg,
        duration: 3,
        icon: () => h(ExclamationCircleOutlined, { style: "color: #ff3700" }),
      });
    };

    return {
      success,
      error,
      formValidError,
    };
  },

  methods: {
    reroute() {
      this.$router.push({ path: "/", replace: true });
    },
    checkLogin() {
      if (!this.userType) {
        this.formValidError("Please select user type!");
      } else {
        this.login();
      }
    },
    async finalise(user) {
      if (this.userType == "organisation") {
        var docRef = doc(db, "organisation", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.success("Successful Organisation Login!");
          this.$store.commit("updateOrganisation", user);
        } else {
          this.error("Something broke! Please try again!");
        }
      } else {
        var docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.success("Succesful Volunteer Login");
          this.$store.commit("updateVolunteer", user);
        } else {
          this.error("Something broke! Please try again!");
        }
      }
      location.reload();
    },
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Change this to check which user has login
          const user = userCredential.user;
          this.finalise(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.error("Unable to login, please try again! \n" + errorMessage);
          console.log(errorMessage);
        });
    },
    googleSignIn() {
      if (!this.userType) {
        this.formValidError("Please fill in user type!");
      } else {
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            this.finalise(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            this.error("Unable to login, please try again! \n" + errorMessage);
            console.log(errorMessage);
          });
      }
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
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
}

#box2 {
  margin-top: 20px;
  text-align: center;
  padding-top: -30px;
  height: 10px;
  vertical-align: middle;
  font-weight: bold;
  line-height: 5px;
  box-shadow: 0px 4px 10px rgba(60, 78, 100, 0.1);
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

.sign-in {
  width: 60%;
  margin-bottom: -5px;
  border-color: #ff734c;
  background-color: #ff734c;
  border-radius: 5px;
}
</style>>