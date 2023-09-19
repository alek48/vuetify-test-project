<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>{{ task.task }}</v-card-title>
    <v-card-text two-line>
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-file-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Task added on</v-list-item-title>
            <v-list-item-subtitle>
              {{ new Date(task.created_at).toUTCString() }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-file-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Last task update</v-list-item-title>
            <v-list-item-subtitle>
              {{ new Date(task.updated_at).toUTCString() }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Deadline</v-list-item-title>
            <v-list-item-subtitle>{{ task.dead_line }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon></v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>status</v-list-item-title>
            <v-list-item-subtitle>{{ task.status }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon></v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>specialization</v-list-item-title>
            <v-list-item-subtitle>
              {{ task.specialization_id }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon></v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Assigned user</v-list-item-title>
            <v-list-item-subtitle>{{ userName }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn v-if="!modify" color="accent" @click="modify = !modify">
              Change user
            </v-btn>
            <div class="d-flex" v-else>
              <v-text-field
                label="new userID"
                type="number"
                v-model="newId"
              ></v-text-field>
              <v-btn icon color="success" @click="updateTask">
                <v-icon>mdi-check-circle</v-icon>
              </v-btn>
              <v-btn icon color="warning" @click="modify = !modify">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import api, { TaskData } from "@/services";

export default defineComponent({
  props: {
    task: { type: Object as PropType<TaskData>, required: true },
  },
  data: () => ({
    userName: "",
    modify: false,
    loading: false,
    newId: 0,
  }),
  created() {
    this.fetchUserName();
  },
  methods: {
    async fetchUserName() {
      this.loading = true;
      await api
        .getUserById(this.task.user_id)
        .then((response) => (this.userName = response.data.name))
        .catch((err) =>
          this.$store.dispatch("toast/showToast", {
            message: err + ": couldn't load all data",
          })
        );
      this.loading = false;
    },
    async updateTask() {
      this.loading = true;
      var task = this.$props.task;
      task.user_id = this.newId;
      await api
        .postUpdatedTask(task)
        .then(() => {
          this.$store.dispatch("toast/showToast", {
            message: "Task succesfully updated",
          });
        })
        .catch((err) =>
          this.$store.dispatch("toast/showToast", {
            message: err + ": Couldn't update task",
          })
        );
      this.modify = false;
      this.$emit("change");
      this.fetchUserName();
    },
  },
  watch: {
    task() {
      this.modify = false;
      this.fetchUserName();
    },
  },
});
</script>
