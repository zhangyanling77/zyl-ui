<template>
  <div class="zyl-upload">
    <div @click="handleClick" class="zyl-upload-btn">
      <slot></slot>
    </div>
    <input
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
      ref="input"
    />
    <div>
      <slot name="tip"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zyl-upload',
  data() {
    return {
      tempIndex: 1,
      files: [], // 存储要展示的文件列表
    }
  },
  props: {
    name: {
      type: String,
      default: 'file'
    },
    action: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      default: () => [], // 显示已经上传的文件列表
    },
    limit: Number,
    accept: String,
    multiple: Boolean,
    onExceed: Function,
    onChange: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    beforeUpload: Function,
  },
  watch: {
    fileList: {
      immediate: true,
      handler(fileList) {
        this.files = fileList.map((item, index) => {
          item.uid = Date.now() + this.tempIndex++;
          item.status = 'succss';
          return item
        })
      }
    }
  },
  methods: {
    handleClick() {
      // 点击之前要还原输入框
      this.$refs.input.value = ''
      this.$refs.input.click()
    },
    handleStart(rawFile) {
      // 唯一的标识
      rawFile.uid = Math.random() + this.tempIndex++;
      const file = {
        status: 'ready', // 上传的状态
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0, // 上传的进度
        uid: rawFile.uid,
        raw: rawFile
      }
      this.files.push(file) // 将当前用户上传的文件push到列表中，需要显示
      this.onChange && this.onChange(file)
    },
    post(rawFile) {
      // 真正上传到服务器
    },
    upload(rawFile) {
      // 先判断文件是否能够上传，没有限制则直接上传
      if (!this.beforeUpload) {
        // 直接上传
        this.post(rawFile)
      } else {
        const flag = this.beforeUpload(rawFile)
        if (flag) {
          // 上传
          this.post(rawFile)
        }
      }
    },
    uploadFiles(files) {
      // 文件上限
      if (this.limit && files.length + this.fileList.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList)
      }
      [...files].forEach(rawFile => {
        // 用户可能频繁上传同一个文件
        // 将文件格式化
        this.handleStart(rawFile) // 上传前的处理
        this.upload(rawFile) // 正式上传
      })
    },
    handleChange(e) {
      // 获取选中的文件
      const files = e.target.files
      // 多个文件如何上传 多创建几个ajax再一起传
      this.uploadFiles(files)
    }
  }
}
</script>

<style lang="scss">
  .zyl-upload {
    .zyl-upload-btn {
      display: inline-block;
    }
    input {
      display: none;
    }
  }
</style>
