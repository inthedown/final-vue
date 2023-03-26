<template>
  <el-pagination
    v-if="!pc"
    small
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
    :page-size="page_data.rn"
    :total="page_data.total"
  >
  </el-pagination>
  <el-pagination
    v-if="pc"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page_data.pn"
    :page-sizes="[10, 50, 100, 200, 300, 400]"
    :page-size="page_data.rn"
    layout="total, sizes, prev, pager, next, jumper"
    :total="page_data.total"
  ></el-pagination>
</template>
<script>
export default {
  emits: {
    "size-change": null,
    "current-change": null,
  },
  props: {
    pc: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Object,
      default() {
        return {
          pn: 1,
          rn: 10,
          total: 0,
        };
      },
    },
  },
  data() {
    return {
      page_data: this.page,
    };
  },
  setup(props, context) {
    const size_change = (size) => {
      context.emit("size-change", size);
    };
    const current_change = (pn) => {
      context.emit("current-change", pn);
    };
    return {
      size_change,
      current_change,
    };
  },
  methods: {
    handleSizeChange(size) {
      this.page_data.rn = size;
      this.size_change(size);
    },
    handleCurrentChange(pn) {
      this.page_data.pn = pn;
      this.current_change(pn);
    },
  },
};
</script>