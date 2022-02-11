<template>
  <v-navigation-drawer v-model="drawer" permanent color="#334257" app>
    <v-sheet class="px-4 py-5 justify-center" color="#334257">
      <v-avatar class="mb-2" color="#476072" size="64">
        <v-icon dark> mdi-account </v-icon>
      </v-avatar>
      <div class="white-color">{{ this.user.email }}</div>
    </v-sheet>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="#EEEEEE">
        <v-list-item
          class="py-2 mt-4"
          v-for="link in links"
          :key="link"
          @click="goToPage(link.path)"
          link
        >
          <v-list-item-icon color="pink" class="color">
            <v-icon color="rgb(240, 234, 234)">{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="color">{{
              link.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <!-- <v-btn depressed color="error" class="logout" @click.prevent="logOut()">
      Log out
    </v-btn> -->

    <v-list-item class="mb-12 justify-center align-end" depressed dark two-line>
      <v-btn color="pink" class="logout" @click.prevent="logOut()">
        Log out
      </v-btn>
    </v-list-item>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "AdminNavbar",
  data() {
    return {
      user: "",
      userType: "",
      admin: false,
      cards: ["Today", "Yesterday"],
      drawer: null,
      links: [
        // {
        //   icon: "mdi-clipboard-text-clock",
        //   title: "Geçmiş İşlemleri",
        //   path: "/adminHistoryBalance",
        // },
        { icon: "mdi-file-table", title: "Servisler", path: "/adminServices" },
        {
          icon: "mdi-plus-box-multiple",
          title: "Hizmet Kaydı",
          path: "/createUsersService",
        },
        {
          icon: "mdi-account-group",
          title: "Kullanıcılar",
          path: "/adminUsers",
        },
        { icon: "mdi-plus-box", title: "Servis Ekle", path: "/addService" },
        {
          icon: "mdi-cash-multiple",
          title: "Para Yükleme",
          path: "/sendMoney",
        },
        {
          icon: "mdi-history",
          title: "Hizmet Geçmişi",
          path: "/serviceHistory",
        },
      ],
      //  items: [
      //   { title: 'Home', icon: 'mdi-home-city' },
      //   { title: 'My Account', icon: 'mdi-account' },
      //   { title: 'Users', icon: 'mdi-account-group-outline' },
      // ],
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  created() {
    this.$root.$on("logged-in", () => {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.userType = JSON.parse(localStorage.getItem("userType"));
    });

    this.user = JSON.parse(localStorage.getItem("user"));
    this.userType = JSON.parse(localStorage.getItem("userType"));
  },
  methods: {
    goToPage(route) {
      console.log(route);
      this.$router.push(route);
    },
    logOut() {
      console.log("this is log out");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      console.log(localStorage.getItem("user"));
      this.user = null;
      this.userType = null;
      console.log(this.$store.commit("SET_AUTH_STATUS", false));
      this.$router.push("/login");
    },
    checkUser() {
      console.log(localStorage.getItem("userType") == "admin" ? true : false);
      return localStorage.getItem("user") ? true : false;
    },
  },
};
</script>
<style scoped>
.color {
  font-size: 1.5em;
  color: rgb(240, 234, 234);
}
.white-color {
  color: rgb(240, 234, 234);
}
</style>
