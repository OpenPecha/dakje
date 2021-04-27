<template>
<button class="download" @click="createDoc()">Download</button>
</template>

<script>
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default {
  methods: {
    createDoc() {
      const doc = new Document({
      sections: [{
          properties: {},
          children: [
              new Paragraph({
                  children: [
                      new TextRun(document.getElementById('typearea').innerText),
                    ],
                }),
              ],
          }],
      });

      // Used to export the file into a .docx file
      Packer.toBlob(doc).then((blob) => {
          saveAs(blob, "test.docx")
      });
    },
  }
}

</script>

<style scoped>
</style>