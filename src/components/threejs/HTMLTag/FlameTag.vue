<template>
  <div id="flametag" class="tag"></div>
</template>

<script>
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { model } from "../scene/model.js";
import { createFlame } from "../scene/flame.js"; // 火焰网格模型
import { lon2xy } from "../scene/math.js";

export default {
  name: "FlameTag",
  data: function () {
    return {
      height: 200, //标注高度
      E: 121.49526536464691, //失火经纬度坐标
      N: 31.24189350905988,
    };
  },
  mounted: function () {
    var h = 200; //火焰高度尺寸
    var flame = createFlame(h); //创建一个火焰对象
    model.add(flame);
    var xy = lon2xy(this.E, this.N);
    var x = xy.x;
    var y = xy.y;
    // 设置火焰坐标
    flame.position.set(x, y, this.height);

    // 火焰上方标签
    var messageTag = tag("东方明珠1601" + " 失火了 ！！！");
    flame.add(messageTag); //id"messageTag"对应的HTML元素作为three.js标签
    messageTag.position.y += h; //考虑火焰高度 向上适当偏移

    // 创建一个HTML标签
    function tag(name) {
      // 获取div元素(作为标签)
      var div = document.getElementById("flametag");
      div.innerHTML = name;
      //div元素包装为CSS2模型对象CSS2DObject
      var label = new CSS2DObject(div);
      div.style.pointerEvents = "none"; //避免HTML标签遮挡三维场景的鼠标事件
      // 设置HTML元素标签在three.js世界坐标中位置
      // label.position.set(x, y, z);
      return label; //返回CSS2模型标签
    }
  },
};
</script>

<style scoped>
.tag {
  /* border:solid #009999 1px; */
  background: linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) right bottom,
    linear-gradient(#00ffff, #00ffff) right bottom;
  background-repeat: no-repeat;
  background-size: 1px 6px, 6px 1px;
  background-color: rgba(0, 66, 66, 0.4);
  color: #ffffff;
  font-size: 18px;
  padding: 8px 12px;
}
</style>
