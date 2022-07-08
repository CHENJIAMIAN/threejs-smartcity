// 场景总文件
// 引入Three.js
import * as THREE from 'three';
import { model } from './model.js';

// import {
//   model
// } from './loadGLTFModel.js';
import { flyGroup } from './flyGroup.js';
import { lon2xy } from './math.js';

/**
 * 创建场景对象Scene
 */
let scene = new THREE.Scene();
scene.add(model); //三维模型添加到场景中
scene.add(flyGroup); //gltf飞机模型添加到场景中
/**
 * 光源设置
 */
// 平行光1
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 400, 300);
scene.add(directionalLight);
// 平行光2
let directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-200, -400, 300);
scene.add(directionalLight2);
/*---------------------------------------------------------------------------------------*/
//添加灯光辅助 //FIXME:为什么无效??
const debug1 = new THREE.DirectionalLightHelper(
    directionalLight,
    5,
    new THREE.Color('rgb(255, 0, 0)')
);
debug1.name = 'debug1';
scene.add(debug1);
const debug2 = new THREE.DirectionalLightHelper(
    directionalLight2,
    5,
    new THREE.Color('rgb(255, 0, 0)')
);
debug2.name = 'debug2';
scene.add(debug2);
/*---------------------------------------------------------------------------------------*/
//环境光
let ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);
/*---------------------------------------------------------------------------------------*/
// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
let axesHelper = new THREE.AxesHelper(2500);
let E = 121.49526536464691; //东方明珠经纬度坐标
let N = 31.24189350905988;
let xy = lon2xy(E, N);
let x = xy.x;
let y = xy.y;
axesHelper.position.set(x, y, 0);
scene.add(axesHelper);
/*---------------------------------------------------------------------------------------*/
// 设置雾化效果，雾的颜色和背景颜色相近，这样远处三维场景和背景颜色融为一体
// 结合相机参数设置Fog的参数2(near)和参数3(far)
// scene.fog = new THREE.Fog(0x001111, 10, 20000);
export { scene };
