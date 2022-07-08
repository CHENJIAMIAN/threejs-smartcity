/*
 * @Description: 地铁公路流线
 */
// 引入three.js
import * as THREE from "three";
import output_fragment from "./shader/line_fragment.glsl.js";
import { lon2xy } from "./math.js";
function rendeLineGroup() {
  let lineGroup = new THREE.Group(); //声明一个组对象
  let loader = new THREE.FileLoader();
  loader.setResponseType("json");
  //轨迹线数据解析W
  loader.load("./上海主城区地铁.json", function (data) {
    data.features.forEach(function (feature) {
      let pointsArr = [];
      let flypointsArr = [];
      const obj = feature.geometry;
      if (obj.type === "LineString") {
        obj.coordinates.forEach(function (coord) {
          //经纬度转墨卡托
          let xy = lon2xy(coord[0], coord[1]);
          pointsArr.push(xy.x, xy.y, 0);
          flypointsArr.push([xy.x, xy.y]);
        });
      }
      if (obj.type === "MultiLineString") {
        obj.coordinates.forEach(function (coordinates) {
          coordinates.forEach((coord) => {
            //经纬度转墨卡托
            let xy = lon2xy(coord[0], coord[1]);
            pointsArr.push(xy.x, xy.y, 0);
            flypointsArr.push([xy.x, xy.y]);
          });
        });
      }

      let line = createLine(pointsArr); //创建一条轨迹线
      lineGroup.add(line);
      let flyPoints = createfly(flypointsArr); //创建一条流线
      lineGroup.add(flyPoints);
    });
  });
  return lineGroup;
}

// 通过一系列坐标点生成一条轨迹线
function createLine(pointsArr) {
  /**
   * 通过BufferGeometry构建一个几何体，传入顶点数据
   * 通过Line模型渲染几何体，连点成线
   */
  let geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //类型数组创建顶点数据
  let vertices = new Float32Array(pointsArr);
  // 创建属性缓冲区对象
  let attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribue;
  // 线条渲染几何体顶点数据
  let material = new THREE.LineBasicMaterial({
    color: 0x666600, //线条颜色
  }); //材质对象
  let line = new THREE.Line(geometry, material); //线条模型对象
  return line;
}

// 创建流线轨迹
function createfly(flypointsArr) {
  let v3Arr = [];
  flypointsArr.forEach(function (coord) {
    v3Arr.push(new THREE.Vector3(coord[0], coord[1], 0));
  });
  // 三维样条曲线
  let curve = new THREE.CatmullRomCurve3(v3Arr);
  //曲线上等间距返回多个顶点坐标
  let points = curve.getSpacedPoints(300); //分段数100，返回101个顶点

  // let index = 20; //取点索引位置
  let index = Math.floor((points.length - 10) * Math.random()); //取点索引位置随机
  let num = 30; //从曲线上获取点数量
  let points2 = points.slice(index, index + num); //从曲线上获取一段
  let curve2 = new THREE.CatmullRomCurve3(points2);
  let newPoints2 = curve2.getSpacedPoints(100); //获取更多的点数
  let geometry2 = new THREE.BufferGeometry();
  geometry2.setFromPoints(newPoints2);

  // 每个顶点对应一个百分比数据attributes.percent 用于控制点的渲染大小
  let percentArr = []; //attributes.percent的数据
  // 批量计算所有顶点颜色数据
  let colorArr = [];
  let half = Math.floor(newPoints2.length / 2);
  for (let i = 0; i < newPoints2.length; i++) {
    if (i < half) {
      // percentArr.push(i / half);
      percentArr.push(Math.pow(i / half, 0.2));
      let color1 = new THREE.Color(0x666600); //轨迹线颜色
      let color2 = new THREE.Color(0xffff00); //更亮
      let color = color1.lerp(color2, i / half);
      colorArr.push(color.r, color.g, color.b);
    } else {
      // percentArr.push(1-(i-half) / half);
      percentArr.push(Math.pow(1 - (i - half) / half, 0.2));
      const color1 = new THREE.Color(0xffff00); //更亮
      const color2 = new THREE.Color(0x666600); //轨迹线颜色
      const color = color1.lerp(color2, (i - half) / half);
      colorArr.push(color.r, color.g, color.b);
    }
  }
  let percentAttribue = new THREE.BufferAttribute(
    new Float32Array(percentArr),
    1
  );
  geometry2.attributes.percent = percentAttribue;
  // 设置几何体顶点颜色数据
  geometry2.attributes.color = new THREE.BufferAttribute(
    new Float32Array(colorArr),
    3
  );

  // 点模型渲染几何体每个顶点
  let PointsMaterial = new THREE.PointsMaterial({
    // color: 0xffff00,
    size: 100.0, //点大小 考虑相机渲染范围设置
    vertexColors: THREE.VertexColors, //使用顶点颜色渲染
    transparent: true, //开启透明计算
    depthTest: true,
  });
  let flyPoints = new THREE.Points(geometry2, PointsMaterial);

  // 修改点材质的着色器源码(注意：不同版本细节可能会稍微会有区别，不过整体思路是一样的)
  PointsMaterial.onBeforeCompile = function (shader) {
    // 顶点着色器中声明一个attribute变量:百分比
    shader.vertexShader = shader.vertexShader.replace(
      "void main() {",
      [
        "attribute float percent;", //顶点大小百分比变量，控制点渲染大小
        "void main() {",
      ].join("\n") // .join()把数组元素合成字符串
    );
    // 调整点渲染大小计算方式
    shader.vertexShader = shader.vertexShader.replace(
      "gl_PointSize = size;",
      ["gl_PointSize = percent * percent * size;"].join("\n") // .join()把数组元素合成字符串
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <output_fragment>",
      output_fragment
    );
  };
  // 飞线动画
  let indexMax = points.length - num; //飞线取点索引范围
  function animation() {
    if (index > indexMax) index = 0;
    index += 8;
    points2 = points.slice(index, index + num); //从曲线上获取一段
    let curve = new THREE.CatmullRomCurve3(points2);
    let newPoints2 = curve.getSpacedPoints(100); //获取更多的点数
    geometry2.setFromPoints(newPoints2);

    requestAnimationFrame(animation);
  }
  animation();

  return flyPoints;
}
export { rendeLineGroup };
