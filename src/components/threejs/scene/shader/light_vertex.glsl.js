export default /* glsl */`
varying vec3 vNormal;
void main() 
{
  // normal：对应geometry.attributes.normal数据
  // 相机视图矩阵和模型自身的矩阵变换都会影响模型表面某位置法线相对视线夹角发生改变
  // 法线矩阵normalMatrix是通过模型的模型矩阵和视图矩阵变换而来
  // three.js内部normalMatrix表示顶点法线的变换矩阵
  vNormal = normalize( normalMatrix * normal ); 
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
