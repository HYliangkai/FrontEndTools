<!-- Desc : 默认主页 -->
<template>
  <div class="h-full w-full home font-kaiti box-center">
    <div>
      <img width="200" height="200" class="desc-home" src="../../assets/images/avg.png" alt="" />
      <div class="t-center mt-32 ts-28 t-bold">工具箱</div>
      <!-- 查看内存占用 cpu温度 风扇转速  -->
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
//import

//props
// interface Props {}

// const props = defineProps<Props>()
//emit
const emit = defineEmits([])

//hooks
</script>

<!------------------------------>

<style scoped lang="scss">
.desc-home {
  display: block;
  border-radius: 50%;
  box-shadow: -29px 29px 58px #b5b5b5, 29px -29px 58px #ffffff;
}
</style>
