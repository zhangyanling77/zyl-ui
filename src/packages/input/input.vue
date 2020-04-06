<template>
  <div class="zyl-input" :class="inputClass">
    <zyl-icon :icon="prefixIcon" v-if="prefixIcon"></zyl-icon>
    <zyl-icon :icon="suffixIcon" v-if="suffixIcon"></zyl-icon>
    <input
      :type="showPassword?(passwordVisible?'text':'password'):type"
      :value="value"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      @input="$emit('input',$event.target.value)"
      ref="input"
    />
    <!-- @mousedown.native.prevent  不会失去焦点 -->
    <zyl-icon
      icon="close-circle"
      v-if="clearable && value"
      @click.native="$emit('input','')"
      @mousedown.native.prevent
    ></zyl-icon>
    <!-- 先失去焦点 在获取焦点 -->
    <zyl-icon
      icon="key"
      v-if="showPassword && value"
      @click.native="changeStatus"
    ></zyl-icon>
  </div>
</template>
<script>
export default {
  name: "zyl-input",
  props: {
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String
  },
  data() {
    return { passwordVisible: false };
  },
  computed: {
    inputClass() {
      let classes = [];
      if (this.clearable || this.showPassword || this.suffixIcon) {
        classes.push(`zyl-input-suffix-icon`);
      }
      if (this.prefixIcon) {
        classes.push(`zyl-input-prefix-icon`);
      }
      return classes;
    }
  },
  methods: {
    changeStatus() {
      this.passwordVisible = !this.passwordVisible;
      // 让它在下一个事件环获取焦点
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.zyl-input {
  display: inline-flex;
  position: relative;
  input {
    padding: 8px;
    width: 240px;
    height: 42px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    &:focus {
      border: 1px solid $primary;
      outline: none;
      box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
    }
    &[disabled] {
      cursor: not-allowed;
      background: #eee;
    }
  }
}
.zyl-input-suffix-icon {
  input {
    padding-right: 25px;
  }
  .zyl-icon {
    right: 8px;
    top: 13px;
    position: absolute;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }
}
.zyl-input-prefix-icon {
  input {
    padding-left: 25px;
  }
  .zyl-icon {
    left: 8px;
    top: 13px;
    position: absolute;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }
}
</style>