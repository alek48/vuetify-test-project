<template>
  <span>
    <AlertBox :alert_text="alert_text" v-if="loading_fail"></AlertBox>
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-card :loading="loading" :disabled="loading">
            <v-card-title> Log in </v-card-title>
            <v-card-text>
              <v-form v-model="loginValid" ref="loginForm" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="loginData.email"
                        label="Email"
                        :rules="[requiredField]"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="loginData.password"
                        label="Password"
                        :rules="[requiredField]"
                        required
                        type="password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                :disabled="!loginValid"
                @click="submitLoginForm"
              >
                Log In
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="auto">
          <v-card :loading="loading" :disabled="loading">
            <v-card-title> Register </v-card-title>
            <v-card-text>
              <v-form
                v-model="registerValid"
                ref="registerForm"
                lazy-validation
              >
                <v-container>
                  <v-row>
                    <v-col cols="auto">
                      <v-text-field
                        v-model="registerData.name"
                        label="Name"
                        :rules="[requiredField]"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="registerData.email"
                        label="Email"
                        :rules="[requiredField]"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="registerData.password"
                        label="Password"
                        :rules="[requiredField]"
                        required
                        type="password"
                      ></v-text-field>
                      <v-text-field
                        v-model="registerData.c_password"
                        label="Confirm password"
                        :rules="[requiredField, validateRegisterPasswords]"
                        required
                        type="password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                :disabled="!registerValid"
                @click="submitRegisterForm"
              >
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import api, { LoginData, RegisterData } from "@/services";

import AlertBox from "./AlertBox.vue";

export default defineComponent({
  data: () => ({
    loginValid: true,
    registerValid: true,
    loginData: new LoginData(),
    registerData: new RegisterData(),
    requiredField: (v: string) => !!v || "This field is required",
    loading: false,
    loading_fail: false,
    alert_text: "",
  }),
  methods: {
    async submitLoginForm() {
      var form = this.$refs.loginForm as HTMLFormElement;
      if (form.validate()) {
        this.loading = true;
        this.loading_fail = false;
        api
          .postLogin(this.loginData)
          .then((response) => {
            this.loading = false;
            form.reset();
            this.$store.dispatch("toast/showToast", {
              message: "Logged in successfully",
              color: "info",
              icon: "mdi-login",
            });
            this.$store.dispatch("logIn", response.data.data);
            this.$router.push({ name: "home" });
          })
          .catch((err) => {
            this.loading = false;
            this.loading_fail = true;
            this.alert_text = err.message + ": Failed to log in";
          });
      }
    },
    async submitRegisterForm() {
      var form = this.$refs.registerForm as HTMLFormElement;
      if (form.validate()) {
        this.loading = true;
        this.loading_fail = false;
        api
          .postRegister(this.registerData)
          .then((response) => {
            this.loading = false;
            form.reset();
            this.$store.dispatch("toast/showToast", {
              message: "Registered successfully, you can log in now",
            });
          })
          .catch((err) => {
            this.loading = false;
            this.loading_fail = true;
            this.alert_text = err.message + ": Failed to register";
          });
      }
    },
    validateRegisterPasswords() {
      return (
        this.registerData.password === this.registerData.c_password ||
        "Password does not match"
      );
    },
  },
  components: { AlertBox },
});
</script>
