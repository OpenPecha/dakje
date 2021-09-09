<template>
  <q-list>
    <q-item header>
      <q-item-section avatar>
        <q-avatar class="full-width text-center">
          <img
            src="~assets/logo.svg"
            class="cursor-pointer"
            :title="$t('Home')"
            @click="$emit('about')"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-h4">Dakje</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item v-ripple clickable :title="$t('Create a new file')" @click="$emit('newFile')">
      <q-item-section avatar>
        <q-icon name="add_circle" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("New...") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-ripple
      clickable
      :title="$t('Open an existing file')"
      @click="$emit('openFile')"
    >
      <q-item-section avatar>
        <q-icon name="folder_open" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Open") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-ripple clickable :title="$t('Save your work')" @click="$emit('saveFile')">
      <q-item-section avatar>
        <q-icon name="save" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Save") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-ripple
      clickable
      :title="$t('Save to destination')"
      disable
      @click="$emit('saveFileAs')"
    >
      <q-item-section avatar>
        <q-icon name="move_to_inbox" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Save as") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item
      v-ripple
      clickable
      :title="$t('Import from other formats')"
      disable
      @click="$emit('importFile')"
    >
      <q-item-section avatar>
        <q-icon name="cloud_upload" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Import") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-ripple
      clickable
      :title="$t('Export to another format')"
      disable
      @click="$emit('exportFileAs')"
    >
      <q-item-section avatar>
        <q-icon name="cloud_download" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Export") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-ripple
      clickable
      disable
      :title="$t('Print your work')"
      @click="$emit('printFile')"
    >
      <q-item-section avatar>
        <q-icon name="print" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Print") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item
      v-ripple
      clickable
      :title="$t('Adjust to your taste')"
      disable
      @click="$emit('settings')"
    >
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Settings") }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator v-if="$q.platform.is.electron" />
    <q-item
      v-if="$q.platform.is.electron"
      v-ripple
      clickable
      disable
      :title="$t('Close the application')"
      @click="$emit('exit')"
    >
      <q-item-section avatar>
        <q-icon name="exit_to_app" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("Exit") }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "Siebar",
  emits: [
    "about",
    "newFile",
    "openFile",
    "saveFile",
    "saveFileAs",
    "importFile",
    "exportFileAs",
    "printFile",
    "settings",
    "exit",
  ],

  computed: {
    appInfo() {
      return this.$store.getters["base/appInfo"];
    },
  },
};
</script>
