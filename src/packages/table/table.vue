<template>
  <div class="zyl-table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in cloneColumns" :key="index" :style="{width:col.width+'px'}">
            <div v-if="col.type == 'selection'">
              <input type="checkbox" />
            </div>
            {{col.title}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in cloneData" :key="index">
          <td v-for="(col, index) in cloneColumns" :key="index">
            <div v-if="col.type == 'selection'">
              <input type="checkbox" />
            </div>
            <div>
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
    };
  },
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
