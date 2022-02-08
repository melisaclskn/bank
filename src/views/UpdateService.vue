<template>
  <v-container >
     <h1
            class="
              pa-10
              ma-10
              d-flex
              justify-center
              align-center
              gradient
              title
              white
            "
          >
           Servis Güncelle
          </h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="price"
       
        label="price"
        required
      ></v-text-field>

       <v-text-field
        v-model="description"
       
        label="description"
        required
      ></v-text-field>

    

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="updateService(services.id)">
        Güncelle
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Form Sıfırla </v-btn>
    </v-form>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    services:[],
    valid: true,
    price:"",
    description:"",
    
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
  }),
  created() {
    console.log(this.$route.params.id)
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getServiceInfo()

  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    getServiceInfo() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios
        .get("api/service/" + this.$route.params.id, { headers })//yeni api yi yaz
        .then((res) => {
          console.log(res);
          this.price = res.data.price //100 yazınca default olarak inputa yazar
          this.description = res.data.description;
        })
       
    },
  
    getService() {
      console.log(123);
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios
        .get("api/service", { headers })
        .then((res) => {
          console.log(res);
          this.users = res.data;
        })
       
    },
     async updateUser() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      axios
        .put(
          "api/users/" + this.$route.params.id,
          {
            name: this.name,
            balance: this.balance,
          },
          { headers }
        )
        .then(() => {
          this.getUserInf();
          
          console.log(this.users)
        });
        this.$router.push("/adminUsers");
    },
    async updateService() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      axios
        .put(
          "api/service/" + this.$route.params.id,
          {
            price: this.price,
            description:this.description,
           

          },
          { headers }
        )
        .then((res) => {
          console.log(res)
          this.getService();
    
        }).catch(error=>console.log(error));
        this.$router.push("/adminServices");
    },
  },
};
</script>
<style scoped>
.black {
  background: purple;
}
.title {
  color: #cd3939 !important;
  font-size: 1.5em !important;
  font-family: Georgia, "Times New Roman", Times, serif !important;
}
.btn {
  color: #fff;
  width: 35%;
}
.white{
  color:#fff !important;
}
.bakiye {
  margin: 0 0 0 10rem;
  height: 50px;
  width: 35%;
  display: flex;
  color: gold;
}
.gradient {
  background: rgb(250, 206, 127);
  background: linear-gradient(
    90deg,
    rgba(250, 206, 127, 1) 18%,
    rgba(145, 31, 39, 1) 81%
  );
}
#mySelect {
  border: none;
}
</style>