<script setup lang="ts">
import { copy } from '../content'
import { useSiteLocale } from '../composables/useSiteLocale'

const { lang } = useSiteLocale()
</script>

<template>
  <div style="display: flex;flex-direction: column;">
    <div style="display: flex;justify-content:center;margin-top: 40px; margin-bottom: 20px;color:#d4380d">{{ copy[lang].qrContact }}</div>
    <div style="display: flex;justify-content: center;">
      <img style="border: 1px solid #e2e2e3;border-radius: 8px;height:200px" src="/wx_qr.jpeg" :alt="copy[lang].qrContact"/>
    </div>
    <!-- <div style="display: flex;justify-content:center;margin-bottom: 20px;color:#d4380d">鼓励作者欢迎微信打赏</div>
    <div style="display: flex;justify-content: center;">
      <img style="border: 1px solid #e2e2e3;border-radius: 8px;" src="/payment/IMG_5471.jpeg"/>
    </div>     -->
  </div>
</template>

<style>
.vp-sponsor-grid.medium .vp-sponsor-grid-image {
  max-height: 90px;
}
</style>
