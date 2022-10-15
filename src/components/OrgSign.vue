<template>
    <img style="margin-top: 2vh" alt="Logo of IVolunteer" src="../assets/ivolunteer_logo.png" />
    <div class="box">
        <a-form id="formLogin" class="user-layout-login" ref="formLogin" @submit.prevent="register">
            <a-form-item>
                <h1 id="loginHeader" style="font-weight: 900">Sign Up</h1>
                <label class="fontLogin">Organisation Name</label><br />
                <a-input class="input" required style="width: 60%; margin-bottom: 10px" v-model:value="orgName"
                    placeholder="Enter your Organisation Name"></a-input>
                <label class="fontLogin">Email</label><br />
                <a-input class="input" required style="width: 60%; margin-bottom: 10px" type="email"
                    v-model:value="email" placeholder="Enter your email"></a-input>
                <label class="fontLogin">Password</label><br />
                <a-input-password required class="input" style="width: 60%; height: 35px; margin-bottom: 40px"
                    v-model:value="password" minlength="8" placeholder="Enter your password" /><br />
                <div id="ant-button">
                    <a-button htmlType="submit" class="register" size="large" type="primary" danger>Get Started</a-button>
                </div>
            </a-form-item>
        </a-form>
        <GoogleButton style="width: 60%" @click="googleSignIn" />
    </div>
    <div id="box2" class="box">
        Already have an account? <a @click="reroute" style="color: #5a4ff3">Login.</a>
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
import firebaseApp from "../firebase.js";
import GoogleButton from "./GoogleButton.vue";
const auth = getAuth();
auth.languageCode = "it";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default {
    name: "OrgSign",
    components: {
        GoogleButton,
    },
    data() {
        return {
            email: "",
            password: "",
            orgName: "",
        };
    },
    methods: {
        reroute() {
            this.$router.push({ path: "/organsation/login", replace: true });
        },
        register() {
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                const user = userCredential.user

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
                    alert("Account Exist, please login instead!")
                } else {
                    alert("Unable to create account, please try again!")
                }
                
            })
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

</style>>