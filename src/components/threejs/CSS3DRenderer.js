import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// 创建一个CSS3渲染器CSS3DRenderer
var CSS3LabelRenderer = new CSS3DRenderer();
CSS3LabelRenderer.setSize(window.innerWidth, window.innerHeight);
CSS3LabelRenderer.domElement.style.position = 'absolute';
// 相对标签原位置位置偏移大小
CSS3LabelRenderer.domElement.style.top = '0px';
CSS3LabelRenderer.domElement.style.left = '0px';
// //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
CSS3LabelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(CSS3LabelRenderer.domElement);

export {CSS3LabelRenderer}