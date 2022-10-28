<template>
    <VolunteerProfile/>
</template>
    
<script>
    import { db } from "../../firebase.js";
    import { getDoc, doc } from "firebase/firestore";
    import VolunteerProfile from "../../components/VolunteerProfile.vue";
    
    export default {
        name: "VolunteerProfileView",
        components: {
        VolunteerProfile,
        },
    };
</script>