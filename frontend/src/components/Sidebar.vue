<template>
  <q-list>
    <q-item v-ripple clickable :title="$t('Create a new file')" @click="$emit('newFile')">
      <q-item-section avatar>
        <q-icon name="add_circle" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t("New...") }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "Siebar",
  emits: [
    "newFile",
  ],

  computed: {
    appInfo() {
      return this.$store.getters["base/appInfo"];
    },
  },
};
</script>
