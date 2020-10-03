<template>
  <div id="dna">
      <div class="one">
        <div class="left"></div>
        <div class="right"></div>
        <div class="line"></div>
      </div>
      <div class="one">
        <div class="left"></div>
        <div class="right"></div>
        <div class="line"></div>
      </div>
      <div class="one">
        <div class="left"></div>
        <div class="right"></div>
        <div class="line"></div>
      </div>
      <div class="one">
        <div class="left"></div>
        <div class="right"></div>
        <div class="line"></div>
      </div>
      <div class="one">
        <div class="left"></div>
        <div class="right"></div>
        <div class="line"></div>
      </div>
      <div class="one">
        <div class="left"></div>
        <div class="right"></div>
        <div class="line"></div>
      </div>
      <span>DNA</span>
  </div>
</template>

<script>
import $ from 'jquery'



export default {
    name: 'dna',
    mounted(){

        //延时效果
        var left = $('.one .left')
        var right = $('.one .right')
        var line = $('.one .line')
        for (let i = 0; i < 6; i++) {
            left[i].style.animation = 'dnaLeft 2s linear ' + i/5 + 's infinite'
            right[i].style.animation = 'dnaRight 2s linear ' + i/5 + 's infinite'
            line[i].style.animation = 'dnaLine 1s linear ' + i/5 + 's infinite'
        } 
        
        //定时随机颜色
        let colorNum = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
        setInterval(()=>{
            let color1 = "";     
            for (let i = 0; i < 6; i++) {
                let Num = Math.floor(Math.random()*16);
                color1 += colorNum[Num];
            }
            let color2 = "";     
            for (let i = 0; i < 6; i++) {
                let Num = Math.floor(Math.random()*16);
                color2 += colorNum[Num];
            }
            for (let i = 0; i < 6; i++) {
                left[i].style.backgroundColor = '#' + color1
                right[i].style.backgroundColor = '#' + color2
            }
        },2000)

    },
    methods:{

    }
}
</script>

<style lang='less'>
    @keyframes dnaLeft {
        0%{
            z-index: 2;
            transform: scale(1);
        }
        25%{
            z-index: 2;
            transform: scale(1.2);
        }
        50%{
            z-index: 1;
            left: 70%;
            transform: scale(1);
        }
        75%{
            z-index: 1;
            transform: scale(0.8);
        }
        100%{
            z-index: 2;
            left: 10%;
            transform: scale(1);
        }
    }
    @keyframes dnaRight {
        0%{
            z-index: 1;
            transform: scale(1);
        }
        25%{
            z-index: 1;
            transform: scale(0.8);
        }
        50%{
            z-index: 2;
            right: 70%;
            transform: scale(1);
        }
        75%{
            z-index: 2;
            transform: scale(1.2);
        }
        100%{
            z-index: 1;
            right: 10%;
            transform: scale(1);
        }
    }
    @keyframes dnaLine {
        0%{
        }
        50%{
            width: 0;
        }
        100%{
            width: 60%;
        }
    }
    #dna{
        position: relative;
        width: 300px;
        height: 300px;
        // background-color: rgb(175, 109, 22);
        
        // 单条dna样式
        .one{
            position: relative;
            margin: 8px auto;
            height: 10%;
            width: 80%;
            .left{
                position: absolute;
                left: 10%;
                width: 40px;
                height: 40px;
                z-index: 1;
                background-color: rgb(68, 36, 212);
                border-radius: 50%;
                // animation: dnaLeft 2s linear infinite;
                transition-duration: 2s;
            }
            .right{
                position: absolute;
                right: 10%;
                width: 40px;
                height: 40px;
                z-index: 1;
                background-color: rgb(214, 218, 37);
                border-radius: 50%;
                transition-duration: 2s;
                // animation: dnaRight 2s linear infinite;
            }
            .line{
                position: relative;
                left: 0;
                right: 0;
                top: 35%;
                width: 60%;
                margin: auto;
                border-bottom: rgb(91, 155, 123) 12px solid;
                z-index: 0;
                // animation: dnaLine 1s linear infinite;

            }
        }
        span{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            font-size: 25px;
        }
    }
</style>