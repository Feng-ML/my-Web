<template>
    <div class="component">
        <el-tabs tab-position="left">

            <el-tab-pane label="Button 按钮">

                <el-card class="module">
                    <div slot="header">
                        <span>按钮1</span>
                    </div>
                    <Btn></Btn>
                </el-card>

                <el-card class="module">
                    <div slot="header">
                        <span>按钮2</span>
                    </div>
                    <Btn2></Btn2>
                </el-card>
                <el-card class="module">
                    <div slot="header">
                        <span>按钮3</span>
                    </div>
                    <Btn3></Btn3>
                </el-card>
            </el-tab-pane>

            <el-tab-pane label="Loading 加载">

                <el-card class="module">
                    <div slot="header">
                        <span>加载</span>
                    </div>
                    <Loading></Loading>
                </el-card>
                <el-card class="module">
                    <div slot="header">
                        <span>加载2</span>
                    </div>
                    <Loading2></Loading2>
                </el-card>
                <el-card class="module">
                    <div slot="header">
                        <span>加载3</span>
                    </div>
                    <Loading3></Loading3>
                </el-card>
            </el-tab-pane>



        
        </el-tabs>
    </div>
</template>

<script>
// 代码高亮
import 'highlight.js/styles/github.css'
// 其他元素使用 github 的样式
import 'github-markdown-css'
import './index.less'

import Btn from "./btn/btn.vue";
import Btn2 from "./btn/btn2.vue";
import Btn3 from "./btn/btn3.vue";
import Loading from "./loading/loading.vue";
import Loading2 from "./loading/loading2.vue";
import Loading3 from "./loading/loading3.vue";

export default {
    components:{
        Btn,
        Btn2,
        Btn3,
        Loading,
        Loading2,
        Loading3,
    }
}
</script>

<style lang='less'>
    .markdown-body .highlight pre, .markdown-body pre{
        background-color: unset;
    }
    .markdown-body{
        max-height: 500px;
        overflow: auto;
    }
    .component{
        padding-top: 50px;
    }

    .el-tabs__header{
        width: 200px;
    }

    .module{
        width: 60%;
        margin: auto;
        text-align: left;
        margin-bottom: 60px;
        
        .temp{
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
        }

        .el-collapse-item__header{
            font-size: 18px;
            &:hover{
                color: #409eff;
                font-weight: bold;
            }
        }
    }


</style>