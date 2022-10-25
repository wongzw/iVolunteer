<template>
  <nav class="navbar">
    <!-- LOGO -->
    <a class="logo" href="/">
      <span class="i">i</span>Volunteer
      <img class="handshake" src="@/assets/handshake.svg" />
    </a>
    <!-- NAVIGATION MENU -->
    <ul class="nav-links">
      <!-- NAVIGATION MENUS -->
      <div class="menu">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/">Redemption</router-link></li>
        <li><router-link to="/">Support</router-link></li>
        <li><router-link to="/">Notifications</router-link></li>
        <!-- <li><a href="/Support">Support</a></li>
            <li><a href="/Notifications">Notifications</a></li> -->
        <li class="services">
          <img
            alt="down_arrow"
            src="@/assets/down_arrow.png"
            width="21"
            height="13"
          />
          <!-- DROPDOWN MENU -->
          <ul class="dropdown">
            <li><router-link to="/">Profile </router-link></li>
            <li>
              <router-link to="/"
                ><button id="signOutButton" @click="signOut">
                  Sign out
                </button></router-link
              >
            </li>
          </ul>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "TheNavBar",
  methods: {
    signOut() {
      this.$store.commit("resetState");
    },
  },
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.i {
  color: #ff5b2e;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  background-color: white;
  color: #020957;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0px;
  width: 100%;
  z-index: 1;
}

.nav-links a {
  color: #020957;
}

/* LOGO */
.logo {
  font-size: 32px;
  color: #020957;
  font-weight: bold;
  margin-left: 24px;
}

.handshake {
  position: absolute;
  margin-top: 8px;
  margin-left: 8px;
}

/* NAVBAR MENU */
.menu {
  display: flex;
  gap: 1em;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: -5px;
}

.menu li:hover {
  background-color: #ffefe2;
  border-radius: 5px;
  transition: 0.3s ease;
}

.menu li {
  padding: 5px 14px;
}

/* DROPDOWN MENU */
.services {
  position: relative;
  margin-right: 15px;
}

.dropdown {
  background-color: #ffefe2;
  padding: 1em 0;
  position: absolute; /*WITH RESPECT TO PARENT*/
  display: none;
  border-radius: 8px;
  top: 35px;
  right: 0px;
}

.dropdown li + li {
  /* margin-top: 5px; */
}

.dropdown li {
  /* padding: 0.5em 0.5em; */
  width: 8em;
  text-align: center;
  padding: 0px 0px 0px 0px;
}

.dropdown li:hover {
  background-color: #ffd0a8;
}

.services:hover .dropdown {
  display: block;
}

#signOutButton {
  border: none;
  cursor: pointer;
  background: none;
  color: inherit;
  font: inherit;
}
</style>