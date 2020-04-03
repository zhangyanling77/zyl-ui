<template>
  <aside class="zyl-aside" :style="{width}">
    <slot>
      
    </slot>
  </aside>
</template>

<script>
export default {
  name:'zyl-aside',
  props:{
    width:{
      type:String,
      default:'300px'
    }
  }
}
</script>