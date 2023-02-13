<template>
  <div>
    <div class="text-h6">ཚིག་གྲུབ།</div>
    <div>
      <div>
        <span class="text-weight-light">ཚིག་གྲུབ་གྲངས།:</span>
        {{ totalNumSentences }}
      </div>
      <div>
        <span class="text-weight-light">ཚིག་གྲུབ་ཀྱི་ཆ་སྙོམས་རིང་ཚད།:</span>
        {{ avgSentenceLength }} ཚིག
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
