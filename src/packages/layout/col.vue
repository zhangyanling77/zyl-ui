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
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    colClass() { // 统一管理样式
      let classes = []
      classes.push(`zyl-col-${this.span}`)
      if (this.offset) {
        classes.push(`zyl-col-offset-${this.offset}`)
      }
      ["xs", "sm", "md", "lg", "xl"].forEach(type => {
        if (typeof this[type] === "object") {
          let { span, offset } = this[type];
          span && classes.push(`zyl-col-${type}-${span}`); // zh-col-xs-1
          offset && classes.push(`zyl-col-${type}-offset-${offset}`); // zh-col-xs-offset-1
        } else {
          this[type] && classes.push(`zyl-col-${type}-${this[type]}`); // zh-col-xs-1
        }
      });
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
@import '@/styles/_var.scss';
@for $i from 1 through 24 {
  .zyl-col-#{$i} {
    width: $i / 24 * 100%;
  }
  .zyl-col-offset-#{$i} {
    margin-left: $i / 24 * 100%;
  }
}
@include res(xs) {
  @for $i from 1 through 24 {
    .zyl-col-xs-#{$i} {
      width: $i/24 * 100%;
    }
    .zyl-col-xs-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(sm) {
  @for $i from 1 through 24 {
    .zyl-col-sm-#{$i} {
      width: $i/24 * 100%;
    }
    .zyl-col-sm-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(md) {
  @for $i from 1 through 24 {
    .zyl-col-md-#{$i} {
      width: $i/24 * 100%;
    }
    .zyl-col-md-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(lg) {
  @for $i from 1 through 24 {
    .zyl-col-lg-#{$i} {
      width: $i/24 * 100%;
    }
    .zyl-col-lg-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(xl) {
  @for $i from 1 through 24 {
    .zyl-col-xl-#{$i} {
      width: $i/24 * 100%;
    }
    .zyl-col-xl-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
</style>
