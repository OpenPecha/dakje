<template>
  <q-toolbar :class="className">
    <q-btn
      dense
      flat
      round
      icon="menu"
      aria-label="Menu"
      :title="$t('Toggle Menu')"
      @click="$emit('toggleMenu')"
    />
    <q-separator class="q-mr-md" vertical inset />

    <q-btn
      dense
      flat
      rouned
      :title="$t('Analyze Text')"
      icon="insert_chart_outlined"
      @click="profile"
    />
  </q-toolbar>
</template>

<script>
export default {
  name: "Navbar",
  emits: ["toggleMenu"],

  computed: {
    className() {
      return this.$q.dark.isActive
        ? "bg-dark-page text-grey-6 shadow-dark-page"
        : "bg-white text-grey-7 shadow-white";
    },
  },

  methods: {
    profile() {
      this.$store.dispatch("profiler/profileContent");
    },
  },
};
</script>

<style lang="sass" scoped></style>
