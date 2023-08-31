<!-- Desc : 可视化阴影 -->
<template>
  <div class="h-full y-hidden x-hidden">
    <iframe
      class="h-full"
      src="https://www.lingdaima.com/shadow/"
      :style="{width: width + 'px'}"
    ></iframe>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {watch_width} from '@/hooks/mod'
const width = watch_width()
</script>

<!------------------------------>

<style scoped lang="scss"></style>
