<!-- Desc : svg组件 -->
<template>
  <svg
    aria-hidden="true"
    class="svg-icon pointer"
    :width="props.size"
    :style="{fontSize: props.size + 'px', fill: props.color}"
    :height="props.size"
  >
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>

<!------------------------------>
<script lang="ts">
export default {name: 'SvgIcon'}
</script>
<script setup lang="ts">
const props = defineProps({
  size: {type: String, default: '16'},
  name: {type: String, default: '', required: true},
  color: {type: String, default: '#333'},
})
//emit
const emit = defineEmits([])

//hooks
</script>

<!------------------------------>

<style scoped lang="scss"></style>
