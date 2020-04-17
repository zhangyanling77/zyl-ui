<template>
  <svg class="zyl-icon" aria-hidden="true" @click="$emit('click')">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<script>
import '@/styles/icon';
export default {
  name: 'zyl-icon',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .zyl-icon{
    width: 24px;
    height:24px;
    vertical-align: middle;
  }
</style>
