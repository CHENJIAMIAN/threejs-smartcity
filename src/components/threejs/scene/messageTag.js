/*
 * @Description: html标签渲染
 */
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
// 创建一个HTML标签
function tag(name) {
  // 创建div元素(作为标签)
  let div = document.createElement("div");
  div.innerHTML = name;
  div.classList.add("tag");
  //div元素包装为CSS2模型对象CSS2DObject
  let label = new CSS2DObject(div);
  div.style.pointerEvents = "none"; //避免HTML标签遮挡三维场景的鼠标事件
  // 设置HTML元素标签在three.js世界坐标中位置
  // label.position.set(x, y, z);
  return label; //返回CSS2模型标签
}

export { tag };
