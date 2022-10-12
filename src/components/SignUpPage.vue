<template>
    <img style="margin-top: 10vh" alt="Logo of IVolunteer" src="../assets/ivolunteer_logo.png" />
    <div class="box">
        <div class="boxed">
            <div id="welc-msg">
                <h1 id="signUpHeader" style="font-weight: 700">Create your account to start your Volunteering Journey!</h1>
            </div>

            <div id="org-box">
                <img src="Organisation.svg" alt=""/>
                <div id="ant-button-org">
                    <a-button type="primary" on-click="is_org()">I'm an Organisation</a-button> 
                </div>
            </div>

            <div id="vol-box">
                <img src="Volunteer.svg" alt=""/>
                <div id="ant-button-vol">
                    <a-button type="primary" on-click="is_volun()">I'm a Volunteer</a-button> 
                </div>
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
            this.$router.push({ path: "/volunteer/login", replace: true });
        },
        is_org() {
            this.$router.push({ path: "/organisation/register", replace: true });
        },
        is_volun() {
            this.$router.push({ path: "/volunteer/register", replace: true });
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
.boxed{
    background-color: white;
    align-items: center;
    filter: drop-shadow(1px 1px 1px black);
}
#welc-msg{
    grid-column: 1 / 3;
}
#org-box{
    grid-row: 1 / 2;
}
#vol-box{
    grid-row: 2 / 3;
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
    font-size: 40px;
    color: #020957;
}

#ant-button-vol {
    margin-bottom: 10px;
}

#ant-button-org {
    margin-bottom: 10px;
}

</style>