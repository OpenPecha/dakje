<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default {
  name: "App",
};
</script>
