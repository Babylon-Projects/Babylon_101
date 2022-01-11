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
  StandardMaterial,
  Color3,
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

    this.DetectTrigger();

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
    // this.box = MeshBuilder.CreateBox("box", { size: 2 });
    // this.box.position = new Vector3(0, 3, 0);

    // this.box.physicsImpostor = new PhysicsImpostor(
    //   this.box,
    //   PhysicsImpostor.BoxImpostor,
    //   { mass: 1, restitution: 1 }
    // );

    this.ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    });

    this.ground.position.y = 0.25;

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

    // this.box.physicsImpostor.registerOnPhysicsCollide(
    //   this.sphere.physicsImpostor,
    //   this.DetectCollisions
    // );

    // this.sphere.physicsImpostor.registerOnPhysicsCollide(
    //   this.box.physicsImpostor,
    //   this.DetectCollisions
    // );

    // this.sphere.physicsImpostor.unregisterOnPhysicsCollide(
    //   this.ground.physicsImpostor,
    //   this.DetectCollisions
    // );
  }

  DetectCollisions(boxCol: PhysicsImpostor, colAgainst: any): void {
    const redMat = new StandardMaterial("mat", this.scene);
    redMat.diffuseColor = new Color3(1, 0, 0);

    // boxCol.object.scaling = new Vector3(3, 3, 3);
    // boxCol.setScalingUpdated();

    (colAgainst.object as AbstractMesh).material = redMat;
  }

  DetectTrigger(): void {
    const box = MeshBuilder.CreateBox("box", { width: 4, height: 1, depth: 4 });
    box.position.y = 0.5;
    box.visibility = 0.25;

    let counter = 0;

    this.scene.registerBeforeRender(() => {
      if (box.intersectsMesh(this.sphere)) counter++;

      if (counter === 1) console.log("Entered Trigger");
    });
  }
}
