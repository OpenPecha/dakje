<template>
  <div>
    <div class="text-h6">Sentences</div>
    <div>
      <div>
        <span class="text-weight-light">Number of sentences:</span>
        {{ totalNumSentences }}
      </div>
      <div>
        <span class="text-weight-light">Average sentence length:</span>
        {{ avgSentenceLength }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ComponentName",
  computed: {
    ...mapGetters("profiler", ["totalNumSentences", "avgSentenceLength"]),
  },
};
</script>
