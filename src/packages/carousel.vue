<template>
  <div class="zyl-carousel"
    :style="{height}"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="viewport">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        v-for="item in len"
        :key="item"
        :class="{active: item - 1 === currentSelected}"
        @click="select(item - 1)"
      >{{item - 1}}</span>
    </div>
    <div class="arrow-box">
      <zyl-button icon="left" @click="select(currentSelected - 1, true)"></zyl-button>
      <zyl-button icon="right" @click="select(currentSelected + 1, true)"></zyl-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zyl-carousel',
  props: {
    height: {
      type: String,
      default: '200px',
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 3000,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      currentSelected: this.initialIndex,
      len: 0,
      reverse: false,
    }
  },
  mounted() {
    this.children = this.$children.filter(child => child.$options.name === 'zyl-carousel-item')
    this.len = this.children.length
    this.run()
  },
  methods: {
    run() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          let index = this.currentSelected
          let newIndex = index + 1
          this.select(newIndex)
        }, this.delay)
      }
    },
    select(newIndex, flag) {
      let index = this.currentSelected
      // 判断越界
      if (newIndex === this.len) newIndex = 0;
      if (newIndex === -1) newIndex = this.len - 1;
      // 正反
      this.reverse = index > newIndex ? true : false;
      // 如果是无缝滚动的情况
      if ((this.timer || flag) && this.loop) { // 手动点击时不应该触发无缝滚动效果, 点击左右按钮
        if (index === 0 && newIndex === this.len - 1) {
          this.reverse = true
        }
        if (index === this.len - 1 && newIndex === 0) {
          this.reverse = false
        }
      }
      this.children.forEach(vm => {
        vm.reverse = this.reverse
      })
      // 先改变动画再改变索引，这样避免引起错位
      this.$nextTick(() => {
        this.currentSelected = newIndex
      })
    },
    handleMouseEnter() {
      clearInterval(this.timer)
      this.timer = null
    },
    handleMouseLeave() {
      this.run()
    },
    handleTouchStart(e) {
      this.handleMouseEnter()
      // 记录拖拽前的位置
      this.startTouch = e.touches[0]; // 只考虑一个手指的情况
    },
    handleTouchEnd(e) {
      let endTouch = e.changedTouches[0];
      let {clientX:x1,clientY:y1} = this.startTouch;
      let {clientX:x2,clientY:y2} = endTouch;
      let distance = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
      // 是往哪边移动

      let disY = Math.abs(y2-y1);
      let x = Math.sqrt(2)/2 * distance;
      if(disY < x){
         if(x2 > x1){
             this.select(this.currentSelected - 1,true);
         }else{
             this.select(this.currentSelected + 1,true)
         }
      }
      this.run()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss">
.zyl-carousel {
  position: relative;
  .viewport {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .dots {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    span {
      display: inline-block;
      width: 20px;
      height: 6px;
      background-color: #ccc;
      border-radius: 4px;
      margin: 5px;
      text-indent: -9999px;
      opacity: 0.5;
      cursor: pointer;
      &.active {
        opacity: 1;
      }
    }
  }
  .arrow-box {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
