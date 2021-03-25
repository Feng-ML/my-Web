<template>
    <div>
        <div class="temp">
            <div 
                class="btn2"
                ref="btn2"
                data-title="Awesome Button"
                @mousemove="mousemove"
                @mouseleave="mouseleave"
                @mousedown="mousedown"
                @mouseup="mouseup"
            ></div>
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
import CssMd from "./css2.md";
import HtmlMd from "./html2.md";
import JSMd from "./js2.md";


export default {
    components:{
        CssMd,
        HtmlMd,
        JSMd
    },
    methods:{
        mousemove(e){
            const boundingClientRect = this.$refs.btn2.getBoundingClientRect()
            const x = e.clientX - boundingClientRect.left
            const y = e.clientY - boundingClientRect.top
            
            const xc = boundingClientRect.width/2
            const yc = boundingClientRect.height/2
            
            const dx = x - xc
            const dy = y - yc
            
            this.$refs.btn2.style.setProperty('--rx', `${ dy/-1 }deg`)
            this.$refs.btn2.style.setProperty('--ry', `${ dx/10 }deg`)

            
        },
        mouseleave() {
	
        	this.$refs.btn2.style.setProperty('--ty', '0')
        	this.$refs.btn2.style.setProperty('--rx', '0')
        	this.$refs.btn2.style.setProperty('--ry', '0')
            
        },
        mousedown() {
	
        	this.$refs.btn2.style.setProperty('--tz', '-25px')
            
        },

        mouseup() {
            
        	this.$refs.btn2.style.setProperty('--tz', '-12px')
            
        }
    }
}
</script>

<style lang='less'>

    .btn2{
        position: relative;
        display: inline-block;
        padding: 1.2em 2em;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        user-select: none;
        color: white;
        
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            border-radius: 4px;
            transition: box-shadow .5s ease, transform .2s ease; 
            will-change: transform;
            box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
            transform:
                translateY(var(--ty, 0))
                rotateX(var(--rx, 0))
                rotateY(var(--ry, 0))
                translateZ(var(--tz, -12px));
        }
        
        &:hover::before {
            box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
        }
        
        &::after {
            position: relative;
            display: inline-block;
            content: attr(data-title);
            transition: transform .2s ease; 
            font-weight: bold;
            letter-spacing: .01em;
            will-change: transform;
            transform:
                translateY(var(--ty, 0))
                rotateX(var(--rx, 0))
                rotateY(var(--ry, 0));
        }
    }
</style>