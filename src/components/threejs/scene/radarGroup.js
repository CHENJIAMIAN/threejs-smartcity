/*
 * @Author: janasluo
 * @Date: 2021-12-16 17:21:13
 * @LastEditTime: 2021-12-22 23:28:42
 * @LastEditors: janasluo
 * @Description: 雷达扫描图
 * @FilePath: /test/Users/janas/work/project/threejs/threejs-smartcity/src/components/threejs/scene/radarGroup.js
 */
// 引入Three.js
import * as THREE from "three";
import { lon2xy } from "./math.js";

function createRadarGroup() {
  var radarGroup = new THREE.Group(); //声明一个组对象

  var geometry = new THREE.PlaneGeometry(200, 200);
  var material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    map: new THREE.TextureLoader().load("./扫描雷达.png"),
    side: THREE.DoubleSide, //两面可见
    transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
    // opacity: 0.5,//整体改变透明度
    depthTest: false,
  });
  var mesh = new THREE.Mesh(geometry, material);

  var material2 = new THREE.MeshLambertMaterial({
    color: 0x00cccc,
    map: new THREE.TextureLoader().load("./雷达刻度.png"),
    side: THREE.DoubleSide, //两面可见
    transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
    // opacity: 0.5,//整体改变透明度
    depthTest: true,
  });
  var mesh2 = new THREE.Mesh(geometry, material2); //网格模型对象Mesh
  // mesh2.rotateX(-Math.PI / 2);
  mesh2.add(mesh);
  radarGroup.add(mesh2);

  var E = 121.49926536464691; //经纬度坐标
  var N = 31.24289350905988;

  var xy = lon2xy(E, N);
  var x = xy.x;
  var y = xy.y;
  // 设置坐标
  radarGroup.position.set(x, y, 0);
  // radarGroup.scale.set(10, 10, 10);
  // 旋转扫描动画
  function rotateAnimation() {
    mesh.rotateZ(0.02);
    requestAnimationFrame(rotateAnimation);
  }
  rotateAnimation();

  return radarGroup;
}

export { createRadarGroup };
