/*
 * @Author: janasluo
 * @Date: 2021-11-18 09:42:42
 * @LastEditTime: 2021-12-16 17:06:32
 * @LastEditors: janasluo
 * @Description:  飞机模型和径向渐变发光球
 * @FilePath: /test/Users/janas/work/project/threejs/threejs-smartcity/src/components/threejs/scene/flyGroup.js
 */
import * as THREE from 'three';


import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
  lon2xy
} from './math.js';

import {
  createLightSphereMesh
} from './lightSphereMesh.js';
import {
  createSignalMesh
} from './signalMesh.js';



var flyGroup = new THREE.Group() // 一架无人机

var LightSphereMesh = createLightSphereMesh(120);
flyGroup.add(LightSphereMesh);
var SignalMesh = createSignalMesh();
// console.log('SignalMesh', SignalMesh)
flyGroup.add(SignalMesh);

var mixer = null; //声明一个混合器变量
var loader = new GLTFLoader();
loader.load('./fly.glb', function (gltf) {
  var fly = gltf.scene;

  // 三维场景默认单位是米，美术导出模型单位是厘米，需要缩小数字尺寸
  // fly.scale.set(0.01,0.01,0.01);
  fly.scale.set(4, 4, 4); //根据需要放大无人机
  fly.position.x = -28 * 4; //如果美术导出的模型不居中，需要代码调整
  fly.position.z = 8 * 4;
  // console.log('gltf', gltf);
  flyGroup.add(fly);
  fly.traverse(function (child) {
    if (child.isMesh) {
      var material = child.material
      child.material = new THREE.MeshLambertMaterial({
        color: material.color,
      })
    }
  });
  // obj作为混合器的参数，可以播放obj包含的帧动画数据
  mixer = new THREE.AnimationMixer(fly);
  // console.log('gltf.animations[0]', gltf.animations);
  // obj.animations[0]：获得剪辑clip对象
  var AnimationAction = mixer.clipAction(gltf.animations[0]);
  AnimationAction.timeScale = 15; //默认1，可以调节播放速度
  // AnimationAction.loop = THREE.LoopOnce; //不循环播放
  // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
  AnimationAction.play();
})

var clock = new THREE.Clock();

function UpdateLoop() {
  if (mixer !== null) {
    //clock.getDelta()方法获得两帧的时间间隔
    mixer.update(clock.getDelta());
  }
  requestAnimationFrame(UpdateLoop);
}
UpdateLoop();

// 一直无人机数据：经纬度和高度
var height = 400; //无人机飞行高度300米
var E = 121.49926536464691; //无人机经纬度坐标
var N = 31.24289350905988;

var xy = lon2xy(E, N);
var x = xy.x;
var y = xy.y;
// 设置无人机坐标
flyGroup.position.set(x, y, height);




// 姿态调整
flyGroup.rotateX(Math.PI / 2);



export {
  flyGroup
};