<template>
<q-layout view="hHr Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Dakje </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated>
      <div class="text-h3 text-center text-primary q-my-md">Dakje</div>

      <q-separator/>

      <q-list padding>
        <q-item>
          <q-item-section>
          <q-file
            v-model="upload"
            borderless
            label="Upload file"
            @update:v-model="uploadFile"
            v-on:change="uploadFile"
          >
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
            <template #prepend>
              <q-icon name="upload" />
            </template>
          </q-file>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <download />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import Download from '../components/Download.vue';

export default {

  components: {
    Download,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      upload: ref(null),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  methods: {
    uploadFile() {
      let file = this.upload;
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = evt => {
        console.log(evt.target.result);
        document.getElementById('typearea').innerHTML = evt.target.result;
      }
      reader.onerror = evt => {
        console.error(evt);
      }
      this.toggleLeftDrawer();
    },
  }
};
</script>
