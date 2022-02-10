<template>
<div class="grey-bg screen">
  <v-container>
    <div v-if="!user"><h1>Lütfen giriş yapınız</h1></div>
    <div v-if="user">
      <v-row class="d-flex justify-center align-center"> </v-row>
      <v-row>
        <v-col >
          <h1
            class="
              pa-10
              ma-10
              d-flex
              justify-center
              align-center
              gradient
              title
            "
          >
           Hizmet Geçmişi
          </h1>
          <v-simple-table>
            <thead>
              <tr>
                <th scope="col" class="dark-blue">Kullanıcı Ad</th>
                 <th scope="col" class="dark-blue">Mail</th>
                <th scope="col" class="dark-blue">Bakiye</th>
                <th scope="col" class="dark-blue"></th>
                <th scope="col" class="dark-blue"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.balance }}</td>
                <td>
                  <v-btn
                   @click="goToDetail(user)"
                    class="ma-1"
                    color="blue"
                    plain
                    dark
                  >
                    Detay
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </div>
  </v-container>
</div>
</template>
<script>
import axios from "axios";
import Nav from "../components/Nav.vue";
export default {
  components: {
    navBar: Nav,
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getusers();
  },
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      user: "",
      users: [],
      created_at: "",
    };
  },
  methods: {
       goToDetail(user){
      this.$router.push("/historyDetail/" + user.id)
    },
    getUsers() {
      console.log(123);
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios
        .get("api/user/allUsers", { headers })
        .then((res) => {
          console.log(res);
          this.users = res.data.reverse();
          //this.histories.map(element=>console.log(element))
          //console.log(JSON.stringify(this.histories.created_at))

          console.log(this.users);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
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
.grey-bg {
  background-color: #eeeeee;
}
.title {
  color: #fff !important;
  font-size: 1.5em !important;
  font-family: Georgia, "Times New Roman", Times, serif !important;
}
.screen {
  height: 100vh;
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
  border-radius: 1.2em;
}
#mySelect {
  border: none;
}
</style>