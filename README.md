# 从零搭建基于`Vue`组件库 zyl-ui

## 一.通过`Vue-Cli`初始化项目

```bash
vue create zyl-ui
```

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

```shell
> Sass/SCSS (with dart-sass)  
  Sass/SCSS (with node-sass)
  Less
  Stylus
```

> 为什么选择[dart-sass]( https://www.dart-china.org/t/topic/146  )?

```bash
? Pick a unit testing solution:
> Mocha + Chai # ui测试需要使用karma
  Jest
```

## 三.目录结构配置

```bash
│  .browserslistrc # 兼容版本
│  .gitignore
│  babel.config.js # babel的配置文件
│  package-lock.json
│  package.json
│  README.md      
├─public
│      favicon.ico
│      index.html 
├─src
│  │  App.vue 
│  │  main.js
│  │  
│  ├─packages # 需要打包的组件
│  │      button.vue
│  │      icon.vue
│  │      index.js # 所有组件的入口
│  │       
│  └─styles # 公共样式
│          _var.scss  
|          icon.js # iconfont js文件
└─tests # 单元测试
    └─unit
            button.spec.js
```

## 四.编写插件入口

```javascript
import Button from './button.vue';
import Icon from './icon.vue';

const install = (Vue) =>{ // 对外暴露install方法
    Vue.component(Button.name,Button);
    Vue.component(Icon.name,Icon);
}

if(typeof window.Vue !== 'undefined'){
    install(Vue);
}
export default {
    install
}
```

```js
import zylUI from  './packages';
Vue.use(zylUI)
```

> 我们可以通过插件的方式去引入我们的组件库

## 五.编写Button组件

### 实现功能规划

- [ ] 按钮的基本用法
- [ ] 图标按钮
- [ ] 按钮加载中状态
- [ ] 按钮组的实现

### 准备备用样式

```scss
$border-radius: 4px;

$primary: #409EFF;
$success: #67C23A;
$warning: #E6A23C;
$danger: #F56C6C;
$info: #909399;


$primary-hover: #66b1ff;
$success-hover: #85ce61;
$warning-hover: #ebb563;
$danger-hover: #f78989;
$info-hover: #a6a9ad;

$primary-active: #3a8ee6;
$success-active: #5daf34;
$warning-active: #cf9236;
$danger-active: #dd6161;
$info-active: #82848a;
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

#### (1).实现按钮的基本用法

 使用type属性来定义 Button 的样式。 

```vue
<template>
  <button class="zyl-button" :class="btnClass">
    <slot></slot>  
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
      validator(type) {
        if (
          type &&
          !["warning", "success", "danger", "info", "primary"].includes(type)
        ) {
          console.error(
            "类型必须是:" + `'warning','success','danger','info','primary'`
          );
        }
        return true;
      }
    }
  },
  computed: {
    btnClass() { // 动态添加按钮样式
      let classes = [];
      if (this.type) {
        classes.push(`zyl-button-${this.type}`);
      }
      return classes;
    }
  },
  name: "zyl-button"
};
</script>
<style lang="scss">
@import '../styles/_var.scss';
$height: 42px;
$font-size: 16px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;
.zyl-button {
  border-radius: $border-radius;
  border: 1px solid $border-color;
  color: $color;
  background: #fff;
  height: 42px;
  cursor: pointer;
  font-size: $font-size;
  line-height: 1;
  padding: 12px 20px;
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;
  &:hover {
    border-color: $border-color;
    background-color: $background;
  }
  &:focus,&:active {
    color: $active-color;
    border-color: $active-color;
    background-color: $background;
    outline: none;
  }
  @each $type,$color in (primary:$primary, success:$success, info:$info, warning:$warning, danger:$danger) {
    &-#{$type} {
      background:#{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  @each $type,$color in (primary:$primary-hover, success:$success-hover, info:$info-hover, warning:$warning-hover, danger:$danger-hover) {
      &-#{$type}:hover {
          background: #{$color};
          border: 1px solid #{$color};
          color: #fff;
      }
  }
  @each $type,$color in (primary:$primary-active, success:$success-active, info:$info-active, warning:$warning-active, danger:$danger-active) {
      &-#{$type}:active, &-#{$type}:focus {
        background: #{$color};
        border: 1px solid #{$color};
        color: #fff;
      }
  }
}
</style>
```

#### (2).图标按钮

 带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。 

> 使用`iconfont`[添加图标](https://www.iconfont.cn)

**创建图标组件**:

```vue
<template>
  <svg class="zyl-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>
<script>
import "../styles/icon";
export default {
  props: {
    icon: String
  },
  name: "zyl-icon"
};
</script>
<style lang="scss">
.zyl-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>
```

```vue
<button class="zyl-button" :class="btnClass">
    <zyl-icon 
        :icon="icon"
        v-if="icon"
        class="icon"
    ></zyl-icon>
    <span v-if="this.$slots.default">
        <slot></slot>
    </span>
</button>
<style>
.icon{
  fill:#fff;
  width: 16px;height:16px;
}
.icon + span {
  margin-left: 5px;
}
span + .icon {
  margin-right: 5px;
}
</style>
```

#### (3).按钮加载中状态

 要设置为 loading 状态，只要设置`loading`属性为`true`即可。 

```vue
<template>
  <button class="zyl-button" :class="btnClass" :disabled="loading">
    <zyl-icon :icon="icon" v-if="icon && !loading" class="icon"></zyl-icon>
    <zyl-icon icon="loading" v-if="loading" class="icon loading"></zyl-icon>
    <span v-if="this.$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<style>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading {
  animation: spin 2s linear infinite;
}
</style>
```

#### (4).按钮组的实现

 以按钮组的方式出现，常用于多项类似操作。 

```vue
<template>
    <div class="zyl-button-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'zyl-button-group',
    mounted () {
    let children = this.$el.children
    for (let i = 0; i < children.length; i++) {
      console.assert(children[i].tagName === 'BUTTON', '必须子节点是button')
    }
  }
}
</script>
<style lang="scss">
@import "../styles/_var.scss";
.zyl-button-group {
  display: inline-flex;
  vertical-align: middle;
  button {
    border-radius: 0;
    position: relative;
    &:not(first-child) {
      margin-left: -1px;
    }
    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
  button:hover {
    z-index: 1;
  }
  button:focus {
    z-index: 2;
  }
}
</style>
```

## 六.搭建测试环境

我们需要测试`ui`渲染后的结果。需要在浏览器中测试,所有需要使用`Karma`

### `Karma`配置

#### (1)安装`karma`

```bash
npm install --save-dev @vue/test-utils karma karma-chrome-launcher karma-mocha karma-sourcemap-loader karma-spec-reporter karma-webpack mocha karma-chai
```

#### (2)配置karma文件

`karma.conf.js`

```js
var webpackConfig = require('@vue/cli-service/webpack.config')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['tests/**/*.spec.js'],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    autoWatch: true,
    webpack: webpackConfig,
    reporters: ['spec'],
    browsers: ['ChromeHeadless']
  })
}
```

```bash
{
  "scripts": {
    "test": "karma start"
  }
}
```

### 单元测试

```js
import {
    shallowMount
} from '@vue/test-utils';
import {
    expect
} from 'chai'
import Button from '@/packages/button.vue'
import Icon from '@/packages/icon'

describe('button.vue', () => {
    it('1.测试slot是否能正常显示', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'zyl-ui'
            }
        })
        expect(wrapper.text()).to.equal('zyl-ui')
    })
    it('2.测试传入icon属性', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'zyl-icon': Icon
            },
            propsData: {
                icon: 'edit' // 传入的是edit 测试一下 edit是否ok
            }
        })
        expect(wrapper.find('use').attributes('href')).to.equal('#icon-edit')
    })
    it('3.测试传入loading,是否能，控制loading属性', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'zyl-icon': Icon
            },
            propsData: {
                loading: true // 传入的是edit 测试一下 edit是否ok
            }
        })
        expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading');
        expect(wrapper.find('button').attributes('disabled')).to.eq('disabled');
    })
    it('4.测试点击按钮', () => {
        const wrapper = shallowMount(Button, {
            stubs: ['zyl-icon']
        })
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('click').length).to.eq(1);
    });
    // 5.测试前后图标
    it('5.测试前后图标', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'zyl-icon': Icon
            },
            slots:{
                default:'hello'
            },
            attachToDocument: true,
            propsData: {
                iconPosition: 'left',
                icon: 'edit'
            }
        });
        let ele = wrapper.vm.$el.querySelector('span');
        expect(getComputedStyle(ele, null).order).to.eq('2');
        wrapper.setProps({
            iconPosition: 'right'
        });
        return wrapper.vm.$nextTick().then(() => {
            expect(getComputedStyle(ele, null).order).to.eq('1');
        });
    });
})
```

## 七.打包组件

#### (1)配置打包命令

```bash
"lib": "vue-cli-service build --target lib --name zyl-ui  ./src/packages/index.js"
```

#### (2)配置运行入口

```bash
"main": "./dist/zyl-ui.umd.min.js"
```

#### (3)link到全局下

```bash
npm link
```

## 八.使用`VuePress`搭建文档

### `VuePress`基本配置:

#### (1).安装

```
npm install vuepress -D
```

#### (2).配置scripts

```bash
{
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}
```

#### (3).初始化docs

增加入口页面`README.MD`

```
---
home: true
actionText: 欢迎 →
actionLink: /components/button
features:
- title: 搭建自己的组件库
  details: 从0搭建自己的组件库
---
```

#### (4).配置导航

增加`config.js`

```js
module.exports = {
    title: 'zyl-ui', // 设置网站标题
    description: 'ui 库', //描述
    dest: './build', // 设置输出目录
    port: 1234, //端口
    themeConfig: { //主题配置
        nav: [{
                text: '主页',
                link: '/'
            }, // 导航条
        ],
        // 为以下路由添加侧边栏
        sidebar: {
            '/components/': [{
                    collapsable: true,
                    children: [
                        'button'
                    ]
                }
            ]
        }
    }
}
```

#### (5).初始化配置文件 `.vuepress`

`enhanceApp.js`

- 安装包

  ```bash
  npm install element-ui highlight.js node-sass sass-loader --save
  ```

- link组件库

  ```bash
  npm link zyl-ui
  ```

```js
import Vue from 'vue';
import Element from 'element-ui'; // 引入elementUi
import 'element-ui/lib/theme-chalk/index.css'

import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件

import zylUI from 'zyl-ui' // 要编写对应的文档的包
import 'zyl-ui/dist/zyl-ui.css'
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
export default ({
  Vue,
  options, 
  router,
  siteData
}) => {
  Vue.use(Element);
  Vue.use(zylUI)
}
```

#### (6).覆盖默认样式

`styles/palette.styl`

```stylus
$codeBgColor = #fafafa // 代码背景颜色

$accentColor = #3eaf7c
$textColor = #2c3e50

$borderColor = #eaecef
$arrowBgColor = #ccc
$badgeTipColor = #42b983
$badgeWarningColor = darken(#ffe564, 35%)
$badgeErrorColor = #DA5961

.content pre{  margin: 0!important;}

.theme-default-content:not(.custom){
    max-width: 1000px !important;
}
```

#### (7).创建components目录

创建`demo-block`可收缩代码块

```vue
<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div style="padding:24px">
        <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight " v-highlight>
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      ref="control"
      @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
  .demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: .2s;
    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }

    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
      float: right;
    }

    .source {
      padding: 24px;
    }

    .meta {
      background-color: #fafafa;
      border-top: solid 1px #eaeefb;
      overflow: hidden;
      height: 0;
      transition: height .2s;
    }

    .description {
      padding: 20px;
      box-sizing: border-box;
      border: solid 1px #ebebeb;
      border-radius: 3px;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      word-break: break-word;
      margin: 10px;
      background-color: #fff;

      p {
        margin: 0;
        line-height: 26px;
      }

      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
      }
    }

    .highlight {
      pre {
        margin: 0;
      }

      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        line-height: 1.8;
        color:black;
        &::before {
          content: none;
        }
      }
    }

    .demo-block-control {
      border-top: solid 1px #eaeefb;
      height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;

      &.is-fixed {
        position: fixed;
        bottom: 0;
        width: 868px;
      }

      i {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }

      > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
        display: inline-block;
      }

      &:hover {
        color: #409EFF;
        background-color: #f9fafc;
      }

      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }

      .control-button {
        line-height: 26px;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 25px;
      }
    }
  }
</style>

<script type="text/babel">
  export default {
    data() {
      return {
        hovering: false,
        isExpanded: false,
        fixedControl: false,
        scrollParent: null,
        langConfig: {
          "hide-text": "隐藏代码",
          "show-text": "显示代码",
          "button-text": "在线运行",
          "tooltip-text": "前往 jsfiddle.net 运行此示例"
        }
      };
    },

    props: {
      jsfiddle: Object,
      default() {
        return {};
      }
    },

    methods: {
      scrollHandler() {
        const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
        this.fixedControl = bottom > document.documentElement.clientHeight &&
          top + 44 <= document.documentElement.clientHeight;
      },

      removeScrollHandler() {
        this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1];
      },

      blockClass() {
        return `demo-${ this.lang } demo-${ this.$router.currentRoute.path.split('/').pop() }`;
      },

      iconClass() {
        return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
      },

      controlText() {
        return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
      },

      codeArea() {
        return this.$el.getElementsByClassName('meta')[0];
      },

      codeAreaHeight() {
          
        if (this.$el.getElementsByClassName('description').length > 0) {
         return this.$el.getElementsByClassName('description')[0].clientHeight +
            this.$el.getElementsByClassName('highlight')[0].clientHeight + 20;
        }
        return this.$el.getElementsByClassName('highlight')[0].clientHeight;
      }
    },

    watch: {
      isExpanded(val) {
        this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
        if (!val) {
          this.fixedControl = false;
          this.$refs.control.style.left = '0';
          this.removeScrollHandler();
          return;
        }
        setTimeout(() => {
          this.scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__wrap');
          this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler);
          this.scrollHandler();
        }, 200);
      }
    },

    mounted() {
      this.$nextTick(() => {
        let highlight = this.$el.getElementsByClassName('highlight')[0];
        if (this.$el.getElementsByClassName('description').length === 0) {
          highlight.style.width = '100%';
          highlight.borderRight = 'none';
        }
      });
    },

    beforeDestroy() {
      this.removeScrollHandler();
    }
  };
</script>
```

#### (8).编写对应组件的`md`文件

```md

# Button组件
常用的操作按钮。
## 基础用法
基础的按钮用法。

<demo-block>
::: slot source
<button-test1></button-test1>
:::

使用type属性来定义 Button 的样式。

::: slot highlight
​```html
<div>
    <zyl-button>默认按钮</zh-button>
    <zyl-button type="primary">主要按钮</zyl-button>
    <zyl-button type="success">成功按钮</zyl-button>
    <zyl-button type="info">信息按钮</zyl-button>
    <zyl-button type="warning">警告按钮</zyl-button>
    <zyl-button type="danger">危险按钮</zyl-button>
</div>
​```
:::
</demo-block>
```

## 九.发布到`npm`

配置`.npmignore`配置文件

```
npm addUser
npm publish
```

## 十.推送到git

添加`npm`图标 https://badge.fury.io/for/js 

```bash
git remote add origin 
git push origin master
```
