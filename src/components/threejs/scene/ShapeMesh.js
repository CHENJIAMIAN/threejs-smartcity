
/*
 * @Author: janasluo
 * @Date: 2021-11-18 09:42:42
 * @LastEditTime: 2022-01-04 15:41:47
 * @LastEditors: janasluo
 * @Description: 江河Shape数据 ShapeGeometry
 */
// 引入three.js
import * as THREE from 'three';
import {
  lon2xy
} from './math.js';
import output_fragment from './shader/output_fragment2.glsl.js'

// MeshBasicMaterial:不受光照影响
// MeshLambertMaterial：几何体表面和光线角度不同，明暗不同
var material = new THREE.MeshLambertMaterial({
  color: 0x001c1a, //颜色
});
// GPU执行material对应的着色器代码前，通过.onBeforeCompile()插入新的代码，修改已有的代码
var materialShader2 = null;
material.onBeforeCompile = function (shader) {
  // 浏览器控制台打印着色器代码
  // console.log('shader.fragmentShader', shader.fragmentShader)
  materialShader2 = shader;
  shader.uniforms.time = {
    value: 0.0,
  };
  // 顶点位置坐标position类似uv坐标进行插值计算，用于在片元着色器中控制片元像素
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    ['varying vec3 vPosition;',
      'void main() {',
      'vPosition = position;',
    ].join('\n') // .join()把数组元素合成字符串
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    'void main() {',
    ['varying vec3 vPosition;',
      'uniform float time;',
      'void main() {',
    ].join('\n')
  );

  shader.fragmentShader = shader.fragmentShader.replace('#include <output_fragment>', output_fragment);
};


// pointsArrs：多个多边形轮廓
function ShapeMesh(pointsArrs) {
  var shapeArr = []; //轮廓形状Shape集合
  pointsArrs.forEach(pointsArr => {
    var vector2Arr = [];
    // 转化为Vector2构成的顶点数组
    pointsArr[0].forEach(elem => {
      var xy = lon2xy(elem[0], elem[1]);//经纬度转墨卡托坐标
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    var shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });
  var geometry = new THREE.ShapeGeometry( //填充多边形
    shapeArr,
  );
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}
export {
  ShapeMesh, materialShader2
};