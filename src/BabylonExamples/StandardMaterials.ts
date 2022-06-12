import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";

export class StandardMaterials {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    // 控制相机的速度 避免出现滚轮太灵敏的情况出现
    camera.speed = 0.25;

    // 创建灯光
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    // 调整灯的亮度
    hemiLight.intensity = 0.75;
    
    // 创建地面
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );

    // 创建直径为1的球
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    
    ball.position = new Vector3(0, 1, 0);

    // 赋予球和地面材质
    ground.material = this.CreateGroundMaterial();
    ball.material = this.CreateBallMaterial();

    return scene;
  }

  CreateGroundMaterial(): StandardMaterial {
    // 创建普通材质
    const groundMat = new StandardMaterial("groundMat", this.scene);
    
    // 这里要使用uv对纹理进行缩放调整 但是对应的众多texture都要对应调整后的uv 故此处数组存放 后续遍历调整uv
    const uvScale = 4;
    const texArray: Texture[] = [];

    // 漫反射纹理
    const diffuseTex = new Texture(
      "./textures/stone/stone_diffuse.jpg",
      this.scene
    );
    groundMat.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    // 法线纹理
    const normalTex = new Texture(
      "./textures/stone/stone_normal.jpg",
      this.scene
    );

    // 法线纹理 赋予 凹凸纹理
    groundMat.bumpTexture = normalTex;
    // 法线贴图有时候会被翻转
    groundMat.invertNormalMapX = true;
    groundMat.invertNormalMapY = true;
    texArray.push(normalTex);

    // 环境光纹理
    const aoTex = new Texture("./textures/stone/stone_ao.jpg", this.scene);
    groundMat.ambientTexture = aoTex;
    texArray.push(aoTex);

    // 镜面纹理  - 反射光
    const specTex = new Texture("./textures/stone/stone_spec.jpg", this.scene);
    groundMat.specularTexture = specTex;

    texArray.push(specTex);

    texArray.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return groundMat;
  }

  CreateBallMaterial(): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    const uvScale = 1;
    const texArray: Texture[] = [];

    const diffuseTex = new Texture(
      "./textures/metal/metal_diffuse.jpg",
      this.scene
    );
    ballMat.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    const normalTex = new Texture(
      "./textures/metal/metal_normal.jpg",
      this.scene
    );
    ballMat.bumpTexture = normalTex;
    ballMat.invertNormalMapX = true;
    ballMat.invertNormalMapY = true;
    texArray.push(normalTex);

    const aoTex = new Texture("./textures/metal/metal_ao.jpg", this.scene);
    ballMat.ambientTexture = aoTex;
    texArray.push(aoTex);

    const specTex = new Texture("./textures/metal/metal_spec.jpg", this.scene);
    ballMat.specularTexture = specTex;
    // 镜面效果的程度 光泽度
    ballMat.specularPower = 10;
    texArray.push(specTex);

    texArray.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return ballMat;
  }
}
