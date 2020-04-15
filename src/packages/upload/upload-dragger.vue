<template>
  <div 
    class="zyl-upload-dragger"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
  >
    <zyl-icon icon="cloud-upload" class="icon"></zyl-icon>
    <span>将文件拖拽到此区域即可</span>
  </div>
</template>
<script>
export default {
  methods:{
    onDrop(e){
      if(!this.accpet){
        this.$emit('file',e.dataTransfer.files)
      }else{
        // 这里可以进行过滤，根据文件后缀 移除掉不需要的文件 image/jpeg image/jpg image/png
        // 发射过滤后的文件
        this.$emit('file',e.dataTransfer.files)
      }
    }
  }
}
</script>
<style lang="scss">
  @import "@/styles/_var.scss";
 .zyl-upload-dragger{
    background: #f3f3f3;
    border: 2px dashed $primary;
    width: 300px;
    height: 160px;
    line-height: 160px;
    border-radius: 10px;
    flex-direction: row;
    display: flex;
    padding: 10px;
    .icon {
      width: 46px;
      height: 46px;
      margin: 50px auto 0;
      fill: $primary;
    }
  }
</style>
