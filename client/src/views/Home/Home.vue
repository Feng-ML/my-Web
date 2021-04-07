<template>
  <div id="Home">
    <div id="nav">

      <!-- 路由 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#202020"
        text-color="#fff"
        active-text-color="#ffd04b">

        <!-- 循环菜单 -->
        <slot 
          v-for="(item,index) in menu"
        >
          <!-- 有子菜单 -->
          <slot v-if="item.children">
            <el-submenu :index="index+''">
              <template slot="title"><i :class="'iconfont '+item.icon"></i> {{item.name}}</template>
              <!-- 循环子菜单 -->
              <el-menu-item 
                v-for="(item2,index2) in item.children"
                :key="index2"
                :index="index+'-'+index2"
                @click="toPath(item2.path,index+'-'+index2)"
              > 
                <i :class="'iconfont '+item2.icon"></i>
                {{item2.name}}
              </el-menu-item>
            </el-submenu>
          </slot>

          <!-- 无子菜单 -->
          <slot v-else>
            <el-menu-item :index="index+''" @click="toPath(item.path,index)">
              <i :class="'iconfont '+item.icon"></i>
              {{item.name}}
            </el-menu-item>
          </slot>

        </slot>


      </el-menu>
    
      <!-- 登录 -->
      <div class="login" @click="toLogin()">
        <div id="avatar" @click="toAbout()" v-if="userInfo.username"><img src='http://www.fengminlin.xyz/blog/avatar0.jpg'/></div>
        <i class="el-icon-s-custom" v-else></i><br/>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{Uname}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="avatarChange()">更换头像</el-dropdown-item>
            <el-dropdown-item @click.native="outLogin()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 代码连接 -->
      <div class="github">
        <a href="https://github.com/Feng-ML/Fund-Management-System" target="_blank"></a>
      </div>
    
      <!-- 更改头像 -->
      <input @change="uploadPhoto($event)" type="file" id="avatar-upload">

    </div>

    <!-- 顶部图片 -->
    <!-- <div id="top"><div></div></div> -->

    <!-- 页面内容 -->
    <div id="content">
      <router-view/>
    </div>


    <div id="footer">
      <img src="@/assets/picture/falv.png"> <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备19146979号</a>
    </div>
  </div>
</template>

<script type="text/javascript">
  import $ from 'jquery'
  import menu from './menu.js'

  export default {
    components:{
      },
    data(){
      return{
        Uname: '',
        input1: '',
        userInfo:{
          avatar: '',
          username: '',
          email: ''
        },
        menu:[],
        activeIndex: '0'
      }
    },
    created(){
      if(sessionStorage.getItem("activeIndex"))this.activeIndex = sessionStorage.getItem("activeIndex")

      let name = localStorage.getItem("username")
      if(name){

        this.userInfo.username = name
        this.userInfo.email = localStorage.getItem("useremail")
        this.userInfo.avatar = localStorage.getItem("userAvatar")
        this.Uname = name

      }else{

        this.Uname = '登录'

      }

      this.menu = menu.menu
      
    },
    mounted(){

      // 头像显示
      if (localStorage.getItem("username")) {
        if ( localStorage.getItem("userAvatar") ) {
          $('#avatar img')[0].setAttribute( 'src', this.userInfo.avatar)            
        }
      }
    
    },
    methods:{
      // 登录
      toLogin(){
        if (!localStorage.getItem("username")) {
          this.$router.push('/login')
        }
      },
      //详细信息
      toAbout(){

        if(this.$route.path!='/home/about') this.$router.push('/home/about')

      },
      // 退出登录
      outLogin() {
        localStorage.removeItem("username")
        localStorage.removeItem("useremail")
        localStorage.removeItem("userAvatar")
        location.reload()
      },

      // 更换头像
      avatarChange(){
        document.getElementById('avatar-upload').click()
      },
      // 导航路由跳转
      toPath(path,index){
        if(this.$route.path!=path)this.$router.push(path)
        sessionStorage.setItem('activeIndex',index)
      },

      uploadPhoto (e) {
        // 利用fileReader对象获取file
        var file = e.target.files[0];
        var filesize = file.size;
        var filename = file.name;
        // 2,621,440   2M
        if (filesize > 1050720) {
            // 图片大于2MB
          return this.$message({
                    message: '图片大于1MB,请重新选择！',
                    type: 'error'
                  })
        }else{
          
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
      
            // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
            var imgcode = e.target.result;

            this.userInfo.avatar = imgcode

            this.$axios
                .post('/api/users/avatar',this.userInfo)
                .then( res =>{
                  
                  this.$message({
                    message: '提交成功！！',
                        type: 'success' 
                    })

                    // 改变本地数据
                    localStorage.setItem('userAvatar', imgcode)
                    //成功后刷新
                    location.reload()
                })                       
                .catch( err =>{
                    console.log(err)
                })  
            }
          }
        }
    }
  }
</script>

<style lang="less">
  #Home{
    background: linear-gradient(90deg, rgb(196, 202, 218) 0%, #fff 20%, #fff 80%, rgb(196, 202, 218) 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    // 导航栏
    #nav {
      position: fixed;
      top: 0;
      z-index: 10;
      width: 100%;
      text-align: center;
      min-width: 1000px;

      .el-menu-demo{
        padding: 0 130px;
      }

      .el-menu.el-menu--horizontal {
        border-bottom: none; 
      }


    }
    .login{
      position: absolute;
      right: 10px;
      top: 15px;
      width: 100px;
      color: white;
      
      .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
        }
      #avatar{
        position: absolute;
        left: 35px;
        top: -5px;
        width: 20px;
        height: 20px;
        border: 2px solid rgb(252, 174, 73);
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
        }
      }    
    }
    .github{
      position: absolute;
      left: 30px;
      top: 20px;
      a{
        display: block;
        background: url('../../assets/picture/github.png') no-repeat;
        background-size: cover;
        width: 30px;
        height: 30px;
      }
    }
    #avatar-upload{
      display: none;
    }

    #content{
      flex-grow: 1;
      padding-top: 80px;
    }
  }
  .el-icon-arrow-down {
      font-size: 12px;
  }


  #footer{
    background-color: @bgColor;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: center;
    a{
      margin-left: 10px;
      color: #fff;
      text-decoration: none;

      &:hover{
        color: @textColor;
      }
    }
  }
</style>