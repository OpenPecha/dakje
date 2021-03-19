<template>
<div class="suggestion">
    Suggestion {{ name }}
</div>
</template>

<script>
export default {
    props: ["name"]
}
</script>

<style scoped>
.suggestion {
    padding: 1rem;
    border: 1px solid #cccc
}
</style>