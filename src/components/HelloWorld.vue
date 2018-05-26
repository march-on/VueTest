<template>
  <div class="hello">
    <div class="left">
      <el-button>默认按钮</el-button>
      <p><router-link to="/login">登录</router-link></p>
      <p><router-link to="/reg">注册</router-link></p>
      <p><router-link to="/home">首页</router-link></p>     
    </div>
    <div class="right">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
console.log(this.$store)
  export default {
    name: 'HelloWorld',
    data() {
      return {
      }
    },
    methods: {
      backto() {
        this.$router.push("/login")
      }
    }
  }

</script>

<style>
  .hello {
    overflow: hidden;
    border: 1px solid red;
  }

  .left {
    margin-top:80px;
    width: 100px;
    text-align: center;
    float: left;
  }
  a{
    list-style: none;
    color: #5AADB8;
    text-decoration: none;
  }
  .right {
  
    padding: 30px;
    width:1100px;
    height: 100%;
    float: left;
  }
</style>