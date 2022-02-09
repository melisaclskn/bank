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
          Servis Ekle
          </h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="service_name"
        :rules="nameRules"
        label="Service Name"
        required
      ></v-text-field>

      <v-text-field v-model="description" label="description" required></v-text-field>
       <v-text-field v-model="price" label="price" required></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="add()">
        Ekle
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Form Sıfırla </v-btn>
    </v-form>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    service_name:'',
    description:'',
    price:'',
    users: [],
    valid: true,
    select: null,
  }),
  created() {
    console.log(this.$route.params.id)
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getusers();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
   
   async add() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      const response = await axios
        .post(
          "/api/service",
          {
            service_name: this.service_name,
            description: this.description,
            price: this.price,
          },
           { headers }
          
        )
      .then((res) => {
         this.$router.push("/adminServices");
        console.log(res)
        });

     
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