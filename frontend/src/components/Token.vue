<template>
  <span style="color: blue">{{ token.form }}</span
  ><span class="awhitespace">{{ " " }}</span>
</template>

<script>
export default {
  name: "Token",
  props: {
    token: {
      type: Object,
      required: true,
    },
  },
};
</script>
