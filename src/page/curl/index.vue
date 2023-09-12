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
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
const methods = ref('Post')
</script>

<!------------------------------>

<style scoped lang="scss"></style>
