```js
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

```