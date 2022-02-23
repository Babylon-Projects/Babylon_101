import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  CubeTexture,
  SceneLoader,
  AnimationGroup,
  Animation,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class Cutscene {
  scene: Scene;
  engine: Engine;
  characterAnimations: AnimationGroup[];
  camera: FreeCamera;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateCharacter();
    this.CreateZombies();

    this.CreateCutscene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      scene
    );

    envTex.gammaSpace = false;

    envTex.rotationY = Math.PI / 2;

    scene.environmentTexture = envTex;

    scene.createDefaultSkybox(envTex, true, 1000, 0.25);

    this.camera = new FreeCamera("camera", new Vector3(10, 2, -10), this.scene);
    this.camera.minZ = 0.5;
    this.camera.speed = 0.5;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    await SceneLoader.ImportMeshAsync("", "./models/", "Prototype_Level.glb");
  }

  async CreateCharacter(): Promise<void> {
    const { meshes, animationGroups } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "character.glb"
    );

    meshes[0].rotate(Vector3.Up(), -Math.PI / 2);
    meshes[0].position = new Vector3(8, 0, -4);

    this.characterAnimations = animationGroups;

    this.characterAnimations[0].stop();
    this.characterAnimations[1].play();
  }

  async CreateZombies(): Promise<void> {
    const zombieOne = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "zombie_1.glb"
    );

    const zombieTwo = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "zombie_2.glb"
    );

    zombieOne.meshes[0].rotate(Vector3.Up(), Math.PI / 2);
    zombieOne.meshes[0].position = new Vector3(-8, 0, -4);
    zombieTwo.meshes[0].rotate(Vector3.Up(), Math.PI / 2);
    zombieTwo.meshes[0].position = new Vector3(-6, 0, -2);
  }

  async CreateCutscene(): Promise<void> {
    const camKeys = [];
    const fps = 60;
    const camAnim = new Animation(
      "camAnim",
      "position",
      fps,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    camKeys.push({ frame: 0, value: new Vector3(10, 2, -10) });
    camKeys.push({ frame: 5 * fps, value: new Vector3(-6, 2, -10) });
    camKeys.push({ frame: 8 * fps, value: new Vector3(-6, 2, -10) });
    camKeys.push({ frame: 12 * fps, value: new Vector3(0, 3, -16) });

    camAnim.setKeys(camKeys);

    this.camera.animations.push(camAnim);

    await this.scene.beginAnimation(this.camera, 0, 12 * fps).waitAsync();
    this.EndCutscene();
  }

  EndCutscene(): void {
    this.camera.attachControl();
    this.characterAnimations[1].stop();
    this.characterAnimations[0].play();
  }
}
