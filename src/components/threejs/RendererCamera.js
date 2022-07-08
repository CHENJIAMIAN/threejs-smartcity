// 引入Three.js
import * as THREE from 'three';
// 引入Three.js扩展库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { lon2xy } from './scene/math.js';

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
var width = window.innerWidth; //窗口文档显示区的宽度
var height = window.innerHeight; //窗口文档显示区的高度
/**
 * 透视投影相机设置
 */
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
// var camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// 根据需要调整远裁截面
var camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
// camera.position.set(292, 223, 185);//相机在Three.js三维坐标系中的位置
// camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点
// var E = 121.49131393432617;// 黄浦江几何中心坐标
// var N = 31.232206344604492;
var E = 121.49526536464691; //东方明珠经纬度坐标
var N = 31.24189350905988;
var xy = lon2xy(E, N);
var x = xy.x;
var y = xy.y;
// camera.position.set(x+5000, y+5000, 5000);//5000是根据建筑物尺寸范围设置  数量级对应即可 具体数值不用精准
camera.position.set(13524797, 3662134, 1220); //利用OrbitControls重新设置相机参数 调整视角
camera.lookAt(x, y, 0); //根据黄浦江几何中心坐标或附近某个经纬度坐标设置


/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
    antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0x001111, 1); //设置背景颜色
// renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
// document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// 旋转：拖动鼠标左键
// 缩放：滚动鼠标中键
// 平移：拖动鼠标右键
var controls = new OrbitControls(camera, renderer.domElement);

// 相机控件与.lookAt()无效( .target属性 )
controls.target.set(x, y, 0);
controls.update(); //update()函数内会执行camera.lookAt(controls.targe)

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};
export {
    renderer,
    camera,
    // controls
};
