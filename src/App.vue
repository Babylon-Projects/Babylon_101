<template>
  <div id="app">
    <BabylonExamples />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BabylonExamples from "./components/BabylonExamples.vue";

export default defineComponent({
  name: "App",
  components: {
    BabylonExamples,
  },
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url("../public/images/Background_Dots.png");
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  padding: 2rem;
}
</style>
