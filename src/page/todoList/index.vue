<!-- Desc : TodoList 列表 -->
<template>
  <div class="todo">
    <div
      v-for="(item, index) in all_list"
      class="important boxer"
      :key="index"
      :class="match(index, [0, 'A'], [1, 'B'], [2, 'C'], [Default, 'D'])"
    >
      <div class="row-center h-20">
        <div
          class="h-18 w-18 circle mc"
          :class="match(index, [0, 'mc'], [1, 'sc'], [2, 'nc'], [Default, 'rc'])"
        ></div>
        <div class="fpp ts-16 ml-16">{{ item.name }}</div>
        <div class="flex-1 t-right"><SvgIcon name="add" @click="add_todo('m')" /></div>
      </div>
      <div class="content-sider">
        <div v-for="(it, ind) in item.list" class="item-line" :key="ind">
          <a-checkbox v-model:checked="it.state" @change="check_item(it.id)" />
          <div class="title">{{ it.title }}</div>
        </div>
      </div>
    </div>
  </div>
  <div type="default" class="float-button">
    <InboxOutlined style="color: #fff" @click="go_outline" />
  </div>
  <div></div>
</template>

<!------------------------------>

<script setup lang="ts">
import {Default, match} from '@/utils/mod'
import {InboxOutlined} from '@ant-design/icons-vue'
/** @TodoType */

/** @List */
type List = Array<{
  title: string
  state: boolean
  id: number
}>
const mlist = ref<List>([{title: '今日事', state: false, id: 0}])
const all_list = ref([
  {name: '很重要', list: mlist.value},
  {name: '一般重要', list: mlist.value},
  {name: '可以晚点做', list: mlist.value},
  {name: '记得做', list: mlist.value},
])
/** @Operate */
const add_todo = (type: 'm' | 's' | 'n' | 'r') => {}

const check_item = (tar: number) => {
  for (const item of all_list.value) {
    for (const it of item.list) {
      //it.id==tar
    }
  }
}

/** @ChangeType */
const go_outline = () => {}
const back_todo = () => {}

/** @OutlineType */
</script>

<!------------------------------>

<style lang="scss" scoped>
.todo {
  height: 100%;
  width: 100%;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'one two' 'three four';
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  .boxer {
    background: #fff;
    border: 1px solid #979797;
    border-radius: 4px;
    padding: 24px;

    .content-sider {
      height: calc(100% - 20px);
      padding-top: 24px;
      overflow-y: auto;
      overflow-x: hidden;
      .item-line {
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d8d8d8;
        .title {
          padding-left: 16px;
          font-size: 14px;
          overflow-x: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }

  .sub-important {
    background: #fff;
    grid-area: 'two';
  }
  .no-matter {
    background: #fff;
    grid-area: 'three';
  }
  .remember {
    background: #fff;
    grid-area: 'four';
  }
}
.float-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
  height: 40px;
  width: 40px;
  background: #6389f4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.mc {
  background: #f0807f;
}
.sc {
  background: #f6c040;
}
.nc {
  background: #6389f4;
}
.rc {
  background: #5bd1ae;
}
.fpp {
  font-family: 'Hanzipen SC';
}
</style>
<style lang="scss">
.A {
  .ant-checkbox-inner {
    border-color: #f0807f !important;
  }
}
.B {
  .ant-checkbox-inner {
    border-color: #f6c040 !important;
  }
}
.C {
  .ant-checkbox-inner {
    border-color: #6389f4 !important;
  }
}
.D {
  .ant-checkbox-inner {
    border-color: #5bd1ae !important;
  }
}
</style>
