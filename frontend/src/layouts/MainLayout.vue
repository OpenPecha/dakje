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
  components: {
    Navbar,
    Sidebar,
  },

  data() {
    return {
      menuOpen: false,
      menuMini: true,
      upload: null,
    };
  },

  methods: {
    onToggleMenu() {
      this.menuOpen = true;
    },

    onAbout() {
      //
    },

    onNewFile() {
      //
    },

    onOpenFile() {
      //
    },

    onSaveFile() {
      //
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
