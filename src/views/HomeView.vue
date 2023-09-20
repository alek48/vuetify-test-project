<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="secondary">
          <v-card-title> Tasker </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            interdum enim eu auctor laoreet. Maecenas laoreet finibus porta.
            Suspendisse finibus venenatis urna id aliquam. Mauris iaculis, nulla
            ut iaculis aliquet, massa turpis luctus nibh, quis vehicula nunc
            nibh sed turpis. Cras nisi justo, tristique ac imperdiet ut, euismod
            id lectus. Praesent non eros at erat porttitor ornare sit amet
            ullamcorper odio. Nulla dignissim et sapien quis congue. Suspendisse
            in tempus arcu, nec tincidunt lectus. Quisque quis bibendum leo.
            Vestibulum eget nisl leo.
            <v-divider></v-divider>
            <v-skeleton-loader
              type="article, article, article"
              boilerplate
            ></v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8" v-if="$store.state.logged_in">
        <v-row>
          <v-col>
            <v-card color="secondary">
              <v-card-title>Tasks finished</v-card-title>
              <v-card-text>
                <div class="d-flex justify-space-around">
                  <div
                    class="d-flex flex-column align-center white--text text-h4"
                  >
                    <v-progress-circular
                      color="success"
                      size="130"
                      width="15"
                      rotate="-90"
                      :value="(100 * own_finished_tasks) / own_total_tasks"
                    >
                      <span class="white--text">
                        {{ own_finished_tasks }} / {{ own_total_tasks }}
                      </span>
                    </v-progress-circular>
                    <span class="text-h4">Your tasks</span>
                  </div>
                  <div
                    class="d-flex flex-column align-center white--text text-h4"
                  >
                    <v-progress-circular
                      color="info"
                      size="130"
                      width="15"
                      rotate="-90"
                      :value="(100 * finished_tasks) / total_tasks"
                    >
                      <span class="white--text">
                        {{ finished_tasks }} / {{ total_tasks }}
                      </span>
                    </v-progress-circular>
                    <span class="text-h4">Total tasks</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title> Your Tasks </v-card-title>
              <v-card-text>
                <TasksTable
                  :filter="$store.state.userId"
                  @taskStats="(e) => (ownTaskStats(e), getGlobalTaskStats())"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import TasksTable from "@/components/TasksTable.vue";
import Vue from "vue";

import api from "@/services/index";

export default Vue.extend({
  name: "HomeView",
  mounted() {
    document.title = "Dashboard";
  },
  async created() {
    this.getGlobalTaskStats();
  },
  data: () => ({
    total_tasks: 1,
    finished_tasks: 0,
    own_total_tasks: 1,
    own_finished_tasks: 0,
  }),
  methods: {
    ownTaskStats({ completed, total }: { completed: number; total: number }) {
      this.own_finished_tasks = completed;
      this.own_total_tasks = total;
    },
    async getGlobalTaskStats() {
      if (this.$store.state.logged_in) {
        api
          .getTasksStats()
          .then((response) => {
            var answer = response.data;
            const finished = Number(answer.ok);
            const in_progress = Number(answer.no);
            this.total_tasks = finished + in_progress;
            this.finished_tasks = finished;
          })
          .catch(() => {
            this.$store.dispatch("toast/showToast", {
              message: "Couldn't load task statistics",
            });
          });
      }
    },
  },
  components: { TasksTable },
});
</script>
