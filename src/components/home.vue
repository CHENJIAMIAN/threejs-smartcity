<template>
  <div ref="webgl">
    <page-header></page-header>
    <echarts></echarts>
    
    <fly-tag></fly-tag>
    <flame-tag></flame-tag>
  </div>
</template>

<script>
import { renderer } from "./threejs/RenderLoop.js";
import PageHeader from "./PageHeader.vue"; //页面头部
import echarts from "./echarts.vue"; //2D可视化图表

import FlyTag from "./threejs/HTMLTag/FlyTag.vue"; //无人机标注的标签
import FlameTag from "./threejs/HTMLTag/FlameTag.vue"; //火焰标注的标签

export default {
  name: "HelloWorld",
  props: {
    // msg: String
  },
  components: {
    PageHeader,
    echarts,
    FlyTag,
    FlameTag,
  },
  created: function () {
    // this.$refs.webgl.appendChild(renderer.domElement);//不可以
    // Three.js渲染结果Canvas画布插入到body元素中
    // document.body.appendChild(renderer.domElement);//可以访问body
    // renderer.domElement.style.position = 'absolute';
    // renderer.domElement.style.top = '0px';
    // renderer.domElement.style.zIndex = '-1';//canvas全屏，不遮挡其它HTML元素
  },
  mounted: function () {
    // this.$refs.webgl.appendChild(renderer.domElement);
    // // Three.js渲染结果Canvas画布插入到body元素中
    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.zIndex = "-1"; //canvas全屏，不遮挡其它HTML元素
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
