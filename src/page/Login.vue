<template>
  <div style="height: 100%;" :style="{backgroundImage: 'url(' + imgSrc + ')'}">
    <div class="login_box">
      <h3 class="login_title">MyVue-Admin</h3>
      <el-form :model="loginForm" status-icon>
        <el-form-item  prop="pass">
          <div class="input_outer">
            <span class="u_user"></span>
            <input type="text" class="login_input" v-model="loginForm.userName" placeholder="请输入账户"/>
          </div>
        </el-form-item>
        <el-form-item prop="checkPass">
          <div class="input_outer">
            <span class="us_uer"></span>
            <input type="password" class="login_input" v-model="loginForm.password" placeholder="请输入密码"/>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="login_button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  //引入elementui  中消息提示插件
  import axios from "axios";
  import { Message } from 'element-ui';
  export default {
    data() {
      return {
        //用户账号密码
        loginForm: {
          userName: "",
          password: ""
        },
        //背景图路径
        imgSrc: require('../images/photo.jpg')
      }
    },
    created: function() {
      require('../images/star-squashed.jpg')
      var _this = this;
      //键盘回车键绑定登录事件
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if(key == 13) {
          _this.login();
        }
      };
    },
    methods: {
      //登录事件
      login() {
        var _this = this;
        if(_this.dataCheck()){
          //页面跳转
          // _this.$router.push("/home");
          axios
            .post("http://localhost:9090/user/login",JSON.stringify(this.loginForm))
            .then(response => {
              if (response.data.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                });
                _this.$router.push("/home");
              } else {
                this.$notify.info({
                  title: "提醒",
                  message: "请检查账号密码是否正确！！！"
                });
              }
            })
            .catch(error => {
              console.log(this.formInline);
              console.log(error);
              alert("网络错误 err");
            });
        }
      },
      //数据校验事件
      dataCheck(){
        if(!this.loginForm.userName){
          Message.warning("请输入账号")
          return false;
        }
        if(!this.loginForm.password){
          Message.warning("请输入密码")
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>
  .login_box{
    width: 315px;
    height: 365px;
    padding: 35px;
    color: #EEE;
    position: absolute;
    left: 25%;
    top: 50%;
    margin-left: -175px;
    margin-top: -200px;
    background: rgba(0,0,0,0.5);
    border-radius: 10px;
  }
  .login_title{
    text-align: center;
    font: 20px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei",sans-serif;
    color: #FFFFFF;
    height: 15px;
    line-height: 15px;
    padding: 0 0 35px 0;
  }
  .login_input{
    width: 220px;
    height: 46px;
    outline: none;
    display: inline-block;
    font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
    margin-left: 50px;
    border: none;
    background: none;
    line-height: 46px;
    color: rgb(255, 255, 255) !important;
  }
  .input_outer {
    height: 46px;
    padding: 0 5px;
    margin-bottom: 20px;
    border-radius: 50px;
    position: relative;
    border: rgba(255,255,255,0.2) 2px solid !important;
  }
  .u_user {
    width: 25px;
    height: 25px;
    background: url('../images/login_ico.png');
    background-position: -125px 0;
    position: absolute;
    margin: 10px 13px;
  }

  .us_uer {
    width: 25px;
    height: 25px;
    background-image: url('../images/login_ico.png');
    background-position: -125px -34px;
    position: absolute;
    margin: 10px 13px;
  }
  .login_button{
    border-radius: 50px; width: 100%;
  }
</style>
