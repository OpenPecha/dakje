<template>
<div>
    <div>

        <div class="options">
            <div class="spelling"> {{name[this.id[1]]}} </div>

            <div v-for="(i,index) in candidates[0]" :key=i>
                <!-- didn't use q-btn because no customization -->
                <button label={candidates[0]} @click="update(index)">
                    {{i}}
                </button>
            </div>
            <div v-if="candidates[0].length == 0"> No Suggestions </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: Object,
            required: true,
        },
        candidates: {
            type: Array,
            required: true,
        }
    },

    data() {
        return {
            selected: this.id[2],
            index: this.id[1],
        }
    },
    methods: {
        update(key) {
            this.$emit('selectCorrection', [this.selected, key, this.index]);
        }
    }
}
</script>
