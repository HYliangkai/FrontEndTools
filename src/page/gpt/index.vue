<!-- Desc : ChatGPT:原理是直接嵌套iframe:不可行 -->
<template>
  <div class="h-full y-hidden x-hidden">
    <!-- <iframe class="h-full" src="https://chat.openai.com" :style="{width: width + 'px'}"></iframe> -->
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {watch_width} from '@/hooks/mod'
const width = watch_width()
</script>

<!------------------------------>

<style scoped lang="scss"></style>
