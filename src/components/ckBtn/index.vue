<!-- Desc : 按钮组件 -->
<template>
  <button
    class="btn-style"
    :disabled="props.disable"
    :style="`${props.disable ? 'cursor:not-allowed;background-color: rgba(55, 85, 220,0.6);' : ''}`"
  >
    <slot></slot>
  </button>
</template>

<!------------------------------>

<script setup lang="ts">
//import

//props

const props = defineProps({
  size: {
    // 'small' | 'middle' | 'large'
    type: String,
    default: 'middle',
  },
  disable: Boolean,
  type: {
    // 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
    type: String,
    default: 'primary',
  },
})
//emit

//hooks
</script>

<!------------------------------>

<style scoped lang="scss">
.btn-style {
  box-shadow: 0 4px 15px rgba(55, 85, 220, 0.3);
  background-color: rgb(55, 85, 220);
  height: 40px;
  font-size: 12px;
  border-radius: 30px;
  padding-left: 24px;
  padding-right: 24px;
  color: white;
  text-decoration: none;
  margin: 0 22px;
  display: flex;
  flex-wrap: nowrap;
  outline: 1px solid transparent;
  align-items: center;
  white-space: nowrap;
  border: none;
  letter-spacing: 1.7px;
  font-weight: 800;
  overflow: visible;
}
</style>
