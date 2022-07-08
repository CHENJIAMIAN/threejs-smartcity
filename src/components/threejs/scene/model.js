
// 引入Three.js
import * as THREE from "three";

import { lon2xy } from "./math.js";
import { WaterShapeMesh } from "./WaterShapeMesh.js";
import { PolygonMesh, material as polygonMaterial } from "./PolygonMesh.js";
import { ExtrudeMesh } from "./ExtrudeMesh.js";
import { createRadarGroup } from "./RadarMesh.js";
import { createCylinderMesh } from "./CylinderMesh.js";
import { createConeMesh } from "./ConeMesh.js";
import { wallGroup } from "./WallGroup.js";

import { wallGroup as wallGroup2 } from "./WallGroup2.js";
import { rendeLineGroup } from "./SubwayMesh.js";

let model = new THREE.Group(); //声明一个组对象，用来添加城市三场场景的模型对象
let loader = new THREE.FileLoader();
loader.setResponseType("json");
//城市建筑数据解析
loader.load("./上海外滩.json", function (data) {
  let build = ExtrudeMesh(data); //楼房建筑模型，所有几何体已合并
  build.name = "楼房"; //设置name属性，模型导出的时候，可以携带该信息
  model.add(build);
});
// 黄浦江
loader.load("./黄浦江.json", function (data) {
  let buildGroup = new THREE.Group(); //作为所有每栋楼Mesh的父对象
  data.features.forEach((build) => {
    if (build.geometry) {
      // build.geometry.type === "Polygon"表示建筑物底部包含一个多边形轮廓
      //build.geometry.type === "MultiPolygon"表示建筑物底部包含多个多边形轮廓
      if (build.geometry.type === "Polygon") {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      let mesh = WaterShapeMesh(build.geometry.coordinates);
      // let mesh = ShapeMesh(build.geometry.coordinates)
      mesh.name = "黄浦江"; //设置name属性，模型导出的时候，可以携带该信息
      buildGroup.add(mesh);
    }
  });
  model.add(buildGroup);
});

const radarGroup = createRadarGroup();
model.add(radarGroup);
model.add(createCylinderMesh());

let ConeMesh = createConeMesh(
  40,
  lon2xy(121.49726536464691, 31.24119350905988),
  250
);
model.add(ConeMesh);

model.add(wallGroup);

model.add(wallGroup2);

setTimeout(() => {
  model.add(rendeLineGroup());
}, 1000);
// model.add(rendeLineGroup())

// 绿地
loaderPolygon("./黄浦区_绿地.json", "黄浦区_绿地", 0xff0000);

function loaderPolygon(url, name, color) {
  loader.load("./黄浦区_绿地.json", function (data) {
    let mesh = PolygonMesh(data, color);
    model.add(mesh);
    // setTimeout(() => {
    //   polygonMaterial.color = new THREE.Color(0x6ac508)
    // }, 2000)
  });
}
export { model };
