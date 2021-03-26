<template>
    <div class="COVID-19">
        <div class="column">

        </div>

        <div class="column">
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

        }
    },
    mounted(){
        this.getChinaData()

        // 大小自适应
        window.onresize = ()=>{
            let myChart = echarts.getInstanceByDom(document.getElementById('map'))
            myChart.resize()
        }
    },
    methods:{
        getChinaData(){
            this.$axios({
                url: '/qq/g2/getOnsInfo?name=disease_h5'
            }).then(res=>{
                if (res.data.ret==0) {

                    let Data = JSON.parse(res.data.data) 

                    let list = Data.areaTree[0].children
                    let totalList = []

                    list.map(item=>{
                        totalList.push({
                            name: item.name,
                            value: item.total.confirm
                        })
                    })
                    console.log(Data);
                    console.log(totalList);
                    
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
                                return params.name + ' : <br/>施工：' + params.value[2]+ '<br/>设计：' + params.value[3]+ '<br/>监理：' + params.value[4];
                            },
                            padding: 20
                        },
                        // 图例范围
                        // visualMap: {
                        //     min: 0,
                        //     max: 3000,
                        //     calculable: true,   //是否可拉动
                        //     left: 35,
                        //     bottom: 20,
                        //     inRange: {
                        //         color: ['#50a3ba', '#eac736', '#d94e5d']
                        //     },
                        //     textStyle: {
                        //         color: '#fff'
                        //     }
                        // },
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
                            //选择特定高亮区域
                            // regions: [{ 
                            //     name: Data[0].name,
                            //     selected: true,
                            // }],
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
                            itemStyle:{
                                opacity: 0.8,
                                shadowBlur:{
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    shadowBlur: 10      
                                }
                            },
                            color:'#f4e925'
                        }]
                    }


                    // 地图初始化渲染
                    var myChart = echarts.init(document.getElementById('map'));
                    myChart.setOption(chartData)
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
    background: url('../../assets/picture/charts/bg.png') 100% 100%;
    display: flex;

    .column{
        flex: 1;
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
        width: 60%;
        height: 60%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>