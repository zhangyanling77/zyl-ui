<template>
  <div class="zyl-table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in cloneColumns" :key="index" :style="{width:col.width+'px'}">
            <div v-if="col.type == 'selection'">
              <input type="checkbox" :checked="checkAllStatus" ref="checkAll" @change="selectAll" />
            </div>
            <div v-else class="zyl-table-cell">
              <span>{{col.title}}</span>
              <span v-if="col.sortable" class="sortable">
                <zyl-icon
                  icon="up"
                  :class="{active:isAsc(col)}"
                  @click="sort(col,isAsc(col)?'normal':'asc')"
                ></zyl-icon>
                <zyl-icon
                  icon="down"
                  :class="{active:isDesc(col)}"
                  @click="sort(col,isDesc(col)?'normal':'desc')"
                ></zyl-icon>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in cloneData" :key="index">
          <td v-for="(col, index) in cloneColumns" :key="index">
            <div v-if="col.type == 'selection'">
              <input type="checkbox" @change="selectOne($event,row)" :checked="isChecked(row)" />
            </div>
            <div v-else>
              {{row[col.key]}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
  name: 'zyl-table',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String
    },
  },
  data() {
    return {
      cloneColumns: cloneDeep(this.columns),
      cloneData: cloneDeep(this.data),
      selectedItems: [],
    };
  },
  watch: {
    selectedItems() {
      // 我要设置半选状态
      if (this.cloneData.length != this.selectedItems.length) {
        if (this.selectedItems.length > 0) {
          return (this.$refs.checkAll[0].indeterminate = true);
        }
      }
      this.$refs.checkAll[0].indeterminate = false; // 设置半选状态，indeterminate是js原生属性
    }
  },
  computed: {
    checkAllStatus() {
      return this.cloneData.length == this.selectedItems.length;
    }
  }, 
  created() {
    // 给每一条数据添加一个唯一标识
    this.cloneData = this.cloneData.map(row => {
      row._id = Math.random();
      return row;
    });
    // 处理排序状态
    this.cloneColumns = this.cloneColumns.map(col => {
      col.sortType = col.sortType ? col.sortType : "normal"; // normal 表示没有排序
      this.sort(col, col.sortType);
      return col;
    });
  },
  methods: {
    isChecked(row) {
      return this.selectedItems.some(r => r._id == row._id);
    },
    selectAll(e) {
      this.selectedItems = e.target.checked ? this.cloneData : [];
      this.$emit("on-select-all", this.selectedItems);
    },
    selectOne(e, row) {
      if (e.target.checked) {
        this.selectedItems.push(row);
      } else {
        this.selectedItems = this.selectedItems.filter(r => r._id != row._id);
      }
      this.$emit("on-select", this.selectedItems, row);
    },
    isAsc(col) {
      return col.sortType == "asc";
    },
    isDesc(col) {
      return col.sortType == "desc";
    },
    sort(col, type) {
      let data = cloneDeep(this.data);
      col.sortType = type;
      if (col.sortable !== "custom") {
        if (type !== "normal") {
          let key = col.key;
          this.cloneData = data.sort((a, b) => {
            if (type == "asc") {
              return a[key] - b[key];
            } else {
              return b[key] - a[key];
            }
          });
        } else {
          // 如果不需要排序 就把默认的结果 赋予给数据即可
          this.cloneData = data;
        }
      } else {
        this.$emit("on-sort-change", {
          col: cloneDeep(col),
          type
        });
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.zyl-table {
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    th {
      background: #eee;
    }
    th,
    td {
      border-bottom: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  }
  .zyl-table-cell {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    >span:first-child{
      margin-right: 6px;
    }
    .sortable {
      display: flex;
      flex-direction: column;
      .zyl-icon {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
      .active {
        fill: $primary;
      }
    }
  }
}
</style>
