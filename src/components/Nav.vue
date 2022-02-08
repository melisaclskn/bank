<template>
  <v-app-bar app color="#9A9483 " dark>
    <div class="d-flex align-center">
      <h1>Hesabım</h1>
    </div>

    <v-spacer></v-spacer>
    <div v-if="!user">
      <v-btn text to="/login">
        <span class="mr-2">Login</span>
      </v-btn>

      <v-btn text to="/signup">
        <span class="mr-2">Sign Up</span>
      </v-btn>
    </div>
  
    <div v-if="user">
      <!--services button-->
       <v-btn text to="/about">
        <span class="mr-2">Anasayfa</span>
      </v-btn>
      <v-btn text to="/historyBalance">
        <span class="mr-2">Geçmiş İşlemler</span>
      </v-btn>
      <v-btn text to="/services">
        <span class="mr-2">Hizmetler</span>
      </v-btn>
       
      <!--logout button-->
      <v-btn text to="/home" @click.native="logOut">
        <span class="mr-2">Logout</span>
      </v-btn>
    </div>
    <div v-if="admin" >
     <v-btn text to="/home" @click.native="logOut">
        <span class="mr-2">admin</span>
      </v-btn>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return {
      user: "",
      userType:"",
      admin:false
    };
  },
  created() {
    this.$root.$on("logged-in", () => {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.userType = JSON.parse(localStorage.getItem("userType"));
    });

    
    this.user = JSON.parse(localStorage.getItem("user"));
    this.userType = JSON.parse(localStorage.getItem("userType"));
  },
  methods: {
    logOut() {
      console.log("this is log out");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      console.log(localStorage.getItem("user"));
      this.user = null;
      
      this.$router.push("/login");
    },
    checkUser() {
      console.log(localStorage.getItem("user") ? true : false);
      return localStorage.getItem("user") ? true : false;
    },
  },
};
</script>



