<template>
    <div id="flytag" style="display: none; z-index: 20; width: 190px">
        <div
            class="tag"
            style="
                background-color: rgba(0, 255, 255, 0.1);
                padding: 10px;
                color: #fff;
                font-size: 16px;
            "
        >
            <div style="padding: 10px">
                <img src="../../../assets/地点.png" style="width: 18px" />
                杨浦区-复旦大学
            </div>
        </div>
        <div
            style="
                margin-left: 80px;
                height: 1px;
                width: 40px;
                background: #00ffff;
            "
        ></div>
        <div
            style="
                margin-left: 100px;
                height: 30px;
                width: 1px;
                background: #00ffff;
            "
        ></div>
    </div>
</template>

<script>
    import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
    import { DroneMesh } from '../scene/DroneMesh.js'; // 无人机模型
    export default {
        name: 'flyTag',
        data() {
            return {
                // height: 300, //无人机飞行高度300米
                // E: 121.49926536464691, //失火经纬度坐标
                // N: 31.24289350905988,
            };
        },
        mounted() {
            let label = this.tag(300); //创建标签对象
            label.position.set(0, 0, 145); // 标签对象和mesh对象一样可以设置位置，可以根据需要偏移位置
            DroneMesh.add(label); //标签对象添加到三维场景
        },
        methods: {
            // 创建一个HTML标签
            tag(size) {
                // 获取div元素(作为标签)
                let div = document.getElementById('flytag');
                div.style.display = 'block'; //HTML标签代码中设置了display:none;，这里改为'block'
                // let label = new CSS3DObject(div);//HTML标签对象 类似矩形平面Mesh
                let label = new CSS3DSprite(div); //HTML标签对象 类似Sprite
                // CSS3标签HTML元素渲染大小由自身像素尺寸和scale属性决定
                let w = div.offsetWidth; //获取标签HTML元素宽度
                // console.log("w", w);
                label.scale.set(size / w, size / w, size / w); //缩放CSS3DObject模型对象
                // 设置HTML元素标签位置
                // label.position.set(x, y, z);
                div.style.pointerEvents = 'none'; //避免HTML标签遮挡三维场景的鼠标事件
                return label; //返回CSS3模型标签
            },
        },
    };
</script>

<style scoped></style>
