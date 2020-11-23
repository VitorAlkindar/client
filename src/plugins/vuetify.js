import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#804199",
        background: "#804199",
      },
      dark: {
        primary: "#804199",
      },
    },
  },
});
