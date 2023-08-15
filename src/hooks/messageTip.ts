import { message } from '@tauri-apps/api/dialog'
//消息提示
export const info_message = async (msg = '操作成功') => {
  await message(msg, {
    title: '',
    type: 'info',
    okLabel: '好的'
  })
}

//错误提示
export const error_message = async (msg = '操作失败') => {
  await message(msg, {
    title: '错误提示',
    type: 'error',
    okLabel: '好吧'
  })
}

