<template>
  <span :style="{ color: word.color }">{{ word.form }}</span
  ><span class="awhitespace">{{ " " }}</span>
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
