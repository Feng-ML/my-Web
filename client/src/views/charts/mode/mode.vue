<template>
    <div class="box">
        <div id="title"><p>数字墨斗建店平台</p></div>
        <div class="date">
            <div>{{time}}</div>
        </div>

        <div id="middle">
            <div class="map-top">
                <div>当月营收：{{mapNum.mon}}</div>
                <div>当年累计：{{mapNum.year}}</div>
                <div>在建项目：{{mapNum.project}}</div>
            </div>
            <dv-border-box-10 id="map"></dv-border-box-10>

            <div class="map-right">

                <div class="r-left">
                    <dv-border-box-10 class="Module beijing">
                        <div class="title">北京墨斗</div> 
                        <div class="num">4</div>
                        <div class="logo">
                            <img src="./img/logo/麦当劳.png">
                            <img src="./img/logo/太二酸菜鱼.png">
                            <img src="./img/logo/霸碗.png">
                            <img src="./img/logo/煲仔皇1.png">
                        </div>
                    </dv-border-box-10>
                    <dv-border-box-10 id="zhexian3" class="Module"></dv-border-box-10>
                    <dv-border-box-10 id="zhexian4" class="Module"></dv-border-box-10>
                </div>
                <div class="r-middle">
                    <dv-border-box-10 id="pie2"></dv-border-box-10>
                    <dv-border-box-10 class="logo-roll Module">
                        <div class="title">合作连锁商业品牌</div>
                        <div class="logo" id="logo-content">
                            <div id="logo-box1">
                                <img src="./img/logo/大米先生.jpg">
                                <img src="./img/logo/肯德基.jpg">
                                <img src="./img/logo/蛙来哒.jpg">
                                <img src="./img/logo/鱼你在一起.jpg">
                                <img src="./img/logo/九毛九.jpg">
                                <img src="./img/logo/克徕帝.jpg">
                                <img src="./img/logo/茶颜悦色.jpg">
                                <img src="./img/logo/suki彩妆.jpg">
                                <img src="./img/logo/太二酸菜鱼.png">
                                <img src="./img/logo/荣先森.jpg">
                                <img src="./img/logo/霸碗.png">
                                <img src="./img/logo/麦当劳.png">
                            </div>
                            <div id="logo-box2"></div>
                        </div>
                    </dv-border-box-10>
                </div>
                <div class="r-right">
                    <dv-border-box-10 class="Module">
                        <el-carousel indicator-position='none'>
                        <el-carousel-item v-for="(item,index) in Data.projectImageList" :key="index">
                            <img :src="item.picUrl" width="100%" height="100%">
                            <div class="title">{{item.projectName}}</div>
                        </el-carousel-item>
                        </el-carousel>
                    </dv-border-box-10>
                    <dv-border-box-10 id="pie3"></dv-border-box-10>
                </div>

            </div>
        </div>

        <div id="bottom">
            <dv-border-box-10 id="zhuxing"></dv-border-box-10>
            <dv-border-box-10 id="zhexian2"></dv-border-box-10>
            <dv-border-box-10 class="b-right">
                <div class="logo">
                    <img src="./img/MODE.jpg">
                    <img src="./img/GAOJI.jpg">
                    <img src="./img/MODE2.jpg">
                    <img src="./img/shuzi.jpg">
                </div>
            </dv-border-box-10>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import geoCoordMap from "../chinaMapData.json";  // 中国各地坐标

export default {
    data(){
        return {
            time: '',
            scrollTimer: null,

            Data: {},
            mapNum:{}
        }
    },

    async mounted(){
        await this.getData()
        this.getmapData()
        this.getZhuxing()
        this.getPie()
        this.getZhexian()
        this.sroll()
        this.nowTimes()

        // 大小自适应
        window.onresize = ()=>{
            let myChart = echarts.getInstanceByDom(document.getElementById('map'))
            let module1 = echarts.getInstanceByDom(document.getElementById('zhuxing'))
            let module2 = echarts.getInstanceByDom(document.getElementById('zhexian2'))
            let module3 = echarts.getInstanceByDom(document.getElementById('zhexian3'))
            let module4 = echarts.getInstanceByDom(document.getElementById('zhexian4'))
            let module5 = echarts.getInstanceByDom(document.getElementById('pie2'))
            let module6 = echarts.getInstanceByDom(document.getElementById('pie3'))
            myChart.resize()
            module1.resize()
            module2.resize()
            module3.resize()
            module4.resize()
            module5.resize()
            module6.resize()
        }

        // 字体自适应
        let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        if(clientWidth){
            document.getElementsByTagName('html')[0].style.fontSize = (clientWidth / 1920)*10 + 'px'
        }
    },
    beforeDestroy(){
        clearInterval(this.scrollTimer)
        
    },
    methods:{
        getData(){
            return this.$axios({
                url: 'https://api.modoukj.com/billboard/billBoard/listAll',
                method: 'POST'
            }).then(res=>{
                if (res.data.code==0) {
                    let data = res.data.data
                    console.log(data);
                    this.Data = data
                }
            })
        },

        //地图数据
        getmapData(){
            let mapData = this.Data.areas
            this.mapNum = {
                mon: mapData.monthTurnover,
                year: mapData.annualTurnover,
                project: mapData.onGoingNums,
            }

            let sg = [{
                name: '全州',
                value: 1
            },{
                name: '桂林',
                value: 1
            },{
                name: '南宁',
                value: 1
            },{
                name: '玉林',
                value: 1
            },{
                name: '钦州',
                value: 1
            },{
                name: '防城港',
                value: 1
            },{
                name: '青岛',
                value: 1
            },]
            mapData.areaList.map(item=>{
                sg.push({
                    name: item.name,
                    value: item.nums
                })
            })

            let yj = [{
                name: '北京',
                value: 1
            },{
                name: '长沙',
                value: 1
            }]


            let sj = [{
                name: '北京',
                value: 3
            },{
                name: '福建',
                value: 1
            },{
                name: '福州',
                value: 2
            },{
                name: '广州',
                value: 1
            },{
                name: '湖南',
                value: 1
            },{
                name: '江西',
                value: 2
            },{
                name: '厦门',
                value: 1
            },{
                name: '深圳',
                value: 1
            },{
                name: '苏州',
                value: 1
            },{
                name: '天津',
                value: 6
            },{
                name: '长沙',
                value: 5
            }]


            // 地图数据
            var chartData = {
                // 标题
                title: {
                    text: '服务布局',
                    x: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: this.fontSize(30)
                    },
                    top: 30,
                    // left: 30
                },
                legend: {
                    data: ['施工', '设计', '营建'],
                    right: '50',
                    bottom: '50',
                    orient: 'vertical',
                    textStyle:{
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {  
                        var value = params.value;  
                        return `${params.seriesName}:</br>
                                ${params.name}: ${value[2]}`
                    },
                    padding: 15
                },
                // 地图
                geo: {
                    map: 'china',
                    // x: 160,
                    // y: 100,
                    itemStyle: {
                        areaColor: '#0c356c',
                        borderColor: '#527198',
                        borderWidth: 1,
                        // opacity: 0.9
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
                        fontSize: this.fontSize(16)
                    },
                    //长宽比
                    // aspectScale: 1,
                    //放大倍数
                    // zoom: 1.2
                },
                // 散点图
                series: [
                {
                    name: '设计',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: this.convertData(sj),
                    symbolSize: function(value){
                        return value[2]*10>25?25:value[2]*10
                    },
                    color:'#fdd406'
                },
                {
                    name: '施工',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: this.convertData(sg),
                    symbolSize: function(value){
                        return value[2]*10>25?25:value[2]*10
                    },
                    color:'#c23531'
                },
                {
                    name: '营建',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: this.convertData(yj),
                    symbolSize: function(value){
                        return value[2]*10>25?25:value[2]*10
                    },
                    color:'#68d8fe'
                }]
            }


            // 地图初始化渲染
            var myChart = echarts.init(document.getElementById('map'));
            myChart.setOption(chartData)
            
            
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
        //柱形图
        getZhuxing(){

            let data = this.Data.workerList,
                x = [],
                normal = [],
                manager = [];

            data.map(item=>{
                let key = Object.keys(item)[0]
                x.push(key)
                normal.push(item[key].normal)
                manager.push(item[key].manager)
            })

            let option = {
                title: {
                    text: '众鑫工人统计',
                    top: '10%',
                    left: 20,
                    textStyle: {
                        color: '#fff',
                        fontSize: this.fontSize(22)
                    },
                },
                xAxis: {
                    type: 'category',
                    data: x,
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
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
                            color:'#fff'
                        }
                    } 
                },
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '30%',
                    bottom: '3%',
                    containLabel: true,
                },
                legend: {
                    data: ['项目经理', '工人'],
                    top: 20,
                    textStyle:{
                        color: '#fff',
                        fontSize: this.fontSize(16)
                    }
                },
                color: ['#33b6fa','#fcb339','#fb8852','#f95450'],
                series: [{
                    name: '项目经理',
                    data: manager,
                    type: 'bar',
                    barWidth: '25%'
                },
                {
                    name: '工人',
                    data: normal,
                    type: 'bar',
                    barWidth: '25%'

                }]
            };

            // 地图初始化渲染
            let myChart = echarts.init(document.getElementById('zhuxing'));
            myChart.setOption(option)

        },

        // 饼图
        getPie(){
            // 饼图1数据
            let pie1 = this.Data.ongoingProjectsBrands

            pie1 = pie1.filter(item=>item.brName!='装修')
            pie1.map(item=>{
                item.name = item.brName
                item.value = item.nums
            })

            // 饼图2数据
            let pie2 = this.Data.financialAnalyseList,
                title = [],
                pieData = [];

            for (let i = 0; i < pie2.length; i++) {
                
                //项目标题
                let key = Object.keys(pie2[i])[0]
                title.push(key)

                let dat = []
                pie2[i][key].map(item=>{
                    let value = item.amounts
                    let name = item.itemName
                    dat.push({
                        name,
                        value
                    })
                })

                pieData.push(dat)
            }

            let option1 = {
                // textStyle:{
                //     fontFamily: 'SimSun'
                // },
                title: {
                    text: '在建项目品牌统计',
                    left: 'center',
                    top: 25,
                    textStyle: {
                        color: '#fff',
                        fontSize: this.fontSize(22)
                    },
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    formatter: function (name) {
                        let n = ''
                        option1.series[0].data.map(item=>{
                            if (item.name == name) {
                                n = name+ '：' + item.value
                            }
                        })
                        return n;
                        
                    },
                    bottom: 10,
                    left: 5,
                    right: 5,
                    textStyle:{
                        color: '#fff',
                        fontSize: this.fontSize(16)
                    }
                },
                color: ['#1e67da','#02b7fe','#01eacc','#fdd406','#fb8852','#f95450','#ff91ff','#37a73d','#37a7a1'],
                series: [
                    {
                        type: 'pie',
                        radius: '35%',
                        data: pie1,
                        bottom: 40,
                        label:{            //饼图图形上的文本标签
                            show:true,
                            formatter(v) {
                                    return `${v.name}\n(${v.percent}%)`
                            },
                            textStyle:{
                                fontSize: this.fontSize(16)
                            },
                        }
                    }
                ]
            };

            let option2 = {
                // textStyle:{
                //     fontFamily: 'SimHei'
                // },
                title: [{
                    text: '财务分析',
                    left: 'center',
                    top: 25,
                    textStyle: {
                        color: '#fff',
                        fontSize: this.fontSize(22)
                    },
                },
                {
                    text: title[0],
                    bottom:5,
                    x: 'center',
                    // right:5,
                    textStyle: {
                        fontSize: this.fontSize(22),
                        color: '#fff',
                    },
                }],
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    formatter: function (name) {
                        let n = ''
                        option2.series[0].data.map(item=>{
                            if (item.name == name) {
                                n = name+ '：' + item.value
                            }
                        })
                        return n;
                        
                    },
                    bottom: 40,
                    left: 5,
                    right: 5,
                    textStyle:{
                        color: '#fff',
                        fontSize: this.fontSize(16)
                    }
                },
                color:['#1e67da','#02b7fe','#01eacc','#fdd406','#fb8852','#f95450','#ff91ff','#37a73d','#37a7a1'],
                series: [
                    {
                        type: 'pie',
                        radius: '40%',
                        data: pieData[0],
                        bottom: 60,
                        label:{            //饼图图形上的文本标签
                            show:true,
                            formatter(v) {
                                    // let text = `${v.name}
                                    //             (${v.percent}%)`
                                    return `${v.name}\n(${v.percent}%)`
                                // return text.length < 4 
                                //     ? text 
                                //     : `${text.slice(0,4)}\n${text.slice(4)}`
                            },
                            // formatter:'{b}({d}%)',
                            // alignTo: 'edge',
                            // margin: 5
                            textStyle:{
                                fontSize: this.fontSize(16)
                            },
                        }
                    }
                ]
            };

            // 地图初始化渲染
            let myChart1 = echarts.init(document.getElementById('pie2'));
            let myChart2 = echarts.init(document.getElementById('pie3'));
            myChart1.setOption(option1)            
            myChart2.setOption(option2)            

            let num = 1;
            function swp(){
                option2.title[1].text = title[num]
                option2.series[0].data = pieData[num]
                myChart2.setOption(option2)     
                num = num>1?0:num+1
                setTimeout(()=>{
                    swp()
                },5000)
            }
            setTimeout(()=>{
                swp()
            },5000)
        },

        // 折线图
        getZhexian(){
            // 湖南高吉
            let Gaoji = this.Data.hnGaoji,
                Gaojix = [],
                monthTurnover = [],
                monthProjects = [];

            Gaoji.map(item=>{
                let key = Object.keys(item)[0]
                Gaojix.push(key)
                monthTurnover.push(item[key].monthTurnover/10000)
                monthProjects.push(item[key].monthProjects)
            })

            // 完工项目
            let finish = this.Data.finishedProjectlist,
                finishx = [],
                finishy = [];

            finish.map(item=>{
                let key = Object.keys(item)[0]
                finishx.push(key)
                finishy.push(item[key])
            })

            let option2 = {
                title: {
                    text: '完工项目',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#fff',
                        fontSize: this.fontSize(22)
                    },
                },
                xAxis: {
                    type: 'category',
                    data: finishx,
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
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
                            color:'#fff'
                        }
                    } 
                },
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '20%',
                    bottom: '6%',
                    containLabel: true,
                },
                series: [{
                    data: finishy,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                textStyle:{
                                    color: '#fdd41b'
                                }
                            }
                        }
                    }
                }]
            };

            let option3 = {
                title: {
                    text: '湖南墨斗',
                    left: 10,
                    top: 10,
                    textStyle: {
                        color: '#fff',
                        fontSize: this.fontSize(22)
                    },
                },
                xAxis: {
                    type: 'category',
                    data: ['1', '2', '3', '4'],
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
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
                            color:'#fff'
                        }
                    } 
                },
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    left: '5%',
                    right: '6%',
                    top: '30%',
                    bottom: '6%',
                    containLabel: true,
                },
                legend: {
                    data: ['项目数'],
                    top: 35,
                    textStyle:{
                        color: '#fff',
                        fontSize: this.fontSize(16)
                    }
                },
                series: [{
                    name: '项目数',
                    data: [2, 1, 18, 3],
                    type: 'line'
                }]
            };


            let option4 = {
                title: {
                    text: '湖南高吉',
                    left: 10,
                    top: 10,
                    textStyle: {
                        color: '#fff',
                        fontSize: this.fontSize(22)
                    },
                },
                xAxis: {
                    type: 'category',
                    data: Gaojix,
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    } 
                },
                yAxis: [{
                    type: 'value',
                    splitLine:{
                        show: false
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    } 
                },
                {
                    type: 'value',
                    splitLine:{
                        show: false
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    } 
                }],
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    left: '5%',
                    right: '6%',
                    top: '30%',
                    bottom: '6%',
                    containLabel: true,
                },
                legend: {
                    data: ['营收工程款(万元)', '营建门店数目'],
                    top: 30,
                    textStyle:{
                        color: '#fff',
                        fontSize: this.fontSize(16)
                    }
                },
                series: [{
                    name: '营收工程款(万元)',
                    data: monthTurnover,
                    type: 'line'
                },
                {
                    name: '营建门店数目',
                    data: monthProjects,
                    type: 'bar',
                    yAxisIndex: 1,
                    color: '#34b6f8'
                }]
            };
            // 地图初始化渲染
            let myChart2 = echarts.init(document.getElementById('zhexian2'));
            let myChart3 = echarts.init(document.getElementById('zhexian3'));
            let myChart4 = echarts.init(document.getElementById('zhexian4'));
            myChart2.setOption(option2)            
            myChart3.setOption(option3)            
            myChart4.setOption(option4)            
        },

        //商标滚动
        sroll(){
            
            this.scrollTimer = setInterval(() => {
                // 实时上链滚动效果定时器
                let content = document.getElementById("logo-content")
                let box1 = document.getElementById("logo-box1")
                let box2 = document.getElementById("logo-box2")
                box2.innerHTML = box1.innerHTML
                // console.log(content.scrollWidth);

                // 滚到底部切回顶部
                if(content.scrollLeft >= box1.scrollWidth) {
                    content.scrollLeft = 0;
                }else{
                    // 否则一直滚动
                    content.scrollLeft ++;
                }

            },30);
        },

        //时间显示
        timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
            let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
            let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
            let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
            let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
            
            this.time = `${year}-${month}-${date} 星期${'日一二三四五六'.charAt(new Date().getDay())}
                        ${hh}:${mm}:${ss}`
        },
        nowTimes(){
            // setInterval(this.nowTimes,1000);
            setTimeout(()=>{
                this.timeFormate(new Date());
                this.nowTimes()
            },1000)
            // this.clear()
        },

        // 字体大小自适应
        fontSize(res){
            let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
            if (!clientWidth) return;
            let fontSize = clientWidth / 1920;
            return res*fontSize;
        }
    }
}
</script>

<style lang='less'>
    html{
        font-size: 10px;
    }
    p{
        margin: 0;
    }
    .box{
        // font-family: SimSun;
        position: relative;
        width: 100vw;
        // min-height: 700px;
        // min-width: 1630px;
        height: 100vh;
        overflow: hidden;
        background: url('./img/bg.png') no-repeat;
        background-size: 100% 100%;
        div{
            color: white;
        }
    }

    //大标题
    #title{
        // background-color: skyblue;
        height: 8.5%;
        width: 100%;
        display: flex;
        text-align: center;
        justify-content: center;
        flex-direction: column;
        font-size: 3.5rem;
        letter-spacing: 2rem;
        font-weight: bold;
        color: #fff;

        text-shadow: 1px 1px 2px #2983dd;
    }

    .date{
        position: absolute;
        right: 5rem;
        top: 5rem;
        font-size: 2.5rem;
    }

    // 中间行数据
    #middle{
        // background-color: rosybrown;
        height: 66.5%;
        width: 100%;
        display: flex;
        position: relative;

        // 地图上方数据
        .map-top{
            position: absolute;
            bottom: 30px;
            left: 0;
            width: 15%;
            font-size: 2rem;

            div{
                padding: 1rem;
                margin-left: 30%;
            }
        }

        #map{
            width: 40%;
            height: 96%;
            margin: auto;
        }

        // 地图右侧图表
        .map-right{
            width: 57%;
            height: 95%;
            display: flex;
            justify-content: space-between;
            margin: auto;

            .Module{
                width: 100%;
                height: 30%;
            }

            .r-left,.r-middle,.r-right{
                width: 32%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            #pie2,#pie3{
                height: 66%;
            }

            .title{
                padding: 12px;
                text-align: left;
                padding-bottom: 0;
                font-size: 2.2rem;
                font-weight: bold;
            }
            .logo{
                width: 89%;
                height: 30%;
                display: flex;
                overflow: hidden;
                margin: auto;
                img{
                    margin-right: 5px;
                    height: 100%;
                }
            }
            .beijing{
                text-align: center;
                .logo{
                    justify-content: space-between;
                    img{
                        width: 23%;
                    }
                }

                .num{
                    font-size: 2.5rem;
                    margin-bottom: 10px;
                }
            }
            //滚动logo
            .logo-roll{
                font-weight: bold;
                .logo{
                    margin-top: 15%;
                    height: 4rem;
                }
                #logo-box1{
                    display: flex;
                    width: 93.2rem;
                }
                #logo-box2{
                    display: flex;
                }
            }


            // 滚动图
            .el-carousel{
                position: relative;
                height: 95%;
                width: 95%;
                overflow: hidden;
                margin: auto;
                margin-top: 2%;

                .title{
                    position: absolute;
                    top: 13rem;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 90%;
                }
            }



        }
    }

    // 底部数据
    #bottom{
        // background-color: royalblue;
        height: 25%;
        width: 100%;
        display: flex;
        justify-content: space-around;

        #zhuxing{
            width: 40%;
            height: 90%;
        }

        #zhexian2{
            width: 40%;
            height: 90%;
        }


        .b-right{
            width: 16%;
            height: 90%;
            .logo{
                // background-color: aliceblue;
                width: 60%;
                // height: 70%;
                padding-bottom: 50.5%;
                margin: auto;
                margin-top: 15%;
                position: relative;
                animation: rotate 10s linear infinite;
            }
            img{
                width: 48%;
                display: block;
                position: absolute;
                animation: rotate 10s linear reverse infinite;
                color: #37a7a1;

                &:nth-of-type(1){
                    top: 0;
                    left: 0;
                }
                &:nth-of-type(2){
                    top: 0;
                    right: 0;
                }
                &:nth-of-type(3){
                    bottom: 0;
                    left: 0;
                }
                &:nth-of-type(4){
                    bottom: 0;
                    right: 0;
                }
            }
        }
        
    }

</style>