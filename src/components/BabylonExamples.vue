<template>
<div>
<p>Baked Lighting</p>
<canvas></canvas>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {BakedLighting} from "@/BabylonExamples/BakedLighting"

export default defineComponent({
  name: 'BabylonExamples',
  mounted(){
    const canvas = document.querySelector("canvas")!;
    new BakedLighting(canvas);
  }
  
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Roboto:wght@100;700&display=swap');

div {
  width:70%;
  height:70%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:none;
}

p {
  color:white;
  background:none;
  margin-bottom:1rem;
 font-family: 'Roboto Condensed';
  font-weight: 400;
  font-size:2rem;
}

canvas {
  width:100%;
  height:100%;
  border:none;
  outline:none;
  box-shadow:8px 8px 10px -6px #000000;
}



</style>
