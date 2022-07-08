import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// 创建一个CSS2渲染器CSS2DRenderer
var CSS2LabelRenderer = new CSS2DRenderer();
CSS2LabelRenderer.setSize(window.innerWidth, window.innerHeight);
CSS2LabelRenderer.domElement.style.position = 'absolute';
// 相对标签原位置位置偏移大小
CSS2LabelRenderer.domElement.style.top = '0px';
CSS2LabelRenderer.domElement.style.left = '0px';
// //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
CSS2LabelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(CSS2LabelRenderer.domElement);

export {CSS2LabelRenderer}