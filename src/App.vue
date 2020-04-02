<template>
  <div id="app">
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
          <div class="yellow">col-24</div>
        </zyl-col>
      </zyl-row>
      <zyl-row>
        <zyl-col :span="12">
          <div class="red">col-12</div>
        </zyl-col>
        <zyl-col :span="12">
          <div class="green">col-12</div>
        </zyl-col>
      </zyl-row>
      <zyl-row>
        <zyl-col :span="6">
          <div class="red">col-6</div>
        </zyl-col>
        <zyl-col :span="6" :offset="12">
          <div class="green">col-6</div>
        </zyl-col>
      </zyl-row>
      <zyl-row :gutter="16">
        <zyl-col :span="6">
          <div class="red">col-6</div>
        </zyl-col>
        <zyl-col :span="6">
          <div class="green">col-6</div>
        </zyl-col>
        <zyl-col :span="6">
          <div class="red">col-6</div>
        </zyl-col>
        <zyl-col :span="6">
          <div class="green">col-6</div>
        </zyl-col>
      </zyl-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    fn(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
.block {
  padding: 20px;
  >button, >svg{
    margin-right: 16px;
  }
  .red {
    background-color: crimson;
  }
  .green {
    background-color: greenyellow;
  }
  .yellow {
    background-color: darkorange;
  }
}
</style>
