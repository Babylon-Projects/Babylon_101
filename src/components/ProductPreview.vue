<template>
  <main>
    <header>
      <h1>TIMELESS</h1>
    </header>
    <section>
      <canvas></canvas>
      <div id="productDetails">
        <h3>Avventura Vintage Gold Pocket Watch</h3>
        <p id="price">$1,195</p>

        <div id="description">
          <h4>Description</h4>

          <p>
            Beautiful 9 Karat Gold pocket watch suitable for any occasion. This
            vintage piece was made in 1910 and includes an inscription of the
            watch maker on the back for added authenticity.
          </p>

          <p>
            Original glass face with intricate ornamental design and classic
            Roman numerals. The perfect gift to be handed down through the ages.
          </p>
          <br />

          <b>Dimensions</b>
          <p>
            1.25" width of the watch 1.75" height with bow 23.52 grams weight
          </p>
        </div>

        <button>ADD TO CART</button>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import { CameraMechanics } from "@/BabylonExamples/CameraMechanics";
export default {
  name: "ProductPreview",
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    new CameraMechanics(canvas);
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=PT+Serif:ital@1&family=Raleway:wght@300&family=Roboto+Condensed&display=swap");
main {
  background: white;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    45deg,
    rgb(255, 255, 255),
    rgb(255, 255, 255) 30px,
    #f7f6f6 30px,
    #f7f6f6 80px
  );

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

header {
  width: 100%;
  height: 4rem;
  background: white;
  font-family: "Roboto Condensed";
  font-weight: 400;
  color: rgb(37, 37, 37);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  border-bottom: 1px solid rgb(175, 175, 175);
}

h1 {
  font-size: 2rem;
  letter-spacing: 10px;
}

h3,
h4 {
  font-family: "PT Serif";
  width: 100;
}

#price {
  font-family: "Raleway";
  font-size: 1rem;
}

section {
  width: 80%;
  height: 70%;
  background: white;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  border-radius: 4px;
  box-shadow: 1px 8px 5px -7px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 1px 8px 5px -7px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 1px 8px 5px -7px rgba(0, 0, 0, 0.5);
}

canvas {
  width: 70%;
  height: 100%;
  background: none;
  border-radius: 4px;
  border: none;
  outline: none;
}

#productDetails {
  width: 30%;
  height: 100%;
  background: white;
  font-family: "Raleway";
  padding: 1rem;
}

#description {
  width: 100%;
  height: 70%;
  background: none;
  margin-top: 2rem;
}

button {
  width: 100%;
  height: 2rem;
  background: black;
  font-family: "Roboto Condensed";
  font-size: 1rem;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
