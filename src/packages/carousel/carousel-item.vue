<template>
 <transition>
    <div class="zyl-carousel-item" v-if="isShow" :class="{reverse}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'zyl-carousel-item',
  data(){
    const children = this.$parent.$children.filter(child => child.$options.name === 'zyl-carousel-item')
    return {
      index: children.length - 1,
      reverse: false,
    }
  },
  computed: {
    isShow() {
      return this.$parent.currentSelected == this.index
    }
  }
}
</script>

<style lang="scss">
.zyl-carousel-item {
  width: 100%;
  height: 100%;
}
.v-enter-active,.v-leave-active{
  transition: all .5s linear;
}
.v-leave-to{
  transform:translateX(-100%);
}
.v-enter{
  transform:translateX(100%);
}

.v-leave-to.reverse{
  transform:translateX(100%);
}
.v-enter.reverse{
  transform:translateX(-100%);
}
.v-enter-active{
  position: absolute;
  top:0;
  left:0;
  width:100%;
}
</style>
