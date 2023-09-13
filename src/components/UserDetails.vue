<template>
  <v-card>
    <v-card-title>{{ user.name }}</v-card-title>
    <v-card-text two-line>
      <v-list>
        <v-list-item>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-list-item-icon v-on="on">
                <v-badge :color="mailVerified ? 'success' : 'warning'" dot>
                  <v-icon>mdi-email</v-icon>
                </v-badge>
              </v-list-item-icon>
            </template>
            {{
              mailVerified
                ? `verified at: ` +
                  new Date(user.email_verified_at).toUTCString()
                : `not verified`
            }}
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Account created on</v-list-item-title>
            <v-list-item-subtitle>{{
              new Date(user.created_at).toUTCString()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Last account update</v-list-item-title>
            <v-list-item-subtitle>{{
              new Date(user.updated_at).toUTCString()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon>mdi-phone</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Phone number</v-list-item-title>
            <v-list-item-subtitle>{{ user.phone }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon></v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>status</v-list-item-title>
            <v-list-item-subtitle>{{ user.status }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon></v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>admin</v-list-item-title>
            <v-list-item-subtitle>{{ user.admin }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon></v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>deleted_at</v-list-item-title>
            <v-list-item-subtitle>{{ user.deleted_at }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

interface UserData {
  name: string;
  email: string;
  email_verified_at: [string, null];
  created_at: string;
  updated_at: string;
  phone: string;
  status: string;
  admin: string;
  deleted_at: string;
}

export default defineComponent({
  props: {
    user: { type: Object as PropType<UserData>, required: true },
  },
  computed: {
    mailVerified(): boolean {
      return this.user.email_verified_at !== null;
    },
  },
});
</script>
