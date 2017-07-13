//引入vue和vuex
// import Vue from 'vue'
// import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './action.js'
import getters from './getters.js'

//全局使用vuex
// Vue.use(Vuex)

var state = {
    account:null,                    //用户信息
    login:false,                    //是否登陆
    mask:true,                    //是否有屏蔽层
    maskheight:'60px',                //屏蔽层高度
    timer:null,
    projectcreaterid:null,          //项目、团队创建者id
    projectid:null,               //项目、团队id
    sendarray:[],                   //案例那里的发送的数组
    today:null,                     //当日
    tomonthfirstday:null,            //当日当月首日
    nowmonth:null,                    //当月
    lastmonth:null                      //上个月
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})