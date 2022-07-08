<template>
    <div>
        <page-header>
            <input type="checkbox" v-model="isShowEcharts" />
            显示echart图表
        </page-header>
        
        <echarts v-if="isShowEcharts"></echarts>

        <!-- 显示杨浦区-复旦大学的精灵图 -->
        <CSS3DSpriteDemo></CSS3DSpriteDemo>

        <flame-tag></flame-tag>
    </div>
</template>

<script>
    import { renderer } from './threejs/RenderLoop.js';
    import PageHeader from './PageHeader.vue'; //页面头部
    import echarts from './echarts.vue'; //2D可视化图表

    import CSS3DSpriteDemo from './threejs/HTMLTag/CSS3DSpriteDemo.vue'; //无人机标注的标签
    import FlameTag from './threejs/HTMLTag/FlameTag.vue'; //火焰标注的标签

    export default {
        data() {
            return {
                isShowEcharts: false,
            };
        },
        components: {
            PageHeader,
            echarts,
            CSS3DSpriteDemo, //FIXME:为什么显示不出来了
            FlameTag,
        },
        mounted() {
            document.body.appendChild(renderer.domElement);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = '0px';
            renderer.domElement.style.zIndex = '-1'; //canvas全屏，不遮挡其它HTML元素
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
