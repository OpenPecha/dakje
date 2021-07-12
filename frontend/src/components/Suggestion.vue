<template>
<div>
    <div class="suggestion">

        {{name}}

        <div v-for="(i,index) in candidates[0]" :key=i>
            <q-btn @click="update(index)" />
            {{i}}
        </div>

    </div>
</div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true,
        },
        suggestionIndex: {
            type: Number,
            required: true,
        },
        candidates: {
            type: Array,
            required: true,
        }
    },

    data() {
        return {
            selected: this.id,
            index: this.suggestionIndex,
        }
    },

    methods: {
        update(key) {
            this.$emit('selectCorrection', [this.selected, key, this.index]);
        }
    }
}
</script>

<style scoped>
.suggestion {
    padding: 1rem;
    border: 1px solid #cccc
}
</style>
