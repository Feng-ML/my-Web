import axios from 'axios';
import { Loading, Message } from 'element-ui';


let loading;


//加载方法
function startLoading(){
    loading = Loading.service({
        lock: true,
        text: '加载中！！！',
        background: 'rgba(0,0,0,0.5)'
    })
}

function endLoading(){
    loading.close()
}


// 请求拦截
axios.interceptors.request.use( config =>{

    startLoading()
    return config

}, error =>{
    return Promise.reject(error)
} )


// 响应拦截
axios.interceptors.response.use( response =>{

    endLoading()
    return response

}, error =>{

    Message.error(error.response.data)
    endLoading()
    return Promise.reject(error)
} )
    

export default axios;
