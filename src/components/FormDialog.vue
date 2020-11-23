<template>
  <v-dialog
    v-model="internalDialog"
    max-width="600px"
    @click:outside="emitDialog"
  >
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-model="textFieldModel"
                label="Nome*"
                hint="Digite seu nome"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <JobDropdown @updateChosenItem="onUpdateChosenItem" />
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onFormSend()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import JobDropdown from "../components/JobDropdown";
import axios from "axios";

export default {
  name: "FormDialog",
  components: {
    JobDropdown,
  },
  props: {
    dialog: { type: Boolean, required: true },
  },
  data() {
    return {
      internalDialog: false,
      textFieldModel: "",
      selectModel: "",
    };
  },
  watch: {
    dialog(val) {
      this.internalDialog = val;
    },
  },

  created() {
    this.internalDialog = this.dialog;
  },
  computed: {},
  methods: {
    emitDialog() {
      this.$emit("updateDialog", this.internalDialog);
    },
    onUpdateChosenItem(val) {
      this.selectModel = val;
    },
    onFormSend() {
      this.internalDialog = false;
      this.setUserFromApi(this.selectModel, this.textFieldModel);
      this.textFieldModel = "";
      this.emitDialog();
    },
    setUserFromApi(job, name) {
      axios({
        url: "http://192.168.15.143:4000/graphql",
        method: "post",
        data: {
          query: `
 mutation saveUser {
        saveUser(user:{
          job: "${job}"
          name:"${name}"
        }) {
          name
          }
}
            `,
        },
      }).then(() => {
        this.$emit("updateUserList");
      });
    },
  },
};

// this.users[0].job
// v-card-actions
</script>
