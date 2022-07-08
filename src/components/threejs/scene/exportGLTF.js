/*
 * @Author: janasluo
 * @Date: 2021-12-16 14:47:05
 * @LastEditTime: 2021-12-16 14:48:12
 * @LastEditors: janasluo
 * @Description:
 * @FilePath: /test/Users/janas/work/project/threejs/threejs-smartcity/src/components/threejs/scene/exportGLTF.js
 */
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

function exportGLTF(input) {
  var gltfExporter = new GLTFExporter();
  var options = {
    trs: false,
    onlyVisible: true,
    truncateDrawRange: true,
    binary: true, //是否导出.gltf的二进制格式.glb  控制导出.gltf还是.glb
    forceIndices: false,
    forcePowerOfTwoTextures: false,
  };
  gltfExporter.parse(
    input,
    function (result) {
      if (result instanceof ArrayBuffer) {
        save(
          new Blob([result], { type: "application/octet-stream" }),
          "scene.glb"
        );
      } else {
        var output = JSON.stringify(result, null, 2);
        save(new Blob([output], { type: "text/plain" }), "scene.gltf");
      }
    },
    options
  );
}

var link = document.createElement("a");
link.style.display = "none";
// document.body.appendChild(link);
function save(blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
export { exportGLTF };
