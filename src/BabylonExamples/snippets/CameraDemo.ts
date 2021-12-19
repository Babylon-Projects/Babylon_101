import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  CubeTexture,
  SceneLoader,
  AbstractMesh,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class CameraDemo {
  scene: Scene;
  engine: Engine;
  watch: AbstractMesh;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.CreateCamera();

    this.engine.displayLoadingUI();

    this.CreateWatch();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/xmas_bg.env",
      scene
    );

    envTex.gammaSpace = false;

    scene.environmentTexture = envTex;

    scene.createDefaultSkybox(envTex, true, 1000, 0.25);

    return scene;
  }

  CreateCamera(): void {
    const camera = new FreeCamera("camera", new Vector3(0, 0, -2), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
  }

  async CreateWatch(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "Vintage_Watch.glb"
    );

    this.watch = meshes[0];

    this.engine.hideLoadingUI();
  }
}
