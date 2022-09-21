<template>
  <span :style="{ color: word.color }">{{ word.form }}</span
  ><span style="width: 1.2rem">{{ "      " }}</span>
</template>

<script>
export default {
  name: "Word",
  props: {
    word: {
      type: Object,
      required: true,
    },
  },
};
</script>
