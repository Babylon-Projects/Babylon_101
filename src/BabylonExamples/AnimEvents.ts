import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  CubeTexture,
  SceneLoader,
  AnimationEvent,
  AnimationGroup,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class AnimEvents {
  scene: Scene;
  engine: Engine;
  zombieAnims: AnimationGroup[];
  cheer: AnimationGroup;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateCharacter();
    this.CreateZombie();

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

    const camera = new FreeCamera("camera", new Vector3(0, 2, -10), this.scene);
    camera.attachControl();
    camera.minZ = 0.5;
    camera.speed = 0.5;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    await SceneLoader.ImportMeshAsync("", "./models/", "Prototype_Level.glb");
  }

  async CreateCharacter(): Promise<void> {
    const { meshes, animationGroups } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "character_attack.glb"
    );

    meshes[0].rotate(Vector3.Up(), -Math.PI / 2);
    meshes[0].position = new Vector3(3, 0, 0);
    this.cheer = animationGroups[0];
    const idle = animationGroups[1];
    const attack = animationGroups[2];

    this.cheer.stop();
    idle.play(true);

    const attackAnim = animationGroups[2].targetedAnimations[0].animation;

    const attackEvt = new AnimationEvent(
      100,
      () => {
        this.zombieAnims[1].stop();
        this.zombieAnims[0].play();
      },
      false
    );
    attackAnim.addEvent(attackEvt);

    this.scene.onPointerDown = (evt) => {
      if (evt.button === 2) attack.play();
    };
  }

  async CreateZombie(): Promise<void> {
    const { meshes, animationGroups } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "zombie_death.glb"
    );

    this.zombieAnims = animationGroups;

    meshes[0].rotate(Vector3.Up(), Math.PI / 2);
    meshes[0].position = new Vector3(-3, 0, 0);

    //death animation
    this.zombieAnims[0].stop();
    //idle animation
    this.zombieAnims[1].play(true);

    const deathAnim = this.zombieAnims[0].targetedAnimations[0].animation;

    const deathEvt = new AnimationEvent(
      150,
      () => {
        this.cheer.play(true);
      },
      false
    );
    deathAnim.addEvent(deathEvt);
  }
}
