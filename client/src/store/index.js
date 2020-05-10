import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//定义类型：token指令，用户信息
const type = {
  SET_IS_AUTHENTICATED : "SET_IS_AUTHENTICATED",
  SET_USER : "SET_USER"
}

//定义状态
const state = {
  isAuthenticated:false,  //默认没有认证
  user:{}     //用户信息
}

// 获取值
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: user => state.user
}

// 修改值
const mutations = {
  [type.SET_IS_AUTHENTICATED](state,isAuthenticated){
    if (isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    }else{
      state.isAuthenticated = false
    }
  },
  [type.SET_USER](state,user){
    if (user) {
      state.user = user
    } else {
      state.user = {}
    }
  }
}

// 定义回调
const actions = {
  setIsAuthenticated:({commit},isAuthenticated)=>{
    commit( type.SET_IS_AUTHENTICATED , isAuthenticated )
  },
  setUser:({commit},user)=>{
    commit( type.SET_USER , user )
  }
}




export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
