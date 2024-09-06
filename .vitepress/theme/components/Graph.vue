<template>
  <div style="height: 400px; margin-bottom: 50px">
    <div id="container"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Graph, treeToGraphData } from "@antv/g6";

const initGraph = () => {
  fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const graph = new Graph({
        container: document.getElementById("container"),
        autoFit:"view",
        autoResize: true,
        data: treeToGraphData(data),
        node: {
          style: (model) => {
            return {
              labelText: model.id,
              size: 26,
              labelPlacement: "right",
              labelMaxWidth: 200,
              lineWidth: 1,
              stroke: "#5F95FF",
              fill: "#EFF4FF",
              ports: [{ placement: "right" }, { placement: "left" }],
            };
          },
          animation: {
            enter: false,
          },
        },
        edge: {
          type: "cubic-horizontal",
          animation: {
            enter: false,
          },
        },
        layout: {
          type: "mindmap",
          direction: "H",
          getHeight: () => {
            return 16;
          },
          getWidth: () => {
            return 16;
          },
          getVGap: () => {
            return 10;
          },
          getHGap: () => {
            return 100;
          },
          getSide: () => {
            return "right";
          },
        },
        behaviors: [{ type: 'collapse-expand', key: 'collapse-expand' }, "drag-canvas", "zoom-canvas"],
      });

      graph.render();

      graph.updateBehavior({
        key: 'collapse-expand',
        trigger: 'click'
      });
    });
};

onMounted(() => {
  initGraph();
});
</script>
