<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <file-selector 
          class="col-4 offset-1" 
          @onFileSelected="loadFile"/>
        <file-selector 
          v-if="fileLoaded"
          class="col-4 offset-2" 
          @onFileSelected="loadTranslatedFile"/>
      </div>
      <div v-if="fileLoaded">
        <translator 
          :file="parsedFile" />
        <input v-model="fileName"/>
        <button 
          class="btn btn-primary m-3"
          @click="translate"> Übersetzen </button>
      </div>
    </div>
  </div>
</template>

<script lang="js">

import fileSelector from './components/fileSelector.vue';
import transaltor from './components/translator.vue';
import { getParsedArray, getTranslatedFile, generateTranslations } from './scripts/translator';


import FileSaver from 'file-saver';
export default {
  components: {
    'file-selector': fileSelector,
    'translator': transaltor,
  },
  data () {
    return {
      file: {},
      parsedFile: {},
      fileLoaded: false,
      translatedFile: {},
      fileName: '',
    };
  },
  methods: {

    // eine Datei zum übersetzen einlesen
    loadFile (file) {
      this.fileLoaded = false;
      const reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function () {
        return function (e) {
          try {
            this.file = JSON.parse(e.target.result);
            this.parsedFile = getParsedArray(this.file);
            this.fileLoaded = true;
          } catch (ex) {
            this.error = ex;
          }
        }.bind(this);
      }.bind(this))();
      reader.readAsText(file);
    },

    // die Fertige datei Downloaden
    translate () {
      this.translatedFile = getTranslatedFile(this.parsedFile);
      const blob = new Blob([JSON.stringify(this.translatedFile, null, 4)], {type: 'application/json; charset=utf8'});
      FileSaver.saveAs(blob, this.fileName);
    },

    // Eine schon übersetzte datei laden und values vorfüllen lassen
    loadTranslatedFile (file) {
      this.fileLoaded = false;
      const reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function () {
        return function (e) {
          try {
            generateTranslations(this.parsedFile, JSON.parse(e.target.result));
            this.fileLoaded = true;
          } catch (ex) {
            this.error = ex;
          }
        }.bind(this);
      }.bind(this))();
      reader.readAsText(file);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
