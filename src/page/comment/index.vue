<template>
  <div>
    <div style="border-radius: 5px;padding: 5px;">
      <el-table :data="userData" stripe style="width: 100%">
        <el-table-column align="center" prop="id" label="id"></el-table-column>
        <el-table-column align="center" prop="message" label="message"></el-table-column>
        <el-table-column align="center" prop="userName" label="userName"></el-table-column>
        <el-table-column align="center" prop="replyMsg" label="replyMsg"></el-table-column>
        <el-table-column align="center" prop="to_user_name" label="to_user_name"></el-table-column>
        <el-table-column align="center" prop="createTime" label="createTime"></el-table-column>
        <el-table-column align="center" prop="status" label="status" :formatter="sexStatus"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="det(scope.row),dialogFormVisible = true">详情</el-button>
            <el-dialog title="管理评论" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="评论id" :label-width="formLabelWidth">
                  <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论内容" :label-width="formLabelWidth">
                  <el-input v-model="form.replyMsg" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论状态" :label-width="formLabelWidth">
                  <el-select v-model="form.status" placeholder="请选择评论状态">
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="下架" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false,upd()">确 定</el-button>
              </div>
            </el-dialog>
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
      userData: [],
      dialogFormVisible: false,
      form:[],
      form: {
        name: "",
        region: "",
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
      .post("http://localhost:9090/comment/selectAll")
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
    det(row) {
      axios
        .post("http://localhost:9090/comment/selectById", JSON.stringify(row.id))
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
        .post("http://localhost:9090/comment/update",JSON.stringify(this.form))
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$notify({
              title: "操作成功",
              message: "修改状态成功",
              type: "success"
            });
          } else {
            this.$notify.info({
              title: "操作提醒",
              message: "修改状态失败！！！"
            });
          }
        })
        .catch(error => {
          console.log(this.formInline);
          console.log(error);
          alert("网络错误 err");
        });
    },
    sexStatus(row, column, cellValue, index) {
      return cellValue == 0 ? "正常" : "已下架";
    }
  }
};
</script>

<style scoped>
</style>
