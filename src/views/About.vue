<template>
  <v-container>
    <nav-bar :user="user" />
    <v-row class="d-flex justify-center align-center">
      <v-card
        class="pa-10 ma-10 d-flex justify-center align-center gradient"
        height="150"
        width="300"
        elevation="24"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline">Bakiye</div>
            <v-list-item-title class="text-h4">
              {{ user.balance }} TL
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar tile size="80"
            ><svg
              enable-background="new 0 0x 32 32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              class="svg"
            >
              <path
                d="m12 4v23c5.314 0 9.97-3.556 11.368-8.683l.632-2.317"
                fill="none"
                stroke="#000"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <path d="m19 9-11 4v-2l11-4z" />
              <path d="m19 13-11 4v-2l11-4z" /></svg
          ></v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-row>
    <v-row>
      <v-col lg="6">
        <v-simple-table>
          <thead>
            <tr>
              <th class="title" scope="col">Hizmet</th>
              <th class="title" scope="col">Açıklama</th>
              <th scope="col">Fiyat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service">
              <td>{{ service.service_name }}</td>
               <td>{{ service.description}}</td>
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
        });

        // axios
        // .get(
        //   "api/amountOperations",
        //   {
        //     message: this.errorMessage
        //   },
        //   { headers }
        // )
        // .then(() => {
        //   this.getUserInf();
        // });
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
