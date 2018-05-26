<template>
  <div class="login">
    <h1>登录酷狗音乐</h1>

    <p class="pBack">手机号:
      <el-input prefix='as' id='acc' class="input" @blur='accIsf' placeholder="用户名/手机号/密码"></el-input>
    </p>
    <p class="pBack">密&nbsp&nbsp&nbsp码:
      <el-input class="input" id='pwd' placeholder="请输入密码"></el-input>
    </p>
    <el-button class='btn' @click='check' type="primary">去登录</el-button>
  </div>
</template>

<script>
  import ElementUI from 'element-ui'
  import Vue from 'vue'
  import 'element-ui/lib/theme-chalk/index.css'
  import axios from "axios";
  Vue.use(ElementUI)
  export default {

    data() {
      return {
        acc: '',
        pwd: ''
      }
    },
    methods: {
      backto() {
        this.$router.push("/login")
      },
      accIsf() {
       
        //this.$router.push('/reg')
        //获取帐号
        console.log(2)
        axios.post("http://127.0.0.1:3000/checkAcc", { findType: "exact", acc: acc.value }).then((msg) => {
          console.log(msg)
          //let this1=this;
          if (msg.data.length != 0) {
            this.acc = msg.data[0].acc;
            this.pwd = msg.data[0].pwd;
          }
        })
      },
      //验证登录
      check() {
        console.log(this.acc, this.pwd)
        console.log(acc.value,pwd.value)
        let this1 = this;
        if (((acc.value == this.acc) && (pwd.value == this.pwd)) && ((this.acc != '') && (this.pwd != ''))) {
          this1.$router.push('/home')

        }
        else {
          alert('账号或者密码错误')
        }
      }
    }
  }

</script>

<style>
  .input {
    width: 400px;
    height: 35px;
    outline: none;
    border: none;
  }

  .pBack {
    color: #D4CFCF;
    width: 460px;
    padding: 10px;
    background: white;
  }
  .btn{
    margin-top:20px;
    width:465px;
  }
</style>