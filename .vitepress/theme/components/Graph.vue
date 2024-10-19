<template>
  <div
    :style="`height: ${height}; margin-bottom: 50px; position: relative;`"
    @mouseenter="showButton = true"
    @mouseleave="showButton = false">
    <div style="width: 100%; height: 100%" id="container"></div>
    <button v-show="showButton"  @click="showFullscreen" class="fullscreen-btn">
      <svg t="1725697644591" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8413" width="24" height="24"><path d="M846.787 133.787c11.716-11.716 30.71-11.716 42.426 0 11.716 11.716 11.716 30.71 0 42.426L649.44 415.987c-11.715 11.716-30.71 11.716-42.426 0-11.716-11.716-11.716-30.71 0-42.426l239.774-239.774zM373.645 606.928c11.716-11.716 30.711-11.716 42.427 0 11.716 11.716 11.716 30.71 0 42.427L177.213 888.213c-11.716 11.716-30.71 11.716-42.426 0-11.716-11.716-11.716-30.71 0-42.426l238.858-238.859zM177.213 133.787c-11.716-11.716-30.71-11.716-42.426 0-11.716 11.716-11.716 30.71 0 42.426l238.858 238.859c11.716 11.716 30.711 11.716 42.427 0 11.716-11.716 11.716-30.71 0-42.427L177.213 133.787z m471.311 471.31c-11.715-11.715-30.71-11.715-42.426 0-11.716 11.717-11.716 30.712 0 42.427l240.689 240.69c11.716 11.715 30.71 11.715 42.426 0 11.716-11.717 11.716-30.711 0-42.427l-240.689-240.69z" fill="#85A5FF" p-id="8414"></path><path d="M867 156H692.302c-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30h177.23C901.272 96 927 121.729 927 153.467v177.68c0 16.57-13.431 30-30 30-16.569 0-30-13.43-30-30V156z m0 534.118c0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30v178.415C927 900.27 901.271 926 869.533 926H691.386c-16.568 0-30-13.431-30-30 0-16.569 13.432-30 30-30H867V690.118zM332.55 866c16.57 0 30 13.431 30 30 0 16.569-13.43 30-30 30H154.468C122.73 926 97 900.271 97 868.533v-177.5c0-16.568 13.431-30 30-30 16.569 0 30 13.432 30 30V866h175.55zM157 156v175.148c0 16.568-13.431 30-30 30-16.569 0-30-13.432-30-30v-177.68C97 121.728 122.729 96 154.467 96h178.084c16.568 0 30 13.431 30 30 0 16.569-13.432 30-30 30H157z" fill="#2F54EB" p-id="8415"></path></svg>
    </button>
  </div>
  <div v-if="isFullscreen" class="fullscreen-modal">
    <div class="modal-content">
      <button @click="closeFullscreen" class="close-btn">&times;</button>
      <div id="fullscreen-container" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref,defineProps } from "vue";
import { allData,packageManager,scaffold,domAndCssom } from '../data'

const { Graph, treeToGraphData } = G6;
const isFullscreen = ref(false);
const showButton = ref(false);
let graph;

const props = defineProps({
  height: {
    type: String,
    default: '400px'
  },
  type: {
    type: String,
    default: 'mindmap'
  }
});


const showFullscreen = () => {
  isFullscreen.value = true;
  // 在下一个tick重新渲染图表，确保DOM已更新
  setTimeout(() => {
    initGraph('fullscreen-container');
  }, 0);
};

const closeFullscreen = () => {
  isFullscreen.value = false;
  // 可能需要重新初始化原始容器中的图表
  setTimeout(() => {
    initGraph('container');
  }, 0);
};

const COLORS = [
  '#1783FF',
  '#00C9C9',
  '#F08F56',
  '#D580FF',
  '#7863FF',
  '#DB9D0D',
  '#60C42D',
  '#FF80CA',
  '#2491B3',
  '#17C76F',
];

const RootNodeStyle = {
  fill: '#bae0ff',
  labelFill: '#262626',
  labelFontSize: 14,
  labelFontWeight: 600,
  labelPlacement: 'center',
  ports: [{ placement: 'right' }, { placement: 'left' }],
  radius: 4,
};

const NodeStyle = {
  labelFill: '#262626',
  labelFontSize: 14,
  labelFontWeight: 500,
  labelPlacement: 'center',
  ports: [{ placement: 'right' }, { placement: 'left' }],
  radius: 4,
  ports: [
    { placement: 'right-bottom', key: 'right-bottom' },
    { placement: 'left-bottom', key: 'left-bottom' },
  ],
};


const measureText = (text, font = '14px Arial') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

const getNodeWidth = (nodeId, isRoot) => {
  return isRoot
    ? measureText(nodeId) + 40
    : measureText(nodeId) + 30;
};

const ancestorsOf = (graph, nodeId) => {
  const ancestors = [];
  const data = graph.getNodeData();

  const findAncestors = (data, nodeId) => {
    for (const child of data) {
      if (
        child.id === nodeId ||
        (child.children &&
          findAncestors(
            child.children.map((child) => graph.getNodeData(child)),
            nodeId,
          ))
      ) {
        ancestors.push(String(child.id));
        return true;
      }
    }

    return false;
  };

  findAncestors(data, nodeId);
  return ancestors.reverse();
};

const rootChildOf = (graph, nodeId) => {
  return ancestorsOf(graph, nodeId)[1];
};

const findRootNode = (graph) => {
  const data = graph.getNodeData();
  for (const node of data) {
    const ancestors = ancestorsOf(graph, node.id);
    if (ancestors.length === 1) return node;
  }
  return undefined;
};

const getColor = (graph, nodeId) => {
  const rootNode = findRootNode(graph);
  if (!rootNode) return null;

  const oneLevelNodeIds = rootNode.children || [];
  const ancestorNode = rootChildOf(graph, nodeId) || nodeId;

  const order = oneLevelNodeIds.findIndex((id) => ancestorNode === id);
  return COLORS[order % COLORS.length];
};



const initGraph = (containerId) => {
  const getData = () => {
    switch (props.type) {
      case 'allData':
        return allData
      case 'packageManager':
        return packageManager
      case 'scaffold':
        return scaffold
      case 'domAndCssom':
        return domAndCssom
    }
  }
      const data = getData()
      const rootId = data.id;
      if (graph) {
        graph.destroy();
      }
      graph = new Graph({
        container: document.getElementById(containerId),
        autoFit: props.type === 'allData' ? 'view' : false,
        data: treeToGraphData(data),
        node: {
          type: 'rect',
          style: (d) => {
            const isRoot = d.id === rootId;
            const color = getColor(graph, d.id)
            return {
              labelText: d.id,
              size: [getNodeWidth(d.id, isRoot), 30],
              ...(isRoot ? RootNodeStyle : {
                ...NodeStyle,
                fill: color
              }),
            };
          },
          animation: {
            enter: false,
          },
        },
        edge: {
          type: "cubic-horizontal",
          style: {
            curvePosition: 0.4,
            stroke: function (d) {
              return getColor(this, d.target);
            }
          },

          animation: {
            enter: false,
          },
        },
        layout: {
          type: 'mindmap',
          direction: 'H',
          getHeight: () => 16,
          getWidth: (node) => getNodeWidth(node.id, rootId === node.id),
          getVGap: () => 30,
          getHGap: () => 30,
        },
        behaviors: [{ type: 'collapse-expand', key: 'collapse-expand' }, "drag-canvas", "zoom-canvas"],
      });

      graph.render();

      graph.updateBehavior({
        key: 'collapse-expand',
        trigger: 'click'
      });
};

onMounted(() => {
  initGraph('container');
});
</script>
<style scoped>
.fullscreen-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  width: 95%;
  height: 95%;
  background-color: white;
  border-radius: 8px;
  position: relative;
  padding: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  font-size: 32px;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2010;
}
</style>
