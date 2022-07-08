/*
 * @Author: janasluo
 * @Date: 2021-11-11 13:50:52
 * @LastEditTime: 2021-12-21 18:19:49
 * @LastEditors: janasluo
 * @Description: 建筑物渐变及光带shader
 */
export default /* glsl */ `
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

// https://github.com/mrdoob/three.js/pull/22425
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif
// 楼高范围[0,354]
// 线性渐变
// vec3 gradient = mix(vec3(0.0,0.1,0.1), vec3(0.0,1.0,1.0), vPosition.z/354.0);
// 非线性渐变  小部分楼层太高，不同高度矮楼层颜色对比不明显,可以采用非线性渐变方式调节
vec3 gradient = mix(vec3(0.0,0.1,0.1), vec3(0.0,1.0,1.0), sqrt(vPosition.z/354.0));

// 在光照影响明暗的基础上，设置渐变
outgoingLight = outgoingLight*gradient;


float x0 = 13520747.0+time*1200.0;
float w = 100.0;//光带宽度一半，单位米

if(vPosition.x>x0&&vPosition.x<x0+2.0*w){
    // 渐变色光带
    float per = 0.0;
    if(vPosition.x<x0+w){
        per = (vPosition.x-x0)/w;
        outgoingLight = mix( outgoingLight, vec3(1.0,1.0,1.0),per);
    }else{
        per = (vPosition.x-x0-w)/w;
        outgoingLight = mix( vec3(1.0,1.0,1.0),outgoingLight,per);
    }
}
gl_FragColor = vec4( outgoingLight, diffuseColor.a );

`;
