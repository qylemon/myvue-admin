<template>
  <div>
    <div style="border-radius: 5px;padding: 5px; ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增分类</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-top: 5%;width:35%;">
        <el-form :inline="false" :model="formInline" label-width="80px" class="demo-form-inline">
          <el-form-item label="标签名">
            <el-input v-model="formInline.tagName" placeholder="标签名"></el-input>
          </el-form-item>
          <el-form-item label="标签描述">
            <el-input v-model="formInline.tagContent" placeholder="标签描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
export default {
  data() {
    return {
      formInline: [],
      formInline: {
        tagName: "",
        tagContent: ""
      }
    };
  },
  methods: {
    onSubmit() {
      axios
        .post(
          "http://localhost:9090/tag/insert",
          JSON.stringify(this.formInline)
        )
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$notify({
              title: "操作成功",
              message: "新增成功",
              type: "success"
            });
          } else {
            this.$notify.info({
              title: "操作提醒",
              message: "新增标签失败！！！"
            });
          }
        })
        .catch(error => {
          console.log(this.formInline);
          console.log(error);
          alert("网络错误 err");
        });
    }
  }
};
</script>

<style scoped>
</style>