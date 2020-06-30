# 基于Vue2.6搭建UI组件库+VuePress搭建文档

在日常业务开发中我们大都会自己封装组件，可能是业务组件，也可能是UI组件。当然，已经有很多优秀的开源UI组件库，比如`Ant Design`、`Element UI`、`Material UI`等，也基本能够满足我们的日常开发。然而，同一个世界，却不是同一个设计师，不同的公司UI设计师有着自己不同的设计风格，那么针对这种情况就需要自己封装实现一套符合自己公司设计理念的UI组件库。

本文就如何从零搭建一个UI组件库及文档的过程做个简要的描述。文章内容涉及到组件库搭建的流程、工具、配置等，参考了`Element UI`和`iView`的做法。

UI组件库地址：[zyl-ui](https://github.com/zhangyanling77/zyl-ui)

文档地址：[zyl-docs](https://github.com/zhangyanling77/zyl-docs)

## 项目搭建

### vue-cli 初始化项目

```bash
vue create zyl-ui
```

```bash
? Please pick a preset:
  default (babel, eslint)
> Manually select features
```

选择需要支持的特性

```bash
? Check the features needed for your project:
 (*) Babel # babel配置
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 (*) CSS Pre-processors # css预处理器
 ( ) Linter / Formatter
 (*) Unit Testing # 单元测试
 ( ) E2E Testing
```

选择CSS预处理器

```bash
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
> Sass/SCSS (with dart-sass) # 速度快、易于安装，并且可以被编译成纯 JavaScript 代码
  Sass/SCSS (with node-sass)
  Less
  Stylus
```

选择单元测试方案

```bash
? Pick a unit testing solution:
> Mocha + Chai # UI测试使用karma
  Jest
```

### 目录结构及配置

```bash    
├─public
│     favicon.ico
│     index.html 
├─src
│  │  App.vue 
│  │  main.js
│  │  
│  ├─packages # 开发的组件
|  |    button
│  │      └─button.vue
│  │    index.js # 所有组件的入口
│  │       
│  └─styles # 公共样式
│       _var.scss  
|       icon.js # iconfont js文件
|─tests # 单元测试
|    └─unit
|       └─button.spec.js          
│  .browserslistrc # 浏览器版本兼容设置
│  .gitignore # 忽略文件
│  .babelrc # babel的配置文件
│  package-lock.json
│  package.json
│  README.md 
```

### 组件库入口

`src/packages/index.js`

```javascript
import Button from './button/button.vue';
// ... 其他组件

// 全局注册组件
const install = Vue => {
  Vue.component(Button.name, Button)
  // ... 其他组件
}

/**
 * 有可能组件会通过script标签引入，如<script src='https://xxx/zyl-ui'></script>
 */
if (typeof Window.Vue !== 'undefined') {
  install(Vue) // 全局直接通过script 引用的方式会默认调用install方法
}

export default {
  install
}
```

以插件的方式使用组件：

`src/main.js`

```javascript
import zylUI from './packages';

Vue.use(zylUI)
```

### 组件开发

这里以 button 组件为例。

> 借鉴 `Element UI`，实现按钮的基本用法、带图标的按钮、加载状态按钮等功能。

API设计

参数 | 说明 | 类型 | 可选值 | 默认值
:-|:-|:-|:-|:-
type | 类型 | string |primary / success / warning / danger / info | default
icon | 图标类名 | string | - | -
loading | 是否加载中状态 | boolean | - | false
position | 图标位置 | string | left / right | left

全局样式

`_var.scss`

```scss
$primary: #409EFF;
$success: #67C23A;
$warning: #E6A23C;
$danger: #F56C6C;
$info: #909399;

// ... 其他样式

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

`packages/button/button.vue`

基本结构：

> 以插槽（slot）的形式嵌套内容

```html
<template>
  <button class="zyl-button" :class="btnClass" :disabled="loading" @click="$emit('click', $event)">
    <!-- 略，其他内容 -->
    <span v-if="this.$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
```

逻辑实现

```javascript
export default {
  name: 'zyl-button',
  props: {
    type: {
      type: String,
      default: '',
      validator(type) { // 校验
        if (type && !['warning', 'primary', 'info', 'success', 'danger'].includes(type)) {
          console.error('type类型不合法！必须为：' + ['warning', 'primary', 'info', 'success', 'danger'].join('、') + '其中之一。')
        }
        return true
      }
    },
    // ... 其他属性
  },
  computed: { // 根据type设置button颜色
    btnClass() {
      let classes = []
      if (this.type) {
        classes.push(`zyl-button-${this.type}`)
      }
      // ... 其他逻辑
      return classes
    }
  }
}
```

样式设置

```scss
@import '@/styles/_var.scss';

// ...

.zyl-button {
  border-radius: $border-radius;
  border: 1px solid $border-color;
  height: $height;
  font-size: $font-size;
  cursor: pointer;
  line-height: 1;
  padding: 12px 20px;
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;
  user-select: none;

  // ...
  
  // 根据type设置button的样式
  @each $type, $color in (primary: $primary, success: $success, info: $info, warning: $warning, danger: $danger) {
    &-#{$type} {
      background-color: #{$color};
      border-color: #{$color};
      color: #fff;
      fill: #fff;
    }
  }
  // ...其他样式设置
```

这样，简单的一个button组件就开发完毕了。为了保证我们的组件能够正常且稳定使用，还要需要添加单元测试。

### 搭建测试环境

我们要测试 `UI` 渲染后的结果。就需要在浏览器中测试，这里使用 `Karma`。

- 安装 Karma

```bash
npm install --save-dev @vue/test-utils karma karma-chrome-launcher karma-mocha karma-sourcemap-loader karma-spec-reporter karma-webpack mocha karma-chai
```

- 配置 karma 文件

`karma.conf.js`

```javascript
const webpackConfig = require('@vue/cli-service/webpack.config');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'], // 设置测试框架
    files: ['tests/**/*.spec.js'],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    autoWatch: true,
    webpack: webpackConfig,
    reporters: ['spec'],
    browsers: ['ChromeHeadless'] // 无头浏览器
  })
}
```

`package.json`

```json
{
  "scripts": {
    "test": "karma start"
  }
}
```

### 编写单元测试

以button为例，编写单元测试。

```javascript
import {shallowMount} from '@vue/test-utils'; // vue提供的快速测试的方法
import {expect} from 'chai';
import Button from '@/packages/button/button.vue';

// ...

describe('button.vue',()=>{
  it('1.测试button能否正常显示slot里的内容',()=>{ // 测试当前组件运行在浏览器的情况
    const wrapper = shallowMount(Button, {
      slots:{
        default:'zyl-ui'
      }
    });
    expect(wrapper.text()).to.eq('zyl-ui');
  })
  // ... 其他测试逻辑
})
```

运行测试任务

```bash
npm run test
```

### 组件打包

当组件库运行测试全部通过后，表示我们的组件是可正常使用的，那么就可以打包组件库了。注意，我们打包的格式可以是 UMD，CommonJS也可以是ES Module。

- 配置打包命令

`package.json`

```json
{
  "scripts": {
    "lib": "vue-cli-service build --target lib --name zyl-ui  ./src/packages/index.js"
  }
}
```

- 配置运行入口

`package.json`

```json
"main": "./dist/zyl-ui.umd.min.js"
```

- 将项目 link 到全局下

在 zyl-ui 项目根目录下执行

```bash
npm link
```

## VuePress搭建文档

VuePress 是 Vue 驱动的静态网站生成器。支持在 Markdown 中使用 Vue 组件，简洁，高性能。当然你也可以使用其他的文档生成器，如 Docz、Storybook 等。

可以根据官方文档学习如何使用：https://www.vuepress.cn/guide/getting-started.html

### 项目生成及配置

- 安装

```bash
mkdir zyl-docs && cd zyl-docs
npm init -y
npm install vuepress -D
```

- 配置scripts

`package.json`

```json
{
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}
```

- 初始化docs

在项目根目录下建一个 docs 目录

```bash 
├─docs
│  │─.vuepress
│  │   components # demo
|  |   styles # 文档展示样式
|  |   config.js # 配置
|  |   enhanceApp.js 
│  │  
│  ├─components # 所有组件的文档
|  |   button.md
│  │       
│  └─README.md
|
│  .gitignore # 忽略文件
│  package-lock.json
│  package.json
│  README.md 
```

`docs/README.md `

```markdown
---
home: true
actionText: 欢迎 →
actionLink: /components/button
features:
- title: 搭建自己的组件库
  details: 基于 Vue2.6 从0搭建自己的组件库
---
```

- 配置导航

`docs/.vuepress/config.js`

```javascript
module.exports = {
  title: 'zyl-ui', // 设置网站标题
  description: 'ui 组件库', // 描述
  dest: './build', // 设置输出目录
  port: 1234, // 端口
  themeConfig: { // 主题配置
    nav: [ // 头部导航条
      {
        text: '主页',
        link: '/'
      },
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      '/components/': [
        {
          title: 'Basic',
          collapsable: false,
          children: [
            'button',
            // ... 其他组件
          ]  
        },
        // 其他设置
      ]
    }
  }
}
```

- 客户端应用的增强文件 `enhanceApp.js`

  > 这个文件用于添加组件Demo展示的优化的配置

  安装

  ```bash
  npm install element-ui highlight.js node-sass sass-loader --save
  ```

  link开发的组件库 zyl-ui

  ```bash
  npm link zyl-ui
  ```

  `.vuepress/enhanceApp.js`

  ```javascript
  import Vue from 'vue';
  import ElementUI from 'element-ui'; // 全局引入element-ui
  import 'element-ui/lib/theme-chalk/index.css';

  import hljs from 'highlight.js'; // 代码高亮
  import 'highlight.js/styles/googlecode.css';

  import zylUI from 'zyl-ui'; // 要编写对应的文档的包
  import 'zyl-ui/dist/zyl-ui.css';
  // 全局注册指令
  Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
      hljs.highlightBlock(block)
    })
  })
  export default ({
    Vue
  }) => {
    Vue.use(ElementUI);
    Vue.use(zylUI)
  }
  ```

`styles/palette.styl` 文件用于覆盖 vuepress 的默认样式，`components/demo-block.vue`文件主要是对默认主题Demo展示的样式的重写及展示逻辑的一些定义。代码过长，这里不做赘述。

### 编写对应组件的Markdown文件

以button组件为例，在 `docs/components` 下建 `button.md` 文件

```markdown
# Button 按钮
常用的操作按钮
## 基础用法
基础的按钮用法

<demo-block>
:::slot source
<button-test1></button-test1>
:::

使用type属性来定义 Button 的样式

:::slot highlight
(```html)
<div>
  <zyl-button>默认按钮</zyl-button>
  <zyl-button type="primary">主要按钮</zyl-button>
  <zyl-button type="success">成功按钮</zyl-button>
  <zyl-button type="info">信息按钮</zyl-button>
  <zyl-button type="warning">警告按钮</zyl-button>
  <zyl-button type="danger">危险按钮</zyl-button>
</div>
(```)
:::
</demo-block>

// 略

```

访问 http://localhost:1234 即可看到文档了。当然，可以将文档部署到自己的服务器，也可以部署到 `Github pages` 上，这里不做展开。

## 发布组件到 npm

- 配置 `.npmignore` 文件

```javascript
src
public
tests
```

- 发布

发布前，需要确保 `package.json` 中这些字段。

1. name

它是发布到 npm 上的包名，也是安装时的包名。请保证它的唯一性，可以到npm上先搜索一下，是否已经存在。

2. version

版本号，遵守语义化版本规则。每次新发布都要进行更改。可以使用 `npm version [major.minor.patch]` 命令来执行更新。

3. main

是包的入口。


```bash
npm addUser # 如果没有用户名就注册一个，否则直接登录
npm login # 登录，输入密码
npm publish # 发布，zyl-ui根目录下执行
```

等过一会儿，就可以到 [npm](https://www.npmjs.com/) 上搜索你发布的包。接下来你就可以 `npm install zyl-ui` 安装并使用你自己的组件库了。

## 结语

本文主要简要介绍了基于Vue的UI组件库搭建及基于VuePress搭建文档的过程。涉及到项目的组织方式、组件的开发流程、单元测试、打包、文档、发布等方面。
