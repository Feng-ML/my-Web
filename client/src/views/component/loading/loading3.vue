<template>
<div>
    <div class="temp">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
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
        </el-collapse>

    </div>

</div>
</template>

<script>
import CssMd from "./css3.md";
import HtmlMd from "./html3.md";

export default {
    components:{
        CssMd,
        HtmlMd,
    }
}
</script>

<style>
    .spinner {
        margin: 30px 0;
        text-align: center;
    }

    .spinner > div {
        width: 18px;
        height: 18px;
        background-color: #1b7943;
        margin: 0 10px;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
        0%, 80%, 100% { -webkit-transform: scale(0) }
        40% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bouncedelay {
        0%, 80%, 100% { 
            -webkit-transform: scale(0);
            transform: scale(0);
        } 40% { 
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }
</style>