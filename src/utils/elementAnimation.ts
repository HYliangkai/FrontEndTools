/**
 * 便携操作元素的动画 / 减少模板代码
 * @param {Event} e
 * @param {string} target
 */
export const create_element_run_target = async (e: Event, target: string) => {
  let ele = document.createElement('div')
  {
    ele.style.height = '20px'
    ele.style.width = '20px'
    ele.style.position = 'fixed'
    ele.style.backgroundColor = '#f56c6c'
    ele.style.borderRadius = '50%'
    //@ts-ignore
    e.target.appendChild(ele)
  }
  const tg = document.querySelector(target)
  if (!tg) return Error('目标元素不存在')
  await element_run_target(ele, tg).finally(() => {
    ele.remove()
  })
}

/**
 * 将element 元素移动到 target 元素的位置
 * @param {Element} element
 * @param {Element} target
 * @param {string} animation_name
 * @param {number} duration
 * @returns
 */
export const element_run_target = (
  element: Element,
  target: Element,
  animation_name = 'onlykey',
  duration = 666,
) => {
  return new Promise((resolve, reject) => {
    try {
      const {top: e_top, left: e_left} = get_element_position(element)
      const {top: t_top, left: t_left} = get_element_position(target)
      const name = String(animation_name)
      //设置动画
      const key = get_animation_by_name(name)

      if (key) {
        //@ts-ignore
        key.style_sheet.deleteRule(key.index)
      }
      document.styleSheets[0].insertRule(` @keyframes ${name} {
    0% {
      top: ${e_top}px;
      left: ${e_left}px;

    } 

    
    100% {
      transform:scale(0.8);
      top: ${t_top}px;
      left: ${t_left}px;

    }
  }`)

      //给元素添加动画效果
      //@ts-ignore
      element.style.animation = `${duration / 1000}s ${name} forwards running  `
      setTimeout(() => {
        //@ts-ignore
        resolve()
      }, duration)
    } catch (err) {
      reject(err)
    }
  })
}

/** 给出目标元素的偏移像素值 */
const get_element_position = (element: any) => {
  let top = element.offsetTop //这是获取元素距父元素顶部的距离
  let left = element.offsetLeft
  var current = element.offsetParent //这是获取父元素
  while (current !== null) {
    //当它上面有元素时就继续执行
    top += current.offsetTop //这是获取父元素距它的父元素顶部的距离累加起来
    left += current.offsetLeft
    current = current.offsetParent //继续找父元素
  }
  return {
    top,
    left,
  }
}

/** 通过动画名获取动画 */
const get_animation_by_name = (name: string) => {
  let style_sheet = document.styleSheets //获取所有样式表
  let animation = {} //定义一个animation来装获得的值
  for (let i = 0; i < style_sheet.length; i++) {
    //遍历循环获取style_sheet
    for (let j = 0; j < style_sheet[i].cssRules.length; j++) {
      //遍历循环获取style_sheet[i].cssRules
      //判断样式名字是否为CSSKeyframesRule
      if (style_sheet[i].cssRules[j].constructor.name === 'CSSKeyframesRule') {
        //再判断此时这个动画函数名是否为传入的值
        //@ts-ignore
        if (name === style_sheet[i].cssRules[j].name) {
          //获取此时的cssRules，index，和style_sheet
          //@ts-ignore
          animation.cssRules = style_sheet[i].cssRules[j]
          //@ts-ignore
          animation.index = j
          //@ts-ignore
          animation.style_sheet = style_sheet[i]
          return animation //返回获取的animation
        }
      }
    }
  }
  return null
}
