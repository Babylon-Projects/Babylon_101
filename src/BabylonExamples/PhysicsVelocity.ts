import {
  Scene,
  Engine,
  SceneLoader,
  FreeCamera,
  Vector3,
  CannonJSPlugin,
  MeshBuilder,
  PhysicsImpostor,
  CubeTexture,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import * as CANNON from "cannon";

export class PhysicsVelocity {
  scene: Scene;
  engine: Engine;
  camera: FreeCamera;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateEnvironment();
    this.CreateImpostors();
    this.CreateRocket();

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

    const camera = new FreeCamera("camera", new Vector3(0, 2, -5), this.scene);
    camera.attachControl();
    camera.minZ = 0.5;

    this.camera = camera;

    scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "Prototype_Level.glb",
      this.scene
    );
  }

  CreateImpostors(): void {
    const ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    });

    ground.isVisible = false;

    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 1 }
    );
  }

  async CreateRocket(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/models/",
      "toon_rocket.glb",
      this.scene
    );

    const rocketCol = MeshBuilder.CreateBox("rocketCol", {
      width: 1,
      height: 1.7,
      depth: 1,
    });

    rocketCol.position.y = 0.85;
    rocketCol.visibility = 0;

    rocketCol.physicsImpostor = new PhysicsImpostor(
      rocketCol,
      PhysicsImpostor.BoxImpostor,
      { mass: 1 }
    );

    meshes[0].setParent(rocketCol);

    rocketCol.rotate(Vector3.Forward(), 1.5);

    const rocketPhysics = () => {
      this.camera.position = new Vector3(
        rocketCol.position.x,
        rocketCol.position.y,
        this.camera.position.z
      );

      rocketCol.physicsImpostor.setLinearVelocity(rocketCol.up.scale(5));
      rocketCol.physicsImpostor.setAngularVelocity(rocketCol.up);
    };

    let gameOver = false;

    if (!gameOver) this.scene.registerBeforeRender(rocketPhysics);

    this.scene.onPointerDown = () => {
      gameOver = true;
      this.scene.unregisterBeforeRender(rocketPhysics);
    };
  }
}
