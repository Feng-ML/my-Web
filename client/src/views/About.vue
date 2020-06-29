<template>
  <div id="about">
    <div id="aboutShow" v-if="userInfo.username">
      <h1>用户信息</h1>
      <div id="aboutAvatar"><img src='http://www.fengminlin.xyz/blog/avatar0.jpg'></div>
      <h3>{{userInfo.username}}</h3>
      <p>邮箱：{{userInfo.email}}</p>  
    </div>
    <div id="aboutNull" v-else>
      <a href="#" @click="toLogin()">请登录</a>
    </div>

  </div>
</template>

<script type="text/javascript">
import $ from 'jquery'

export default {
  data(){
    return {
      userInfo:{
        avatar:'',
        username:'',
        email:''
      }
    }
  },
  created(){
    
    if(localStorage.getItem("username")){

      this.userInfo.username = localStorage.getItem("username")
      this.userInfo.email = localStorage.getItem("useremail")
      this.userInfo.avatar = localStorage.getItem("userAvatar")
      
    }
    
  },
  mounted(){
    if (localStorage.getItem("username")) {
      if (localStorage.getItem("userAvatar")) {
          $('#aboutAvatar img')[0].setAttribute( 'src', this.userInfo.avatar)   
        }   
    }
    
  },
  methods:{
    toLogin(){
      if (!localStorage.getItem("username")) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less'>
  #about{
    position: relative;

    #aboutShow{
      h1{
        margin-top: 50px;
      }
      #aboutAvatar{
        margin: auto;
        margin-top: 50px;
        width: 150px;
        height: 150px;
        border: 3px rgb(252, 174, 73) solid;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      h3{
        padding: 30px;     
      }
    }
    #aboutNull{
      display: block;
      margin-top: 100px;
    }

  }
</style>