<template>
  <v-card>
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
            <v-list-item-title>deleted_at</v-list-item-title>
            <v-list-item-subtitle>{{ task.deleted_at }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { TaskData } from "@/services";

export default defineComponent({
  props: {
    task: { type: Object as PropType<TaskData>, required: true },
  },
});
</script>
