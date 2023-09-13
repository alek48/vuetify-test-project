import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#6d78d9",
        secondary: "#44082c",
        accent: "#7940ce",
      },
    },
    dark: true,
  },
});
