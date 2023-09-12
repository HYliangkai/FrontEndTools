/** 阻止浏览器的默认行为 */
export const stop_browser = () => {
  //阻止F12
  document.onkeydown = function (event: any) {
    var win_event: any = window.event
    if (win_event && win_event.keyCode == 123) {
      event.keyCode = 0
      event.returnValue = false
    }
    if (win_event && win_event.keyCode == 13) {
      win_event.keyCode = 505
    }
  }

  //屏蔽右键菜单
  document.oncontextmenu = function (event: any) {
    if (window.event) {
      event = window.event
    }
    try {
      var the = event.srcElement
      if (
        !((the.tagName == 'INPUT' && the.type.toLowerCase() == 'text') || the.tagName == 'TEXTAREA')
      ) {
        return false
      }
      return true
    } catch (e) {
      return false
    }
  }

  //阻止拖动文件进来
  document.addEventListener('drop', (event) => {
    console.log(location.pathname)
    if (location.pathname !== '/picture/base') {
      event.preventDefault()
      event.stopPropagation()
    }
  })
  document.addEventListener('dragenter', (event) => {
    if (location.pathname !== '/picture/base') {
      event.preventDefault()
      event.stopPropagation()
    }
  })
  document.addEventListener('dragover', (event) => {
    if (location.pathname !== '/picture/base') {
      event.preventDefault()
      event.stopPropagation()
    }
  })
  document.addEventListener('dragleave', (event) => {
    if (location.pathname !== '/picture/base') {
      event.preventDefault()
      event.stopPropagation()
    }
  })
}
