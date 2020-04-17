<template>
  <div class="zyl-date-picker" v-click-outside="handleBlur">
    <zyl-input suffix-icon="calendar" :value="formatDate" @focus="handleFocus" @change="handleChange"></zyl-input>
    <div class="zyl-date-content" v-if="isVisible">
      <template v-if="mode === 'date'">
        <div class="zyl-date-picker-header">
          <zyl-icon icon="doubleleft" @click="changeYear(-1)"></zyl-icon>
          <zyl-icon icon="left" @click="changeMonth(-1)"></zyl-icon>
          <span>
            <b @click="mode='year'">{{tempTime.year}}</b>年
            <b @click="mode='month'">{{tempTime.month + 1}}</b>月
          </span>
          <zyl-icon icon="right" @click="changeMonth(1)"></zyl-icon>
          <zyl-icon icon="doubleright" @click="changeYear(1)"></zyl-icon>
        </div>
        <div>
          <span v-for="week in weeks" class="cell" :key="week">{{week}}</span>
        </div>
        <div class="zyl-date-picker-content" v-for="i in 6" :key="`row_${i}`">
          <span
            v-for="j in 7"
            :key="`col_${j}`"
            class="cell cell-dates"
            @click="selectDate(getCurrentDate(i,j))"
            :class="{
                  isNotCurrentMonth:!isCurrentMonth(getCurrentDate(i,j)),
                  isToday:isToday(getCurrentDate(i,j)),
                  isSelect:isSelect(getCurrentDate(i,j))
              }"
          >
            {{getCurrentDate(i,j).getDate()}}
          </span>
        </div>
      </template>
      <template v-if="mode === 'year'">
        <div class="zyl-date-picker-header">
          <zyl-icon icon="doubleleft" @click="changeYear(-10)"></zyl-icon>
          <span>
            <b @click="mode='year'">{{startYear}}年 ~ {{startYear+9}}年</b>
          </span>
          <zyl-icon icon="doubleright" @click="changeYear(10)"></zyl-icon>
        </div>
        <div class="zyl-date-picker-content">
          year
        </div>
      </template>
      <template v-if="mode === 'month'">
        <div class="zyl-date-picker-header">
          <zyl-icon icon="left" @click="changeMonth(-1)"></zyl-icon>
          <span>
            <b @click="mode='year'">{{this.tempTime.year}}年</b>
          </span>
          <zyl-icon icon="right" @click="changeMonth(1)"></zyl-icon>
        </div>
        <div class="zyl-date-picker-content">
          month
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// 获取年份，月份，日期
function getYearMonthDay(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate(); // 获取日期的 getDay 周几
  return [year, month, day];
}
// 是个指令, 判断点击的是否是内部元素
import clickOutside from 'v-click-outside';
export default {
  name: 'zyl-date-picker',
  directives: {
    clickOutside: clickOutside.directive
  },
  props: {
    value: {
      type: [String, Date],
      default: () => new Date()
    }
  },
  watch: {
    value(newValue) {
      // 监控value值变化 重新渲染页面
      // 根据最新的value 来更新 this.time / this.tempTime
      let [year, month, day] = getYearMonthDay(newValue);
      this.time = {
        year,
        month,
        day
      };
      this.tempTime = { ...this.time }; // 拷贝一个time属性用于后续选择的更改
    }
  },
  data(){
    let [year, month, day] = getYearMonthDay(this.value || new Date());
    return {
      isVisible: false,
      mode: 'date', // date || year || month
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      time: {
        // 显示的是这个时间
        year,
        month,
        day
      },
      tempTime: {
        // 实际操作的是这个时间
        year,
        month,
        day
      },
    }
  },
  computed: {
    visibleData() {
      // 只要数据变化 会更新 tempTime，此时会重新计算42天
      // <!-- 先算 当前月有多少天 找到下一个月的1号的前一天  总天数 -->
      // <!-- 再去获取当前1号 是星期几 在前面 再加上那几天 -->
      // <!-- 42 - 刚才加的 + 月的总天数 = 剩下的 -->
      // <!-- 直接将自己向前移动多少天后 开始循环42天 -->
      let firstDay = new Date(this.tempTime.year, this.tempTime.month, 1); // 如3月1日
      let weekDay = firstDay.getDay(); // 周日0 周六 6
      weekDay = weekDay === 0 ? 7 : weekDay;
      // 毫秒戳 运算
      let start = firstDay - weekDay * 60 * 60 * 24 * 1000; // 让当前可是区域的开始调整到当前的开始部分
      let arr = []; // 循环42个
      for (let i = 0; i < 42; i++) {
        // 转回成事件
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
      }
      return arr;
    },
    formatDate() {
      if (this.value) {
        // 获取输入框的内容
        let { year, month, day } = this.time
        // 补0操作
        return `${year}-${(month + 1 + "").padStart(2, 0)}-${(day + "").padStart(2, 0)}`;
      }
    },
    startYear(){ // 2023  2020   2023 -  2023%10 = 3
      return this.tempTime.year - this.tempTime.year%10
    }
  },
  methods: {
    handleChange(e) {
      // 失去焦点时更新用户输入
      let newValue = e.target.value;
      let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      if (newValue.match(regExp)) {
        // 更新输入框内容 会自己兼容 $1,2,3 是正则捕获到的分组
        this.$emit("input", new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3));
      } else {
        e.target.value = this.formatDate; // 将原来的值赋予回去 乱写的不匹配
      }
      this.handleBlur(); // 失去焦点
    },
    handleFocus() {
       this.isVisible = true;
    },
    handleBlur() {
      this.isVisible = false;
      this.mode = 'date'
    },
    getCurrentDate(i, j) {
      return this.visibleData[(i - 1) * 7 + (j - 1)];
    },
    isCurrentMonth(date) {
      let { year, month } = this.tempTime; // 取出来当前用户选的是哪年 哪月
      let [y, m] = getYearMonthDay(date);
      return year === y && m === month; // 判断当前年月是否相等
    },
    isToday(date) {
      let [y, m, d] = getYearMonthDay(date);
      let [year, month, day] = getYearMonthDay(new Date()); // 当前的年月日
      return year === y && month === m && day === d;
    },
    selectDate(date) {
      // 选择日期
      this.$emit("input", date); // 更改日期
      this.handleBlur(); // 隐藏面板
    },
    isSelect(date) {
      // 判断当前是否选中
      let { year, month, day } = this.time; // 当前选中的年月日
      let [y, m, d] = getYearMonthDay(date);
      return year == y && month === m && day === d;
    },
     // 更改年月 让系统自己算 不要自己考虑边界清框
    changeMonth(count) {
      // 更改月不要直接 + -
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setMonth(oldDate.getMonth() + count);
      let [year, month] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
      this.tempTime.month = month;
    },
    changeYear(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setFullYear(oldDate.getFullYear() + count);
      let [year] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.zyl-date-picker {
  // border: 1px solid red;
  display: inline-block;
  .zyl-date-content {
    position: absolute;
    z-index: 10;
    user-select: none;
    width: 280px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
    .zyl-date-picker-header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .zyl-icon, b {
        cursor: pointer;
      }
    }
    .cell {
      width: 40px;
      height: 40px;
      display: inline-block;
      text-align: center;
      line-height: 40px;
    }
  }
  .cell {
    font-weight: 400;
  }
  .isNotCurrentMonth {
    color: #ccc;
  }
  .cell-dates:hover:not(.isNotCurrentMonth):not(.isSelect) {
    color: $primary;
  }
  .isSelect {
    color: #fff;
    background: $primary;
    border-radius: 50%;
  }
  .isToday {
    color: $primary;
    font-weight: bold;
    background: #fff;
  }
}
</style>
