<template>
  <div>
    <div id="about">
      <h1>用户信息</h1>
      <div id="avatar"></div>
      <h3>{{username}}</h3>
      <p>邮箱：{{email}}</p>  
    </div>
  </div>
</template>

<script type="text/javascript">
  var username = localStorage.getItem('username')
  var email = localStorage.getItem('useremail')
export default {
  data(){
    return {
      username,
      email
    }
  }
}
</script>

<style lang='less'>
  #about{
    h1{
      margin-top: 50px;
    }
    #avatar{
      margin: auto;
      margin-top: 50px;
      width: 150px;
      height: 150px;
      border: 3px rgb(252, 174, 73) solid;
      border-radius: 50%;
      background-image: url('../assets/picture/avatar.jpg');
      background-size: cover;
    }
    h3{
      padding: 30px;     
    }
  }
</style>