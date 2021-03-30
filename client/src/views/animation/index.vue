<template>
  <div class="animation">

    <el-card class="card"><dna></dna></el-card>
    <el-card class="card"><bee></bee></el-card>

  </div>
</template>

<script type="text/javascript">

 import dna from './dna';
 import bee from './bee';

 
export default {
    components:{
        dna,
        bee
    },
    data(){
        return {
        }
    },
    
    mounted(){

    }
}
</script>

<style lang='less'>
    .animation{

        width: 80%;
        margin: auto;
        display: flex;
        justify-content: space-around;
        
        padding-top: 35px;

        .el-card__body{
            height: 300px;
            width: 250px;
        }

    }
</style>