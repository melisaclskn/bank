<template>
  <v-app>
    <AdminNavbar v-if="$store.getters.isLogedIn" />
    <v-main>
     
      <router-view :user="user" />
        
    </v-main>
  </v-app>
</template>

<script>
import AdminNavbar from './components/AdminNavbar.vue';
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  components:{
     Nav,
    AdminNavbar
  },
  created(){
    console.log(this.$store.getters.isLogedIn)
    // this.isAdmin = localStorage.getItem( "userType") =='"admin"' ? true : false
  },
  data (){
    return{
         user:null,
         admin:null,
         isAdmin : false
       }
  
  }
};
</script>
