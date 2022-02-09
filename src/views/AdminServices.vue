<template>
  <div class="grey-bg screen">
    <v-container>
      <v-row class="d-flex justify-center align-center color">
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
              <div class="text-overline">{{ user.email }}</div>
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
        <v-col lg="" class="grey-bg">
          <v-simple-table class="border">
            <thead class="dark-blue">
              <tr class="dark-blue">
                <th class="dark-blue" scope="col">Hizmet</th>
                <th class="dark-blue" scope="col">Açıklama</th>
                <th class="dark-blue" scope="col">Fiyat</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in services" :key="service">
                <td>{{ service.service_name }}</td>
                <td>{{ service.description }}</td>
                <td>{{ service.price }} TL</td>
                <td>
                  <v-btn class="mx-2 dark-blue"  @click="goToUpdateService(service)" plain fab dark small >
                    <v-icon dark> mdi-pencil-outline </v-icon>
                  </v-btn>
                  <!-- <v-btn
                    @click="goToUpdateService(service)"
                    class="ma-1"
                    color="green"
                    plain
                    dark
                    >Güncelle</v-btn
                  > -->
                </td>
                <td>
                  <v-btn class="mx-2"  @click.prevent="remove(service.id)" plain fab dark small color="error">
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                  <!-- <v-btn
                    @click.prevent="remove(service.id)"
                    class="ma-1"
                    color="error"
                    plain
                    dark
                  >
                    sil
                  </v-btn> -->
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <br /><br />
          <v-btn to="/addService" color="green">Servis Ekle</v-btn>
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
    this.getServices();
  },

  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getServices();
    this.getHistoryInfo();
    console.log(this.selectedItem.service_name);
  },
  data() {
    return {
      user: "",
      services: [],
      selectedItem: "",
    };
  },
  methods: {
    goToUpdateService(service) {
      this.$router.push("/updateService/" + service.id);
    },
    getUserInf() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios
        .get("/api/services", { headers })
        .then((res) => localStorage.setItem("user", JSON.stringify(res.data)));

      this.user = JSON.parse(localStorage.getItem("user"));
    },
    selected() {
      console.log(this.selectedItem);
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
          },
          { headers }
        )
        .then(() => {
          this.getUserInf();
        });
    },
    //remove services
    remove(id) {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      axios
        .delete(
          "api/service/" + id,

          { headers }
        )
        .then(() => {
          this.getUserInf();
        });
    },
  },
};
</script>
<style scoped>
.dark-blue {
  color: #334257 !important;
  font-size: 1.05em !important;
}
.border {
  border: #334257 !important;
}
.screen {
  height: 100vh;
}
.grey-bg {
  background-color: #eeeeee;
}
.color {
  background-color: "#EEF2FF" !important;
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
  background: rgb(51, 66, 87);
  background: linear-gradient(
    99deg,
    rgba(51, 66, 87, 1) 10%,
    rgba(255, 255, 255, 1) 100%
  );
}
#mySelect {
  border: none;
}
</style>
