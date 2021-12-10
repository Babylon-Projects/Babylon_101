<template>
  <main :class="[isLoaded ? 'loaded' : '', 'loader']">
    <div id="animationContainer">
      <p>{</p>
      <p>CS</p>
      <p>}</p>
    </div>
    <h2>Loading</h2>
  </main>
</template>


<script lang='ts'>
export default {
  name: "LoadingScreen",
  props: ["isLoaded"],
  watch: {
    isLoaded() {
      setTimeout(() => {
        document
          .getElementsByClassName("loader")[0]
          .setAttribute("style", "display:none");
      }, 1000);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500&family=Roboto+Condensed&family=Roboto:wght@100;700&display=swap");
.loader {
  width: 100%;
  height: 100%;
  background: rgb(27, 27, 27);
  color: #fff;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.loaded {
  width: 100%;
  height: 100%;
  background: rgb(27, 27, 27);
  color: #fff;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease;
}

#animationContainer {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  width: 15%;
  font-size: 6rem;
  font-family: "Oswald";
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
}

p:nth-child(1) {
  color: rgb(0, 129, 70);
  animation: pulse 0.5s alternate infinite ease-in-out;
  font-weight: 400;
  justify-content: flex-end;
}

p:nth-child(2) {
  font-size: 5.25rem;
  animation: pulseFade 0.5s alternate infinite ease-in-out;
}

p:nth-child(3) {
  color: rgb(0, 129, 70);
  justify-content: flex-start;
  animation: pulse 0.5s alternate infinite ease-in-out 0.5s;
}

h2 {
  margin: 0.25rem;
  font-family: "Oswald";
  font-weight: 200;
}

@keyframes pulse {
  to {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

@keyframes pulseFade {
  to {
    opacity: 0.5;
  }
}
</style> 