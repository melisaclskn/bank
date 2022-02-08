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
            Kullanıcının Geçmişi
          </h1>
          <v-simple-table>
            <thead>
              <tr>
                <th scope="col">Hizmeti Alan Kişi</th>
                <th scope="col">Servis Adı</th>
                <th scope="col">Servis Fiyatı</th>
                <th scope="col">Adet</th>
                <th scope="col">Para Girdisi</th>
                <th scope="col">Eski Bakiye</th>
                <th scope="col">Yeni Bakiye</th>
                <th scope="col">Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="history in histories" :key="history">
                <td>{{ history.receiver.email }}</td>
                <td>{{ history.service.service_name }}</td>
                <td>{{ history.service.price }}</td>
                <td>{{ history.quantity }}</td>
                 <td>{{ history.money }}</td>
                <td>{{ history.oldBalance }}</td>
                <td>{{ history.newBalance }}</td>
                <!-- <td>{{history.balance  }}</td> -->
                <td>{{ created_at }}</td>
                <td>
                  <v-btn
                    @click.prevent="remove(history.id)"
                    class="ma-1"
                    color="error"
                    plain
                    dark
                  >
                    sil
                  </v-btn>
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
import dayjs from "dayjs";
export default {
  data: () => ({
    users: [],
    user: "",
    created_at: "",
    histories: [],
    valid: true,
    name: "",
    email: "",
    balance: "",
    email: "",
  }),
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getUsers();
    this.showDetail();
  },
  methods: {
    getUsers() {
      console.log(123);
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios.get("api/user/allUsers", { headers }).then((res) => {
        this.users = res.data;
      });
    },
    remove(id) {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      axios
        .delete(
          "/api/historyBalance/" + id,

          { headers }
        )
        .then(() => {
          this.getUserInf();
        });
    },
    showDetail() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };
      console.log(headers);
      axios
        .get("api/users/" + this.$route.params.id, { headers })
        .then((res) => {
          console.log(res, "dvfdgvsfgsf");
          this.histories = res.data.data.reverse();
          this.histories.map(
            (element) =>
              (this.created_at = JSON.stringify(
                dayjs(element.created_at).format("DD/MM/YYYY HH:MM")
              ))
          );
          console.log(this.histories);
        })
        .catch((err) => {
          console.log(err);
        });
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
