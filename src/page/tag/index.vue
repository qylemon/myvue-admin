<template>
  <div>
    <div style="border-radius: 5px;padding: 5px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看分类</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="tagData" stripe style="width: 100%">
        <el-table-column align="center" prop="id" label="id"></el-table-column>
        <el-table-column align="center" prop="tagName" label="tagName"></el-table-column>
        <el-table-column align="center" prop="tagContent" label="tagContent"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="det(scope.row),dialogFormVisible = true">操作</el-button>
            <el-dialog title="分类明细" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="分类id" :label-width="formLabelWidth">
                  <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                  <el-input v-model="form.tagName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" :label-width="formLabelWidth">
                  <el-input v-model="form.tagContent" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false,upd()">确 定</el-button>
              </div>
            </el-dialog>
            <el-button type="text" size="small" @click="del()" style="color: #f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 预留分页 -->
      <el-pagination background layout="prev, pager, next" :total="100" style="text-align: right;"></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tagData: [],
      dialogFormVisible: false,
      form:[],
      form: {
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  created: function() {
    axios
      .post("http://localhost:9090/tag/selectAll")
      .then(response => {
        console.log("1");
        console.log(response);
        console.log(response.data.data.list);
        this.tagData = response.data.data.list;
      })
      .catch(error => {
        console.log(error);
        alert("网络错误 err");
      });
  },
  methods: {
    det(row) {
      axios
        .post("http://localhost:9090/tag/selectById", JSON.stringify(row.id))
        .then(response => {
          console.log(response.data.data);
          this.form = response.data.data;
        })
        .catch(error => {
          console.log(this.formInline);
          console.log(error);
          alert("网络错误 err");
        });
    },
    upd(){
      axios
        .post("http://localhost:9090/tag/update",JSON.stringify(this.form))
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$notify({
              title: "操作成功",
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$notify.info({
              title: "操作提醒",
              message: "修改标签失败！！！"
            });
          }
        })
        .catch(error => {
          console.log(this.formInline);
          console.log(error);
          alert("网络错误 err");
        });
    },
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>