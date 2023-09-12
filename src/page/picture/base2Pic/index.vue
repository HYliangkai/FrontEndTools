<!-- Desc : Base64 <-- 图片相互转化 -->
<template>
  <div class="p-24 h-full">
    <!-- Html:选择区域 -->
    <div
      class="h-70per p-20 pointer"
      @dragenter="dragenter"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <div
        class="h-full box-center font-kaiti ts-18 select-bar tw-800"
        style="
          border: 2.5px dotted #3755dc;
          border-radius: 15px;
          color: #3755dc;
          padding-left: 130px;
        "
        @click="image_select"
      >
        <div class="picmg flex-nowarp">
          <ImageFile :src="pic_one" />
          <ImageFile :src="pic_two" />
          <ImageFile :src="pic_three" />
        </div>
        选择/拖拽图片
      </div>
    </div>
    <!-- Html:操作/展示区域 -->
    <div class="h-30per x-hidden">
      <div v-if="base64" class="px-20 mb-20 flex">
        <img
          height="63"
          width="100"
          class="radius-large shrink-0"
          style="border: 1px solid #3755dc"
          :src="base64"
        />

        <div class="pl-12 flex-1">
          <div class="h-28 t-24 color-font t-bold">{{ image_info.name }}</div>
          <div class="color-font mb-4">
            {{ `${image_info.width} x ${image_info.heigth} px , ${image_info.suffix}` }}
          </div>
          <div class="t-center h-32 t-ellipsis w-full color-font">{{ base64.slice(0, 1000) }}</div>
        </div>
      </div>

      <div class="row-center">
        <CkBtn :disable="base64 == ''" @click="image_save">
          <div class="box-center">
            <img
              height="12"
              src="https://dinficfagt18c.cloudfront.net/p/assets/images/download_f8ca4e128f300e1b71d929e94aed67cb.svg"
              alt="🈚️"
            />
            <div class="ml-16">保 存</div>
          </div>
        </CkBtn>

        <CkBtn :disable="base64 == ''" @click="copy">
          <div class="box-center">
            <img
              height="12"
              src="https://dinficfagt18c.cloudfront.net/p/assets/images/data-uri_1e92c4e2e992b5ef1aa221ac135e6ae0.svg"
              alt="🈚️"
            />
            <div class="ml-16">复 制</div>
          </div>
        </CkBtn>
      </div>
    </div>
    <div></div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {writeText} from '@tauri-apps/api/clipboard'
import {pic_one, pic_two, pic_three} from './image'
import CkBtn from '@/components/ckBtn/index.vue'
import ImageFile from './imageFile.vue'
import {invoke} from '@tauri-apps/api'
import {open, save, message} from '@tauri-apps/api/dialog'
import {error_message, info_message} from '@/hooks/mod'
import {downloadDir, desktopDir} from '@tauri-apps/api/path'
import {debounce} from '@/utils/mod'
import {option} from '@/utils/mod'
import {Own} from '@/utils/FP/npmBuild/esm/mod'

function dragenter(event: any): void {
  event.stopPropagation()
  event.preventDefault()
}
function dragover(event: any) {
  event.stopPropagation()
  event.preventDefault()
}
function dragleave(event: any) {
  event.stopPropagation()
  event.preventDefault()
}

//#3e54d4

const base64 = ref('')
const image_info = ref<{
  name: string
  suffix: string
  width: string
  heigth: string
}>({
  name: '',
  suffix: '',
  width: '',
  heigth: '',
})

function drop(event: any) {
  event.stopPropagation()
  event.preventDefault()
  const files = event.dataTransfer.files
  Own(files[0].type.startsWith('image/') ? true : false).match(
    () => {
      const file = files[0]
      image_info.value.name = file.name
      image_info.value.suffix = file.name.split('.').at(-1)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        base64.value = option(this.result).unwarp() as string
        const img = new Image()
        img.src = base64.value
        img.onload = function () {
          image_info.value.width = img.width.toString()
          image_info.value.heigth = img.height.toString()
        }
      }
    },
    async () => {
      await error_message('只可转化图片')
    },
  )
}

const image_select = debounce(async () => {
  const path = await open({
    multiple: false,
    directory: false,
    filters: [
      {
        name: 'image_filter',
        extensions: ['svg', 'png', 'jpg', 'jpeg'],
      },
    ],
  })

  option(path).map((res) => {
    Own(res)
      .is_array()
      .match_false(async () => {
        const suffix = option((res as string).split('.').at(-1)).expect('png')
        base64.value = `data:image/${suffix};base64,${await invoke('image_to_base64', {
          path: res,
        })}`
        const info: any = await invoke('read_image_info', {
          path: res,
        }).catch(() => {
          return {width: '未知', heigth: '未知'}
        })
        image_info.value = {
          width: info.width as string,
          heigth: info.heigth as string,
          suffix,
          name: (res as string).split('/').at(-1) as string,
        }
        console.log(image_info.value)
      })
  })
}, 888)

const image_save = debounce(async () => {
  const save_path = await save({
    title: '选择存储路径',
    defaultPath: await desktopDir(),
  })
  //Untitled
  option(save_path).map(async (path) => {
    const name = option(path.split('/').at(-1))
      .to_own('Untitled')
      .is_match('Untitled')
      .match_map(
        // 是 Untitled  用文件名替代
        () => option(image_info.value.name.split('.').at(0)).unwrap_or('Untitled'),
        // 不是 Untitled
        () => option(path.split('/').at(-1)).unwarp(),
      )
      .take()
    const save_path = option(path.split('/').slice(0, -1).join('/')).unwarp()
    await invoke('save_as_txt', {
      path: save_path,
      b64: base64.value,
      name: name + '.txt',
    }).then(
      async () => {
        await info_message()
      },
      async () => {
        await error_message()
      },
    )
  })
}, 888)

const copy = async () => {
  await writeText(base64.value)
  await info_message('已复制到剪切板')
}
</script>

<!------------------------------>

<style scoped lang="scss">
.picmg :first-child {
  transform-origin: bottom left;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: scale(1) rotate(-8deg) translate(-30px, 0) translateZ(0);
}
.picmg :nth-child(2) {
  transform-origin: bottom left;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: scale(1) rotate(10deg) translate(-87px, 10px) translateZ(0);
}
.picmg :nth-child(3) {
  transform-origin: bottom left;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: scale(1) rotate(18deg) translate(-122px, 35px) translateZ(0);
}
</style>
