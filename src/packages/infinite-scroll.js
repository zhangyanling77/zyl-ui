
// 自定义用户参数 稍后和用户传入的进行合并
import throttle from 'lodash/throttle'
const attributes = {
  delay:{
    default:200
  },
  immediate:{
    default:false
  },
  disabled:{
    default:false
  },
  distance:{
    default:10
  }
}
// [[delay,{default:200}]]
const getScrollOptions = (el, vm) => {
  return Object.entries(attributes).reduce((map,[key,option])=>{
    let defaultValue = option.default;
    let value = el.getAttribute(`infinite-scroll-${key}`);
    value = vm[value] ? vm[value] : defaultValue;
    map[key] = value;
    return map;
  },{})
}
const getScrollContainer = (el)=>{
  // 递归向上查找 查找带有overflow 字样的元素
  let parent = el;
  while(parent){
    if(document.documentElement == parent){
        return window; //表示没有找到
    }
    // 获取当前元素上是否有overflow属性
    const overflow = getComputedStyle(parent)['overflow-y'];
    if(overflow.match(/scroll|auto/)){
        return parent;
    }
    parent = parent.parentNode;
  }
}
const handleScroll = function (cb) {
  let {container,el,vm,observer} = this[scope];
  // 看一下用户是否已经没有新的数据了
  let {disabled,distance} = getScrollOptions(el,vm);
  if(disabled) return; // 没有更多数据了
  // 当前卷去的高度 + 可见高度= 当前滚动元素的底部显示的位置
  let scrollBottom = container.scrollTop + container.clientHeight; 
  // 总页面高度 - 当前滚动元素的底部显示的位置 和 需要加载的距离进行比对
  if(container.scrollHeight -scrollBottom <= distance ){
      cb();
  }else{
    if(observer){ // 解除监控，因为在滚动时不需要再次进行计算
      observer.disconnect();
      this[scope].observer = null;
    }
  }
}
const scope = 'infinite-scroll';
export default {
  name:'infinite-scroll',
  inserted(el,bindings,vnode){ // 指令生效
    const cb = bindings.value;
    const vm = vnode.context;
    // 1. 我们先获取滚动的是哪个元素 如果没有元素则直接结束
    const container = getScrollContainer(el);
    
    if(container !== window){
      // 2.获取用户和我自己默认的属性
      let {delay,immediate} = getScrollOptions(el,vm);
      // 3.需要增加滚动事件
      let onScroll = throttle(handleScroll.bind(el,cb),delay);
      el[scope] = { // 把所有需要别的地方需要用到的属性 都放到el的这个变量中
          onScroll,
          container,
          el,
          vm
      }
      // 绑定scroll事件
      if(immediate){
        const observer =el[scope].observer= new MutationObserver(onScroll); // 页面变化看一下是否还要继续加载
        observer.observe(container,{
          childList:true,// 监控孩子列表的变化 
          subtree:true, // 当子dom 发生变化也触发
        });
        onScroll(); // 默认先加载
      }
      container.addEventListener('scroll',onScroll);
    }
  },
  unbind(el){ // 解绑
    const {onScroll,container} = el[scope];
    if(container){
      container.removeEventListener('scroll',onScroll);
      el[scope] = null;
    }
  }
}
