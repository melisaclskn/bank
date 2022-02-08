<template>
  <v-app>
<nav-bar :user="user"/>
    <div class="backgruond"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4" style="height:50%;">
          <div class="text-center">
            <v-avatar size="100" color="indigo lighten-4">
              <v-icon size="40" color="indigo">mdi-account</v-icon>
            </v-avatar>
            <h2 class="indigo--text">Sign Up</h2>
          </div>
          <v-form @submit.prevent="signUp()" ref="form">
            <v-card-text>
              <v-text-field
                v-model="data.name"
                :rules="nameRules"
                type="name"
                label="Name"
                placeholder="Name"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="data.email"
                :rules="emailRules"
                type="email"
                label="Email"
                placeholder="Email"
                prepend-inner-icon="mdi-email-outline"
                required
              />
              <v-text-field
                      v-model="data.password"
                      :rules="passwordRules"
                      :type="passwordShow?'text':'password'"
                      label="Password"
                      placeholder="Password"
                      prepend-inner-icon="mdi-key"
                      :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                      @click:append="passwordShow = !passwordShow"
                      required
              />
              <v-switch label="Remember me" color="indigo"></v-switch>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn :loading="loading" type="submit" color="indigo">
                <span class="white--text px-8">Sign Up</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
    <v-snackbar top color="green" v-model="snackbar">
      Sign Up success!
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
import Nav from '../components/Nav.vue'
export default {
  name: 'App',
  components:{
    navBar: Nav
  },
  data: () => ({
     data: {
        name: "",
        email: "",
        password: "",
      },
      user:"",
    loading:false,
    snackbar:false,
    passwordShow:false,
    email: '',
    name:'',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    nameRules: [
      v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 1) || 'Password must be 1 characters or more!',
    ],
  }),
  methods:{
     async signUp() {
      const response = await axios
        .post(
          "/api/users",
          {
            name: this.data.name,
            email: this.data.email,
            password: this.data.password,
          },
          
        );
      //.then((res) => console.log(res)).catch(error => {console.log(error)});

      this.$router.push("/login");
    },
    submitHandler(){
      if (this.$refs.form.validate()){
          this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbar = true
        },3000)
      }
    }
  }
};
</script>
<style>
  .backgruond{
    background-image: url(../assets/auto2.jpg) !important; 
    background-attachment:fixed; 
   background-size: cover; 
    background-position: center center;
    background-repeat:no-repeat ;
    height: 60%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
  }
</style>