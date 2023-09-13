<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title> Task </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="auto">
              <v-text-field
                v-model="newTask.task"
                label="Name"
                :rules="requiredField"
                required
              ></v-text-field>
              <v-menu
                v-model="showDeadlineDatepicker"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attr }">
                  <v-text-field
                    v-model="newTask.dead_line_date"
                    label="Deadline date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    v-bind="attr"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  color="accent"
                  v-model="newTask.dead_line_date"
                  no-title
                  scrollable
                ></v-date-picker>
              </v-menu>

              <v-input>dead_line - datetime</v-input>
              <v-input>user_id - number</v-input>
              <v-input>specialization_id - number</v-input>
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
import api, { NewTask } from "@/services";

export default defineComponent({
  data: () => ({
    valid: true,
    newTask: {} as NewTask,
    requiredField: [(v: string) => !!v || "This field is required"],
    loading: false,
    showDeadlineDatepicker: false,
  }),
  methods: {
    async submitForm() {
      this.$refs.form.validate(); // no idea how to fix linting here
      if (this.valid) {
        this.loading = true;
        // TODO
        this.loading = false;
      }
    },
    clearForm() {
      this.$refs.form.reset(); // no idea how to fix linting here
    },
  },
});
</script>
