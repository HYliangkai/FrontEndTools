<!-- Desc : 颜色快速计算 -->
<template>
  <div class="h-full w-full box-center" :style="{background: hex}">
    <div
      class="grad-class w-35per"
      :style="{
        border: `2px solid ${lint}`,
      }"
    >
      <div class="row-center">
        <div class="w-100 default us-none">HEX</div>
        <a-input v-model:value="hex" style="width: calc(100% - 100px)" :maxlength="7" />
      </div>
      <div class="row-center mt-24">
        <div class="w-100 default us-none">R</div>
        <a-input-number v-model:value="r" style="width: calc(100% - 100px)" :max="255" :min="0" />
      </div>
      <div class="row-center mt-24">
        <div class="w-100 default us-none">G</div>
        <a-input-number v-model:value="g" style="width: calc(100% - 100px)" :max="255" :min="0" />
      </div>
      <div class="row-center mt-24">
        <div class="w-100 default us-none">B</div>
        <a-input-number v-model:value="b" style="width: calc(100% - 100px)" :max="255" :min="0" />
      </div>
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
const hex = ref('#e8ecf1')
const r = ref(232)
const g = ref(236)
const b = ref(241)
const lint = computed(() => {
  return hex.value.replace('#', '').length === 3 || hex.value.replace('#', '').length === 6
    ? 'transparent'
    : '#f38181'
})

watch(hex, (val) => {
  val = val.replace('#', '')
  if (val.length === 6) {
    r.value = parseInt(val.slice(0, 2), 16)
    g.value = parseInt(val.slice(2, 4), 16)
    b.value = parseInt(val.slice(4, 6), 16)
  }
  if (val.length === 3) {
    r.value = parseInt(val.slice(0, 1), 16)
    g.value = parseInt(val.slice(1, 2), 16)
    b.value = parseInt(val.slice(2, 3), 16)
  }
})

watch([r, g, b], ([r, g, b]) => {
  hex.value = '#' + r.toString(16) + g.toString(16) + b.toString(16)
})
</script>

<!------------------------------>

<style scoped lang="scss">
.grad-class {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 2.8px 2.8px 11.5px rgba(0, 0, 0, 0.09), 6.7px 6.7px 21px rgba(0, 0, 0, 0.065),
    12.5px 12.5px 28.7px rgba(0, 0, 0, 0.054), 22.3px 22.3px 35.5px rgba(0, 0, 0, 0.045),
    41.8px 41.8px 44.6px rgba(0, 0, 0, 0.036), 100px 100px 80px rgba(0, 0, 0, 0.025);
}
</style>
