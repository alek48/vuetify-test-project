<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <UserDetails
          :user_id="$store.state.userId"
          :emit_details="true"
          @user-details="getUser"
          ref="detailsComp"
        />
      </v-col>
      <v-col cols="auto">
        <v-card :loading="loading" :disabled="loading">
          <v-card-title>Edit profile</v-card-title>
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
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" :disabled="!valid" @click="updateUser">
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import UserDetails from "@/components/UserDetails.vue";
import api, { NewUser, UserData } from "@/services";
import Vue from "vue";

export default Vue.extend({
  name: "HomeView",
  mounted() {
    document.title = this.$store.state.username;
  },
  data: () => ({
    newUser: new NewUser(),
    valid: true,
    loading: false,
    requiredField: [(v: string) => !!v || "This field is required"],
  }),
  methods: {
    getUser(user: UserData) {
      this.newUser.name = user.name;
      this.newUser.email = user.email;
      this.newUser.phone = user.phone;
    },
    async updateUser() {
      const form = this.$refs.form as HTMLFormElement;
      if (form.validate()) {
        this.loading = true;
        await api
          .updateUser(this.newUser, this.$store.state.userId)
          .then(() => {
            this.$store.dispatch("toast/showToast", {
              message: "Updated profile",
            });
            form.reset();
          })
          .catch(() =>
            this.$store.dispatch("toast/showToast", {
              message: "Error while updating profile",
              color: "error",
            })
          );
        this.loading = false;
        const detailsCmp = this.$refs.detailsComp as any;
        detailsCmp.fetchUser(this.$store.state.userId);
      }
    },
  },
  components: { UserDetails },
});
</script>
