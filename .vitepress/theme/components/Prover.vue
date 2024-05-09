<template>
  <div class="prover">
    <div class="prover-content" @mouseenter="showProver = true" @mouseleave="showProver = false">
      <slot></slot>
      <Transition name="fade">
        <div v-if="showProver" class="prover-image" v-bind:style="{top: top, left: left}">
          <img :src="proverImage" alt="Prover Image" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Prover',
  props: {
    proverImage: {
      type: String,
      required: true
    },
    left: {
      type: String,
      default: '-80px'
    },
    top:{
      type: String,
      default: '-160px'
    }
  },
  setup(props) {
    const showProver = ref(false);

    return {
      showProver
    }
  }
}
</script>

<style scoped>
.prover {
  position: relative;
  display: inline-block;
}

.prover-content {
  position: relative;
  cursor: pointer;
}

.prover-image {
  position: absolute;
  z-index: 999;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.prover-image img {
  max-width: 200px;
  max-height: 200px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>