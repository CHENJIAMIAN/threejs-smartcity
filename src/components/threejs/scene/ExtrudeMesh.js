
// 引入three.js
import * as THREE from "three";
// 几何体辅助合并工具
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { lon2xy } from "./math.js";
import output_fragment from "./shader/bulid_fragment.glsl.js";
// MeshBasicMaterial:不受光照影响
// MeshLambertMaterial：几何体表面和光线角度不同，明暗不同
let material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //颜色
});
// GPU执行material对应的着色器代码前，通过.onBeforeCompile()插入新的代码，修改已有的代码
let materialShader = null;
material.onBeforeCompile = function (shader) {
  // 浏览器控制台打印着色器代码
  // console.log('shader.fragmentShader', shader.fragmentShader)
  materialShader = shader;
  shader.uniforms.time = {
    value: 0.0,
  };
  // 顶点位置坐标position类似uv坐标进行插值计算，用于在片元着色器中控制片元像素
  shader.vertexShader = shader.vertexShader.replace(
    "void main() {",
    ["varying vec3 vPosition;", "void main() {", "vPosition = position;"].join(
      "\n"
    ) // .join()把数组元素合成字符串
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "void main() {",
    ["varying vec3 vPosition;", "uniform float time;", "void main() {"].join(
      "\n"
    )
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <output_fragment>",
    output_fragment
  );
};

// data：GeoJSON建筑数据
function ExtrudeMesh(data) {
  let geoArr = []; //所有建筑物的几何体集合
  data.features.forEach((build) => {
    if (build.geometry) {
      // build.geometry.type === "Polygon"表示建筑物底部包含一个多边形轮廓
      //build.geometry.type === "MultiPolygon"表示建筑物底部包含多个多边形轮廓
      if (build.geometry.type === "Polygon") {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      //build.properties.Floor*3近似表示楼的高度
      let height = build.properties.Floor * 3;
      geoArr.push(ExtrudeGeo(build.geometry.coordinates, height));
    }
  });

  // 所有几何体合并为一个几何体
  let geometry = mergeBufferGeometries(geoArr);
  let mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}

// pointsArrs：多个轮廓，一个轮廓对应pointsArrs的一个元素
function ExtrudeGeo(pointsArrs, height) {
  let shapeArr = []; //轮廓形状Shape集合
  pointsArrs.forEach((pointsArr) => {
    let vector2Arr = [];
    // 转化为Vector2构成的顶点数组
    pointsArr[0].forEach((elem) => {
      let xy = lon2xy(elem[0], elem[1]); //经纬度转墨卡托坐标
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    let shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  let geometry = new THREE.ExtrudeGeometry( //拉伸造型
    shapeArr, //多个多边形二维轮廓
    //拉伸参数
    {
      depth: height, //拉伸高度
      bevelEnabled: false, //无倒角
    }
  );
  return geometry;
}
export { ExtrudeMesh, materialShader };
