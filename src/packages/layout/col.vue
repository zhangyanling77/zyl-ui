<template>
  <div class="zyl-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zyl-col',
  data() {
    return {
      gutter: 0
    }
  },
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  computed: {
    colClass() { // 统一管理样式
      let classes = []
      classes.push(`zyl-col-${this.span}`)
      if (this.offset) {
        classes.push(`zyl-col-offset-${this.offset}`)
      }
      return classes
    },
    colStyle() {
      let style = {}
      if (this.gutter) {
        style = { 
          ...style,
          paddingLeft: this.gutter / 2 + 'px',
          paddingRight: this.gutter / 2 + 'px',
        }
      }
      return style
    }
  }
}
</script>

<style lang="scss">
@for $i from 1 through 24 {
  .zyl-col-#{$i} {
    width: $i / 24 * 100%;
  }
  .zyl-col-offset-#{$i} {
    margin-left: $i / 24 * 100%;
  }
}

</style>
