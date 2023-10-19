# Tauri Application Demo
+ run `pnpm run tauri dev`or `pnpm run desdev` to setup the application 

## 小功能
- [ ] 白天/夜间模式 
- [x] 窗口置顶
- [x] 侧边栏可缩放
- [ ] 全局搜索

## 插件系统

插件可插拔??

## 前端工具箱待完成的内容

### Todo-List
- [ ] 一个todolist,作为最开始的目标
- [ ] 番茄时钟

### 其他小工具
- [ ] 半角全角转换
- [ ] diff工具(高性能)
- [ ] 长度转化[cm - pt - px ]

### CURL
- [ ] 快速的接口请求

### 正则表达式
- [x] 正则表达式解析工具

### 零代码-前端工具箱的iframe
[this](https://www.lingdaima.com/?ref=nav.poetries.top)


### 图片
- [x] 图片 <-> Base64 相互转化
- [ ] 图片画质压缩 / 图片画质修复
- [ ] 图片类型更改 png - jpg - jpeg - svg (主要是 svg->png  png<->jpg)
- [ ] pdf转图片

### 颜色
- [x] hex - rgb - srgb 快速计算

### 低代码
- [ ] 基于vue3的静态页面半低代码平台

### 时间
- [x] 时间戳转化 

### Other plan
- [x] 系统资源监视器 (放在首页)

### Translate
- [ ] 谷歌翻译


## 系统UI

*mac风格*

![image-20230718164137531](https://chzky-1312081881.cos.ap-nanjing.myqcloud.com/note/image-20230718164137531.png)

## 代码分工

### 选择持久化存储方式
+ IndexedDB  
  优点:
  1. 性能强于sqllite(c->rust->js)?
  2. 语法容易
  缺点:
  1. 无法在rust端交互 
+ SqlLite  
  优点:
  1. 在rust端交互,有利于高性能计算
  缺点:
  1. 语法
  2. 构建可能会有问题

### 统一话处理
+ 使用`fp-ts`将ts的代码风格FP化,统一的fp处理方式
+ 使用统一的commonStyle

