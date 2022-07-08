/*
 * @Author: janasluo
 * @Date: 2021-12-21 18:14:17
 * @LastEditTime: 2021-12-21 18:14:20
 * @LastEditors: janasluo
 * @Description: 江河的光带shader
 */
export default /* glsl */ `
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

// https://github.com/mrdoob/three.js/pull/22425
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif



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
