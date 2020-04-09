<template>
  <div id="app">
    <div style="width:1200px;margin:0px auto;">
      <h1>Button 按钮</h1>
      <div class="block">
        <!-- 默认按钮 -->
        <zyl-button>默认按钮</zyl-button>
      </div>
      <div class="block">
        <!-- 带类型的按钮 -->
        <zyl-button type="primary">主要按钮</zyl-button>
        <zyl-button type="success">成功按钮</zyl-button>
        <zyl-button type="info">信息按钮</zyl-button>
        <zyl-button type="warning">警告按钮</zyl-button>
        <zyl-button type="danger">危险按钮</zyl-button>
      </div>
      <div class="block">
        <!-- 带icon的按钮 -->
        <zyl-button icon="edit" type="primary">主要按钮</zyl-button>
        <zyl-button icon="edit" type="success" icon-position="right">危险按钮</zyl-button>
        <zyl-button icon="search" type="danger"></zyl-button>
      </div>
      <div class="block">
        <!-- loading按钮 -->
        <zyl-button type="primary" loading>加载中...</zyl-button>
      </div>
      <div class="block">
        <!-- 触发事件 -->
        <zyl-button type="primary" @click="fn">触发事件</zyl-button>
      </div>
      <div class="block">
        <zyl-button-group>
          <zyl-button type="primary" icon="left" icon-position="left">上一页</zyl-button>
          <zyl-button type="primary" icon="right" icon-position="right">下一页</zyl-button>
        </zyl-button-group>
      </div>
      <h1>Icon 图标</h1>
      <div class="block">
        <!-- 图标 -->
        <zyl-icon icon="search"></zyl-icon>
        <zyl-icon icon="edit"></zyl-icon>
        <zyl-icon icon="heart"></zyl-icon>
      </div>
      <h1>Layout 布局</h1>
      <div class="block">
        <!-- 布局组件 Row Col -->
        <zyl-row>
          <zyl-col :span="24">
            <div class="grid-content bg-purple-dark">col-24</div>
          </zyl-col>
        </zyl-row>
        <br />
        <zyl-row>
          <zyl-col :span="12">
            <div class="grid-content bg-purple-dark">col-12</div>
          </zyl-col>
          <zyl-col :span="12">
            <div class="grid-content bg-purple">col-12</div>
          </zyl-col>
        </zyl-row>
        <br />
        <zyl-row>
          <zyl-col :span="6">
            <div class="grid-content bg-purple-dark">col-6</div>
          </zyl-col>
          <zyl-col :span="6" :offset="12">
            <div class="grid-content bg-purple">col-6</div>
          </zyl-col>
        </zyl-row>
        <br />
        <zyl-row :gutter="16">
          <zyl-col :span="6">
            <div class="grid-content bg-purple-dark">col-6</div>
          </zyl-col>
          <zyl-col :span="6">
            <div class="grid-content bg-purple">col-6</div>
          </zyl-col>
          <zyl-col :span="6">
            <div class="grid-content bg-purple-dark">col-6</div>
          </zyl-col>
          <zyl-col :span="6">
            <div class="grid-content bg-purple">col-6</div>
          </zyl-col>
        </zyl-row>
        <br />
        <zyl-row justify="center">
          <zyl-col :span="4">
            <div class="grid-content bg-purple-dark">col-4</div>
          </zyl-col>
          <zyl-col :span="4">
            <div class="grid-content bg-purple">col-4</div>
          </zyl-col>
        </zyl-row>
        <br />
        <zyl-row :gutter="10">
          <zyl-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple-dark"></div>
          </zyl-col>
           <zyl-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple"></div>
          </zyl-col>
           <zyl-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-dark"></div>
          </zyl-col>
           <zyl-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple"></div>
          </zyl-col>
        </zyl-row>
      </div>
      <h1>Container 布局容器组件</h1>
      <div class="block">
        <zyl-container>
          <zyl-header>Header</zyl-header>
          <zyl-main>Main</zyl-main>
        </zyl-container>
        <br />
        <zyl-container>
          <zyl-header>Header</zyl-header>
          <zyl-main>Main</zyl-main>
          <zyl-footer>Footer</zyl-footer>
        </zyl-container>
        <br />
        <zyl-container>
          <zyl-aside width="200px">Aside</zyl-aside>
          <zyl-main>Main</zyl-main>
        </zyl-container>
        <br />
        <zyl-container>
          <zyl-header>Header</zyl-header>
          <zyl-container>
            <zyl-aside width="200px">Aside</zyl-aside>
            <zyl-main>Main</zyl-main>
          </zyl-container>
        </zyl-container>
        <br />
        <zyl-container>
          <zyl-header>Header</zyl-header>
          <zyl-container>
            <zyl-aside width="200px">Aside</zyl-aside>
            <zyl-container>
              <zyl-main>Main</zyl-main>
              <zyl-footer>Footer</zyl-footer>
            </zyl-container>
          </zyl-container>
        </zyl-container>
        <br />
        <zyl-container>
          <zyl-aside width="200px">Aside</zyl-aside>
          <zyl-container>
            <zyl-header>Header</zyl-header>
            <zyl-main>Main</zyl-main>
          </zyl-container>
        </zyl-container>
        <br />
        <zyl-container>
          <zyl-aside width="200px">Aside</zyl-aside>
          <zyl-container>
            <zyl-header>Header</zyl-header>
            <zyl-main>Main</zyl-main>
            <zyl-footer>Footer</zyl-footer>
          </zyl-container>
        </zyl-container>
      </div>
      <h1>Input 输入框组件</h1>
      <div class="block">
        <zyl-input 
          v-model="value"
          type="text"
          placeholder="请输入内容" 
          name="username"></zyl-input>
        
        <zyl-input 
          v-model="value"
          type="password"
          placeholder="请输入内容" 
          name="username"></zyl-input>
          
          <zyl-input 
          v-model="value"
          type="text"
          :disabled="true"
          placeholder="请输入内容" 
          name="username"></zyl-input>
        
        <zyl-input 
          v-model="value"
          type="text"
          placeholder="请输入内容" 
          name="username"
          clearable></zyl-input>
        
        <zyl-input 
          v-model="value"
          type="password"
          placeholder="请输入内容" 
          name="username"
          show-password
          ></zyl-input>
        
        <zyl-input 
          v-model="value"
          type="text"
          placeholder="请输入内容" 
          name="username"
          prefix-icon="edit"
          ></zyl-input>
        
        <zyl-input 
          v-model="value"
          type="text"
          placeholder="请输入内容" 
          name="username"
          suffix-icon="edit"
          ></zyl-input>
        {{value}}
      </div>
      <h1>Upload 文件上传组件</h1>
      <div class="block">
        <zyl-upload
          name="avatar"
          action="http://localhost:3000/upload"
          accept="image/jpeg,image/png"
          :file-list="fileList"
          :limit="3"
          :multiple="false"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-progress="handleProgress"
          :before-upload="handleBeforeUpload"
        >
          <zyl-button icon="upload" type="primary" icon-position="right">上传文件</zyl-button>
          <div slot="tip">只能上传jpeg、png文件，且大小不超过500kb</div>
        </zyl-upload>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      value: '',
      fileList: [
        {
          url: '1.jpg',
          name: 'avatar'
        },
        {
          url: '2.jpg',
          name: 'bg'
        }
      ]
    }
  },
  methods: {
    fn(e) {
      console.log(e)
    },
    handleExceed(files, fileList) {
      // 超过限制后的处理
      alert('您已经超过文件上传个数限制了！')
    },
    handleChange(file) {
      console.log('当前选择了文件', file)
    },
    handleSuccess() {

    },
    handleError() {

    },
    handleProgress() {

    },
    handleBeforeUpload(file) {
      const limitSize = file.size / 1024 < 500; // 500Kb限制
      const allowImage = file.name.includes('.jpg') || file.name.includes('.png')

      if (!allowImage) {
        console.log('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!limitSize) {
        console.log('上传图片大小不能超过 500kb!')
      }
      return allowImage && limitSize;
    }
  }
}
</script>

<style lang="scss">
.block {
  padding: 20px 0;
  >button, >svg{
    margin-right: 16px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .zyl-header, .zyl-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .zyl-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .zyl-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .zyl-container {
    margin-bottom: 40px;
  }
  
  .zyl-container:nth-child(5) .zyl-aside,
  .zyl-container:nth-child(6) .zyl-aside {
    line-height: 260px;
  }
  
  .zyl-container:nth-child(7) .zyl-aside {
    line-height: 320px;
  }

  .zyl-input {
     margin: 0 24px 24px 0;
  }
}
</style>
