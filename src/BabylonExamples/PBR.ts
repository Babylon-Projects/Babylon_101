import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  CubeTexture,
  PBRMaterial,
  Texture,
  Color3,
  GlowLayer,
} from "@babylonjs/core";

export class PBR {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.CreateEnvironment();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    hemiLight.intensity = 0;

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      scene
    );

    scene.environmentTexture = envTex;

    scene.createDefaultSkybox(envTex, true);

    // scene.environmentIntensity = 0.25;

    return scene;
  }

  CreateEnvironment(): void {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);

    ball.position = new Vector3(0, 1, 0);

    ground.material = this.CreateAsphalt();
    ball.material = this.CreateMagic();
  }

  CreateAsphalt(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);
    pbr.albedoTexture = new Texture(
      "./textures/asphalt/asphalt_diffuse.jpg",
      this.scene
    );

    pbr.bumpTexture = new Texture(
      "./textures/asphalt/asphalt_normal.jpg",
      this.scene
    );

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;

    pbr.metallicTexture = new Texture(
      "./textures/asphalt/asphalt_ao_rough_metal.jpg",
      this.scene
    );

    // pbr.roughness = 1;

    return pbr;
  }

  CreateMagic(): PBRMaterial {
    //Note the textures for this method are not included in the code

    const pbr = new PBRMaterial("pbr", this.scene);

    // pbr.environmentIntensity = 0.25;

    // pbr.albedoTexture = new Texture(
    //   "./textures/magic/magic_baseColor.png",
    //   this.scene
    // );

    // pbr.bumpTexture = new Texture(
    //   "./textures/magic/magic_normal.png",
    //   this.scene
    // );

    // pbr.invertNormalMapX = true;
    // pbr.invertNormalMapY = true;

    // pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    // pbr.useRoughnessFromMetallicTextureGreen = true;
    // pbr.useMetallnessFromMetallicTextureBlue = true;

    // pbr.metallicTexture = new Texture(
    //   "./textures/magic/magic_ao_rough_metal.png",
    //   this.scene
    // );

    // pbr.emissiveColor = new Color3(1, 1, 1);

    // pbr.emissiveTexture = new Texture(
    //   "./textures/magic/magic_emissive.png",
    //   this.scene
    // );

    // pbr.emissiveIntensity = 1;

    // const glowLayer = new GlowLayer("glow", this.scene);

    // glowLayer.intensity = 1;

    // pbr.roughness = 1;

    return pbr;
  }
}
