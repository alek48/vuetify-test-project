<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title> Task - {{ newTask.task }} </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="auto">
              <v-text-field
                v-model="newTask.task"
                label="Task name"
                :rules="requiredField"
                required
              ></v-text-field>
              <div class="d-inline-flex">
                <v-menu
                  ref="time_menu"
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
                      :rules="requiredField"
                      required
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
                <v-menu
                  v-model="showDeadlineTimepicker"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on, attr }">
                    <v-text-field
                      v-model="newTask.dead_line_time"
                      label="Deadline time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                      v-bind="attr"
                      :rules="requiredField"
                      required
                    >
                    </v-text-field>
                  </template>
                  <v-time-picker
                    color="accent"
                    v-model="newTask.dead_line_time"
                    no-title
                    format="24hr"
                    v-if="showDeadlineTimepicker"
                    @click:minute="showDeadlineTimepicker = false"
                    transition="scale-transition"
                  ></v-time-picker>
                </v-menu>
              </div>
              <v-text-field
                v-model="newTask.user_id"
                label="User ID"
                :rules="requiredField"
                required
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="newTask.specialization_id"
                label="Specialization ID"
                :rules="requiredField"
                required
                type="number"
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

import api, { NewTask } from "@/services";

export default defineComponent({
  data: () => ({
    valid: true,
    newTask: new NewTask(),
    requiredField: [(v: string) => !!v || "This field is required"],
    loading: false,
    showDeadlineDatepicker: false,
    showDeadlineTimepicker: false,
  }),
  methods: {
    async submitForm() {
      console.log(this.newTask);
      var form = this.$refs.form as HTMLFormElement;
      if (form.validate()) {
        this.loading = true;
        api.postNewTask(this.newTask).then(() => {
          this.loading = false;
          form.reset();
        });
      }
    },
    clearForm() {
      console.log(this.newTask);
      var form = this.$refs.form as HTMLFormElement;
      form.reset();
    },
  },
});
</script>
