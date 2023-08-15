<!-- Desc :  -->
<template>
  <div class="image-file">
    <img alt="🈚️" class="image" :src="props.src" />
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
//import

const props = defineProps({
  src: String,
})
//emit
const emit = defineEmits([])

//hooks
</script>

<!------------------------------>

<style scoped lang="scss">
.image-file {
  display: inline-block;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0 15px 15px rgba(0, 57, 183, 0.15));
  color: #3755dc;
  font-style: italic;
  font-size: 23.4px;
  .image {
    width: 81px;
    vertical-align: middle;
    border: 0;
    overflow-clip-margin: content-box;
    overflow: clip;
    font-size: 800;
  }
}
</style>
