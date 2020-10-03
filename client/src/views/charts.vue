<template>
    <div class="charts">
        <div class="charts_left">
            <ul>
                <li><router-link to="/home/charts/fundUse">资金用途</router-link></li>
                <li><router-link to="/home/charts/fundFlow">资金流水</router-link></li>             
            </ul>
        </div>
        <div class="charts_content">
            <router-view/>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style lang='less'>
    .charts{
        display: flex;
        height: calc(100vh - 363px);
        .charts_left{
            width: 100px;
        }
        .charts_content{
            width: 100%;
        }
    }

    .charts_left {
        background-color: rgb(32, 32, 32);
        // 路由
        ul{
            list-style: none;
            li{
                a{
                    display: block;
                    height: 60px;
                    width: 97px;
                    line-height: 60px;
                    text-decoration: none;
                    color: #fff;
                }
            }
        }

        //路由点击
        .router-link-active{
            color: rgb(252, 174, 73);
            border-right: 3px solid rgb(252, 174, 73); 
        }
    }

</style>