<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import api, { NewUser } from "@/services";

export default defineComponent({
  data: () => ({
    valid: true,
    newUser: {} as NewUser,
    requiredField: [(v: string) => !!v || "This field is required"],
    loading: false,
  }),
  methods: {
    async submitForm() {
      this.$refs.form.validate(); // no idea how to fix linting here
      if (this.valid) {
        this.loading = true;
        api
          .postNewUser(this.newUser)
          .then((response) => {
            console.log(response);
            this.loading = false;
            this.$refs.form.reset(); // no idea how to fix linting here
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      }
    },
    clearForm() {
      this.$refs.form.reset(); // no idea how to fix linting here
    },
  },
});
</script>
