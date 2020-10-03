<template>
  <div class="fundFlow">
    
  </div>
</template>

<script>
import echarts from 'echarts'    

export default {
  mounted(){
    let data = this.getData();
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
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
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
  },

  methods:{
    getData(){
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
    }  
  }
}
</script>

<style>
  .fundFlow{
    height: 100%;
  }
</style>