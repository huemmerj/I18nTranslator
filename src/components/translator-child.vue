<template>
    <div >
        <div class="row">
            <div class="col-3 d-flex justify-content-start">
                {{ file.name }}
            </div>
            <div 
                class="col-4 d-flex justify-content-start"
                v-if="file.value">
                {{ file.value }}
            </div>
            <div 
                v-if="file.value"
                class="col-4 d-flex justify-content-start">
                <input type="text" v-model="file.translated" />
            </div>
        </div>
        <div 
            v-for="child in file.values"
            :key="child.name">
            <translatorChild :file="child" class="ml-5" />
        </div>
    </div>
</template>

<script lang="js">
import translatorChild from './translator-child.vue';

export default {
    name: 'translatorChild',
    components: {
        translatorChild,
    },
    props : ['file'],
    created () {
        return true;
    },
};
</script>
