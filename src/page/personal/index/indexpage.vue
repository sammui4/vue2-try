<template>
    <div>  
        <div>  
            <ul class="_1 fast-handle" v-if="account.powers == 1">
                <li v-for="(botton,index) in bottondata">
                    <!-- <a class="a-btn" href="javascript:" :style="{'background-color':botton.color}"> -->
                    <router-link class="a-btn" :to="{path:botton.href}" :style="{'background-color':botton.color}">
                        <div class="content">
                            <i class="common-icon" :style="{'background-position-x':-50*index+'px'}"></i>
                            <span v-text="botton.text"></span>
                        </div>
                    <!-- </a> -->
                    </router-link>
                </li>
            </ul> 
            <div class="index_content clear">
                <div class="floatRight">
                    <div class="item-type-1">
                        <div class="head">
                            <span>最近消息</span>
                        </div>
                        <div class="content" id="infomaionForIndex" >
                            <ul v-if="newinfomation.length!==0">
                                <li v-for="infor in newinfomation">
                                    <a :href="infor.url" v-text="infor.detail">赛事咨询：第三届FRO全国物联网大赛 火热开启。详情请点击查看</a>
                                    <p v-text="infor.time">2017年4月11日</p>
                                    <a href="javascript:">标为已读</a>
                                </li>
                            </ul>
                            <ul v-else>
                                <li>无消息</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="floatLeft">
                    <!--<div class="item-type-1" v-for="(data,index) in componentdata">
                        <div class="head">
                            <span v-text="data.title">推荐比赛</span>
                            <span class="more">
                                <router-link :to="{ path: data.url }">更多</router-link>
                            </span>
                        </div>
                        <div class="content">
                            <span>如何动态加载多个组件？</span>
                        </div> 
                    </div>-->
                    <div class="item-type-1">
                        <div class="head">
                            <span>推荐课程</span>
                            <span class="more">
                                <router-link :to="{ path: '/classes' }">更多</router-link>
                            </span>
                        </div>
                        <div class="content">
                            <lesson :datalist="lesson"></lesson>
                        </div> 
                    </div>  
                    <div class="item-type-1">
                        <div class="head">
                            <span>推荐赛事</span>
                            <span class="more">
                                <router-link :to="{ path: '/match' }">更多</router-link>
                            </span>
                        </div>
                        <div class="content">
                            <match :datalist="match"></match>
                        </div> 
                    </div> 
                    <div class="item-type-1">
                        <div class="head">
                            <span>推荐案例</span>
                            <span class="more">
                                <router-link :to="{ path: '/cases' }">更多</router-link>
                            </span>
                        </div>
                        <div class="content">
                            <cases :datalist="casedata"></cases>
                        </div> 
                    </div> 
                    <div class="item-type-1">
                        <div class="head">
                            <span>推荐团队</span>
                            <span class="more">
                                <router-link :to="{ path: '/team' }">更多</router-link>
                            </span>
                        </div>
                        <div class="content">
                            <team :datalist="team"></team>
                        </div> 
                    </div>
                    <div class="item-type-1">
                        <div class="head">
                            <span>推荐项目</span>
                            <span class="more">
                                <router-link :to="{ path: '/project' }">更多</router-link>
                            </span>
                        </div>
                        <div class="content">
                            <project :datalist="project"></project>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <!--<div v-if="account.powers == 1">
            <p>user</p>
        </div>-->
    </div>
</template>
<style scoped>
    #form_data li{
        width: 500px;
        height: 420px;
        display: inline-block;
        position: relative;
    }
    #form_data .vdp-datepicker__calendar{
        z-index: 0;
    }
    ul._1 {
        overflow: auto;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between    
    }
    ul._1>li {
        display: inline-block;
        overflow: hidden;
        width: 22%;
        max-width: 240px;
    }    
    .fast-handle .a-btn._0 {
        background-color: #2F9DEA;
    }
    .fast-handle .a-btn {
        display: block;
        height: 76px;
        margin: 40px auto;
        padding-top: 12px;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
    }
    .fast-handle .a-btn>.content {
        text-align: center;
        height: 50px;
        overflow: hidden;
    }
    .fast-handle .a-btn>.content>.common-icon {
        background-position-y: -50px;
    }
    .fast-handle .a-btn>.content>.common-icon {
        display: inline-block;
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        overflow: hidden;
        background-image: url(../../../assets/icon/sprite-0.png);
    } 
    .fast-handle .a-btn>.content>span {
        display: inline-block;
        line-height: 50px;
        font-size: 18px;
        font-weight: bold;
        overflow: hidden;
    }   
    #infomaionForIndex{
        height: 500px;
    }
    #infomaionForIndex li{
        position: relative;
        margin-bottom: 15px;
        padding-left: 5px;
    }
    #infomaionForIndex li a{
        text-decoration: none;
    }
    #infomaionForIndex li>a:first-child{
        color: #000;
        position: relative;
    }
    #infomaionForIndex li>a:first-child:before{
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background: #FF6F6F;
        top: 5px;
        left: -15px;	
    }
    #infomaionForIndex li:hover>a:last-child{
        display: block;
    }
    #infomaionForIndex li>a:last-child{
        background: #2F9DEA;
        color: #fff;
        padding: 0px 4px;
        position: absolute;
        right: 15px;
        bottom: -4px;
        display: none;
    }
    .index_content>.floatLeft{
        width: 70%;
        padding-right: 17px;
        overflow: hidden;
        min-height: 300px;        
    }
    .index_content>.floatRight{
            width: 30%;
        min-height: 600px;       
    }
    /*课程开始*/
    .item-type-1{
        margin-bottom: 17px;
        border: solid 1px #eee;
    }
    .item-type-1>.head{
        position: relative;
        height: 30px;
        line-height: 30px;
        padding-left: 17px;
        font-weight: bold;
        background-color: #f2f2f2;
    }
    .item-type-1>.head>.more{
        float:right;
        color: #657180;
        margin-right: 10px;
    }
    .item-type-1>.head>.more a{
        color:currentColor;
    }
    .item-type-1>.content {
        padding: 17px;
        overflow: auto;
    }
    .item-type-1>.head>.handle-area{
        position: absolute;
        top: 0;
        right: 0;
        height: 30px;
        font-weight: normal;
    }
    .item-type-1>.head>.handle-area>a{
        padding: 7px 17px 7px 0;
        color: #2F9DEA;
    }
    .item-type-1>.content{
        padding: 17px;
        overflow: auto;
    } 
    .index_content .course-item>.left{
        width: 270px;
        height: 180px;
    }
    .index_content .course-item>.left>.img-container {
        width: 270px;
        height: 180px;
    }
    .index_content .course-item>.right{
        height: 180px;
    }
    .index_content .course-name{
        margin-bottom: 7px;
        font-size: 15px;
        font-weight: normal;
    }
    @media screen and (max-width: 1300px){
        .index_content .course-item>.left{
            display: none;
        }
    }  
    .index_content .course-item{
        height: 200px;
        border-bottom-color: transparent;
    } 
    .index_content .data-dl {
        margin: 0 17px 17px 0;
    }
    .index_content .team-info-card-type1 {
        margin: 0 17px 17px 0;
    }
</style>
<script>
    // import axios from 'axios'
    import qs from 'qs';
    import lesson from '../../../components/lesson/lessonlist.vue'
    import match from '../../../components/match/matchlist.vue'
    import cases from '../../../components/case/datalist.vue'
    import team from '../../../components/team/teamlist.vue'
    import project from '../../../components/project/projectlist.vue'
    // import {mapState} from 'vuex'
    export default{
        data:function(){
            return{
                account:{},
                //获取indexpage数据
                indexurl:'http://localhost:1235/php/indexpage.php',
                texturl:'http://localhost:1235/php/renderdata.php',
                onepagenum:12,
                //设备按钮
                bottondata:[
                    {
                        color:'#2F9DEA',
                        text:"设备预约",
                        href:'javascript:'
                    },
                    {
                        color:'#FE6E6E',
                        text:"场地申请",
                        href:'javascript:'
                    },
                    {
                        color:'#4AC987',
                        text:"创建项目",
                        href:'/project/projectcreate'
                    },
                    {
                        color:'#F6BD10',
                        text:"创建团队",
                        href:'/team/teamcreate'
                    },                
                ],
                //模拟新消息
                newinfomation:[],
                //课程数据
                lesson:[],
                //大赛数据
                match:[],
                //案例数据
                casedata:[],
                //团队数据
                team:[],
                //项目数据
                project:[]
            }
        },
        mounted:function(){
            var self = this;
            this.account = this.$store.state.account;
            axios.post(self.indexurl, qs.stringify({
                account:self.account.account,
                onepagenum:self.onepagenum
            })).then((res) => {
                self.newinfomation = res.data.news;
                self.lesson = res.data.lesson;
                self.match = res.data.match;
                self.casedata = res.data.case;
                self.team = res.data.team;
                self.project = res.data.project;
                self.$store.commit('CLOSE_MASK');
            });   
        },
        components:{
            lesson,
            match,
            cases,
            team,
            project
        },
        methods:{
            ha:function(){
                console.log(this.date1);
            }
        },
        // computed: mapState([
        //     'account'
        // ])             
    }
</script>