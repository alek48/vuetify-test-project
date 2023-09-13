<template>
  <v-card>
    <v-card-title> New User </v-card-title>
    <v-card-content>
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-row>
            <v-col cols="auto">
              <v-text-field
                v-model="newUser.name"
                label="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="newUser.email"
                label="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="newUser.phone"
                label="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="newUser.password"
                label="email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-content>
    <v-card-actions>
      <v-btn color="success">Submit</v-btn>
      <v-btn color="error">Clear</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NewUser } from "@/services";

export default defineComponent({
  data: () => ({
    valid: true,
    newUser: {} as NewUser,
  }),
});
</script>
