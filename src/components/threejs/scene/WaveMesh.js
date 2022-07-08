/*
 * @Author: janasluo
 * @Date: 2021-11-18 09:42:42
 * @LastEditTime: 2021-12-21 10:29:57
 * @LastEditors: janasluo
 * @Description: 水波纹动效
 */
// 引入three.js
import * as THREE from 'three';



// 所有mesh共享几何体和纹理对象

// size:光圈原始尺寸
function createWaveMesh(size) {
  /**
   * 创建网格模型
   */
  // 矩形平面网格模型设置背景透明的png贴图
  var geometry = new THREE.PlaneGeometry(size, size); //默认在XOY平面上
  var textureLoader = new THREE.TextureLoader(); // TextureLoader创建一个纹理加载器对象
  var material = new THREE.MeshBasicMaterial({
    // color: 0x22ffcc, //设置光圈颜色
    color: 0xccff22,//设置光圈颜色
    map: textureLoader.load('./标注光圈.png'),
    transparent: true, //使用背景透明的png贴图，注意开启透明计算      
    // side: THREE.DoubleSide, //双面可见
    depthTest: false, //禁止深度测试 以免光圈和地面或河流表面深度冲突
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh


  // mesh.rotateX(-Math.PI / 2);

  // 波动动画
  var S = 20; //波动范围倍数设置
  var _s = 1.0;

  function waveAnimation() {
    _s += 0.2;
    mesh.scale.set(_s, _s, _s);
    if (_s <= S * 0.2) {
      material.opacity = (_s - 1) / (S * 0.2 - 1); //保证透明度在0~1之间变化
    } else if (_s > S * 0.2 && _s <= S) {
      material.opacity = 1 - (_s - S * 0.2) / (S - S * 0.2); //保证透明度在0~1之间变化
    } else {
      _s = 1.0;
    }
    requestAnimationFrame(waveAnimation);
  }
  waveAnimation();

  return mesh;
}
export {
  createWaveMesh
};