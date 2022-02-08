<template>
  <v-container >
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field v-model="balance" label="Balance" required></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="updateUser(users.id)">
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
    users: [],
    valid: true,
    name: "",
    email: "",
    balance: "",
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
    this.getusers();
    this.getUserInfo();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    getUserInfo() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios
        .get("api/deneme/" + this.$route.params.id, { headers })//yeni api yi yaz
        .then((res) => {
          console.log(res,"dataaaaaaa");
          console.log(res.data,"------5465456")
          this.name = res.data.name //100 yazınca default olarak inputa yazar
          this.balance = res.data.balance;
        })
       
    },
    getusers() {
      console.log(123);
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios
        .get("api/user/allUsers", { headers })
        .then((res) => {
          console.log(res);
          // this.name=res.data.name
          // this.balance=res.data.balance
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
  },
};
</script>