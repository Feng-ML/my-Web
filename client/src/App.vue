<template>
  <div id="app">

    <!-- 右键菜单 -->
    <div id="appMenu">
      <ul>
        <li><router-link exact to="/">首页</router-link></li>
        <li><a href="https://github.com/Feng-ML/Fund-Management-System" target="_blank">代码</a></li>
        <li><a href="#">刷新</a></li>
        <li><a href="http://Feng-ML.github.io" target="_blank">博客</a></li>
      </ul>
    </div>
    
      <router-view/>

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

<style lang="less">

</style>
