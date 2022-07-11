/*
 * @Description: 圆柱透明渐变波纹
 */
// 引入Three.js
import * as THREE from "three";
import { lon2xy } from "./math.js";

/**
 * 创建网格模型
 */
function createCylinderMesh() {
  // 圆柱几何体，参数5设置不生成圆柱的两个底面
  let geometry = new THREE.CylinderGeometry(50, 50, 20, 40, 1, true);
  geometry.translate(0, 10, 0);
  let material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, //颜色
    map: new THREE.TextureLoader().load("./渐变3.png"),
    side: THREE.DoubleSide, //两面可见
    transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
    opacity: 0.5, //整体改变透明度
    depthTest: false,
  }); //材质对象Material
  let cylinderMesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  cylinderMesh.rotateX(Math.PI / 2);
  let E = 121.49526536464691; //经纬度坐标
  let N = 31.24189350905988;

  let xy = lon2xy(E, N);
  let x = xy.x;
  let y = xy.y;
  // 设置坐标
  cylinderMesh.position.set(x, y, 0);

  // 波动动画
  let S = 6; //波动范围设置
  let _s = 1.0;
  function waveAnimation() {
    _s += 0.02;
    cylinderMesh.scale.set(_s, _s, _s);
    if (_s > S) _s = 1.0;
    requestAnimationFrame(waveAnimation);
  }
  waveAnimation();
  return cylinderMesh;
}

export { createCylinderMesh };
