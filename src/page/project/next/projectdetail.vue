<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/project">项目</Breadcrumb-item>
                <Breadcrumb-item v-text="projectdata.title"></Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div id="mc-content">
            <div class="mc-content-head">
                <div class="left img-container">
                    <img :src="projectdata.img" v-lazy="projectdata.img"/>
                </div>
                <div class="right">
                    <span class="corner-tips decorate status-4" v-text="projectdata.statename">已完成</span>
                    <strong class="object-name text-not-overflow" v-text="projectdata.title">基于XXX的光载无线交换机</strong>
                    <div class="information _1">
                        <span>项目分类</span><span>项目等级</span>
                        <!--<span v-for="(data,key) in projecttypedata" v-text="data">项目分类</span>                        -->
                    </div>
                    <div class="information _2">
                        <div class="_1">
                            <span>创建人：</span><a href="#" class="common-a" v-text="projectdata.creatername">小云云</a>
                        </div>
                        <div class="_2">
                            <div class="">
                                <Icon type="ios-telephone"></Icon><span v-text="projectdata.createrphone">13837363534</span>
                            </div>
                            <div class="">
                                <Icon type="ios-email-outline"></Icon><span v-text="projectdata.createremail">13837363534@163.com</span>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div class="intro">
                        <span class="comment-label">简介：</span><div class="content text-not-overflow" v-text="projectdata.summary">我们作为网络广告行业的竞争对手有很多，大致可分为三类，1. 大型媒体类，如微博、微信、知乎等。我们作为网络广告行业的竞争对手有很多，大致可分为三类，1. 大型媒体类，如微博、微信、知乎等。我们作为网络广告行业的竞争对手有很多，大致可分为三类，1. 大型媒体类，如微博、微信、知乎等。我们作为网络广告行业的竞争对手有很多，大致可分为三类，1. 大型媒体类，如微博、微信、知乎等。我们作为网络广告行业的竞争对手有很多，大致可分为三类，1. 大型媒体类，如微博、微信、知乎等。这些公司的自有广告系统是我们竞争广告花费和社交流量的重要对手，我们面向多平台并专注植入式广告，比对手提供的服务更专注，花费更低。2. 网络广告平台，如好耶、易传媒、品友等。</div>
                    </div>
                    <div class="bottom-btn-area">
                        <!-- 游客看到的按钮 -->
                        <span class="btn-type-1 btn-type-blue" v-if="account&&account.powers==0">评价</span>
                        <!-- 团队负责人看到的按钮4 -->
                     
                        <span class="btn-type-1 btn-type-blue _hidden" v-if="account&&account.powers==1&& projectdata.bycreaterid===account.id" @click="edit()">编辑</span>
                    </div>
                </div>
            </div>
            <div class="mc-content-bottom">
                <div class="head">
                    <Tabs value="name1">
                        <Tab-pane label="项目介绍" name="name1">标签一的内容</Tab-pane>
                        <Tab-pane label="项目组成员" name="name2">
                            <div class="content-row-block">
                                <div class="row-lable-type-1"><span class="title">团队</span></div>
                                <teamlist :datalist="teamdata"></teamlist>
                            </div>   
                            <div class="content-row-block">
                                <div class="row-lable-type-1"><span class="title">个人</span></div>
                            </div>                         
                        </Tab-pane>
                        <Tab-pane label="项目事纪" name="name3">
                            <div class="milestones-events" v-for="recording in record">
                                <span class="time-lable" v-text="recording.time">2016-12-15 18:34:23</span>
                                <Icon type="ios-alarm-outline" class="icon-xx" ></Icon>
                                <div class="content"><a href="javascript:" v-text="recording.who">陈同学</a><span v-text="recording.what">加入团队，任职前端攻城狮</span></div>
                            </div>                           
                        </Tab-pane>
                    </Tabs>                   
                </div>
            </div>                        
        </div>
    </div>
</template>

<script>
import teamlist from '../../../components/team/teamlist'
import qs from 'qs'
export default {
    data(){
        return{
            account:{
                powers:null
            },
            getprojectdetailurl:'http://localhost:2233/projectdetail.php',
            projectdata:{
                title:null,
                img:null,
                statename:null,
                creatername:null,
                createrphone:null,
                createremail:null,
                summary:null,
                bycreaterid:Number,
            },
            img:'./../../assets/demo/cycg3.jpg',
            teamdata:Array,
            projecttypedata:null,
            record:[
                {
                    time:'2016-12-15 18:34:23',
                    who:'陈同学',
                    what:'加入团队，任职前端攻城狮'
                },
                {
                    time:'2016-12-15 18:34:23',
                    who:'陈同学',
                    what:'加入团队，任职前端攻城狮，同时又想做架构师，什么都想做加入团队，任职前端攻城狮，然而又想做架构师，什么都想做。加入团队，任职前端攻城狮,同时又想做架构师，什么都想做'
                }
            ]
        }
    },
    mounted(){
        var self = this;
        this.account = JSON.parse(localStorage.getItem('user')); 
        axios.post(self.getprojectdetailurl,qs.stringify({
            id:this.$route.query.id,            
        })).then((res)=>{
            self.projectdata = res.data.project[0];
            self.teamdata = res.data.team;
            self.projecttypedata = res.data.projecttypedata;
            this.$store.commit('CLOSE_MASK');;
            console.log(self.projectdata.bycreaterid);
            console.log(self.account.id);
        })

    },
    components:{
        teamlist
    },
    methods:{
        edit:function(){
            this.$store.commit('RECORD_PROJECTCREATEID', this.projectdata.bycreaterid);
            this.$store.commit('RECORD_PROJECTID', this.$route.query.id);
            this.$router.push({path:'/project/projectadmin'});
            // console.log(this.projectdata.bycreaterid);
        }
    }
}
</script>

<style scoped>
.mc-content-head{
	position: relative;
	height: 300px;
}
.mc-content-head>.left{
	float: left;
	width: 450px;
	height: 300px;
}
.mc-content-head>.right{
	position: relative;
	max-width: 636px;
	height: 300px;
	margin-left: 450px;
	padding: 17px 0 0 30px;
}
@media screen and (max-width: 1300px) {
    .mc-content-head>.right{
    	padding-top: 13px;
    }
}
.mc-content-head>.right .corner-tips{
	display: inline-block;
	height: 33px;
	width: 60px;
	background: none;
	background-color: #4BCA88;
	line-height: 33px;
	margin-top: -17px;
	float: right;
}
.mc-content-head>.right .corner-tips._full{
	color: #4bca88;
}
.mc-content-head>.right .corner-tips._unfull{
	color: #e85959;
}
.mc-content-head>.right .object-name{
	display: block;
	max-height: 48px;
	margin-right: 55px;
	margin-bottom: 16px;
	line-height: 24px;
	font-size: 18px;
    font-weight: bold;
}
.mc-content-head>.right .information{
	height: 22px;
	margin-top: 11px;
	overflow: hidden;
	text-overflow: ellipsis;   /*超出显示省略号*/
	white-space: nowrap;       /*强制单行显示*/
}
.mc-content-head>.right .information>span{
	display: inline-block;
	height: 24px;
	line-height: 24px;
	color: #768087;
}
.mc-content-head>.right .information._1{
	height: 24px;
}
.mc-content-head>.right .information._1>span{
	margin-right: 10px;
	padding: 0 24px;
	font-size: 12px;
	color: #3b4953;
	background-color: #EBECED;
	   -moz-user-select:none;                      /*火狐*/
	-webkit-user-select:none;                   /*webkit浏览器*/
	    -ms-user-select:none;                       /*IE10*/
	 -khtml-user-select:none;                    /*早期浏览器*/
	        user-select:none;
}
.mc-content-head>.right .information._2{
	height: auto;
	max-height: 38px;
	white-space: normal;       /*强制单行显示*/
}
.mc-content-head>.right .information._2>div{
	display: inline-block;
	max-width: 100%;
	text-overflow: ellipsis;   /*超出显示省略号*/
	white-space: nowrap;       /*强制单行显示*/
}
.mc-content-head>.right .information._2>div._1{
	margin-right: 17px;
}
.mc-content-head>.right .information._2>div._1 a{
	color: #2F9DEA;
}
.mc-content-head>.right .information._2>div._1 a:hover{
	text-decoration: underline;
}
.mc-content-head>.right .information._2>div._2>div{
	display: inline-block;
	margin-right: 13px;
}
.mc-content-head>.right .information._2>div._2 .icon-xx{
	margin-right: 4px;
}
.mc-content-head>.right .intro{
	min-height: 24px;
	max-height: 200px;
	margin-top: 15px;
	color: #768087;
}
.mc-content-head>.right .intro .comment-label{
	float: left;
}
.mc-content-head .right .intro>div.content{
	max-height: 100px;
}
.mc-content-head>.right .bottom-btn-area{
	position: absolute;
	left: 0;
	bottom: 0;
	padding-left: 30px;
}
.row-lable-type-1 {
    margin-bottom: 17px;
}
</style>