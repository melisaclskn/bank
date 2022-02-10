<template>
<div class="grey-bg screen">
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
           Hizmet Kaydı
          </h1>
    <v-row>
      
      <v-col lg="6" class="grey-bg">
          
        <v-simple-table>
          <thead>
            <tr>
              <th class="dark-blue" scope="col">Hizmet</th>
              <th class="dark-blue" scope="col">Fiyat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service">
              <td>{{ service.service_name }}</td>
              <td>{{ service.price }} TL</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
      <v-col lg="6">
        {{ selectedItem.service_name }}
          <v-select
          label="Almak istediğiniz hizmeti seçiniz."
          :items="services"
          v-model="selectedItem"
          item-text="service_name"
          item-value="id"
          id="mySelect"
          outlined
          clearable
          hide-selected
          return-object
        ></v-select>

        <v-select
          label="Hizmeti alan müşteriyi seçiniz."
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
        <v-text-field v-model="quantity" label="Adet"></v-text-field>
        <v-hover>
          <v-btn
            class="ma-2 btn"
            :loading="loading"
            :disabled="loading"
            color="#911F27"
            @click.prevent="amountOperations()"
          >
            Hizmet Al
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</div>
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
    this.getServices();
    this.getUsers();
    console.log(this.selectedItem.service_name);
  },
  data() {
    return {
      user: "",
      users:[],
      services: [],
      quantity: 0,
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
    getServices() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      this.who = this.user.type;

      var res = axios.get("api/service", { headers }).then((res) => {
        this.services = res.data;
        console.log(this.services);
      });
    },
    async amountOperations() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      axios
        .put(
          "api/amountOperations",
          {
            service_name: this.selectedItem.service_name,
            quantity: this.quantity,
            email:this.selectedUser.email
          },
          { headers }
        )
        .then(() => {
        
          this.getUserInf();
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
.grey-bg {
  background-color: #eeeeee;
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
.dark-blue {
  color: #334257 !important;
  font-size: 1.05em !important;
}
.screen {
  height: 100vh;
}
#mySelect {
  border: none;
}
</style>
