<template>
  <div>
    <div style="border-radius: 5px;padding: 5px;">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="first">
          <el-table :data="roleData" stripe style="width: 100%">
            <el-table-column align="center" prop="id" label="id"></el-table-column>
            <el-table-column align="center" prop="roleName" label="roleName"></el-table-column>
            <el-table-column align="center" prop="roleDesc" label="roleDesc"></el-table-column>
            <el-table-column align="center" prop="roleValue" label="roleValue"></el-table-column>
            <el-table-column align="center" prop="createTime" label="createTime"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" style="color: #f56c6c">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="角色权限管理" name="second">
          <el-table :data="rolePermData" stripe style="width: 100%">
            <el-table-column align="center" prop="id" label="id"></el-table-column>
            <el-table-column align="center" prop="roleId" label="roleId"></el-table-column>
            <el-table-column align="center" prop="roleName" label="roleName"></el-table-column>
            <el-table-column align="center" prop="permId" label="permId"></el-table-column>
            <el-table-column align="center" prop="permName" label="permName"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" style="color: #f56c6c">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="用户角色管理" name="third">
          <el-table :data="userRoleData" stripe style="width: 100%">
            <el-table-column align="center" prop="id" label="id"></el-table-column>
            <el-table-column align="center" prop="userId" label="userId"></el-table-column>
            <el-table-column align="center" prop="userName" label="userName"></el-table-column>
            <el-table-column align="center" prop="roleId" label="roleId"></el-table-column>
            <el-table-column align="center" prop="roleName" label="roleName"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" style="color: #f56c6c">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="更新权限缓存" name="fourth">
          <el-button plain @click="updAuth">更新权限缓存</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      activeName2: "first",
      roleData: [],
      userRoleData: [],
      rolePermData: []
    };
  },
  created: function() {
    axios
      .post("http://localhost:9090/sysRole/selectAll")
      .then(response => {
        console.log("1");
        console.log(response);
        console.log(response.data.data.list);
        this.roleData = response.data.data.list;
      })
      .catch(error => {
        console.log(error);
        alert("网络错误 err");
      });

    axios
      .post("http://localhost:9090/userRole/selectAll")
      .then(response => {
        console.log("1");
        console.log(response);
        console.log(response.data.data.list);
        this.userRoleData = response.data.data.list;
      })
      .catch(error => {
        console.log(error);
        alert("网络错误 err");
      });

    axios
      .post("http://localhost:9090/rolePerm/selectAll")
      .then(response => {
        console.log("1");
        console.log(response);
        console.log(response.data.data.list);
        this.rolePermData = response.data.data.list;
      })
      .catch(error => {
        console.log(error);
        alert("网络错误 err");
      });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClicka(row) {
      console.log(row);
    },
    updAuth() {
      this.$confirm("此操作将更新权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        axios
          .post("http://localhost:9090/shiroUtils/updatePermission")
          .then(() => {
            this.$notify({
              type: "success",
              title: "权限更新",
              message: "更新权限成功！！"
            });
          })
          .catch(error => {
            this.$notify.error({
              title: '错误',
              message: '网络错误'
            });
          });
      })
      .catch(() => {
        this.$notify.info({
          title: "操作取消",
          message: "取消更新权限缓存"
        });
      });
    }
  }
};
</script>

<style scoped>
</style>