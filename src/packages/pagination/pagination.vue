<template>
  <ul class="zyl-pagination">
    <li>
      <zyl-icon icon="left" @click="select(currentPage - 1)"></zyl-icon>
    </li>
    <li>
      <span :class="{active:currentPage === 1}" @click="select(1)">1</span>
    </li>
    <li v-if="showPrevMore"><span>...</span></li>
    <li v-for="p in pagers" :key="p">
      <span :class="{active:currentPage === p}" @click="select(p)">{{p}}</span>
    </li>
    <li v-if="showNextMore"><span>...</span></li>
    <li>
      <span :class="{active:currentPage === total}" @click="select(total)">{{total}}</span>
    </li>
    <li>
      <zyl-icon icon="right" @click="select(currentPage + 1)"></zyl-icon>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'zyl-pagination',
  props: {
    total: {
      type: Number,
      default: 1,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    currentPage: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      showPrevMore: false,
      showNextMore: false,
    }
  },
  computed: {
    pagers() {
      let total = this.total;
      // 计算是否显示 ... 这个按钮
      let pagerCount = this.pagerCount;
      let middleValue = Math.floor(this.pagerCount / 2); // 向下取整
      let currentPage = this.currentPage;
      let showPrevMore = false;
      let showNextMore = false;
      if (total > pagerCount) {
        if (currentPage > middleValue + 1) {
          showPrevMore = true;
        }
        if (currentPage < total - middleValue) {
          showNextMore = true;
        }
      }
      // 
      let arr = [];
      if (showPrevMore && !showNextMore) {
        // pagerCount - 2 是为了去掉头尾的1和10
        let start = total - (pagerCount - 2);
        for (let i = start; i < total; i++) {
          arr.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for(let i = 2; i < pagerCount; i++) {
          arr.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        // 取中间值
        let val = Math.floor((pagerCount - 2) / 2); // 7-2 = 5
        for (let i = currentPage - val; i <= currentPage + val; i++) {
          arr.push(i)
        }
      } else {
        for (let i = 2; i < total; i++) {
          arr.push(i)
        }
      }
      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      return arr;
    }
  },
  methods: {
    select(current) {
      // 判断越界
      if (current < 1) {
        current = 1;
      }
      if (current > this.total) {
        current = this.total;
      }
      // 触发重新渲染 同步当前页
      if (current !== this.currentPage) {
        this.$emit('update:current-page', current)
      }
    }
  },
}
</script>

<style lang="scss">
@import "@/styles/_var.scss";
  .zyl-pagination li {
    list-style: none;
    display: inline-flex;
    vertical-align: middle;
    user-select: none;
    span {
      padding: 0 4px;
      background: #fff;
      vertical-align: top;
      display: inline-block;
      font-size: 14px;
      min-width: 36px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      margin: 0;
    }
    .zyl-icon {
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
    .active {
      color: $primary;
      font-weight: 600;
    }
  }
</style>
