<template>
  <section class="zyl-container" :class="{isVertical}">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'zyl-container',
  data() {
    return {
      isVertical: true
    }
  },
  mounted() {
    this.isVertical = this.$children.some(child =>
      ["zyl-footer", "zyl-header"].includes(child.$options.name)
    );
  }
}
</script>

<style lang="scss">
.zyl-container {
  display: flex;
  flex-direction: row;
  flex:1
}
.zyl-container.isVertical {
  flex-direction: column;
}
</style>