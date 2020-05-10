<template>
  <div id="Home">
    <div id="nav">

      <!-- 路由 -->
      <ul>
        <li><router-link exact to="/home"><i class="el-icon-s-home"></i> 首页</router-link></li>
        <li><router-link to="/home/fundList"><i class="el-icon-s-management"></i> 资金管理</router-link></li>
        <li><router-link to="/home/about"><i class="el-icon-user-solid"></i> 关于</router-link></li>
        <li><router-link to="/home/liuyan"><i class="el-icon-s-promotion"></i> 留言版</router-link></li>
      </ul>

      <!-- 搜索框 -->
      <div class="demo-input-suffix">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input1">
        </el-input>
      </div>
    
      <!-- 登录 -->
      <div class="login" @click="toLogin()">
        <i class="el-icon-s-custom"></i><br/>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="outLogin()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    
    
    </div>



    <div id="top"><div></div></div>



    <div id="content">
      <router-view/>
    </div>

  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'

  //登录显示
  var username
  if (localStorage.getItem("username")){
    username = localStorage.getItem("username")
  }else{
    username = "登录"
  }


  
  export default {
    components:{
    },
    data(){
      return{
        input1: '',
        username
      }
    },
    methods:{
      toLogin(){
        if (!localStorage.getItem("username")) {
          this.$router.push('/login')
        }
      },
      outLogin() {
        localStorage.removeItem("username")
        localStorage.removeItem("useremail")
        location.reload()
      }
    }
  }
</script>

<style lang="less">
  #Home{
    background: linear-gradient(90deg, rgb(196, 202, 218) 0%, #fff 20%, #fff 80%, rgb(196, 202, 218) 100%);
    .login{
      .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
        }    
    }
  }
  .el-icon-arrow-down {
      font-size: 12px;
  }

</style>