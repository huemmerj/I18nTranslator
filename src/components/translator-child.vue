<template>
    <div >
        <div class="row">
            <div class="col-1">
                <button class="btn btn-primary m-0 p-0"><i class="fas fa-plus-square m-1"></i></button>
            </div>
            <!-- Name -->
            <div class="col-3 d-flex justify-content-start">
                {{ file.name }}
            </div>

            <!-- Value( falls vorhanden ) -->
            <div 
                class="col-4 d-flex justify-content-start"
                v-if="file.value">
                {{ file.value }}
            </div>
            <!-- Übersetzter Value (falls Value vorhanden)-->
            <div 
                v-if="file.value"
                class="col-4 d-flex justify-content-start">
                <input type="text" v-model="file.translated" />
            </div>
        </div>
        <!-- Kinder, falls vorhanden (es ist entweder ein value oder kinder vorhanden
         => kinder heist es ist ein "Ordner" mit mehreren Values-->
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
