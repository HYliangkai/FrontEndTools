<!-- Desc : 颜色快速计算 -->
<template>
  <!-- Html : 颜色显示 -->
  <div class="pt-50 pl-20 flex it-center">
    <a-input-group size="large" compact>
      <a-select v-model:value="change_type" style="width: 100px" @change="color_value = ''">
        <a-select-option value="HEX">HEX</a-select-option>
        <a-select-option value="RGB">RGB</a-select-option>
        <a-select-option value="RGBA">RGBA</a-select-option>
      </a-select>
      <a-input v-model:value="color_value" style="width: 224px" allow-clear>
        <template #suffix>
          <div class="h-full w-40" :style="{background: color_value}"></div>
        </template>
      </a-input>
    </a-input-group>
    <!-- 转化 -->
    <a-input-group size="large" compact>
      <a-select
        v-model:value="change_type"
        style="width: 100px"
        disabled
        @change="color_value = ''"
      >
        <a-select-option value="HEX">HEX</a-select-option>
        <a-select-option value="RGB">RGB</a-select-option>
        <a-select-option value="RGBA">RGBA</a-select-option>
      </a-select>
      <a-input v-model:value="color_value" style="width: 224px" allow-clear disabled>
        <template #suffix>
          <div class="h-full w-40" :style="{background: color_value}"></div>
        </template>
      </a-input>
    </a-input-group>
  </div>

  <div></div>
</template>

<!------------------------------>

<script setup lang="ts">
const comp_color = computed(() => {
  //HEX <-> RGB <-> RGBA
  if (change_type.value === 'HEX') {
    //HEX -> RGB
    const hex = color_value.value.replace('#', '')
    var r = parseInt(hex.substring(0, 2), 16)
    var g = parseInt(hex.substring(2, 4), 16)
    var b = parseInt(hex.substring(4, 6), 16)
    // 返回 RGB 颜色值
    return `RGB(${r} --   ${g}  --,  ${b})`
  } else if (change_type.value === 'RGB') {
    return ``
  } else if (change_type.value === 'RGBA') {
    return ``
  }
})
const change_type = ref('HEX')
const color_value = ref('white')
</script>

<!------------------------------>

<style scoped lang="scss"></style>
