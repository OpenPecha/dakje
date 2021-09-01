<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="bg-transparent">
      <Navbar @toggleMenu="onToggleMenu" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated>
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
import Navbar from "components/Navbar.vue";

export default {
  components: {
    Download,
    Navbar,
  },

  data() {
    return {
      leftDrawerOpen: false,
      upload: null,
    };
  },

  methods: {
    onToggleMenu() {
      this.leftDrawerOpen = true;
    },

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
