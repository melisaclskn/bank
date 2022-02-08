<template>
  <v-container>
    <v-row class="d-flex justify-center align-center">
  
    </v-row>
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
          Para Yatırma
          </h1>
    <v-row>
      
      <v-col lg="6" > 
     

        <v-select
          label="Para yüklemek istediğiniz müşteriyi seçiniz."
          :items="users"
          v-model="selectedUser"
          item-text="email"
          item-value="id"
          id="mySelect"
          outlined
          clearable
          hide-selected
          return-object
        ></v-select>

        <!-- <select>
           <option value="" disabled selected>Escolha uma conta</option>
           <option v-for="account in services_name" :key="account" :value="account">{{ account }}</option>
        </select> -->
        <v-text-field v-model="money" label="Para Miktarı"></v-text-field>
        <v-hover>
          <v-btn
            class="ma-2 btn"
            :loading="loading"
            :disabled="loading"
            color="#911F27"
            @click.prevent="sendMoney()"
          >
            Para Yükle
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
import Services from "./Services.vue";
export default {
  components: {
    navBar: Nav,
  },
  mounted() {
    this.getHistoryInfo();
  },
  
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.sendMoney();
    this.getUsers();
  },
  data() {
    return {
      user: "",
      users:[],
      money: 0,
      errorMessage:"",
      selectedUser: "",
      selectedItem: "",
    };
  },
  methods: {
     
    getUserInf() {
    var token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
    };

    var res = axios
      .get("/api/users", { headers })
      .then((res) =>{
        console.log(res , 1000)
    this.user = res.data;
      } );

  },
    selected() {
      console.log(this.selectedItem);
    },
    getUsers() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };


      var res = axios.get("api/user/allUsers", { headers }).then((res) => {
       
       this.users = res.data;
        console.log(  this.users,"--------")
      });
    },
    async sendMoney() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      axios
        .put(
          "api/moneyOperations",
          {
           
            money: this.money,
            email:this.selectedUser.email
          },
          { headers }
        )
        .then(() => {
        
          this.getUserInf();
           this.$router.push("/adminUsers");
        }) 
        .catch((error) => {
          console.log(error)
          }
          );
          
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
