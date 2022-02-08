<template>
  <div>
      

    <!-- <p></p>
    <h1 v-if="user">
      Hello {{ user.name }} <br />
      Balance: {{ user.balance }}
    </h1>
    <h1 v-if="!user">you are not logged in</h1> -->
    <!-- <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        v-model="received_user_email"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
      <small id="emailHelp" class="form-text text-muted">E-mail giriniz</small>
    </div>
    <br />
    <div class="input-group mb-3 money">
      <div class="input-group-prepend">
        <span class="input-group-text">₺</span>
      </div>
      <input type="text" class="form-control" v-model="amount" />
      <button type="button" class="btn btn-primary" @click="put()">
        Gönder
      </button>
    </div> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      user: "",
      received_user_email: "",
      amount: 0,
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    //console.log("user",this.user);
  },
  
  methods: {
    //fetching updated information
    getUserInf() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios
        .get("http://99e7-95-2-35-40.ngrok.io/api/users", { headers })
       .then((res) =>  localStorage.setItem("user" , JSON.stringify(res.data) ) )

       this.user = JSON.parse(localStorage.getItem("user"))
       
    },
    //money transfer
    async put() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      axios
        .put(
          "api/amountOperations",
          {
            received_user_email: this.received_user_email,
            amount: this.amount,
          },
          { headers }
        )
        .then(()=>{
          this.getUserInf()
         
        } );
     
    },
  },
};
</script>