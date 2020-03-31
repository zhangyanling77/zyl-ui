<template>
  <div class="zyl-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
   name: 'zyl-button-group',
   mounted() {
     // 校验内部孩子是否是button组件，如果不是报错
     let children = this.$el.children;
     for (let i = 0; i < children.length; i++) {
       if (children[i].tagName !== 'BUTTON') {
         console.error('子元素必须是button！')
       }
     }
   }
}
</script>

<style lang="scss">
  @import '@/styles/_var.scss';
  .zyl-button-group {
    display: inline-flex;
    vertical-align: middle;
    button {
      position: relative;
      border-radius: 0;
      &:not(:first-child) {
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
      &:hover {
        z-index: 1;
      }
      &:focus {
        z-index: 2;
      }
    }
  }
</style>

