<template>
  <div>
    <div style="border-radius: 5px;padding: 5px;">
      <el-table :data="userData" stripe style="width: 100%">
        <el-table-column align="center" prop="id" label="id"></el-table-column>
        <el-table-column align="center" prop="userName" label="username"></el-table-column>
        <el-table-column align="center" prop="sex" :formatter="sexFilterFun" label="sex"></el-table-column>
        <el-table-column align="center" prop="email" label="email"></el-table-column>
        <el-table-column align="center" prop="status" :formatter="sexStatus" label="状态"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClicka(scope.row)">详情</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" style="color: #f56c6c">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: []
    };
  },
  created: function() {
    axios
      .post("http://localhost:9090/user/selectAll")
      .then(response => {
        console.log("1");
        console.log(response);
        console.log(response.data.data.list);
        this.userData = response.data.data.list;
      })
      .catch(error => {
        console.log(error);
        alert("网络错误 err");
      });
  },
  methods: {
    handleClicka(row) {
      console.log(row);
    },
    sexFilterFun(row, column, cellValue, index) {
      return cellValue == 0 ? "男" : "女";
    },
    sexStatus(row, column, cellValue, index) {
      return cellValue == 0 ? "正常" : "已禁用";
    },
    // open() {
    //   this.$alert("这是一段内容", "标题名称", {
    //     confirmButtonText: "确定",
    //     callback: action => {
    //       this.$message({
    //         type: "info",
    //         message: ``
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style scoped>
</style>
