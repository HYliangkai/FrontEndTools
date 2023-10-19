<!-- Desc : 快速的Curl -->
<template>
  <div class="h-full w-full p-24">
    <div class="row-center">
      <a-select v-model:value="methods" size="large" ref="select" style="width: 120px">
        <a-select-option
          v-for="(item, index) in ['Post', 'Get', 'Put', 'Delete']"
          :key="index"
          :value="item"
        >
          {{ item }}
        </a-select-option>
      </a-select>
      <a-input v-model:value="url" placeholder="请输入url" size="large" />
      <a-button type="primary" class="ml-12" size="large">发 送</a-button>
    </div>
    <!-- Html请求部分 -->
    <div
      class="mt-24 border-dark border-1 border-solid radius-large y-auto"
      style="height: calc(100% - 288px)"
    ></div>
    <!-- Html:响应部分 -->
    <div class="mt-24 border-dark border-1 border-solid radius-large h-200 y-auto"></div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
const methods = ref('Get')
const url = ref('')
</script>

<!------------------------------>

<style scoped lang="scss"></style>
