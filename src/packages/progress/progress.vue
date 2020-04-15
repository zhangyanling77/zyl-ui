<template>
  <div class="zyl-progress">
    <div class="bar">
      <div class="bar-outer" :style="{height:strokeWidth+'px'}">
        <div class="bar-inner" :style="barStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zyl-progress',
  props: {
    strokeWidth: {
      type: Number,
      default: 6,
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
    },
    color: {
      type: String,
      default: 'lightgreen',
    }
  },
  computed:{
    barStyle(){
      const style = {};
      style.width = this.percentage + '%';
      style.background = this.color;
      style.borderRadius = 6 + 'px';
      return style;
    }
  }
}
</script>

<style lang="scss">
  .bar-outer {
    border-radius:100px;
    background: #eee;
    position: relative;
    vertical-align: middle;
  }
  .bar-inner {
    transition:  width .6s ease;
    position: absolute;
    top:0;
    left:0;
    height:100%;
  }
</style>
