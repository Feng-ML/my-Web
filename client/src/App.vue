<template>
  <div id="app">

    

    <!-- 右键菜单 -->
    <div id="appMenu">
      <ul>
        <li><router-link exact to="/">首页</router-link></li>
        <li><a href="http://www.baidu.com">百度</a></li>
        <li><a href="#">刷新</a></li>
        <li><a href="http://Feng-ML.github.io">博客</a></li>
      </ul>
    </div>


    
      <router-view/>
    


    <!-- <video 
      id="video" 
      src="@/assets/music/TimeBetweenUs.mp3" 
      controls="controls" autoplay="autoplay"  loop="loop"> </video> -->

    <!-- 回到顶部 -->
    <el-backtop class=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    

  </div>
</template>

<script type="text/javascript">

  export default {
    methods:{
      
    }
  }
</script>

