<template>
  <div class="zyl-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zyl-row',
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$children.forEach(child => {
      child.gutter = this.gutter
    })
  },
  computed: {
    rowStyle() {
      let style = {}
      if (this.gutter) {
        style = {
          ...style,
          marginLeft: -this.gutter / 2 + 'px',
          marginRight: -this.gutter / 2 + 'px'
        }
      }
      return style
    }
  }
}
</script>

<style lang="scss">
.zyl-row {
  display: flex;
}
</style>
