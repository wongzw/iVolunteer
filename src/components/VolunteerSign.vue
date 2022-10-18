<template>
  <img style="margin-top: 2vh" alt="Logo of IVolunteer" src="../assets/ivolunteer_logo.svg" />
  <div class="box">
    <a-form id="formSignUp" class="user-layout-signup" ref="formSignup" @submit.prevent="signUp">
      <h1 id="signUpHeader" style="font-weight: 900">Sign Up</h1>
      <a-form-item class="form">
        <label class="formSignUp">Full Name</label><br />
        <a-input style="width: 60%; margin-bottom: 10px" class="input" type="text" v-model:value="fullName"
          placeholder="Enter your full name"></a-input>
        <label class="formSignUp">Email</label><br />
        <a-input style="width: 60%; margin-bottom: 10px" class="input" type="email" v-model:value="email"
          placeholder="Enter your email"></a-input>
        <label class="formSignUp">Password</label><br />
        <a-input-password style="width: 60%; height: 35px; margin-bottom: 10px" v-model:value="password"
          placeholder="Enter your password" />
        <label class="formSignUp">Confirm Password</label><br />
        <a-input-password style="width: 60%; height: 35px; margin-bottom: 10px" v-model:value="passwordConfirmation"
          placeholder="Re-enter your password" />
        <label class="formSignUp">Interests</label><br />
        <a-select v-model:value="interests" mode="tags" style="width: 60%; height: 35px; margin-bottom: 40px"
          :token-separators="[',']" placeholder="Press tab to add another interest"></a-select>
        <div id="ant-button">
          <a-button htmlType="submit" class="signUp" size="large" type="primary" danger>Sign Up</a-button>
        </div>
      </a-form-item>
    </a-form>
    <GoogleButton style="width:60%" @click="googleSignIn" />
  </div>
  <div id="box2" class="box"> Already have an account? <a style="color: #5A4FF3" @click="reroute()">Log in.</a></div>
</template>
  
<script>
/* eslint-disable */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import GoogleButton from "./GoogleButton.vue";
const auth = getAuth();
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

export default {
  name: "VolunteerSign",
  components: {
    GoogleButton
  },
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      interests: [],
      skills: []
    };
  },
  methods: {
    reroute() {
      this.$router.push({ path: '/login', replace: true })
    },
    async createDb(oid) {
      await setDoc(doc(db, "users", oid), {
        fullName: this.fullName,
        interests: this.interests,
        skills: this.skills,
        hoursVolunteered: 0,
        userLevel: 0,
        userExp: 0,
        noShowNum: 0,
        userAppliedEvents: [],
        userAcceptedEvents: [],
        userAttendedEvents: [],
        userBadges: {},
        userRewards: {}
      });
    },
    finalise(user) {
      this.createDb(user.uid);
      this.$store.commit('updateVolunteer', user);
      alert("Registration Success!")
      this.$router.push('/volunteer');
    },
    signUp() {
      if (this.password == "") {
        alert("Password not filled in")
      } else if (this.passwordConfirmation == "") {
        alert("Confirm Password not filled in")
      } else if (this.password != this.passwordConfirmation) {
        alert('Passwords do not match')
      } else {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
              alert("Account Exist, please login instead!")
            } else {
              alert("Unable to create account, please try again!")
            }
          })
      }
    },
    googleSignIn() {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
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
  margin-bottom: 5%;
  text-align: center;
  padding-top: -30px;
  height: 10px;
  vertical-align: middle;
  font-weight: bold;
  line-height: 5px
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

div.box {
  overflow: scroll;
}
</style>

  

  