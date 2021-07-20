<template>
<div>
    <div class="suggestion">

        <div class="options">
            <div class="spelling"> {{name}} </div>

            <div v-for="(i,index) in candidates[0]" :key=i>
                <!-- didn't use q-btn because no customization -->
                <button label={candidates[0]} @click="update(index)">
                    {{i}}
                </button>
            </div>

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
    margin: 1em 1em 0 0;
    border: 1px solid #cccc

}
.spelling {
    padding: 3px;
    text-decoration: line-through;
    text-decoration-color: red;
}

.options {
    display: flex;
}
</style>
