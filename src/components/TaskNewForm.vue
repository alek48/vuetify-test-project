<template>
  <span>
    <AlertBox :alert_text="alert_text" v-if="loading_fail"></AlertBox>
    <v-card :loading="loading" :disabled="loading">
      <v-card-title> New Task </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="auto">
                <v-text-field
                  v-model="newTask.task"
                  label="Task name"
                  :rules="[requiredField]"
                  required
                ></v-text-field>
                <div class="d-inline-flex">
                  <v-menu
                    ref="time_menu"
                    v-model="showDeadlineDatepicker"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on, attr }">
                      <v-text-field
                        v-model="newTask.dead_line_date"
                        label="Deadline date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                        v-bind="attr"
                        :rules="[requiredField]"
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
                        :rules="[requiredField]"
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
                <v-select
                  :items="usersOptions"
                  item-text="name"
                  item-value="id"
                  v-model="newTask.user_id"
                  label="Assigned User"
                  :rules="[requiredField]"
                ></v-select>
                <v-select
                  :items="specsOptions"
                  item-text="name"
                  item-value="id"
                  v-model="newTask.specialization_id"
                  label="Specialization"
                  :rules="[requiredField]"
                ></v-select>
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

import api, { NewTask } from "@/services";

import AlertBox from "./AlertBox.vue";
import store from "@/store";

export default defineComponent({
  data: () => ({
    valid: true,
    newTask: new NewTask(),
    requiredField: (v: string) => (v ? true : "This field is required"),
    loading: false,
    showDeadlineDatepicker: false,
    showDeadlineTimepicker: false,
    loading_fail: false,
    alert_text: "",
    usersOptions: [],
    specsOptions: [],
  }),
  created() {
    api
      .getSpecializationsToCache()
      .then(() => (this.specsOptions = this.$store.state.cache.specializations))
      .catch(() =>
        store.dispatch("toast/showToast", {
          message: "Couldn't load specializations to cache",
        })
      );
    api
      .getUsers()
      .then(() => (this.usersOptions = this.$store.state.cache.users))
      .catch(() =>
        store.dispatch("toast/showToast", {
          message: "Couldn't load users to cache",
        })
      );
  },
  methods: {
    async submitForm() {
      var form = this.$refs.form as HTMLFormElement;
      if (form.validate()) {
        this.loading = true;
        this.loading_fail = false;
        api
          .postNewTask(this.newTask)
          .then(() => {
            this.loading = false;
            form.reset();
            this.$store.dispatch("toast/showToast", {
              message: "Task added successfully",
            });
          })
          .catch((err) => {
            this.loading = false;
            this.loading_fail = true;
            this.alert_text = err.message + ": Adding task failed";
          });
      }
    },
    clearForm() {
      var form = this.$refs.form as HTMLFormElement;
      form.reset();
    },
  },
  components: { AlertBox },
});
</script>
