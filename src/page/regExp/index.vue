<!-- Desc : 正则表达式解析 -->
<template>
  <div class="box-center mt-48">
    <div class="w-60per">
      <a-textarea
        v-model:value="parse_text"
        placeholder="输入待解析文本"
        allow-clear
        show-count
        :auto-size="{minRows: 4, maxRows: 6}"
      />
      <div class="ts-32 my-12 t-center t-bold">+</div>
      <div>
        <a-input-search
          v-model:value="reg_exp"
          placeholder="输入正则表达式"
          enter-button
          allow-clear
          @search="compute"
        />
        <div class="row-end mt-12">
          <a-checkbox v-model:checked="all">匹配全部</a-checkbox>
          <a-checkbox v-model:checked="ign">忽略大小写</a-checkbox>
        </div>
      </div>
      <div class="ts-32 my-12 t-center t-bold">=</div>
      <div>
        <a-textarea
          v-model:value="the_parse_text"
          placeholder="解析后的文本"
          :auto-size="{minRows: 4, maxRows: 6}"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Own, option} from '@/utils/mod'

const [parse_text, reg_exp, the_parse_text] = [ref(''), ref(''), ref('')]
const [all, ign] = [ref(true), ref(false)]

const compute = () => {
  const neg = new RegExp(
    reg_exp.value,
    Own(all.value)
      .match_map(
        () => (Own(ign.value).take() ? 'gi' : 'g'),
        () => (Own(ign.value).take() ? 'i' : ''),
      )
      .take(),
  )
  const res = parse_text.value.match(neg)
  the_parse_text.value = option(res).unwrap_or(['']).join('\n')
}
</script>

<!------------------------------>

<style scoped lang="scss"></style>
