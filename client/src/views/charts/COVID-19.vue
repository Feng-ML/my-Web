<template>
    <div class="COVID-19">
        <div class="bigTitle" @click="toHome">全国疫情情况</div>
        
        <div class="column">

            <dv-border-box-10 class="module">
                <div id="module1"></div>
            </dv-border-box-10>

            <dv-border-box-11 title='疫情情况' class="module">
                <div id="module2" @mousewheel="onScoll">
                    <div class="list-title"><div class="gray">地区</div><div class="yellow">现有</div><div class="red">累计</div><div class="green">治愈</div><div class="gray">死亡</div></div>
                    <div class="list">
                        <div v-for="(item,index) in provinceData" :key="index" class="list-item">
                            <div>{{item.name}}</div><div>{{item.total.nowConfirm}}</div><div>{{item.total.confirm}}</div><div>{{item.total.heal}}</div><div>{{item.total.dead}}</div>
                        </div>
                    </div>
                </div>
            </dv-border-box-11>
        </div>




        <div class="middle">
            <dv-border-box-1 class="top">
                <div class="top-item">
                    <div class="title">累计确诊</div><div class="num red">{{chinaTotal.confirm.toLocaleString()}}</div><div class="add">较上日<p class="red">+{{chinaAdd.confirm}}</p></div>
                </div>
                <div class="top-item">
                    <div class="title">累计治愈</div><div class="num green">{{chinaTotal.heal.toLocaleString()}}</div><div class="add">较上日<p class="green">+{{chinaAdd.heal}}</p></div>
                </div>
                <div class="top-item">
                    <div class="title">累计死亡</div><div class="num gray">{{chinaTotal.dead.toLocaleString()}}</div><div class="add">较上日<p class="gray">+{{chinaAdd.dead}}</p></div>
                </div>
                <div class="top-item">
                    <div class="title">境外输入</div><div class="num yellow">{{chinaTotal.importedCase.toLocaleString()}}</div><div class="add">较上日<p class="yellow">+{{chinaAdd.importedCase}}</p></div>
                </div>
            </dv-border-box-1>
            <div class="earth">
                <img src="../../assets/picture/charts/lbx.png" class="line">
                <img src="../../assets/picture/charts/jt.png" class="line2">
            </div>
            <div id="map"></div>
        </div>




        <div class="column">
            <div class="date">最后更新时间：{{chinaData.lastUpdateTime}}</div>
            <dv-border-box-10 class="module right">
                <div id="module3"></div>
            </dv-border-box-10>
            <dv-border-box-10 class="module right">
                <div id="module4"></div>
            </dv-border-box-10>
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
            // 所有数据
            chinaData:{},
            // 近60天历史数据
            historyData: {},
            // 国内累计
            chinaTotal: {
                "confirm": 0,
                "heal": 0,
                "dead": 0,
                "importedCase": 0,
            },
            // 省份信息
            provinceData: [],
            // 国内新增
            chinaAdd:{},
            // 省份新增
            addList:[],

            scrollTimer: null,
            scrollTimeout: null
        }
    },
    async mounted(){
        await this.getChinaData()
        await this.getHistory()

        this.mapChart()
        this.module1()
        this.module2()
        this.module3()
        this.module4()

        // 大小自适应
        window.onresize = ()=>{
            let myChart = echarts.getInstanceByDom(document.getElementById('map'))
            myChart.resize()
        }
    },
    beforeDestroy(){
        clearInterval(this.scrollTimer)
        clearTimeout(this.scrollTimeout)
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
                    this.provinceData = this.chinaData.areaTree[0].children
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
            let list = this.provinceData
            let totalList = [],
                addList = [];

            list.map(item=>{
                totalList.push({
                    name: item.name,
                    value: [item.total.confirm,item.total.heal,item.total.dead]
                })

                // 保存新增省份信息
                if (item.today.confirm!=0 || item.today.wzz_add!=0) {
                    addList.push(item)
                }
            })

            this.addList = addList
            
            // 地图数据
            var chartData = {
                // 标题
                // title: {
                //     text: '全国疫情情况',
                //     x: 'center',
                //     textStyle: {
                //         color: '#fff',
                //         fontSize: 35
                //     },
                //     top: 10
                // },
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
                    text: '国内历史新增',
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
        },

        module2(){
            let content = document.querySelector(".list")

            let num = content.scrollTop
            this.scrollTimer = setInterval(() => {
                
                // 滚到底部切回顶部
                if(num >= content.scrollHeight) {
                    num = -content.offsetHeight
                    content.scrollTop = 0;
                }else{
                    // 否则一直滚动
                    num++
                    content.scrollTop = num;
                }

            },30);
        },
        // 滚轮监听
        onScoll(){
            // 停止滚动
            if (this.scrollTimer) {
                clearInterval(this.scrollTimer)
                this.scrollTimer = null
            }

            // 防抖
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout) 
            }
            // 重新滚动
            this.scrollTimeout = setTimeout(this.module2,2500)

        },

        module3(){
            let list = this.addList,
                x = [],
                confirm = [],
                wzz_add = [];

            list.map(item=>{
                // x轴
                x.push(item.name)
                // 新增确诊
                confirm.push(item.today.confirm)
                // 新增无症状
                wzz_add.push(item.today.wzz_add)
            })

            let option = {
                title: {
                    text: '昨日新增',
                    textStyle:{
                        color: '#fff'
                    }
                },
                textStyle:{
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['新增确诊', '新增无症状'],
                    right: '20',
                    textStyle:{
                        color: '#fff'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: x,
                    axisLine:{
                        lineStyle:{
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine:{
                        show: false
                    },
                    axisLine:{
                        lineStyle:{
                            color: '#fff'
                        }
                    }
                },
                series: [
                    {
                        name: '新增确诊',
                        type: 'bar',
                        stack: '总量',
                        data: confirm
                    },
                    {
                        name: '新增无症状',
                        type: 'bar',
                        stack: '总量',
                        data: wzz_add
                    }
                ]
            };

            // 地图初始化渲染
            var myChart = echarts.init(document.getElementById('module3'));
            myChart.setOption(option)
        },

        module4(){
            let list = this.historyData.chinaDayList,
                x = [],
                nowConfirm = [],
                nowSevere = [];

            list.map(item=>{
                x.push(item.date)
                nowConfirm.push(item.nowConfirm)
                nowSevere.push(item.nowSevere)
            })

            let option = {
                title: {
                    text: '现有确诊趋势',
                    textStyle:{
                        color: '#fff'
                    }
                },
                textStyle:{
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['现有确诊', '现有重症'],
                    right: '20',
                    textStyle:{
                        color: '#fff'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: x,
                    axisLine:{
                        lineStyle:{
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine:{
                        show: false
                    },
                    axisLine:{
                        lineStyle:{
                            color: '#fff'
                        }
                    }
                },
                series: [
                    {
                        name: '现有确诊',
                        type: 'line',
                        // stack: '总量',
                        data: nowConfirm
                    },
                    {
                        name: '现有重症',
                        type: 'line',
                        // stack: '总量',
                        data: nowSevere
                    }
                ]
            };

            let content = document.getElementById("module4")
            // 地图初始化渲染
            var myChart = echarts.init(content);
            myChart.setOption(option)

        },

        toHome(){
            this.$router.push({
                path: '/'
            })
        }
    },

}
</script>

<style lang='less'>
.COVID-19{
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: url('../../assets/picture/charts/bg.png') no-repeat center/100% 100%;
    display: flex;
    align-items: flex-end;

    .bigTitle{
        position: absolute;
        top: 0;
        line-height: 60px;
        text-align: center;
        width: 100%;
        color: white;
        font-size: 35px;
        font-weight: bold;
        letter-spacing: 20px;
    }
    .column{
        width: 25%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .date{
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
        }
    }
    .middle{
        width: 50%;
        height: 90%;
        padding-top: 100px;

        .top{
            width: 90%;
            height: 150px;
            margin: auto;
        }
        .border-box-content{
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
            top: 25%;
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
            width: 65%;
            height: 65%;
            position: absolute;
            top: 25%;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
    }

    .module{
        width: 90%;
        height: 350px;
        overflow: hidden;
        margin-left: 10%;

        #module1,#module2,#module3,#module4{
            width: 80%;
            height: 80%;
            margin: auto;
            margin-top: 10%;
            // color: #fff;
        }

        #module2{
            height: 70%;
            width: 85%;
            // text-align: center;
            margin-top: 20%;

            .list{
                height: 80%;
                overflow: auto;
                &::-webkit-scrollbar {
                    width: 0;
                }
            }
            .list-title{
                display: flex;
                margin-bottom: 5px;
                color: white;
                div{
                    flex: 1;
                }
            }
            .list-item{
                display: flex;
                color: white;
                margin-bottom: 5px;
                div{
                    flex: 1;
                }
            }
        }

        
    }

    .right{
        margin-left: 0;
        margin-right: 10%;
    }

    .red{
        color: red;
    }
    .green{
        color: #98e74a;
    }
    .gray{
        color: #949ca3;
    }
    .yellow{
        color: #ffeaa6;
    }

}
    
</style>