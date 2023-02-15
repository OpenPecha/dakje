<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-white">
      <Header />
    </q-header>


    <q-drawer v-model="rightDrawerOpen" class="q-pa-md" side="right" overlay >
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
};
</script>

<style lang="scss">
.q-drawer-container >aside{
  top:130px;
}
</style>