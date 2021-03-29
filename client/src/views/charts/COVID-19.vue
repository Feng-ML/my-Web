<template>
    <div class="COVID-19">
        
        <div class="column">
            <div class="module">
                <div id="module1"></div>
            </div>
            <div class="module">
                <div id="module2"></div>
            </div>
        </div>




        <div class="middle">
            <div class="top">
                <div class="top-item">
                    <div class="title">累计确诊</div><div class="num" style="color:red;">{{chinaTotal.confirm.toLocaleString()}}</div><div class="add">较上日<p style="color:red;">+{{chinaAdd.confirm}}</p></div>
                </div>
                <div class="top-item">
                    <div class="title">累计治愈</div><div class="num" style="color:#98e74a;">{{chinaTotal.heal.toLocaleString()}}</div><div class="add">较上日<p style="color:#98e74a;">+{{chinaAdd.heal}}</p></div>
                </div>
                <div class="top-item">
                    <div class="title">累计死亡</div><div class="num" style="color:#949ca3;">{{chinaTotal.dead.toLocaleString()}}</div><div class="add">较上日<p style="color:#949ca3;">+{{chinaAdd.dead}}</p></div>
                </div>
                <div class="top-item">
                    <div class="title">境外输入</div><div class="num" style="color:#ffeaa6;">{{chinaTotal.importedCase.toLocaleString()}}</div><div class="add">较上日<p style="color:#ffeaa6;">+{{chinaAdd.importedCase}}</p></div>
                </div>
            </div>
            <div class="earth">
                <img src="../../assets/picture/charts/lbx.png" class="line">
                <img src="../../assets/picture/charts/jt.png" class="line2">
            </div>
            <div id="map"></div>
        </div>




        <div class="column">

        </div>


    </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import geoCoordMap from "./chinaMapData.json";  // 中国各地坐标

export default {

    data(){
        return {
            chinaData:{},
            historyData: {},
            chinaTotal: {},
            chinaAdd:{}
        }
    },
    async mounted(){
        await this.getChinaData()
        await this.getHistory()

        this.mapChart()
        this.module1()

        // 大小自适应
        window.onresize = ()=>{
            let myChart = echarts.getInstanceByDom(document.getElementById('map'))
            myChart.resize()
        }
    },
    methods:{
        // 获取国内数据
        getChinaData(){
            return this.$axios({
                url: '/qq/g2/getOnsInfo?name=disease_h5'
            }).then(res=>{
                if (res.data.ret==0) {

                    this.chinaData = JSON.parse(res.data.data) 
                    this.chinaTotal = this.chinaData.chinaTotal
                    this.chinaAdd = this.chinaData.chinaAdd
                    console.log(this.chinaData);

                }
            })

        },
        //地图散点计算
        convertData(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                //对应位置
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        },
        // 历史新增
        getHistory(){
            return this.$axios({
                url: '/qq/g2/getOnsInfo?name=disease_other'
            }).then(res=>{
                if (res.data.ret==0) {
                    this.historyData = JSON.parse(res.data.data) 
                    console.log(this.historyData);
                }
            })
        },

        // 地图chart数据处理
        mapChart(){
            let list = this.chinaData.areaTree[0].children
            let totalList = []

            list.map(item=>{
                totalList.push({
                    name: item.name,
                    value: [item.total.confirm,item.total.heal,item.total.dead]
                })
            })
            
            // 地图数据
            var chartData = {
                // 标题
                title: {
                    text: '全国疫情情况',
                    x: 'center',
                    textStyle: {
                        color: '#fff'
                    },
                    top: 85
                },
                // 散点弹窗
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : <br/>确诊：' + params.value[2]+ '<br/>治愈：' + params.value[3]+ '<br/>死亡：' + params.value[4];
                    },
                    padding: 20
                },
                // 地图
                geo: {
                    map: 'china',
                    // x: 160,
                    // y: 100,
                    itemStyle: {
                        areaColor: '#0c356c',
                        borderColor: '#527198',
                        // shadowColor: 'rgb(25,48,104)',
                        // shadowOffsetY: '2',
                        borderWidth: 1,
                        opacity: 0.8
                    },
                    //高亮区域
                    emphasis: {
                        itemStyle: {
                            areaColor: '#2a9ef1',
                        },
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    // 区域名字
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: 16
                    },
                    //长宽比
                    // aspectScale: 1,
                    //放大倍数
                    zoom: 1.2
                },
                // 散点图
                series: [{
                    // name: '全部',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: this.convertData(totalList),
                    // 散点大小
                    symbolSize: function (val) {
                        let value = val[2] / 70
                        if (value>40) value=40
                        return value;
                    },
                    // symbolSize: 15,
                    // 高亮样式
                    emphasis: {
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    // 波纹
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    // 散点样式
                    // itemStyle:{
                    //     opacity: 0.8,
                    //     shadowBlur:{
                    //         shadowColor: 'rgba(0, 0, 0, 0.5)',
                    //         shadowBlur: 10      
                    //     }
                    // },
                    color:'#f4e925'
                }]
            }


            // 地图初始化渲染
            var myChart = echarts.init(document.getElementById('map'));
            myChart.setOption(chartData)
        },

        module1(){
            let list = this.historyData.chinaDayAddList,
                confirm = [],
                dead = [],
                heal = [],
                date = [];

            list.map(item=>{
                confirm.push(item.confirm)
                dead.push(item.dead)
                heal.push(item.heal)
                date.push(item.date)
            })


            let option = {
                title: {
                    text: '国内新增案例',
                    textStyle:{
                        color: '#fff'
                    }
                },
                textStyle:{
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        // label: {
                        //     backgroundColor: '#6a7985'
                        // }
                    }
                },
                legend: {
                    data: ['确诊', '治愈', '死亡'],
                    right: '20',
                    textStyle:{
                        color: '#fff'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date
                },
                yAxis:{
                    type: 'value',
                    splitLine:{
                        show: false
                    }
                },
                series: [
                    {
                        name: '确诊',
                        type: 'line',
                        areaStyle: {
                            color: 'red'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: confirm
                    },
                    {
                        name: '治愈',
                        type: 'line',
                        areaStyle: {
                            color: '#98e74a'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: heal
                    },
                    {
                        name: '死亡',
                        type: 'line',
                        areaStyle: {
                            color: 'black'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: dead
                    }
                ]
            };

            // 地图初始化渲染
            var myChart = echarts.init(document.getElementById('module1'));
            myChart.setOption(option)
        }
    }
}
</script>

<style lang='less'>
.COVID-19{
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: url('../../assets/picture/charts/bg.png') no-repeat center;
    display: flex;

    .column{
        width: 25%;
        padding-top: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .middle{
        width: 50%;
        padding-top: 80px;

        .top{
            width: 90%;
            height: 100px;
            margin: auto;
            background: url('../../assets/picture/charts/center02.png') no-repeat;
            background-size: 100% 100%;
            display: flex;

            .top-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .title{
                    color: white;
                    font-size: 20px;
                    margin-bottom: 5px;
                }

                .num{
                    font-weight: bold;
                    font-family:"Times New Roman",Georgia,Serif;
                    font-size: 18px;
                }
                .add{
                    margin-top: 5px;
                    color: #cccbcb;
                    font-size: 12px;
                    
                    p{
                        display: inline;
                        margin-left: 5px;
                        font-family:"Times New Roman",Georgia,Serif;
                    }
                }
            }
        }

        .earth{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            background: url('../../assets/picture/charts/map.png');
            background-size: 100% 100%;
            width: 400px;
            height: 400px;

            .line{
                position: absolute;
                width: 120%;
                height: 120%;
                left: -10%;
                top: -10%;

                animation: rotate 15s linear infinite;
            }
            .line2{
                position: absolute;
                width: 110%;
                height: 110%;
                left: -5%;
                top: -5%;
                animation: rotate 15s linear infinite reverse;
            }
        }

        #map{
            width: 50%;
            height: 50%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
    }

    .module{
        width: 90%;
        height: 400px;
        background: url('../../assets/picture/charts/dataBg.png') no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        margin-left: 10%;

        #module1{
            width: 80%;
            height: 80%;
            margin: auto;
            margin-top: 10%;
            // color: #fff;
        }
    }

}
    
</style>