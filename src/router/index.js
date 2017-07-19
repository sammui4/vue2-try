// import App from '../App'
// import VueRouter from 'vue-router'
const login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'login')
const home = r => require.ensure([], () => r(require('../page/layout/index.vue')), 'home')
const nofind = r => require.ensure([], () => r(require('../page/nofind/404.vue')), 'nofind')

    const index = r => require.ensure([], () => r(require('../page/personal/index.vue')), 'index')
        //个人信息编辑页面
        const personal = r => require.ensure([], () => r(require('../page/personal/personaledit/personal.vue')), 'personal')
        //个人首页
        const person = r => require.ensure([], () => r(require('../page/personal/index/indexpage.vue')), 'person')      
        //信息页
        const information = r => require.ensure([], () => r(require('../page/personal/information/information.vue')), 'information')
        //首页中的信息页里面的内容加载开始
            const dealwith = r => require.ensure([], () => r(require('../page/personal/information/children/dealwith.vue')), 'dealwith')
            const notice = r => require.ensure([], () => r(require('../page/personal/information/children/notice.vue')), 'notice')
        const leader = r => require.ensure([], () => r(require('../page/personal/leaderindex/leader.vue')), 'leader')
        const teams = r => require.ensure([], () => r(require('../page/personal/myteam/team.vue')), 'teams')
        const myproject = r => require.ensure([], () => r(require('../page/personal/myproject/myproject.vue')), 'myproject')
        const subscribe = r => require.ensure([], () => r(require('../page/personal/subscribe/subscribe.vue')), 'subscribe')
    const statistics = r => require.ensure([], () => r(require('../page/statistics/statistics.vue')), 'statistics')
    //团队相关页面
    const team = r => require.ensure([], () => r(require('../page/team/team.vue')), 'team')
        const teamdetail = r => require.ensure([], () => r(require('../page/team/next/teamdetail.vue')), 'teamdetail')
        const teamadmin = r => require.ensure([], () => r(require('../page/team/next/teamadmin.vue')), 'teamadmin')
        const teamcreate = r => require.ensure([], () => r(require('../page/team/next/createteam.vue')), 'teamcreate')
    //项目相关页面
    const project = r => require.ensure([], () => r(require('../page/project/project.vue')), 'project')
        const projectdetail = r => require.ensure([], () => r(require('../page/project/next/projectdetail.vue')), 'projectdetail')
        const projectadmin = r => require.ensure([], () => r(require('../page/project/next/projectadmin.vue')), 'projectadmin')
        const projectcreate = r => require.ensure([], () => r(require('../page/project/next/createproject.vue')), 'projectcreate')
    //课程相关页面
    const classes = r => require.ensure([], () => r(require('../page/class/classes.vue')), 'classes')
        const classesadmin = r => require.ensure([], () => r(require('../page/class/next/classedit.vue')), 'classesadmin')
        const classesdetail = r => require.ensure([], () => r(require('../page/class/next/classesdetail.vue')), 'classesdetail')
        const classescreate = r => require.ensure([], () => r(require('../page/class/next/classcreate.vue')), 'classescreate')
    //大赛相关页面
    const match = r => require.ensure([], () => r(require('../page/match/match.vue')), 'match')
        const matchcreate = r => require.ensure([], () => r(require('../page/match/next/matchcreate.vue')), 'matchcreate')
        const matchedit = r => require.ensure([], () => r(require('../page/match/next/matchedit.vue')), 'matchedit')
    const cases = r => require.ensure([], () => r(require('../page/case/case.vue')), 'cases')
        const casedetail = r => require.ensure([], () => r(require('../page/case/next/casedetail.vue')), 'casedetail')
        const caseupload = r => require.ensure([], () => r(require('../page/case/next/caseupload.vue')), 'caseupload')
        const myupload = r => require.ensure([], () => r(require('../page/case/next/myupload.vue')), 'myupload')

    const experience = r => require.ensure([], () => r(require('../page/experience/experience.vue')), 'experience')
    const createzone = r => require.ensure([], () => r(require('../page/createzone/createzone.vue')), 'createzone')
    // const monitor = r => require.ensure([], () => r(require('../page/leftside/monitor.vue')), 'monitor')
    const employment = r => require.ensure([], () => r(require('../page/employment/employment.vue')), 'employment')

        

    
    const noenter= r => require.ensure([], () => r(require('../page/notallow/401.vue')), 'noenter')




// export const routerConfig =[
export default [
    {path:'/login',component:login,meta:{title:'大学生创新创业信息服务平台-登陆'}},
    {
        path:'',component:home,
        //redirect重定向
        redirect:'/index.html',
        children:[
            //默认页面   
            {   
                path:'/index.html',
                component:index,
                children:[
                    {path:'',component:person},             //路由默认是用先定义的
                    {
                        
                        path:'/index/information',component:information
                        
                    },
                    {path:'/index/myteams',component:teams,meta:{title:'大学生创新创业信息服务平台-我的团队'}},
                    // {path:'/index/leader',component:leader,meta:{onlyadmin:true,title:'大学生创新创业信息服务平台-领导首页'}},
                    {path:'/index/leader',component:leader,meta:{role:[0],title:'大学生创新创业信息服务平台-领导首页'}},
                    // {path:'/index/myproject',component:myproject,meta:{onlyuser:true,title:'大学生创新创业信息服务平台-我的项目'}},
                    {path:'/index/myproject',component:myproject,meta:{role:[1],title:'大学生创新创业信息服务平台-我的项目'}},
                    {path:'/index/subscribe',component:subscribe,meta:{role:[1],title:'大学生创新创业信息服务平台-预约申请记录'}}
                ]
            },
            {path:'/statistics',component:statistics,meta:{role:[0],title:'大学生创新创业信息服务平台-统计'}},
            {path:'/team',component:team,meta:{title:'大学生创新创业信息服务平台-团队'}},
            {path:'/team/teamdetail',component:teamdetail,meta:{title:'大学生创新创业信息服务平台-团队详情'}},
            {path:'/team/teamadmin',component:teamadmin,meta:{role:[1],needed:true,title:'大学生创新创业信息服务平台-团队管理'}},
            {path:'/team/teamcreate',component:teamcreate,meta:{title:'大学生创新创业信息服务平台-创建团队'}},
            {path:'/project',component:project,meta:{title:'大学生创新创业信息服务平台-项目'}},
                {path:'/project/projectdetail',component:projectdetail,meta:{title:'大学生创新创业信息服务平台-项目详情'}},
                {path:'/project/projectadmin',component:projectadmin,meta:{role:[1],needed:true,title:'大学生创新创业信息服务平台-项目编辑'}},
                {path:'/project/projectcreate',component:projectcreate,meta:{title:'大学生创新创业信息服务平台-新建项目'}},
            {path:'/classes',component:classes,meta:{title:'大学生创新创业信息服务平台-课程'}},
                {path:'/classes/classesadmin',component:classesadmin,meta:{role:[0],title:'大学生创新创业信息服务平台-课程编辑'}},
                {path:'/classes/classesdetail',component:classesdetail,meta:{title:'大学生创新创业信息服务平台-课程详情'}},
                {path:'/classes/classescreate',component:classescreate,meta:{role:[0],title:'大学生创新创业信息服务平台-课程创建'}},
            {path:'/match',component:match,meta:{title:'大学生创新创业信息服务平台-大赛'}},
                {path:'/match/matchcreate',component:matchcreate,meta:{role:[0],title:'大学生创新创业信息服务平台-大赛创建'}},
                {path:'/match/matchedit',component:matchedit,meta:{role:[0],title:'大学生创新创业信息服务平台-大赛编辑'}},
            {path:'/cases',component:cases,meta:{title:'大学生创新创业信息服务平台-案例'}},
                {path:'/cases/caseupload',component:caseupload,meta:{title:'大学生创新创业信息服务平台-案例上传'}},
                {path:'/cases/myupload',component:myupload,meta:{title:'大学生创新创业信息服务平台-已上传的'}},
                {path:'/cases/:caseid',component:casedetail},
            {path:'/experience',component:experience,meta:{title:'大学生创新创业信息服务平台-实验'}},
            {path:'/createzone',component:createzone,meta:{title:'大学生创新创业信息服务平台-创客空间'}},
            {path:'/employment',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/employment/1',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/employment/2',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/employment/3',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/employment/4',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/employment/5',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/employment/6',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/employment/7',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/employment/8',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
            {path:'/personal',component:personal,meta:{title:'大学生创新创业信息服务平台-个人中心'}},
            {path:'/401',component:noenter}

        ]
    },
    {path:'/404',component:nofind},
    {path:'*',redirect: '/404',component:nofind}
]

// Vue.use(VueRouter);

// export default new VueRouter({
//      routes:routerConfig,
//     //  mode:'history'
// })
/*首页、登录页和一些不用权限的公共页面*/
// export const constantRouterMap = [
//     {path:'/login',component:login,meta:{title:'大学生创新创业信息服务平台-登陆'}},
//     {
//         path:'/',component:home,redirect:'/index.html',name:'首页',
//         children:[
//             {
//                 path:'/index.html',component:index,
//                 children:[
//                     {path:'',component:person}
//                 ]
//             }
//         ]
//     }
// ]
// export default new VueRouter({
//   routes: constantRouterMap
// });

// export const asyncRouterMap = [
//     {
//         path:'',component:home,
//         children:[
//             //默认页面   
//             {   
//                 path:'/index.html',
//                 component:index,
//                 children:[            //路由默认是用先定义的
//                     {
//                         //redirect重定向
//                         path:'/index/information',component:information
                        
//                     },
//                     {path:'/index/myteams',component:teams,meta:{title:'大学生创新创业信息服务平台-我的团队'}},
//                     {path:'/index/leader',component:leader,meta:{onlyadmin:true,title:'大学生创新创业信息服务平台-领导首页'}},
//                     {path:'/index/myproject',component:myproject,meta:{onlyuser:true,title:'大学生创新创业信息服务平台-我的项目'}},
//                     {path:'/index/subscribe',component:subscribe,meta:{onlyuser:true,title:'大学生创新创业信息服务平台-预约申请记录'}}
//                 ]
//             },
//             {path:'/statistics',component:statistics,meta:{onlyadmin:true,title:'大学生创新创业信息服务平台-统计'}},
//             {path:'/team',component:team,meta:{title:'大学生创新创业信息服务平台-团队'}},
//             {path:'/team/teamdetail',component:teamdetail,meta:{title:'大学生创新创业信息服务平台-团队详情'}},
//             {path:'/team/teamadmin',component:teamadmin,meta:{title:'大学生创新创业信息服务平台-团队管理'}},
//             {path:'/team/teamcreate',component:teamcreate,meta:{title:'大学生创新创业信息服务平台-创建团队'}},
//             {path:'/project',component:project,meta:{title:'大学生创新创业信息服务平台-项目'}},
//             {path:'/project/projectdetail',component:projectdetail,meta:{title:'大学生创新创业信息服务平台-项目详情'}},
//             {path:'/project/projectadmin',component:projectadmin,meta:{title:'大学生创新创业信息服务平台-项目编辑'}},
//             {path:'/project/projectcreate',component:projectcreate,meta:{title:'大学生创新创业信息服务平台-新建项目'}},
//             {path:'/classes',component:classes,meta:{title:'大学生创新创业信息服务平台-课程'}},
//             {path:'/match',component:match,meta:{title:'大学生创新创业信息服务平台-大赛'}},
//             {path:'/cases',component:cases,meta:{title:'大学生创新创业信息服务平台-案例'}},
//             {path:'/cases/:caseid',component:casedetail},
//             {path:'/experience',component:experience,meta:{title:'大学生创新创业信息服务平台-实验'}},
//             {path:'/createzone',component:createzone,meta:{title:'大学生创新创业信息服务平台-创客空间'}},
//             {path:'/employment',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/employment/1',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/employment/2',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/employment/3',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/employment/4',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/employment/5',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/employment/6',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/employment/7',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/employment/8',component:employment,meta:{title:'大学生创新创业信息服务平台-就业'}},
//             {path:'/personal',component:personal,meta:{title:'大学生创新创业信息服务平台-个人中心'}},
//             {path:'/401',component:noenter}

//         ]
//     },
//     {path:'/404',component:nofind},
//     {path:'*',redirect: '/404',component:nofind}
// ];