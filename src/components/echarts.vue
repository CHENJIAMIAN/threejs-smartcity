<template>
  <div>
  <div
    style="position: absolute;left:10px;top:240px;background:rgba(0,0,0,0.25);border-radius: 10px;padding: 20px 10px;z-index:10;">
    <div id="echarts1" style="width: 360px;height: 240px;"></div>
  </div>

  <div
    style="position: absolute;left:10px;top:600px;background:rgba(0,0,0,0.25);border-radius: 10px;padding: 0px 10px;z-index:10;">
    <div id="echarts2" style="width: 360px;height: 360px;"></div>
  </div>

  <div
    style="position: absolute;left:1530px;top:240px;background:rgba(0,0,0,0.25);border-radius: 10px;padding: 20px 10px;z-index:10;">
    <div id="echarts3" style="width: 360px;height: 240px;"></div>
  </div>

  <div
    style="position: absolute;left:1530px;top:600px;background:rgba(0,0,0,0.25);border-radius: 10px;padding: 0px 10px;z-index:10;">
    <div id="echarts4" style="width: 360px;height: 360px;"></div>
  </div>

  </div>
</template>

<script>
import line from './echarts/line.js';
import ring from './echarts/ring.js';
import radar from './echarts/radar.js';
import meter from './echarts/meter.js';
export default {
  name: "echarts",
  mounted:function(){
      
    line('echarts1')
    ring('echarts2')

    radar('echarts3')
    meter('echarts4')

  }
};
</script>


<style scoped>
/* .container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
} */

/* .item {
  background: #ffffff;
  width: 290px;
  height: 360px;
} */
</style>
