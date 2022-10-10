<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent">
      <Header @toggleMenu="onToggleMenu" />
    </q-header>

    <q-drawer v-model="menuOpen" side="left" overlay bordered>
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
import { extractHTMLContent } from "src/utils/conversion";
import { importFile } from "src/utils/loadfile";

import Sidebar from "components/Sidebar.vue";
import Header from "src/components/Header.vue";

export default {
  name: "MainLayout",

  components: {
    Header,
    Sidebar,
  },

  data() {
    return {
      menuOpen: false,
    };
  },

  methods: {
    async showConfirmDlg(opts) {
      return new Promise((resolve, reject) => {
        try {
          this.$q
            .dialog(opts)
            .onOk((data) => resolve(data || true))
            .onCancel(() => resolve(false));
        } catch (err) {
          reject(err);
        }
      });
    },

    async confrimChangeDiscard() {
      const isChanged = this.$store.getters["editor/isChanged"];
      return (
        !isChanged ||
        (await this.showConfirmDlg({
          title: this.$t("There are unsaved changes"),
          message: this.$t("Do you confrim you want to discard them?"),
          cancel: true,
          persistent: true,
        }))
      );
    },

    onToggleMenu() {
      this.menuOpen = !this.menuOpen;
    },

    onAbout() {
      //
    },

    async onNewFile() {
      const confirmed = await this.confrimChangeDiscard();
      if (confirmed) {
        this.$store.dispatch("editor/newFile");
      }
    },

    async onOpenFile() {
      const confirmed = await this.confrimChangeDiscard();
      if (confirmed) {
        const file = await importFile(["text/html"]);
        this.$store.dispatch("editor/loadFile", {
          name: file.name,
          html: extractHTMLContent(file.content),
        });
      }
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
