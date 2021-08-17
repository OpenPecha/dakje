<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { store } from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default {
  name: "App",
  store,
};
</script>
