<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
        <q-toolbar-title>Dakje</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawerLeft" bordered>
      <div class="text-h3 text-center text-primary q-my-md">Dakje</div>

      <q-separator />

      <q-list padding>
        <q-item>
          <q-item-section>
            <q-file
              v-model="upload"
              borderless
              label="Upload file"
              @update:v-model="uploadFile"
              @change="uploadFile"
            >
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
import Download from "components/Download.vue";

export default {
  components: {
    Download,
  },
  data() {
    return {
      upload: null,
      drawerLeft: false,
    };
  },
  methods: {
    uploadFile() {
      let file = this.upload;
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        console.log(evt.target.result);
        document.getElementById("typearea").innerHTML = evt.target.result;
      };
      reader.onerror = (evt) => {
        console.error(evt);
      };
      this.toggleLeftDrawer();
    },
  },
};
</script>
