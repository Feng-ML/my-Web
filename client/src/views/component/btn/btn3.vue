<template>
    <div>
        <div class="temp">
            <div class="box">
                <div class="button">Click me</div>
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
import CssMd from "./css.md";
import HtmlMd from "./html.md";

// var $button = document.querySelector('.button');
// $button.addEventListener('click', function() {
//   var duration = 0.3,
//       delay = 0.08;
//   TweenMax.to($button, duration, {scaleY: 1.6, ease: Expo.easeOut});
//   TweenMax.to($button, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
//   TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
// });

export default {
    components:{
        CssMd,
        HtmlMd
    }
}
</script>

<style lang='less'>
    .button {
        background: #3498db;
        width: 180px;
        padding: 4px 0;
        
        border-radius: 3px;
        font-family: 'Roboto'; 
        text-align: center;
        text-transform: uppercase;
        color: #FFF;
        user-select: none;


        
        &:hover {
            cursor: pointer;
        }
        
        // &:after {
        //     content: "";
        //     display: block;
        //     position: absolute;
        //     width: 100%;
        //     height: 10%;
        //     border-radius: 50%;
        //     background-color: darken(#f1c40f, 20%);
        //     opacity: 0.4;
        //     bottom: -30px;
        // }
    }
    
</style>