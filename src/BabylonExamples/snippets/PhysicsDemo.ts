import {
  Scene,
  Engine,
  SceneLoader,
  FreeCamera,
  HemisphericLight,
  Vector3,
  CannonJSPlugin,
  MeshBuilder,
  PhysicsImpostor,
  AbstractMesh,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import * as CANNON from "cannon";

export class CollisionsTriggers {
  scene: Scene;
  engine: Engine;
  sphere: AbstractMesh;
  box: AbstractMesh;
  ground: AbstractMesh;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateEnvironment();

    this.CreateImpostors();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene);
    const camera = new FreeCamera(
      "camera",
      new Vector3(0, 10, -20),
      this.scene
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl();
    camera.minZ = 0.5;

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
    this.box = MeshBuilder.CreateBox("box", { size: 2 });
    this.box.position = new Vector3(0, 3, 0);

    this.box.physicsImpostor = new PhysicsImpostor(
      this.box,
      PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 1 }
    );

    this.ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    });

    this.ground.isVisible = false;

    this.ground.physicsImpostor = new PhysicsImpostor(
      this.ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 1 }
    );

    this.sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 });
    this.sphere.position = new Vector3(0, 8, 0);

    this.sphere.physicsImpostor = new PhysicsImpostor(
      this.sphere,
      PhysicsImpostor.SphereImpostor,
      { mass: 1, restitution: 1, friction: 1 }
    );
  }
}
