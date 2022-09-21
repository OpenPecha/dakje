<template>
  <span :style="{ color: word.color, 'margin-right': '1.2rem' }">{{ word.form }}</span>
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
