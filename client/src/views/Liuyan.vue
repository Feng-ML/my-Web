<template>
    <div>
      <h1>留言</h1>

      <!-- 留言列表 -->
      <div id="liuyans">
        <ul>
          <li v-for="(item,index) in liuyans.slice((currentPage-1)*PageSize,currentPage*PageSize)" :key='index' >
            <el-tag :type='typeColor(item.type)'>{{item.type}}</el-tag>
            <h3>作者：{{item.name}}</h3>
            <p>{{item.textarea}}</p>
            <span>{{item. currentdate}}</span>
          </li>
        </ul>
      </div>

      <!-- 页数条 -->
      <el-pagination
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="currentPage" 
        :page-sizes="pageSizes" 
        :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
        :total="totalCount">
      </el-pagination>

      <!-- 留言表单 -->
      <div id="liuyanForm" :model="liuyanForm" ref="liuyanForm">

        <span>类型：</span>
        <el-select 
          v-model="liuyanForm.type" 
          slot="prepend" 
          placeholder="请选择"
          size='mini'
          >
          <el-option label="吐槽" value="吐槽"></el-option>
          <el-option label="建议" value="建议"></el-option>
          <el-option label="bug" value="bug"></el-option>
        </el-select><br/>

        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="liuyanForm.textarea"
          >
        </el-input><br/>

        <el-button type="primary" @click="getNowDate(),submitForm('liuyanForm')">提交</el-button>

      </div>

    </div>
</template>

<script>

  var username = localStorage.getItem('username')
  var useremail = localStorage.getItem('useremail')

  export default {
    data() {
      return {
        liuyanForm: {
          name: '',
          email: '',
          type: '',
          textarea: '',
          currentdate: ''
        },
        // 总数据
        liuyans:[],
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 1,
        // 个数选择器（可修改）
        pageSizes:[5,10,15],
        // 默认每页显示的条数（可修改）
        PageSize:5,
      }
    },
    methods:{

      // 获取当前时间
      getNowDate() {
        var date = new Date();
        var year = date.getFullYear();      //年
        var month = date.getMonth() + 1;    //月
        var strDate = date.getDate();       //日
        var hh = date.getHours();            //时
        var mm = date.getMinutes();          //分
        var ss = date.getSeconds();          //秒
        if (month <= 9) month = "0" + month;       
        if (strDate <= 9) strDate = "0" + strDate;
        if (hh <= 9) hh = "0" + hh;
        if (mm <= 9) mm = "0" + mm;
        if (ss <= 9) ss = "0" + ss;
        var currentdate = year + "-" + month + "-" + strDate + " "  + hh + ":" + mm + ":" + ss;
        return this.liuyanForm.currentdate = currentdate;
      },

      //提交数据
      submitForm(formName) {

        if (!username) {
          return this.$message.error('请登录后再填写！！');         
        }else{
          
          if (this.liuyanForm.type && this.liuyanForm.textarea) {

            this.liuyanForm.name = username
            this.liuyanForm.email = useremail

            this.$axios
                  .post('/api/liuyan',this.liuyanForm)
                  .then( res =>{
                        
                      this.$message({
                          message: '提交成功！！',
                          type: 'success' 
                      })
                      // console.log(res)
                      
                      location.reload()

                  })                       
                  .catch( err =>{
                      console.log(err)
                  })
          } else {
            return this.$message.error('请填写完整！！');
          }
        }
      },

      // 获取留言
      getLiuyan(){
        this.$axios
          .get('/api/liuyan')
          .then( res =>{                          
            
            // console.log(res.data)
            this.liuyans = res.data
            this.totalCount = this.liuyans.length
                
          })                       
          .catch( err =>{
              console.log(err)
          })
      },
      

      // 类型背景颜色
      typeColor(type){
        switch (type) {
          case '吐槽':
            return 'success'
            break;
        
          case '建议':
            return 'warning'
            break;

          case 'bug':
            return 'danger'
            break;
        }
      },

      // 每页显示的条数
      handleSizeChange(val) {
           // 改变每页显示的条数 
           this.PageSize=val
           // 注意：在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage=1
      },

      // 显示第几页
      handleCurrentChange(val) {
           // 改变默认的页数
           this.currentPage=val
      },
      
      
    },

    created:function(){
          this.getLiuyan() 
    }

  }


</script>

<style lang="less" type="text/javascript">

  #liuyans{
    li{
      display: block;
      width: 50%;
      padding: 30px;
      margin: 30px auto;
      background-color: rgba(196, 202, 218, 0.6);
      border-radius: 30px;
      .el-tag{
        float: left;
      }
      p{
        padding: 15px 70px 0 70px;
      }
      span{
        float: right;
        font-size: 5px;
      }
    }
  }

  #liuyanForm{
    position: relative;
    background: url('../assets/picture/liuyan.jpg') no-repeat;
    background-size:  100% 100%;
    width: 35%;
    height: 300px;
    margin: auto;
    margin-top: 50px;
    .el-input{
      width: 50%;
      margin-top: 60px;
    }
    .el-textarea{
      width: 50%;
    }
    .el-select .el-input{
      width: 90px;
    }
    .el-button{
      position: relative;
      bottom: -45px;
    }
  }

</style>