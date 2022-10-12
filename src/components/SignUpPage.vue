<template>
    <img style="margin-top: 10vh" alt="Logo of IVolunteer" src="../assets/ivolunteer_logo.png" />
    <div class="box">
            <div id="welc-msg">
                <h1 id="signUpHeader" style="font-weight: 500">Create your account to start your Volunteering Journey!</h1>
            </div>

            <div id="org-box">
                <img src="../assets/Organisation.svg" alt="organisation_img"/>
                <div id="ant-button-org">
                    <a-button type="primary" onClick=is_org()>I'm an Organisation</a-button> 
                </div>
            </div>

            <div id="vol-box">
                <img src="../assets/Volunteer.svg" alt="volunteer_img"/>
                <div id="ant-button-vol">
                    <a-button type="primary" onClick=is_vol()>I'm a Volunteer</a-button> 
                </div>
            </div>
    </div>

    <div id="box2" class="box">
        Already have an account? <a @click="reroute" style="color: #5a4ff3">Log In.</a>
    </div>

</template>

<script>
export default {
    name: "SignUpPage",
    components: {
    },
    data() {
    },
    methods: {
        reroute() {
            this.$router.replace({ path: "/volunteer/login" });
        },
        is_org() {
            this.$router.push({ path: "/organisation/register", replace: true });
        },
        is_vol() {
            console.log('here');
            this.$router.replace({ path: "/volunteer/register"});
        }
    }
}
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

#signUpHeader {
    font-size: 25px;
    color: #020957;
}

#welc-msg{
    place-items: center stretch;
    border-radius: 4px;
    border-block-color: black;
}

#org-box, #vol-box {
    background-color: white;
    border-radius: 5px;
    border-block-color: black;
    padding-top: 30px;
    padding-bottom: 30px;
}

#ant-button-vol {
    margin-bottom: 10px;
    color: #FF734C;

}

#ant-button-org{
    margin-bottom: 10px;
    color: #020957;
}

</style>