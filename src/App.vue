<template>
    <button @click="isOpen = true">Open Editor</button>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="isOpen = false">&times;</span>
      <div>
        <EditorModal></EditorModal>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref } from 'vue';
import EditorModal from './EditorModal.vue';
 
const isOpen = ref(false);
</script>
 
<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
 
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
 
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
 
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>