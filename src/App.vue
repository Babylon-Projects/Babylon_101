<template>
<div id="app">
  <BabylonExamples />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BabylonExamples from './components/BabylonExamples.vue';

export default defineComponent({
  name: 'App',
  components: {
    BabylonExamples
  }
});
</script>

<style>
* {
  padding:0;
  margin:0;
  background-image: url("../public/images/Background_Dots.png");   
  background-size: cover;
  background-position:center;
}

#app {
  width:100%;
  height:100%; 
  display:flex;
  justify-content: center;
  align-items: center; 
  margin-top:4rem;
}



</style>
