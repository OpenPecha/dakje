<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-transparent">
      <Header />

      <q-btn
        v-show="profileModeOn"
        dense
        flat
        icon="arrow_back"
        color="primary"
        @click="toggleToEditorMode"
      />

      <q-btn
        v-show="profileModeOn"
        dense
        flat
        no-caps
        label="Show Profile"
        color="primary"
        @click="toggleRightDrawer"
      />
    </q-header>

    <q-drawer v-model="rightDrawerOpen" class="q-pa-md" side="right" overlay>
      <ProfilerDashboard v-if="profileModeOn" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import Header from "components/Header.vue";
import ProfilerDashboard from "components/ProfilerDashboard.vue";
import { mapState } from "vuex";


export default {
  name: "MainLayout",

  components: {
    Header,
    ProfilerDashboard
  },

  computed: {
    ...mapState("profiler", ["profileModeOn"]),
    rightDrawerOpen: {
      get() {
        return this.$store.state.base.rightDrawerOpen;
      },
      set(value) {
        this.$store.commit("base/setRightDrawerOpen", value);
      },
    },
  },

  methods: {
    toggleRightDrawer() {
      this.$store.dispatch("base/toggleRightDrawer");
    },

    toggleToEditorMode() {
      this.$store.commit("profiler/toggleProfileMode");
    },
  },
};
</script>
