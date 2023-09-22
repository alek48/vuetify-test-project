<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card color="secondary">
          <v-card-title> Tasker </v-card-title>
          <v-card-text>
            Welcome to Tasker, a tool for keeping an eye on your team's tasks,
            deadlines, and status.
            <v-expansion-panels multiple :value="[0]">
              <v-expansion-panel>
                <v-expansion-panel-header color="primary">
                  News
                </v-expansion-panel-header>
                <v-expansion-panel-content color="primary">
                  We're in development! I'm using this space to test some
                  functionality and showcase how the layout works. In future we
                  can use this space to display some messages the can be of use
                  for users - info about new releases, current server status,
                  known bugs, etc.
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Patch notes</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-expansion-panels accordion>
                    <v-expansion-panel>
                      <v-expansion-panel-header color="secondary">
                        v0.3
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-list>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>Dashboard</v-list-item-title>
                              Added "Your timeline" - this chronological view
                              has two main sections displaying your tasks:
                              Before "Now" are only tasks that missed their
                              deadline, but are not completed yet. After "Now"
                              all tasks with future deadline are shown.
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header color="secondary">
                        v0.2
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-list>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>Dashboard</v-list-item-title>
                              "Tasks finished" moved towards the top.
                              <br />"Tasker" general tab received a new look and
                              structure.
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>Forms</v-list-item-title>
                              No more IDs, now replaced with drop-down selection
                              of available items.
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header color="secondary">
                        v0.1
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        initial release
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
        <v-card v-if="$store.state.logged_in" class="mt-5">
          <v-card-title> Your timeline </v-card-title>
          <v-card-text>
            <v-timeline dense>
              <v-timeline-item
                v-for="e in timeline"
                :key="e.name + e.date"
                right
                :icon="timelineIcon(e.type)"
                :color="timelineColor(e.type)"
                fill-dot
                :hide-dot="e.type === 'now'"
              >
                <span
                  :class="
                    e.type === 'now'
                      ? 'text-h6 font-weight-bold text--primary'
                      : 'text--primary'
                  "
                >
                  {{ truncate(e.name, 30) }}
                </span>
                <span class="text--disabled" v-if="e.type !== 'now'">
                  <br />
                  {{ e.date }}
                </span>
                <v-divider
                  v-else
                  class="mx-n12"
                  style="border-color: rgba(255, 255, 255, 0.8)"
                ></v-divider>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8" v-if="$store.state.logged_in">
        <v-card color="secondary">
          <v-card-title>Tasks finished</v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-around">
              <div class="d-flex flex-column align-center white--text text-h5">
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
              <div class="d-flex flex-column align-center white--text text-h5">
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

        <v-card class="mt-5">
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
  </v-container>
</template>

<script lang="ts">
import TasksTable from "@/components/TasksTable.vue";
import Vue from "vue";

import api, { TaskData } from "@/services/index";

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}

interface TimelineElem {
  name: string;
  date: string;
  type: string;
}

export default Vue.extend({
  name: "HomeView",
  mounted() {
    document.title = "Dashboard";
  },
  async created() {
    if (this.$store.state.logged_in) {
      this.getGlobalTaskStats();
      this.getTimelineEvents();
    }
  },
  data: () => ({
    total_tasks: 1,
    finished_tasks: 0,
    own_total_tasks: 1,
    own_finished_tasks: 0,
    timeline: new Array<TimelineElem>(),
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
    getTimelineEvents() {
      this.timeline.push({
        name: "Now",
        date: formatDate(new Date()),
        type: "now",
      });
      api
        .getTasks()
        .then((response) => {
          const tasks: TaskData[] = response.data.filter((v: TaskData) => {
            return (
              v.user_id === this.$store.state.userId &&
              (v.status === 0 ||
                Date.parse(v.dead_line) - Date.parse(Date()) > 0)
            );
          });
          for (const t of tasks) {
            this.timeline.push({
              name: t.task,
              date: t.dead_line,
              type:
                t.status === 1
                  ? "task-finished"
                  : Date.parse(t.dead_line) - Date.parse(Date()) < 0
                  ? "task-warning"
                  : "task",
            });
          }
          this.timeline = this.timeline.sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
          );
        })
        .catch((err) => {
          this.$store.dispatch("toast/showToast", {
            message: err + ": Couldn't load tasks to timeline",
            color: "warning",
          });
        });
    },
    timelineIcon(type: string) {
      switch (type) {
        case "task":
          return "mdi-text-box";
        case "task-finished":
          return "mdi-text-box-check";
        case "task-warning":
          return "mdi-alert-box";
        case "now":
          return "mdi-timer";
        default:
          return "";
      }
    },
    timelineColor(type: string) {
      switch (type) {
        case "task-warning":
          return "error";
        case "task-finished":
          return "success";
        case "now":
          return "accent";
        default:
          return "info";
      }
    },
    truncate(text: string, num: number) {
      if (text.length <= num) {
        return text;
      }
      return text.substring(0, num) + "...";
    },
  },
  components: { TasksTable },
});
</script>
