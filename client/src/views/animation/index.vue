<template>
  <div class="animation">
      <ul>
          <li><dna></dna></li>
          <li><bee></bee></li>
      </ul>     
  </div>
</template>

<script type="text/javascript">

 import dna from './dna';
 import bee from './bee';
 import $ from 'jquery'

 
export default {
    components:{
        dna,
        bee
    },
    data(){
        return {
            beeTime: 0
        }
    },
    mounted(){
        
    },
    
    beforeRouteEnter(to,from,next){
        next(vm=>{
            //bee随机位置定时器
            vm.beeTime = setInterval(()=>{
                let top = Math.random()*70+10
                let left = Math.random()*70+10
                $('.oneBee')[0].style.top = top + '%'
                $('.oneBee')[0].style.left = left + '%'
            },2000)
        })      
    },
    beforeRouteLeave(to,from,next){
        // 清除随机位置定时器
        clearInterval(this.beeTime)
        next()
    }
}
</script>

<style lang='less'>
    .animation{
        ul{
            width: 100%;
            list-style: none;
            display: flex;
            justify-content: center;
            padding-top: 35px;
            
        }
    }
</style>