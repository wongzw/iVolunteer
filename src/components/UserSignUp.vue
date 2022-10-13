<template>
  <img
    style="margin-top: 10vh"
    alt="Logo of IVolunteer"
    src="../assets/ivolunteer_logo.svg"
  />
  <div class="box">
    <a-form
      id="formSignUp"
      class="user-layout-signup"
      ref="formSignup"
      :form="form"
      @submit.prevent="signUp"
    >
      <h1 id="signUpHeader">Sign Up</h1>

      <a-form-item>
        <label class="formSignUp">Full Name</label><br />
        <a-input
          style="width: 60%; margin-bottom: 10px"
          class="input"
          type="text"
          v-model:value="fullName"
          placeholder="Enter your full name"
        ></a-input>
        <label class="formSignUp">Email</label><br />
        <a-input
          style="width: 60%; margin-bottom: 10px"
          class="input"
          type="email"
          v-model:value="email"
          placeholder="Enter your email"
        ></a-input>
        <label class="formSignUp">Password</label><br />
        <a-input-password
          style="width: 60%; height: 35px; margin-bottom: 10px"
          v-model:value="password"
          placeholder="Enter your password"
        />
        <label class="formSignUp">Confirm Password</label><br />
        <a-input-password
          style="width: 60%; height: 35px; margin-bottom: 10px"
          v-model:value="passwordConfirmation"
          placeholder="Re-enter your password"
        />
        <label class="formSignUp">Interests</label><br />
        <a-select
          v-model:value="interests"
          mode="tags"
          style="width: 60%; height: 35px; margin-bottom: 40px"
          :token-separators="[',']"
          placeholder="Press tab to add another interest"
        ></a-select>
        <div id="ant-button">
          <a-button
            htmlType="submit"
            class="signUp"
            size="large"
            type="primary"
            danger
            >Sign Up</a-button
          >
        </div>
      </a-form-item>
    </a-form>
    <GoogleButton style="width: 60%" @click="googleSignIn" />
  </div>
  <div id="box2" class="box">
    Already have an account?
    <a style="color: #5a4ff3" @click="reroute()">Log in.</a>
  </div>
</template>
  
  <script>
/* eslint-disable */
import { Alert } from "ant-design-vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import firebaseApp from "../firebase.js";
import { db } from "../firebase.js";
import GoogleButton from "./GoogleButton.vue";
const auth = getAuth();
auth.languageCode = "it";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
export default {
  name: "UserSignUp",
  components: {
    GoogleButton,
  },
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      interests: [],
    };
  },
  methods: {
    reroute() {
      this.$router.push({ path: "/volunteer/login", replace: true });
    },
    signUp() {
      if (this.password == "") {
        alert("Password not filled in");
      } else if (this.passwordConfirmation == "") {
        alert("Confirm Password not filled in");
      } else if (this.password != this.passwordConfirmation) {
        alert("Passwords do not match");
      } else {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (
              errorMessage == "Firebase: Error (auth/email-already-in-use)."
            ) {
              alert("Account Exist, please login instead!");
            } else {
              alert("Unable to create account, please try again!");
            }
          });
      }
    },
    googleSignIn() {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          this.$emit(user.id);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
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
  vertical-align: middle;
  font-weight: bold;
  line-height: 5px;
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
  