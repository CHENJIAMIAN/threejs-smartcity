/*
 * @Description: 根据geojson polygon数据绘制shape多边形
 */
// 引入three.js
import * as THREE from "three";
import { lon2xy } from "./math.js";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

let material;
function PolygonMesh(data, color) {
  let geoArr = []; //所有建筑物的几何体集合
  data.features.forEach((build) => {
    if (build.geometry) {
      // build.geometry.type === "Polygon"表示建筑物底部包含一个多边形轮廓
      //build.geometry.type === "MultiPolygon"表示建筑物底部包含多个多边形轮廓
      if (build.geometry.type === "Polygon") {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      geoArr.push(PolygonGeometry(build.geometry.coordinates));
    }
  });
  material = new THREE.MeshLambertMaterial({
    color, //颜色s
  });
  // 所有几何体合并为一个几何体
  let geometry = mergeBufferGeometries(geoArr);
  let mesh = new THREE.Mesh(geometry, material); //网格模型对象
  mesh.name = name; //设置name属性，模型导出的时候，可以携带该信息
  return mesh;
}
function PolygonGeometry(pointsArrs) {
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
  let geometry = new THREE.ShapeGeometry(shapeArr); //填充多边形
  return geometry;
}
export { PolygonMesh, material };
