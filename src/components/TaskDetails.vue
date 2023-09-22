<template>
  <v-card :loading="loading" :disabled="loading" width="fit-content">
    <v-card-title>{{ task.task }}</v-card-title>
    <v-card-text two-line>
      <v-list>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-file-plus</v-icon></v-list-item-icon>
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
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-list-item-icon v-on="deadlineClose ? on : undefined">
                <v-badge
                  :value="deadlineClose"
                  overlap
                  :color="relativeHours() < 0 ? 'error' : 'warning'"
                  icon="mdi-exclamation-thick"
                >
                  <v-icon>mdi-calendar-clock</v-icon>
                </v-badge>
              </v-list-item-icon>
            </template>
            {{
              relativeHours() < 0
                ? "This task has missed deadline"
                : "Deadline is less than 2 days away"
            }}
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>Deadline</v-list-item-title>
            <v-list-item-subtitle>
              {{ task.dead_line }} -
              {{ relativeTime() }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon></v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Finished?</v-list-item-title>
            <v-list-item-subtitle>
              {{ task.status ? "Yes" : "No" }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="accent" @click="changeStatus">
              {{ task.status ? "Reopen task" : "Finish task" }}
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon></v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>specialization</v-list-item-title>
            <v-list-item-subtitle>
              {{ specName }}
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
              <v-autocomplete
                :items="usersOptions"
                item-text="name"
                item-value="id"
                v-model="newId"
              >
              </v-autocomplete>
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
    <v-card-actions>
      <v-btn color="error" @click="deleteTask">Delete task</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import api, { TaskData } from "@/services";
import { UserCachedData, SpecCachedData } from "@/store/modules/cache";

export default defineComponent({
  props: {
    task: { type: Object as PropType<TaskData>, required: true },
  },
  data: () => ({
    userName: "",
    specName: "",
    modify: false,
    loading: false,
    newId: 0,
    usersOptions: [],
  }),
  created() {
    this.updateFromCache();
    this.usersOptions = this.$store.state.cache.users;
    this.newId = this.task.user_id;
  },
  computed: {
    deadlineClose(): boolean {
      return this.relativeHours() < 48 && this.task.status === 0;
    },
  },
  methods: {
    async updateFromCache() {
      this.userName = this.$store.state.cache.users.find(
        (u: UserCachedData) => u.id === this.task.user_id
      ).name;
      this.specName = this.$store.state.cache.specializations.find(
        (s: SpecCachedData) => s.id === this.task.specialization_id
      ).name;
    },
    async updateTask() {
      this.loading = true;
      var task = this.$props.task;
      task.user_id = this.newId;
      api
        .postUpdatedTask(task)
        .then(() => {
          this.$store.dispatch("toast/showToast", {
            message: "Task succesfully updated",
          });
          this.modify = false;
          this.$emit("change");
          this.updateFromCache();
          this.loading = false;
        })
        .catch((err) => {
          this.$store.dispatch("toast/showToast", {
            message: err + ": Couldn't update task",
            color: "error",
          });
          this.modify = false;
          this.loading = false;
        });
    },
    async deleteTask() {
      api
        .deleteTaskById(this.task.id)
        .then(() => {
          this.$store.dispatch("toast/showToast", { message: "Task deleted" });
          this.$emit("close");
        })
        .catch((err) =>
          this.$store.dispatch("toast/showToast", {
            message: err + ": Couldn't delete task",
          })
        );
    },
    relativeTime() {
      var duration = Date.parse(this.task.dead_line) - Date.now();
      var inPast = duration < 0;
      duration = Math.abs(duration);
      const days = Math.floor(duration / (24 * 60 * 60 * 1000));
      duration = duration % (24 * 60 * 60 * 1000);
      const hours = Math.floor(duration / (60 * 60 * 1000));
      duration = duration % (60 * 60 * 1000);
      const minutes = Math.floor(duration / (60 * 1000));
      const stringified = days
        ? days + " days"
        : hours + " hours " + minutes + " minutes";
      return inPast ? stringified + " ago" : "in " + stringified;
    },
    relativeHours() {
      var duration = Date.parse(this.task.dead_line) - Date.now();
      return duration / (1000 * 60 * 60);
    },
    async changeStatus() {
      this.loading = true;
      await api
        .updateTaskStatus(this.task.id)
        .then(() => {
          this.$store.dispatch("toast/showToast", {
            message: "Task succesfully updated",
          });
          this.loading = false;
          this.modify = false;
          this.$emit("close");
        })
        .catch((err) => {
          this.$store.dispatch("toast/showToast", {
            message: err + ": Couldn't update task",
          });
          this.loading = false;
          this.modify = false;
          this.$emit("close");
        });
    },
  },
  watch: {
    task() {
      this.modify = false;
      this.updateFromCache();
    },
  },
});
</script>
