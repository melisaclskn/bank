<template>
  <v-container>
   
    <div v-if="!user"><h1>Lütfen giriş yapınız</h1></div>
    <div v-if="user">
      <v-row class="d-flex justify-center align-center"> </v-row>
      <v-row>
        <v-col lg="">
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
           Kullanıcılar
          </h1>
          <v-simple-table>
            <thead>
              <tr>
                <th scope="col">Kullanıcı Mail</th>
                <th scope="col">Kullanıcı Ad</th>
                 <th scope="col">Bakiye</th>
                  <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user">
                <td>{{ user.email  }}</td> 
                 <td>{{ user.name  }}</td>
                 <td>{{ user.balance  }}</td>
               <td>
                  <v-btn  @click.prevent="update()" @click="goToUpdate(user)"  class="ma-1" color="green" plain dark> Güncelle </v-btn>
                </td>
                <td>
                  <v-btn  @click.prevent="remove(history.id)" class="ma-1" color="error" plain dark> sil </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
import dayjs from 'dayjs';
import Nav from "../components/Nav.vue";
export default {
  components: {
    navBar: Nav,
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getusers()
  },
  mounted(){
    this.getusers()
  },
  data() {
    return {
      user: "",
      users: [],
      created_at:''
    };
  },
  methods: {
    goToUpdate(user){
      this.$router.push("/updateUser/" + user.id)
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
            console.log(res)
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
      remove(id) {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      axios
        .delete(
          "api/users/"+id,
         
          { headers }
        )
        .then(()=>{
           this.getUserInf()

        } );
  },
  },
};
</script>
<style scoped>
.black {
  background: purple;
}
.title {
  color: #fff !important;
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