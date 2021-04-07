<template>
<div class="fundCharts">
  <div class="fundFlow"></div>

  <div class="fundUse">
      <div class="spending"></div>
      <div class="income"></div>
  </div>

</div>
</template>

<script>
import echarts from 'echarts'    

export default {
  mounted(){
    let data = this.getData1();
    var colors = ['#5793f3', '#d14a61', '#675bba'];
    // 图表数据
    var option = {
        color: colors,

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '20%',
            top: '10%'
        },
        legend: {
            top: '5%',
            data: ['收入', '支出', '资金余额']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: data.xAxisData
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '收入',
                min: 0,
                max: 2000000,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '支出',
                min: 0,
                max: 2000000,
                position: 'right',
                offset: 80,
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '资金余额',
                min: 0,
                max: Math.max.apply(null,data.balanceData),
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '收入',
                type: 'bar',
                data: data.incomeData
            },
            {
                name: '支出',
                type: 'bar',
                yAxisIndex: 1,
                data: data.spendingData
            },
            {
                name: '资金余额',
                type: 'line',
                yAxisIndex: 2,
                data: data.balanceData
            }
        ]
    };
    // 初始化与设置图表
    var Chart = echarts.init(document.getElementsByClassName('fundFlow')[0]);
    Chart.setOption(option);
    // 图表自适应
    window.onresize = function(){
        Chart.resize();
    }


    //扇形图
    let fundData = localStorage.getItem('fundData');

    if(fundData){
        // 有缓存
        this.fundData = JSON.parse(fundData)
        // 计算图表参数
        let data = this.getData2()
        this.chartData(data)
    }else{    
        // 无缓存时获取资金列表数据       
        this.getFundData()      
    }
  },

  methods:{
    getData1(){
        // 获取资金列表
        let fundData = localStorage.getItem('fundData');
        fundData = JSON.parse(fundData)

        // 初始化图表数据
        let allData = []
        let xAxisData = []
        let balanceData = []
        let incomeData = []
        let spendingData = []

        // 设置图表总数据
        fundData.forEach(e=>{
            
            // 设置时间
            let year = e.date.split('-')[0].slice(2,4)
            let mon = e.date.split('-')[1]
            let date = year + '年' + mon + '月'

            // 是否存在该月份数据
            let Index = allData.findIndex(v=>v.date==date)
            if(Index == -1){   //不存在
                let obj = {
                    date,
                    income: e.income,
                    spending: e.spending
                };
                allData.push(obj)

            }else{      //存在
                allData[Index].income += e.income
                allData[Index].spending += e.spending
            }

        })

        // 图表总数据按时间排序
        allData.sort((x,y)=>{
            return x['date'].localeCompare(y['date'])
        })

        // 设置各坐标数据
        let len = allData.length;
        for (let i = 0; i < len; i++) {
            // 拆分总数据
            xAxisData.push(allData[i].date)
            incomeData.push(allData[i].income)
            spendingData.push(allData[i].spending)

            // 计算余额数据
            if (i==0) {
                balanceData.push(10000000 + allData[i].income - allData[i].spending)
            }else{
                balanceData.push(balanceData[i-1] + allData[i].income - allData[i].spending)
            }
        }
    
        return {
            xAxisData,
            balanceData,
            incomeData,
            spendingData,
        }
    },
    
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
    getData2() {
        
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
  }
}
</script>

<style lang='less'>

.fundCharts{
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
    .fundFlow{
        height: 100%;
        width: 65%;
    }

    .fundUse{
        height: 100%;
        width: 35%;
        display: flex;
        flex-direction: column;
        .spending{
            flex: 1;
        }
        .income{
            flex: 1;
        }
    }
</style>