import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/css/App.less"
import "@/assets/iconfont/iconfont.css"
import axios from './http.js'


import $ from 'jquery'
Vue.prototype.$ = $  

Vue.use(ElementUI);


Vue.prototype.$axios = axios;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



// 点击特效
var app = document.getElementById("app");
app.onclick = function(event){
  let e = event || window.event;
  let i = document.createElement("i");
  i.className = "zan  iconfont icon-zan";
  this.appendChild(i);
  let x = e.pageX - 10;
  let y = e.pageY - 20;
  let location = "left:" + x + "px;top:" + y + "px;" ;

  setTimeout(()=>{
    this.removeChild(i)
  },1000);

  //随机颜色
  let colorNum = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
  let color = "";     
  for (let i = 0; i < 6; i++) {
    let Num = Math.floor(Math.random()*16);
    color += colorNum[Num];
  }

  i.style = "color:#" + color + ";" + location ;  

  //隐藏右键菜单
  if(appMenu.style.display == "block"){
    appMenu.style.animation = "reRot .5s";
    setTimeout(()=>{
      appMenu.style.display = "none"
    },350)
  }
}


//右键菜单特效
var appMenu = document.getElementById("appMenu");
app.oncontextmenu = function(event) {
  //左键--button属性=1，右键button属性=2
  let e = event || window.event;

  if(e.button == 2) {
    e.preventDefault();

    if(appMenu.style.display == "block"){
        appMenu.style.animation = "reRot .5s";
      setTimeout(()=>{
        appMenu.style.display = "none"
      },350)
    }else{
      let x = e.pageX
      let y = e.pageY
      appMenu.style.display = "block";
      appMenu.style.left = x - 85 + "px";
      appMenu.style.top = y -85 + "px";
      appMenu.style.animation = "rot .5s";
    }
  }
}

//刷新页面
var menuLi3 = appMenu.getElementsByTagName("li")[2];
menuLi3.onclick = ()=>{
  location.reload()
}

