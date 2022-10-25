<template>
    <div>
        <TheNavbar/>
        <body>
            <TheSidebar/>
        </body>
        <TheFooter/>
    </div>
</template>

<script>
    import TheNavbar from '@/components/TheNavbar.vue'
    import TheFooter from '@/components/TheFooter.vue'
    import TheSidebar from '@/components/TheSidebar.vue'

    export default {
        name: "UserDashboard",
        components: {
            TheNavbar,
            TheFooter,
            TheSidebar,
        },
    }
</script>

<style scoped>
    body {
        min-height: 100vh;
        background-color: #fef8f3;
    }

</style>