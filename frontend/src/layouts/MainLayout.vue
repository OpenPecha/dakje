<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="bg-transparent">
      <Navbar @toggleMenu="onToggleMenu" />
    </q-header>

    <q-drawer
      v-model="menuOpen"
      mini-to-overlay
      bordered
      :mini="menuMini"
      @mouseover="menuMini = false"
      @mouseout="menuMini = true"
    >
      <Sidebar
        @about="onAbout"
        @newFile="onNewFile"
        @openFile="onOpenFile"
        @saveFile="onSaveFile"
        @saveFileAs="onSaveFileAs"
        @importFile="onImportFile"
        @exportFileAs="onExportFileAs"
        @printFile="onPrintFile"
        @settings="onSettings"
        @exit="onExit"
      />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from "components/Navbar.vue";
import Sidebar from "components/Sidebar.vue";

export default {
  name: "MainLayout",

  components: {
    Navbar,
    Sidebar,
  },

  data() {
    return {
      menuMini: true,
    };
  },

  computed: {
    menuOpen: {
      get() {
        return this.$store.state.base.menuOpen;
      },
      set() {
        this.$store.commit("base/toggleMenu");
      },
    },
  },

  methods: {
    onToggleMenu() {
      this.$store.commit("base/toggleMenu");
    },

    onAbout() {
      //
    },

    onNewFile() {
      this.$store.dispatch("editor/newFile");
    },

    onOpenFile() {
      //
    },

    onSaveFile() {
      this.$store.dispatch("editor/saveFile");
    },

    onSaveFileAs() {
      //
    },

    onImportFile() {
      //
    },

    onExportFileAs() {
      //
    },

    onPrintFile() {
      //
    },

    onSettings() {
      //
    },

    onExit() {
      //
    },
  },
};
</script>
