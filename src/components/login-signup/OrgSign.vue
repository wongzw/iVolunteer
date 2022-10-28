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
      @submit.prevent="register"
    >
      <a-form-item>
        <h1 id="loginHeader" style="font-weight: 900">Sign Up</h1>
        <label class="fontLogin">Email</label><br />
        <a-input
          class="input"
          required
          style="width: 60%; margin-bottom: 10px"
          type="email"
          v-model:value="email"
          placeholder="Enter your email"
        ></a-input>
        <label class="fontLogin">Password</label><br />
        <a-input-password
          required
          class="input"
          style="width: 60%; height: 35px; margin-bottom: 10px"
          v-model:value="password"
          minlength="8"
          placeholder="Enter your password"
        /><br />
        <label class="fontLogin">Confirm Password</label><br />
        <a-input-password
          style="width: 60%; height: 35px; margin-bottom: 40px"
          v-model:value="passwordConfirmation"
          placeholder="Re-enter your password"
        />
        <div id="ant-button">
          <a-button
            htmlType="submit"
            class="register"
            size="large"
            type="primary"
            danger
            >Get Started
          </a-button>
        </div>
      </a-form-item>
    </a-form>
    <GoogleButton style="width: 60%" @click="googleSignUp" />
  </div>
  <div id="box2" class="box">
    Already have an account?
    <a @click="reroute" style="color: #5a4ff3">Login.</a>
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
import { doc, setDoc, getDoc } from "firebase/firestore";
import GoogleButton from "./GoogleButton.vue";
import { notification } from "ant-design-vue";
import {
  SmileOutlined,
  RobotOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, h } from "vue";

const auth = getAuth();
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

export default {
  name: "OrgSign",
  components: {
    GoogleButton,
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },

  setup() {
    const success = () => {
      notification.open({
        message: "Success",
        description: "Registration Success!",
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
      this.$router.push("/login");
    },
    finalise(user) {
      this.createDb(user.uid);
      this.$store.commit("updateOrganisation", user);
      this.success();
      this.$router.push("/onboard/organisation");
    },
    async finaliseGoogle(user) {
      var docRef = doc(db, "organisation", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        this.finalise(user);
      } else {
        this.error("Account Exist, please login instead!");
      }
    },
    async createDb(oid) {
      const val = {
        orgName: "",
        orgType: [],
        events: [],
        badges: [],
      };
      this.$store.state.details = val;
      await setDoc(doc(db, "organisation", oid), val);
    },
    register() {
      if (this.password == "") {
        this.formValidError("Password not filled in");
      } else if (this.passwordConfirmation == "") {
        this.formValidError("Confirm Password not filled in");
      } else if (this.password != this.passwordConfirmation) {
        this.formValidError("Passwords do not match");
      } else {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
            this.finalise(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (
              errorMessage == "Firebase: Error (auth/email-already-in-use)."
            ) {
              this.error("Account Exist, please login instead!");
            } else {
              this.error("Unable to create account, please try again!");
            }
          });
      }
    },
    googleSignUp() {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          this.finaliseGoogle(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          this.error("Unable to create account, please try again!");
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
