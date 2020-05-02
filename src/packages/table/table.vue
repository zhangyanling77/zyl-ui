<template>
  <div class="zyl-table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in cloneColumns" :key="index" :style="{width:col.width+'px'}">
            <div v-if="col.type == 'selection'">
              <input type="checkbox" :checked="checkAllStatus" ref="checkAll" @change="selectAll" />
            </div>
            <div v-else>
              {{col.title}}
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
    }
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
  }
}
</script>

<style lang="scss">
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
}
</style>
