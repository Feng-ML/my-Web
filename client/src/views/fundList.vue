<template>
  <div class="fundList">

    <!-- 添加数据 -->
    <dialogfund @update='getFund' :dialog='dialog' :formData='formData'></dialogfund>

    <!-- 筛选框 -->
    <el-date-picker
      v-model="dateScope"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" @click="screening()">筛选</el-button>

    <!-- 添加按钮 -->
    <el-button 
        class="add"
        type="primary" 
        @click="addFund()"
    >添加</el-button>

    <!-- 表格内容 -->
    <el-table
      :data="fundData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        label="序号"
        width='50'
        type='index'
      >
      </el-table-column>

      <el-table-column
        prop="date"
        label="日期"
        sortable
        width='120'
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="type"
        label="类型"
        width='70'
      >
      </el-table-column>

      <el-table-column
        prop="details"
        label="详情"
      >
      </el-table-column>

      <el-table-column
        prop="income"
        label="收入"
        sortable
      >
        <template slot-scope="scope">
          <span class="income">+{{ scope.row.income }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="spending"
        label="支出"
        sortable
      >
        <template slot-scope="scope">
          <span class="spending">-{{ scope.row.spending }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="person"
        label="操作员"
        width='80'
      >
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width='145'
      >

        <!-- 数据操作 -->
        <template slot-scope="scope">
          <el-button @click="onEditMoney(scope.row)" type="warning" size="mini">编辑</el-button>
          <el-button @click="onDeleteMoney(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 页数条 -->
    <el-pagination
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="currentPage" 
      :page-sizes="pageSizes" 
      :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
      :total="totalCount">
    </el-pagination>

  </div>
</template>


<script type="text/javascript">
  import dialogfund from '../components/dialogfund.vue'
  import moment from 'moment'


  var person = localStorage.getItem('username')

  export default {
    

    data() {
      return {
        fundData: [],
        balance: 0,

        dialog: {
          title: '',
          show: false,
          option: ''
        },
        //时间范围
        dateScope: [],

        formData: {
          date: '',
          type: '',
          details: '',
          income: '',
          spending: '',
          balance: '',
          person
        },

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

    components:{
      dialogfund
    },

    created(){
      // 无缓存时获取数据
      if(!localStorage.getItem('fundData')){
          this.getFund()
      }else{
        // 有缓存
        let fundData = localStorage.getItem('fundData');
        this.fundData = JSON.parse(fundData)
      }

      // 总条数
      this.totalCount = this.fundData.length
    },

    methods: {

      // 获取数据
      getFund(){
        this.$axios
          .get('/api/fund')
          .then( res =>{                          
            
            // 筛选资金余额
            res.data.forEach((e,index,arr)=>{
              if (e.type=='资金余额') {
                // 保存数据与缓存
                this.balance = e.balance    
                localStorage.setItem('balance',e.balance)  
                arr.splice(index,1)          
              } 
            })

            this.fundData = res.data

            localStorage.setItem('fundData',JSON.stringify(res.data))  
           
          })                       
          .catch( err =>{
              console.log(err)
          })
      },

      // 修改数据
      onEditMoney( data ){
        if (!person) {
          this.$message({
            message: '请登录后操作！！',
            type: 'error' 
          })
        } else {         
          this.dialog.title = '修改资金信息',
          this.dialog.option = 'edit'
          this.dialog.show = true
          this.formData = {
            date: data.date,
            type: data.type,
            details: data.details,
            income: data.income,
            spending: data.spending,
            balance: this.balance,
            person,
            id: data._id
          }
        }
      },

      // 删除数据
      onDeleteMoney( data ){
        if (!person) {
          this.$message({
            message: '请登录后操作！！',
            type: 'error' 
          })
        } else { 
          this.$axios
              .post( '/api/fund/delete' ,
                {
                  id: data._id,
                  balance: this.balance
                }
              )
              .then(res =>{
                this.$message({
                    message: '删除成功！！',
                    type: 'success' 
                })
                this.getFund()
              })
              .catch( err =>{
                console.log(err)
              })
          }
      },

      //添加数据
      addFund(){
          if (!person) {
              this.$message({
              message: '请登录后操作！！',
              type: 'error' 
          })
          } else { 
              this.dialog.show = true
              this.dialog.title = '添加资金信息'
              this.formData = {
                date: '',
                type: '',
                details: '',
                income: '',
                spending: '',
                balance: this.balance,
                person
              }
              this.dialog.option = 'add'
          }
      },

      // 时间筛选
      screening(){
        if(this.dateScope == null || this.dateScope.length == 0){
          this.getFund()
        }else {
          const stime = this.dateScope[0]
          const etime = this.dateScope[1]
          this.fundData = this.fundData.filter( item => {
          let date = new Date(item.date)
            return date>=stime && date<=etime
          })
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
  }
</script>


<style lang="less">
  .fundList{
    height: 100%;
    position: relative;
    padding: 50px 0;
    .add{
      position: relative;
      left:   50px;
    }
    .el-table{
      margin: auto;
      margin-top: 50px;
      width: 60%
    }
    .el-pagination{
      margin-top: 50px;
    }
    .income{
      margin-left: 10px; 
      color:#00d053
    }
    .spending{
      margin-left: 10px; 
      color: rgb(192, 47, 22)
    }
  }
</style>