<template>
    <div>
        <div class="temp">
            <div class="button" @click="btnClick">Button</div>
        </div>

        <div class="code">
            <el-collapse accordion>
                <el-collapse-item title="HTML">
                    <div class="markdown-body">
                        <HtmlMd></HtmlMd>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="CSS">
                    <div class="markdown-body">
                        <CssMd></CssMd>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="JS">
                    <div class="markdown-body">
                        <JSMd></JSMd>
                    </div>
                </el-collapse-item>
            </el-collapse>

        </div>
    </div>
</template>

<script>
import CssMd from "./css3.md";
import HtmlMd from "./html3.md";
import JSMd from "./js3.md";


export default {
    components:{
        CssMd,
        HtmlMd,
        JSMd
    },
    methods:{
        btnClick(){
            var btn = document.querySelector('.button');

            if(btn.className　= 'button'){
                btn.className　= 'button scale'
                setTimeout(()=>{
                    btn.className　= 'button'
                },500)
            }
        }
    }
}
</script>

<style lang='less'>

    @keyframes scale {
        0%{
            transform: scale(1);
        }
        30%{
            transform: scaleY(1.6);
        }
        60%{
            transform: scale(1.2,1);
        }
        100%{
            transform: scale(1);
        }
    }
    .scale{
        animation: scale .5s ease-out;
    }

    .button {
        background: linear-gradient(135deg, #d3e669, #7ec9b9);
        width: 180px;
        height: 50px;
        line-height: 50px;
        margin: 30px 0;
        
        border-radius: 3px;
        font-family: 'Roboto'; 
        text-align: center;
        color: #FFF;
        user-select: none;
        
        &:hover {
            cursor: pointer;
        }
        
        &:after {
            content: "";
            display: block;
            position: relative;
            width: 100%;
            height: 10%;
            border-radius: 50%;
            background-color: darken(#f1c40f, 20%);
            opacity: 0.4;
            bottom: -20px;
        }
    }
    
</style>