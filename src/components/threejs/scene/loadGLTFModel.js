
// 引入Three.js
import * as THREE from "three";
import output_fragment from "./shader/bulid_fragment.glsl.js";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
let model = new THREE.Group(); //声明一个组对象，用来添加城市三场场景的模型对象

let loader = new GLTFLoader(); //创建一个GLTF加载器
loader.load("./model/上海0.06.glb", function (gltf) {
  //gltf加载成功后返回一个对象
  console.log("控制台查看gltf对象结构", gltf);
  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene);

  let river = gltf.scene.getObjectByName("黄浦江");
  river.material = new THREE.MeshLambertMaterial({
    color: river.material.color, //读取模型本身的颜色
  });

  let build = gltf.scene.getObjectByName("楼房");
  build.material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, //颜色
  });
  // GPU执行material对应的着色器代码前，通过.onBeforeCompile()插入新的代码，修改已有的代码
  build.material.onBeforeCompile = function (shader) {
    // 浏览器控制台打印着色器代码
    // console.log('shader.fragmentShader', shader.fragmentShader)
    // 顶点位置坐标position类似uv坐标进行插值计算，用于在片元着色器中控制片元像素
    shader.vertexShader = shader.vertexShader.replace(
      "void main() {",
      [
        "varying vec3 vPosition;",
        "void main() {",
        "vPosition = position;",
      ].join("\n") // .join()把数组元素合成字符串
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      ["varying vec3 vPosition;", "void main() {"].join("\n")
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <output_fragment>",
      output_fragment
    );
  };
});

export { model };
