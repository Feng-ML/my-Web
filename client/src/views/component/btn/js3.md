```js
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
```