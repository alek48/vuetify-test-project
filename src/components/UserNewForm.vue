<template>
  <span>
    <AlertBox :alert_text="alert_text" v-if="loading_fail"></AlertBox>
    <v-card :loading="loading" :disabled="loading">
      <v-card-title> New User </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="auto">
                <v-text-field
                  v-model="newUser.name"
                  label="Name"
                  :rules="requiredField"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newUser.email"
                  label="Email"
                  :rules="requiredField"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newUser.phone"
                  label="Phone"
                  :rules="requiredField"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newUser.password"
                  label="Password"
                  :rules="requiredField"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" :disabled="!valid" @click="submitForm">
          Submit
        </v-btn>
        <v-btn color="error" @click="clearForm">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import api, { NewUser } from "@/services";

import AlertBox from "./AlertBox.vue";

export default defineComponent({
  data: () => ({
    valid: true,
    newUser: new NewUser(),
    requiredField: [(v: string) => !!v || "This field is required"],
    loading: false,
    loading_fail: false,
    alert_text: "",
  }),
  methods: {
    async submitForm() {
      var form = this.$refs.form as HTMLFormElement;
      if (form.validate()) {
        // no idea how to fix linting here
        this.loading = true;
        this.loading_fail = false;
        api
          .postNewUser(this.newUser)
          .then((response) => {
            console.log(response);
            this.loading = false;
            form.reset(); // no idea how to fix linting here
            this.$store.dispatch("toast/showToast", {
              message: "Task added successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            this.loading_fail = true;
            this.alert_text = err.message + ": Adding user failed";
          });
      }
    },
    clearForm() {
      var form = this.$refs.form as HTMLFormElement;
      form.reset(); // no idea how to fix linting here
    },
  },
  components: { AlertBox },
});
</script>
