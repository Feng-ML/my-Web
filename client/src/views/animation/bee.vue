<template>
    <div class="bee">
        <div class="oneBee">
            <div class="body"></div>
            <div class="Lwings"></div>
            <div class="Rwings"></div>
        </div>
        <span>Golden Snitch</span>
    </div>
</template>

<script>
 import $ from 'jquery'

export default {
    name: 'bee',
    data(){
        return {
            beeTime: null
        }
    },
    
    mounted(){

        //bee随机位置定时器
        this.beeTime = setInterval(()=>{
            let top = Math.random()*70+10
            let left = Math.random()*70+10
            $('.oneBee')[0].style.top = top + '%'
            $('.oneBee')[0].style.left = left + '%'
        },2000)

    },

    beforeDestroy(){
        clearInterval(this.beeTime)
    },
    
}
</script>

<style lang='less'>
    //翅膀振动
    @keyframes Swing {
        0%{
            transform: rotate(-10deg);
        }
        50%{
            transform: rotate(10deg);
        }
        100%{
            transform: rotate(-10deg);
        }
    }

    .bee{
        position: relative;
        height: 100%;
        width: 100%;
        .oneBee{
            position: absolute;
            // transform: translate(35%,545%);
            top: 45%;
            left: 45%;
            transition-duration: 1.5s;
            .body{
                position: relative;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: rgb(247, 247, 88);
                
            }
            .Lwings{
                position: absolute;
                left: -38px;
                top: 5px;
                width: 40px;
                height: 15px;
                background-color: rgb(178, 184, 190);
                border-radius: 50%;
                animation: Swing .05s linear infinite;
                transform-origin: right;
            }
            .Rwings{
                position: absolute;
                left: 38px;
                top: 5px;
                width: 40px;
                height: 15px;
                background-color: rgb(178, 184, 190);
                border-radius: 50%;
                animation: Swing .05s linear infinite;
                transform-origin: left;
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