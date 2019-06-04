<template>
    <div class="container">
        <div v-for="child in file.values" :key="child.name">
            <translatorChild :file="child" />
        </div>
    </div>
</template>

<script lang="js">
import translatorChild from './translator-child.vue';
export default {
    name: 'translator',
    components: {
        translatorChild,
    },
    props: {
        file: Object,
    },
};
</script>
