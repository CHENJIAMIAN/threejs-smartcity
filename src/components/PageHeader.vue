<template>
    <div style="color: white">
        <button id="exportGLTF" style="margin-right: 10px">
            导出exportGLTF
        </button>
        changePolygonColor:
        <input type="color" v-on:change="changePolygonColor" />
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
        mounted: function () {
            var button = document.getElementById('exportGLTF');
            button.addEventListener('click', function () {
                exportGLTF(model);
            });
        },
        methods: {
            changePolygonColor(e) {
                const color = e.target.value;
                console.log(color);
                polygonMaterial.color = new THREE.Color(color);
            },
        },
    };
</script>

<style scoped></style>
