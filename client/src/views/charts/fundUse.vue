<template>
  <div class="fundUse">
      <div class="spending"></div>
      <div class="income"></div>
  </div>
</template>

<script>
import echarts from 'echarts'    

export default {
    methods:{
        // 获取资金列表数据
        getFundData(){
            return this.$axios
            .get('/api/fund')
            .then( res =>{                          
                
                // 筛选资金余额
                res.data.forEach((e,index,arr)=>{
                if (e.type=='资金余额') {
                    // 保存资金余额数据与缓存
                    this.balance = e.balance    
                    localStorage.setItem('balance',e.balance)  
                    arr.splice(index,1)          
                } 
                })
                // 保存资金列表数据与缓存
                this.fundData = res.data
                localStorage.setItem('fundData',JSON.stringify(res.data))  

                // 计算图表参数
                return this.getData()

            }) 
            .then(data=>{
                this.chartData(data)
            })                     
            .catch( err =>{
                console.log(err)
            })
        },

        // 计算图表参数
        getData() {
            
            var spendingData = [
                {value: 0, name: '转账'},
                {value: 0, name: '提现'},
                {value: 0, name: '充值'},
                {value: 0, name: '报销'}
            ]
            var incomeData = [
                {value: 0, name: '转账'},
                {value: 0, name: '提现'},
                {value: 0, name: '充值'},
                {value: 0, name: '报销'}
            ]
            
            // 遍历资金列表
            this.fundData.forEach(e=>{
                // 找到对应数据下标
                let Index = spendingData.findIndex(v=>v.name == e.type)
                
                // 计算花费金额
                spendingData[Index].value += e.spending

                // 计算收入金额
                incomeData[Index].value += e.income
            })
            
            return {
                spendingData,
                incomeData
            }
        },
        
        // 图表参数设置与图表初始化
        chartData(data){
            // 图表参数
            let option1 = {
                title: {
                    text: '资金支出统计',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: '10%',
                    top: '10%',
                    data: ['转账', '提现', '充值', '报销']
                },
                series: [
                    {
                        name: '支出金额',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: data.spendingData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            let option2 = {
                title: {
                    text: '资金收入统计',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: '10%',
                    top: '10%',
                    data: ['转账', '提现', '充值', '报销']
                },
                series: [
                    {
                        name: '收入金额',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: data.incomeData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 初始化与设置图表
            var myChart1 = echarts.init(document.getElementsByClassName('spending')[0]);
            myChart1.setOption(option1);
            var myChart2 = echarts.init(document.getElementsByClassName('income')[0]);
            myChart2.setOption(option2);
            // 图表自适应
            window.onresize = function(){
                myChart1.resize();
                myChart2.resize();
            }
        }
    },

    data() {
        return {
            fundData: []
        }
    },

    mounted(){

        let fundData = localStorage.getItem('fundData');

        if(fundData){
            // 有缓存
            this.fundData = JSON.parse(fundData)
            // 计算图表参数
            let data = this.getData()
            this.chartData(data)
        }else{    
            // 无缓存时获取资金列表数据       
            this.getFundData()      
        }
    }

}
</script>

<style lang='less'>
    .fundUse{
        height: 100%;
        display: flex;
        .spending{
            flex: 1;
        }
        .income{
            flex: 1;
        }
    }
</style>