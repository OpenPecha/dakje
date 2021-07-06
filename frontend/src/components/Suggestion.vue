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
    props: ['name', 'id', 'candidates'],

    data() {
        return {
            selected: this.id,
        }
    },

    methods: {
        update(key) {
            // this.$emit('selectCorrection', key);
            console.log(this.selected);
            console.log(key);
            // console.log(candidates[0]);
            this.$emit('selectCorrection', [this.selected, key]);
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
