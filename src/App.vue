<template>
  <v-app>
    <v-main>
      <v-container>
        <UserListView teste="teste" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserListView from "./views/UserListView.vue";

export default {
  name: "App",

  components: {
    UserListView,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f0f0f1;
}
</style>
