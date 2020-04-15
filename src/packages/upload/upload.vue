<template>
  <div class="zyl-upload">
    <uploadDragger v-if="drag" :accept="accept" @file="uploadFiles"></uploadDragger>
    <template v-else>
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
    </template>

    <div class="zyl-upload-tips">
      <slot name="tip"></slot>
    </div>

    <ul>
      <li v-for="file in files" :key="file.uid">
        <div class="list-item">
          <zyl-icon icon="attachment"></zyl-icon>
           <img :src="file.url" alt="">
          {{file.name}}
          <zyl-progress v-if="file.status === UPLOAD_STATUS.UPLOADING" :percentage="file.percentage"></zyl-progress>
          <zyl-icon icon="close-circle"></zyl-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ajax from './ajax.js';
import uploadDragger from "./upload-dragger.vue";

export default {
  name: 'zyl-upload',
  components: {
    uploadDragger
  },
  data() {
    return {
      tempIndex: 1,
      files: [], // 存储要展示的文件列表
      reqs: [],
      UPLOAD_STATUS: {
        READY: 'ready',    
        UPLOADING: 'uploading',  
        SUCCESS: 'success',
        FAIL: 'fail',
      },
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
    // 还有header、data等用户会传入的属性
    httpRequest: {
      type: Function,
      default: ajax,
    },
    drag: {
      type: Boolean,
      default: false,
    },
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
      file.url = URL.createObjectURL(rawFile);
      this.files.push(file) // 将当前用户上传的文件push到列表中，需要显示
      this.onChange && this.onChange(file)
    },
    getFile(rawFile) {
      return this.files.find(file => file.uid == rawFile.uid);
    },
    handleProgress(ev, rawFile) {
      // 给不同的状态
      // 通过源文件 用户上传的文件 -》 我格式化的结果
      const file = this.getFile(rawFile); // 这个file就是当前格式化化后的
      file.status = this.UPLOAD_STATUS.UPLOADING;
      file.percentage = ev.percent || 0; // 赋值上传进度
      this.onProgress(ev, rawFile); // 调用用户的回调
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);
      file.status = this.UPLOAD_STATUS.SUCCESS;
      this.onSuccess(res, rawFile);
      this.onChange(file);
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      file.status = this.UPLOAD_STATUS.FAIL;
      this.onError(err, rawFile);
      this.onChange(file);
      delete this.reqs[file.uid]; // 已经失败的ajax 不需要后续在中断请求了
    },
    post(rawFile) {
      // 真正上传到服务器
      // 真正上传到服务器, 调用httpRequest方法。整合参数，处理上传的整个流程
      const uid = rawFile.uid; // 希望中断ajax，是一个序号，标记
      const options = {
        file: rawFile, // 源文件
        filename: this.name, 
        action: this.action,
        onProgress: ev => {
          // 处理上传中的状态
          console.log('上传中', ev)
          this.handleProgress(ev, rawFile)
        },
        onSuccess: res => {
          // 处理成功时的状态
          console.log('成功', res)
          this.handleSuccess(res, rawFile)
        },
        onError: err => {
          // 处理失败时的状态
          console.log('失败', err)
          this.handleError(err, rawFile)
        }
      }
      const req = this.httpRequest(options);
      this.reqs[uid] = req; // 将每个ajax存起来，等会儿中断会用
      // 允许用户使用promise的ajax
      if (req && req.then) {
        req.then(options.onSuccess, options.onError)
      }
    },
    upload(rawFile) {
      // 先判断文件是否能够上传，没有限制则直接上传
      if (!this.beforeUpload) {
        // 直接上传
        this.post(rawFile)
      } else {
        const flag = this.beforeUpload(rawFile)
        flag && this.post(rawFile)
      }
    },
    uploadFiles(files) {
      // 文件上限
      if (this.limit && files.length + this.fileList.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList)
      }
      [...files].forEach(rawFile => {
        // 用户可能频繁上传同一个文件 将文件格式化
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
  @import "@/styles/_var.scss";
  .zyl-upload {
    &-btn {
      display: inline-block;
    }
    &-tips {
      margin: 12px 0;
      color: #9b9393;
    }
    input {
      display: none;
    }
    ul {
      list-style: none;
      .list-item {
        margin: 4px;
        svg {
          width: 18px;
          &:first-child {
            fill: $primary;
          }
          &:last-child {
            cursor: pointer;
            fill: $danger;
          }
        }
      }
    }
  }
</style>
