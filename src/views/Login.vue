<template>
 <v-app>
    <nav-bar :user="user"/>
    <div class="backgruond"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4" style="height:50%;">
          <div class="text-center">
            <v-avatar size="100" color="#911F27">
              <v-icon size="40" color="#630A10">mdi-account</v-icon>
            </v-avatar>
            <h2 class="indigo--text">Login</h2>
          </div>
          <v-form @submit.prevent="submitHandler" ref="form">
            <v-card-text>
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
              <v-btn :loading="loading" @click="login()" type="submit" color="indigo">
                <span class="white--text px-8">Login</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
    <!-- <v-snackbar top color="red" v-model="loading">
     E-mail şifre hatalı.
    </v-snackbar> -->
    <v-snackbar  top color="red"  v-model="error" >
     Email veya şifre boş geçilemez.
    </v-snackbar>
      <v-snackbar  top color="red"  v-model="snackbar" >
     snackbar
    </v-snackbar>
    
  </v-app>
</template>
    
<script>
import axios from "axios";
import Nav from '../components/Nav.vue'
export default {
  name: "Login",
components:{
    navBar: Nav
  },
  data() {
    return {
      data: {
        password: "mgs",
        email: "mgs@mgs.com",
      },
      user:'',
      admin:false,
      error:false,
      valid: true,
      loading:false,
      passwordShow:true,
      snackbar:false,
      passwordRules: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 10) || "Name must be less than 10 characters",
        ],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
    };
  },

  methods: {
    submitHandler(){
      if (this.$refs.form.validate()){
          this.loading = true
          
        setTimeout(()=> {
         // this.loading = false
         // this.snackbar = true
          // this.error=true
        },2000)
      }
    },
    async login() {
      if(this.data.password=="" || this.data.password=="" )
      {
          this.error=true
      }
      const response = await axios
        .post("api/login", {
          email: this.data.email,
          password: this.data.password,
        })
        .then((response) => {
         if(response.data.user.type == "admin"){

          this.$store.commit('SET_AUTH_STATUS', true)
         }
          this.user = response.data.user;
          console.log(response)
          if (response.data) {

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("userType", JSON.stringify(response.data.user.type));

            this.$root.$emit("logged-in");
         
            if(this.user.type=="admin")
            {
          this.$router.push("/adminUsers");
         
            }
            else{

            this.$router.push("/about");
            }
          }
        }) .catch((error) => {
          console.log(error)
          // switch (error.response.status) {
          //           case 200:
          //               console.log('good to go!');
          //               break;
          //           case 400:
          //               console.log('400 error');  // not getting here
          //               break;
          //           case 422:
          //               console.log('422 error'); 
          //               this.error=true// or here
          //               break;
          //           default:
          //               console.log('some other error');  // end up here all the time
          //               break;
          //           }
          // if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
          }
       // }
        );
    },
   
  },
};
</script>