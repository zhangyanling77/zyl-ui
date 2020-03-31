<template>
  <button class="zyl-button" :class="btnClass" :disabled="loading" @click="$emit('click', $event)">
    <zyl-icon :icon="icon" v-if="icon && !loading" class="icon"></zyl-icon>
    <zyl-icon icon="sync" v-if="loading" class="icon loading-spin"></zyl-icon>
    <span v-if="this.$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'zyl-button',
  props: {
    type: {
      type: String,
      default: '',
      validator(type) {
        if (type && !['warning', 'primary', 'info', 'success', 'danger'].includes(type)) {
          console.error('type类型不合法！必须为：' + ['warning', 'primary', 'info', 'success', 'danger'].join('、') + '其中之一。')
        }
        return true
      }
    },
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator(type) {
        if (!['left', 'right'].includes(type)) {
          console.error('iconPosition不合法！必须为：left | right')
        }
        return true
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      let classes = []
      if (this.type) {
        classes.push(`zyl-button-${this.type}`)
      }
      if (this.iconPosition) {
        classes.push(`zyl-button-${this.iconPosition}`)
      }
      return classes
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/_var.scss';
  $height: 42px;
  $font-size: 16px;
  $color: #606266;
  $border-color: #dcdfe6;
  $background: #ecf5ff;
  $active-color: #3a8ee6;
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
    &:hover {
      border-color: $border-color;
      background-color: $background;
    }
    &:focus, &:active {
      color: $active-color;
      border: 1px solid $active-color;
      background-color: $background;
      outline: none;
    }  
    @each $type, $color in (primary: $primary, success: $success, info: $info, warning: $warning, danger: $danger) {
      &-#{$type} {
        background-color: #{$color};
        border-color: #{$color};
        color: #fff;
        fill: #fff;
      }
    }
    @each $type, $color in (primary: $primary-hover, success: $success-hover, info: $info-hover, warning: $warning-hover, danger: $danger-hover) {
      &-#{$type}:hover {
        background-color: #{$color};
        border-color: #{$color};
        color: #fff;
      }
    }
    @each $type, $color in (primary: $primary-active, success: $success-active, info: $info-active, warning: $warning-active, danger: $danger-active) {
      &-#{$type}:active, &-#{$type}:focus {
        background-color: #{$color};
        border-color: #{$color};
        color: #fff;
      }
    }
    .icon {
      width: 16px;
      height: 16px;
    }
    .icon + span {
      margin-left: 4px;
    }
    &-left {
      svg {
        order: 1;
      }
      span {
        order: 2;
      }
    }
    &-right {
      svg {
        order: 2;
      }
      span {
        order: 1;
      }
      .icon + span {
        margin-left: 0;
        margin-right: 4px;
      }
    }
    &[disabled] {
      cursor: not-allowed;
    }
  }
  @keyframes spin {
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
  }
  .loading-spin {
    animation: spin .8s linear infinite;
  }
</style>

