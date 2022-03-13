import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  CubeTexture,
  SceneLoader,
  AnimationGroup,
  AsyncCoroutine,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class AnimBlending {
  scene: Scene;
  engine: Engine;


  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateCharacter();
  

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

    const camera = new FreeCamera("camera", new Vector3(0, 2, -6), this.scene);
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
      "character_blending.glb"
    );

    meshes[0].rotate(Vector3.Up(), -Math.PI);
  

    const idle = animationGroups[0];
    const run = animationGroups[1];
    

this.scene.onPointerDown = evt => {

  if(evt.button === 1)
    this.scene.onBeforeRenderObservable.runCoroutineAsync(this.animationBlending(run, idle))

    if(evt.button === 0)
    this.scene.onBeforeRenderObservable.runCoroutineAsync(this.animationBlending(idle, run))

}

       
  }

  *animationBlending(toAnim: AnimationGroup, fromAnim: AnimationGroup): Iterable{
      let currentWeight = 1;
      let newWeight = 0;

      toAnim.play(true);

      while(newWeight< 1){
          newWeight +=0.01;
          currentWeight -= 0.01;
          toAnim.setWeightForAllAnimatables(newWeight);
          fromAnim.setWeightForAllAnimatables(currentWeight);
          yield;
        
      }


  }



 


 

  




}