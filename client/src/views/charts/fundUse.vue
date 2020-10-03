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
        genData() {

            var fundData = localStorage.getItem('fundData');
            fundData = JSON.parse(fundData)
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
            fundData.forEach(e=>{
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
        }
    },

    data() {
        return {
        }
    },
    
    mounted(){
        let data = this.genData();
        // 图表参数
        var option1 = {
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
        var option2 = {
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