
<template>
  <div class="block latestPostBlock">
    <nav-bar :user="user"/>
    <v-container>
       <h1 class="pa-10 ma-10  d-flex justify-center align-center gradient title">Hizmetlerimiz</h1>
       
      <v-row>
        <v-col
          v-for="service in services"
          :key="service.id"
          cols="12"
          md="3"
          sm="6"
          xs="6"
        >
          <v-card outlined class="mx-auto" color="#9A9483 ">
            <v-img
              class="white--text align-end"
              height="250px"
             aspect-ratio="4/3"
             :src="`https://picsum.photos/500/300?image=${service.id * 5 + 10}`"
            >
            </v-img>
           
            <div class="ma-2">
              <v-card-text class="text--primary  justify-space-between">
                <div>{{ service.service_name }}</div>
                <div>{{ service.description }}</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import Nav from '../components/Nav.vue'
export default {
  name: "Services",
  components:{
    navBar: Nav
  },
  created() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getServices();
    },
  data() {
    return {
      user: "",
      services: [],
      
    };
  },
  
  methods: {
    
    getServices() {
      var token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      var res = axios
        .get("api/service", { headers })
        .then((res) => {
          console.log(res)
           this.services=res.data
           console.log(this.services[1].id,"------")
          // this.services=res.data
        });
      //this.objects=res.data
    },
  },
};
</script>
<style scoped>
.all-text {
  position: relative;
  height: 0;
  padding-top: calc(3 / 4 * 100);
}
.text1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}
.text2 {
  position: absolute;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}
.btn {
  color: #fff;
  width: 35%;
}

.back {
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
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