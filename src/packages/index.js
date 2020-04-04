// 所有组件的入口
import Button from './button/button.vue';
import Icon from './icon/icon.vue';
import ButtonGroup from './button/button-group.vue';
import Row from './layout/row.vue';
import Col from './layout/col.vue';
import Aside from './container/aside.vue';
import Container from './container/container.vue';
import Footer from './container/footer.vue';
import Header from './container/header.vue';
import Main from './container/main.vue';
import Input from './input/input.vue';

const install = Vue => {
  Vue.component(Button.name, Button)
  Vue.component(Icon.name, Icon)
  Vue.component(ButtonGroup.name, ButtonGroup)
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)
  Vue.component(Aside.name,Aside)
  Vue.component(Container.name,Container)
  Vue.component(Footer.name,Footer)
  Vue.component(Header.name,Header)
  Vue.component(Main.name,Main)
  Vue.component(Input.name, Input)
}

/**
 * 有可能组件会通过script标签引入
 * <script src='zyl-ui'></script>
 */
if (typeof Window.Vue !== 'undefined') {
  install(Vue) // 全局直接通过script 引用的方式会默认调用install方法
}

export default {
  install
}

/**
 * 用法
  import zylUI from 'zyl-ui';
  Vue.use(zylUI)
 */
