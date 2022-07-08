
import * as THREE from "three";
import { scene } from "./scene/index.js"; //Three.js三维场景
import { renderer, camera } from "./RendererCamera.js"; //渲染器对象和相机对象
import { CSS2LabelRenderer } from "./CSS2DRenderer.js";
import { CSS3LabelRenderer } from "./CSS3DRenderer.js";
import { materialShader } from "./scene/ExtrudeMesh.js";
import { materialShader2 } from "./scene/WaterShapeMesh.js";

// 渲染循环
// 渲染循环

var clock = new THREE.Clock(); // 创建一个时钟对象Clock
function render() {
  // 获得两次scanAnimation执行的时间间隔deltaTime
  var deltaTime = clock.getDelta();
  // console.log(deltaTime)
  // 更新uniforms中时间，这样就可以更新着色器中time变量的值
  if (materialShader && materialShader2) {
    materialShader.uniforms.time.value += deltaTime;
    materialShader2.uniforms.time.value += deltaTime;
    if (materialShader.uniforms.time.value > 6) {
      materialShader.uniforms.time.value = 0;
      materialShader2.uniforms.time.value = 0;
    }
  }

  CSS2LabelRenderer.render(scene, camera); //渲染HTML标签对象
  CSS3LabelRenderer.render(scene, camera);

  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();

export { renderer };
