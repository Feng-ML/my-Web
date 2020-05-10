<template>
  <div id="benner">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <img :src="require('@/components/benner/' + imgLun[item-1])"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name:"benner",
    data(){
      return {
        imgLun:[
          "top1.jpg",
          "top2.jpg",
          "top3.jpg",
          "top4.jpg",
        ],
        img1:"top1.jpg"
      }
    }
  }
</script>

<style lang="less" >
  #benner{
    width: 800px;
    margin: auto;
  }
 .el-carousel__item {
    img {
      width: 100%;
      height: 100%;
    }
  }
  ul>li.is-active{
    .el-carousel__button{
      height: 8px;
      background-color: rgb(252, 174, 73);  
    }
  }
</style>