<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text">JSON File</span>
    </div>
    <div class="custom-file">
      <input type="file" class="custom-file-input" aria-describedby="inputGroupFileAddon01" @change="loadFile">
      <label class="custom-file-label">Choose file</label>
    </div>
  </div>
</template>

<script>
// import fs from 'fs'
export default {
  methods: {
    loadFile (e) {
      this.$emit('onFileSelected', e.target.files[0]);
    },
  },
};
</script>