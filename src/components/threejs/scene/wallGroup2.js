/*
 * @Description: 围墙水平方向流光
 */
// 引入Three.js
import * as THREE from "three";
import { lon2xy } from "./math.js";

let wallGroup = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

let c = [
  0,
  0, //顶点1坐标
  60,
  0, //顶点2坐标
  60,
  80, //顶点3坐标
  40,
  120, //顶点4坐标
  -20,
  80, //顶点5坐标
  0,
  0, //顶点6坐标  和顶点1重合
];
let posArr = [];
let uvrr = [];
let h = 60; //围墙拉伸高度
for (let i = 0; i < c.length - 2; i += 2) {
  // 围墙多边形上两个点构成一个直线扫描出来一个高度为h的矩形
  // 矩形的三角形1
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], 0, c[i + 2], c[i + 3], h);
  // 矩形的三角形2
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], h, c[i], c[i + 1], h);

  // 注意顺序问题，和顶点位置坐标对应
  // uvrr.push(0, 0, 1, 0, 1, 1);
  // uvrr.push(0, 0, 1, 1, 0, 1);
  // 所有点展开  x方向从零到1   所有点生成的矩形铺满一张纹理贴图
  uvrr.push(
    i / c.length,
    0,
    i / c.length + 2 / c.length,
    0,
    i / c.length + 2 / c.length,
    1
  );
  uvrr.push(i / c.length, 0, i / c.length + 2 / c.length, 1, i / c.length, 1);
}
let geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = new THREE.BufferAttribute(
  new Float32Array(posArr),
  3
);
// 设置几何体attributes属性的位置uv属性
geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(uvrr), 2);
geometry.computeVertexNormals();
let texture = new THREE.TextureLoader().load("./流光.png");
// 设置阵列模式为 RepeatWrapping
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 3; // x方向阵列
texture.repeat.y = 3; // y方向阵列
function flowAnimation() {
  requestAnimationFrame(flowAnimation);
  // 使用加减法可以设置不同的运动方向
  // 设置纹理偏移
  // y方向流量  光带流动效果
  // texture.offset.y -= 0.02;
  texture.offset.x -= 0.02;
}
flowAnimation();

let material = new THREE.MeshLambertMaterial({
  color: 0xffff00,
  map: texture,
  side: THREE.DoubleSide, //两面可见
  transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
  // opacity: 0.5,//整体改变透明度
  depthTest: false,
});
let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// mesh.rotateX(-Math.PI / 2);
wallGroup.add(mesh);

let mesh2 = mesh.clone();
mesh2.material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  map: new THREE.TextureLoader().load("./渐变3.png"),
  side: THREE.DoubleSide, //两面可见
  transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
  opacity: 0.5, //整体改变透明度
  depthTest: false,
});
wallGroup.add(mesh2);
wallGroup.scale.set(2, 2, 1.0);

let E = 121.49226536464691; //经纬度坐标
let N = 31.23819350905988;

let xy = lon2xy(E, N);
let x = xy.x;
let y = xy.y;
// 设置坐标
wallGroup.position.set(x, y, 0);

export { wallGroup };
