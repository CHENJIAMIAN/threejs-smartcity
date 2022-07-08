<template>
    <div style="display: flex; flex-direction: row; align-items: center">
      <!-- background:rgba(255, 0, 0, 0.0);用来辅助测试观察布局效果 -->
      <div
        style="
          background: rgba(255, 0, 0, 0);
          color: #ffffff;
          width: 50px;
          height: 50px;
        "
      >
        <img src="../assets/UI/城市.png" alt="" style="height: 100%" />
      </div>
      <div
        style="
          background: rgba(255, 0, 0, 0);
          color: #ffffff;
          width: 245px;
          height: 20px;
          margin-left: 20px;
        "
      >
        智慧城市数据3D可视化 —— 北京
      </div>
      <!-- flex嵌套flex布局 -->
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 40px;
          padding: 10px 20px;
          margin-left: 1130px;
        "
      >
        <button  id="exportGLTF" style="margin-right: 10px;">导出模型</button>
        <input type="color" v-on:change="changePolygonColor">
        <div
          style="
            background: rgba(255, 0, 0, 0);
            color: #ffffff;
            width: 32px;
            height: 32px;
          "
        >
          <img src="../assets/UI/多云.png" alt="" style="height: 100%" />
        </div>
        <div
          style="
            height: 30px;
            width: 1px;
            background: rgba(0, 160, 200, 0.4);
            margin-left: 10px;
          "
        ></div>
        <div
          style="
            background: rgba(255, 0, 0, 0);
            color: #ffffff;
            margin-left: 10px;
            height: 28px;
          "
        >
          <img src="../assets/UI/PM2.5.png" alt="" style="height: 28px" />
        </div>

        <div
          style="
            background: rgba(255, 0, 0, 0);
            color: #ffffff;
            margin-left: 10px;
          "
        >
          57.0
        </div>
        <div
          style="
            height: 30px;
            width: 1px;
            background: rgba(0, 160, 200, 0.4);
            margin-left: 10px;
          "
        ></div>
        <div
          style="
            background: rgba(255, 0, 0, 0);
            color: #ffffff;
            margin-left: 0px;
            height: 32px;
          "
        >
          <img src="../assets/UI/温度.png" alt="" style="height: 32px" />
        </div>
        <div
          style="
            background: rgba(255, 0, 0, 0);
            color: #ffffff;
            margin-left: 0px;
          "
        >
          36.5
        </div>
      </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import  { exportGLTF } from './threejs/scene/exportGLTF.js'
import  { model } from './threejs/scene/model.js'
import {
  PolygonMesh,
  material as polygonMaterial
} from './threejs/scene/PolygonMesh.js';
export default {
  name: "PageHeader",
  mounted: function () {
    var button = document.getElementById('exportGLTF');
    button.addEventListener('click',function(){
      exportGLTF(model);
    })
  },
  methods: {
    changePolygonColor(e) {
      const color = e.target.value
      console.log(color)
      polygonMaterial.color = new THREE.Color(color)
    }
  },
};
</script>


<style scoped>
</style>
