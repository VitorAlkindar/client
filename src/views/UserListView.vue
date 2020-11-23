<template>
  <v-row>
    <v-col>
      <v-card class="elevation-6">
        <v-card-title class="pb-9">
          <h3>Dados</h3>
        </v-card-title>
        <v-card-subtitle class="pb-0">
          <h4>Pesquisar</h4>
        </v-card-subtitle>

        <v-row>
          <v-col class="ml-4" md="3">
            <Autocomplete
              @updateChosenUserNames="onUpdateChosenUserNames"
              :usersAuto="users"
            />
          </v-col>
          <v-col md="3">
            <JobDropdown
              @updateChosenItem="onUpdateChosenItem"
              :users="users"
              :multiple="true"
            />
          </v-col>
        </v-row>

        <v-divider inset></v-divider>

        <v-list>
          <v-list-item-group>
            <v-row>
              <v-col class="ml-2">
                <h3>Nome</h3>
              </v-col>
              <v-col class="pl-0">
                <h3>Job</h3>
              </v-col>
            </v-row>
            <v-list-item
              v-for="(user, i) in filteredList"
              :key="i"
              inactive
              disabled
            >
              <v-row>
                <v-col>{{ user.name }}</v-col>
                <v-col>{{ user.job }}</v-col>
              </v-row>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="setDialog"
            rounded
            color="primary"
            dark
            class="text-h6 "
          >
            Adicionar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <FormDialog
      @updateUserList="onUpdateUserList"
      @updateDialog="setDialog"
      :dialog="dialog"
    />
  </v-row>
</template>

<script>
// import gateway from "./gateways/index";
import JobDropdown from "../components/JobDropdown.vue";
import axios from "axios";
import FormDialog from "../components/FormDialog.vue";
import Autocomplete from "../components/Autocomplete.vue";

export default {
  components: { JobDropdown, FormDialog, Autocomplete },
  name: "UserListView",

  data() {
    return {
      selectModel: [],
      autocompleteList: [],
      users: [],
      dialog: false,
      usersAuto: [],
    };
  },

  created() {
    this.getUserFromApi("");
  },
  computed: {
    filteredList() {
      let list = this.users;

      if (this.selectModel.length > 0)
        list = list.filter((user) => this.selectModel.includes(user.job));

      if (this.autocompleteList.length > 0)
        list = list.filter((user) => this.autocompleteList.includes(user.name));

      return list;
    },
  },
  methods: {
    onUpdateChosenItem(array) {
      this.selectModel = array;
    },
    setDialog() {
      this.dialog = !this.dialog;
    },
    onUpdateChosenUserNames(array) {
      this.autocompleteList = array;
    },
    onUpdateUserList() {
      this.getUserFromApi("");
    },
    getUserFromApi(job) {
      axios({
        url: "http://192.168.15.143:4000/graphql",
        method: "post",
        data: {
          query: `
          query user {
            user(job:"${job}") {
                  id
                  name
                  job
              }
            }
            `,
        },
      }).then((result) => {
        const res = result.data;
        this.users = res.data.user;
      });
    },
  },
};
</script>
