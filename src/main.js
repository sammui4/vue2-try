// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入vue


import App from './App'
import Vue from 'vue'
//引入路由（旧方法）
import VueRouter from 'vue-router'
import routerConfig from './router/index.js'
// import router from './router/index.js'
import store from './store/index.js'
// import babelPolyfill from 'babel-polyfill'
//引入iview相关
// import iview from 'iview';
// import 'iview/dist/styles/iview.css';
//引入图片懒加载
import VueLazyload from 'vue-lazyload'
// import masking from './common/vue/mask.vue'
import masking from './components/mask/mask.vue'
import qs from 'qs';


// import axiosie from './common/js/axiosie.js'
// import 'font-awesome-webpack'
//引入axios
// import axios from 'axios'
//引入验证组件
// import VeeValidate from 'vee-validate';
// Vue.use(VeeValidate);
//
// Vue.use(masking);

Vue.prototype.$ajax = axios
Vue.config.productionTip = false

//全局引用的插件
// Vue.use(VueRouter)
// Vue.use(iview)
//图片懒加载
Vue.use(VueLazyload, {
  error: 'dist/error.png',
  loading: 'http://cdn.uehtml.com/201402/1392662591495_1140x0.gif',
  try: 3 // default 1
})

var router = new VueRouter({
    routes:routerConfig,
    //此项在上传项目到云端时去掉
    // mode:'history'
})
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

//在路由改变前进行判断状态(路由拦截)
const whiteList = ['/login'];
const url = 'http://localhost:1235/php/logindatarecord.php';
const loginout = 'http://localhost:1235/php/loginout.php'
router.beforeEach((to,from,next) => {
    console.log(to.path);
    var user = JSON.parse(localStorage.getItem('user'));
    var height = '60px';
    //
    if(to.meta.title){
        document.title = to.meta.title;
    }else{
        document.title = '大学生创新创业信息服务平台';
    }
  
    //防止刷新时vuex丢失信息
    if(user && store.state.account==null &&to.path!=='/login'){
        //获取user信息
        axios.post(url,qs.stringify({id:user})).then(function (res) {
            if(res.data.state==true){
                store.commit('GET_USERINFO',res.data.messager[0]);
            }else{
                 next({path:'/login'});
            }
        }).catch(function (err) {
                
        }) 
       
    }
    if(from.path == '/project/projectadmin' || from.path == '/team/teamadmin'){
        store.commit('DELETE_PROJECTCREATEID');
        store.commit('DELETE_PROJECTID');        
    }  
    //重写
    //如果用户存在，
    if(user){
        if(to.path==='/login'){
            //使用vuex的退出登录
            axios.post(loginout,qs.stringify({id:user})).then(function (res) {
                store.commit('LOGIN_OUT'); 
                next()
            }).catch(function (err) {
                    
            })           
            
            return
        }else{
            //vuex中的账号不存在，先去读取
            if(store.state.account==null){
                axios.post(url,qs.stringify({id:user})).then(function (res) {
                    if(res.data.state==true){
                        store.commit('GET_USERINFO',res.data.messager[0]);
                        //有角色并需要vuex协助的权限
                        if(to.meta.role && to.meta.needed==undefined){
                                for(let i=0;i<to.meta.role.length;i++){
                                    if(to.meta.role[i]==store.state.account.powers){
                                        next()
                                        if(to.path.split('/').length == 2  && to.path!='/index.html' && to.path!='/' && to.path!=='/401'){
                                            height = '60px';
                                            store.commit('OPEN_MASK',height);
                                        }else if(to.path.split('/').length == 3 || to.path =='/index.html'){
                                            height = '115px';
                                            store.commit('OPEN_MASK',height);
                                        }
                                        return
                                    }
                                }
                                next({path:'/401'});    
                                return            
                            }else if(to.meta.role && to.meta.needed==true){
                                for(let i=0;i<to.meta.role.length;i++){
                                    console.log()
                                    if(to.meta.role[i]==store.state.account.powers && store.state.account.id == store.state.projectcreaterid){
                                        next()
                                        if(to.path.split('/').length == 2  && to.path!='/index.html' && to.path!='/' && to.path!=='/401'){
                                            height = '60px';
                                            store.commit('OPEN_MASK',height);
                                        }else if(to.path.split('/').length == 3 || to.path =='/index.html'){
                                            height = '115px';
                                            store.commit('OPEN_MASK',height);
                                        }
                                        return
                                    }
                                }
                                // iview.LoadingBar.finish();
                                next({path:'/401'});    
                                return                 
                            }else{
                                console.log("next")
                                next();
                            }                        
                    }else{
                        next({path:'/login'});
                    }
                }).catch(function (err) {
                        
                })                 
            }else{
               if(to.meta.role && to.meta.needed==undefined){
                    for(let i=0;i<to.meta.role.length;i++){
                        if(to.meta.role[i]==store.state.account.powers){
                            next()
                            if(to.path.split('/').length == 2  && to.path!='/index.html' && to.path!='/' && to.path!=='/401'){
                                height = '60px';
                                store.commit('OPEN_MASK',height);
                            }else if(to.path.split('/').length == 3 || to.path =='/index.html'){
                                height = '115px';
                                store.commit('OPEN_MASK',height);
                            }
                            return
                        }
                    }
                    next({path:'/401'});    
                    return            
                }else if(to.meta.role && to.meta.needed==true){
                    for(let i=0;i<to.meta.role.length;i++){
                        if(to.meta.role[i]==store.state.account.powers && store.state.account.id == store.state.projectcreaterid){
                            next()
                            if(to.path.split('/').length == 2  && to.path!='/index.html' && to.path!='/' && to.path!=='/401'){
                                height = '60px';
                                store.commit('OPEN_MASK',height);
                            }else if(to.path.split('/').length == 3 || to.path =='/index.html'){
                                height = '115px';
                                store.commit('OPEN_MASK',height);
                            }
                            return
                        }
                    }
                    // iview.LoadingBar.finish();
                    next({path:'/401'});    
                    return                 
                }else{
                    console.log("next")
                    next();
                }                
            }
        }
    //如果用户不存在
    }else{
        //免登陆白名单
        if(whiteList.indexOf(to.path) !== -1){
            next();
        }else{
            axios.post(loginout,qs.stringify({id:user})).then(function (res) {
                next({path:'/login'});
                return
            }).catch(function (err) {
                    
            })   
            
            
        }
    }

    //屏蔽层开启
    if(to.path!=='/404'){
        //最后一个是防止首页发生多层open_mask
        if(to.path.split('/').length == 2  && to.path!='/index.html' && to.path!='/' && to.path!=='/401'){
            height = '60px';
            store.commit('OPEN_MASK',height);
        }else if(to.path.split('/').length == 3 || to.path =='/index.html'){
            height = '115px';
            store.commit('OPEN_MASK',height);
        }
    }


})


router.afterEach((to, from, next) => {
    // iview.LoadingBar.finish();
    // store.commit('CLOSE_MASK');
});


// 添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

//   // 添加一个响应拦截器
//   axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   });

// /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  masking,
//   babelPolyfill,
//   VeeValidate,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
