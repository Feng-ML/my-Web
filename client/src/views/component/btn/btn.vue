<template>
    <div>
        <div class="temp">
            <div class="btn-3d red">red</div>
            <div class="btn-3d blue">blue</div>
            <div class="btn-3d green">green</div>
            <div class="btn-3d coff">coff</div>
            <div class="btn-3d gray">gray</div>
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
import CssMd from "./css.md";
import HtmlMd from "./html.md";

export default {
    components:{
        CssMd,
        HtmlMd
    }
}
</script>

<style lang='less'>
    .btn-3d {
        display: inline-block;
        position: relative;
        cursor: pointer;
        padding: 10px 0;
        color: white;
        width: 100px;
        border-radius: 15px;
        text-align: center;
        transition: top .01s linear;
        text-shadow: 0 1px 0 rgba(0,0,0,0.15);
        margin: 10px 0;
    }
    
    .btn-3d:active {
        top: 9px;
    }
    
    .btn-3d.red {
        background-color: #e74c3c;
        box-shadow: 0 0 0 1px #c63702 inset,
            0 0 0 2px rgba(255,255,255,0.15) inset,
            0 8px 0 0 #C24032,
            0 8px 0 1px rgba(0,0,0,0.4),
                    0 8px 8px 1px rgba(0,0,0,0.5);
    }
    .btn-3d.red:active {
        box-shadow: 0 0 0 1px #c63702 inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 0 0 1px rgba(0,0,0,0.4);
    }
    
    .btn-3d.blue {
        background-color: #3388ff;
        box-shadow: 0 0 0 1px #6698cb inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 8px 0 0 rgba(54, 136, 253, .7),
                    0 8px 0 1px rgba(0,0,0,.4),
                    0 8px 8px 1px rgba(0,0,0,0.5);
    }
    .btn-3d.blue:active {
        box-shadow: 0 0 0 1px #3388ff inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 0 0 1px rgba(0,0,0,0.4);
    }
    
    .btn-3d.green {
        background-color: #78b11c;
        box-shadow: 0 0 0 1px #78b11c inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 8px 0 0 rgba(118, 176, 35, .7),
                    0 8px 0 1px rgba(0,0,0,.4),
                    0 8px 8px 1px rgba(0,0,0,0.5);
    }
    .btn-3d.green:active {
        box-shadow: 0 0 0 1px #78b11c inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 0 0 1px rgba(0,0,0,0.4);
    }
    
    .btn-3d.coff {
        background-color: #a79764;
        box-shadow: 0 0 0 1px #a79764 inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 8px 0 0 rgba(167, 151, 101, .7),
                    0 8px 0 1px rgba(0,0,0,.4),
                    0 8px 8px 1px rgba(0,0,0,0.5);
    }
    .btn-3d.coff:active {
        box-shadow: 0 0 0 1px #a79764 inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 0 0 1px rgba(0,0,0,0.4);
    }
    
    .btn-3d.gray {
        background-color: #dbdbdb;
        color: #333;
        box-shadow: 0 0 0 1px #dbdbdb inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 8px 0 0 rgba(219, 219, 219, .7),
                    0 8px 0 1px rgba(0,0,0,.4),
                    0 8px 8px 1px rgba(0,0,0,0.5);
    }
    .btn-3d.gray:active {
        box-shadow: 0 0 0 1px #dbdbdb inset,
                    0 0 0 2px rgba(255,255,255,0.15) inset,
                    0 0 0 1px rgba(0,0,0,0.4);
    }
    
</style>