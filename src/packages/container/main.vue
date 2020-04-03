<template>
  <main class="zyl-main">
    <slot></slot>
  </main>
</template>
<script>
export default {
  name:'zyl-main'
}
</script>

<style lang="scss">
.zyl-main{
  flex:1;
  padding:20px;
}
</style>