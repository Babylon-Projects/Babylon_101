<template>
<div>
<h1>PBR Materials</h1>
<canvas></canvas>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {PBR} from "@/BabylonExamples/PBR"

export default defineComponent({
  name: 'BabylonExamples',
  mounted(){
    const canvas = document.querySelector("canvas")!;
    new PBR(canvas);
  }
  
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div {
  width:70%;
  height:70%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:none;
}

h1 {
  color:white;
  background:none;
  margin-bottom:1rem;
}

canvas {
  width:100%;
  height:100%;
  border:none;
  outline:none;
  box-shadow:8px 8px 10px -6px #000000;
}



</style>
