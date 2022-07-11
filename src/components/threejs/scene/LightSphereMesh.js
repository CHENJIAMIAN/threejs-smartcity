/*
 * @Description: 径向渐变发光球
 */
import * as THREE from 'three';
import vertexShader from './shader/light_vertex.glsl.js';
import fragmentShader from './shader/light_fragment.glsl.js';

let material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
});
// size:尺寸
function createLightSphereMesh(size) {
    // 创建一个球
    let geometry = new THREE.SphereGeometry(size, 30, 30);
    let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // 波动动画
    let S = 1.5; //波动范围设置
    let _s = 1.0;
    function waveAnimation() {
        _s += 0.01;
        mesh.scale.set(_s, _s, _s);
        if (_s > S) _s = 1.0;
        requestAnimationFrame(waveAnimation);
    }
    waveAnimation();

    mesh.rotateX(Math.PI / 2); //旋转调整姿态
    return mesh;
}
export { createLightSphereMesh };
