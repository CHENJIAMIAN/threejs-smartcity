<template>
    <div style="color: white">
        <slot></slot>
        <button id="exportGLTF" style="margin-right: 10px">
            导出exportGLTF
        </button>
        changePolygonColor:
        <input type="color" v-model="polygonMaterialColor" />
    </div>
</template>

<script>
    import * as THREE from 'three';
    import { exportGLTF } from './threejs/scene/exportGLTF.js';
    import { model } from './threejs/scene/model.js';
    import {
        PolygonMesh,
        material as polygonMaterial,
    } from './threejs/scene/PolygonMesh.js';
    export default {
        name: 'PageHeader',
        data() {
            return {
                polygonMaterialColor: '#BA1C1C',
            };
        },
        watch: {
            polygonMaterialColor: {
                handler(color, oldValue) {
                    console.log(color);
                    polygonMaterial.color = new THREE.Color(color);
                },
            },
        },
        mounted() {
            let button = document.getElementById('exportGLTF');
            button.addEventListener('click', function () {
                exportGLTF(model);
            });
        },
    };
</script>
