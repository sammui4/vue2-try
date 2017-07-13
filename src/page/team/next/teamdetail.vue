<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/team">团队</Breadcrumb-item>
                <Breadcrumb-item v-text="$route.query.id"></Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div id="mc-content">
            <teamhead></teamhead>
            <div class="mc-content-bottom">
                <div class="head">
                    <Tabs value="name1">
                        <Tab-pane label="团队介绍" name="name1">标签一的内容</Tab-pane>
                        <Tab-pane label="团队成员" name="name2">
                            <ul class="team_leaguer">
                                <li>
                                    <div class="leaguer_img floatLeft">
                                        <img src="../../../assets/default/hhu-portrait.png" alt="" />
                                    </div>
                                    <div class="overflow">
                                        <p>w</p>
                                        <p>ceo</p>
                                    </div>
                                </li>									
                            </ul>
                        </Tab-pane>
                        <Tab-pane label="团队动态" name="name3">
                            <ul id="team_news">
                                <li class="clear" @click="teamDynamic = true">
                                    <p class="text-ellipsis-1">广州飞瑞敖电子科技股份有限公司成功挂牌新三板，股票代码为870418</p>
                                    <p>2017-04-21</p>
                                </li>
                            </ul>   
                            <div class="pagination">
                                <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
                            </div>                         
                        </Tab-pane>
                        <Tab-pane label="招聘信息" name="name4">
                            <ul id="advertises_for">
                                <li>
                                    <div class="clear"><strong>APP设计师(<span>2</span>人)</strong>
                                        <span class="floatRight"  @click="jobApplication = true">申请职位</span>
                                    </div>
                                    <!--这里放简介内容-->
                                    <div class="abstract">
                                        <p>这个职位要求不高，实习ui设计师也可以，有高手带。工作好沟通 项目好玩又有趣，年终奖励也多 SO easy~ 面试前可以先电话沟通，面试时请带好项目案例，期待与您见面！</p>
                                    </div>

                                    <div slot="content">
                                        <div id="more_detail_1">
                                            <p><span style="line-height: 1;">工作内容</span></p>
                                            <p><span style="line-height: 1;">日常工作内容主要是ui设计方面的，各类型APP界面设计，PC界面设计，没有UI相关作品的不要投简历哦</span><span style="line-height:1;">​</span><br></p>
                                            <p><br></p>
                                            <p><span style="line-height: 1;">岗位要求</span></p>
                                            <p><span style="line-height: 1;">1.真正热爱设计工作者优先</span></p>
                                            <p><span style="line-height: 1;">2.至少半年以上设计相关工作经验，精通PS、了解APP设计流程，熟悉设计相关工作软件</span></p>
                                            <p><span style="line-height: 1;">3.有一定的APP开发流程项目了解</span></p>
                                            <p><span style="line-height: 1;">4.工作细心认真，有责任心，有朝气，够活跃会更好</span></p>
                                        </div>
                                    </div>            
                                   <span @click="toggleclick">显示更多</span>
                                </li>
                            </ul>    
                            <div class="pagination">
                                <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
                            </div>                            
                        </Tab-pane>
                        <Tab-pane label="团队项目" name="name5">
                            <project></project>
                        </Tab-pane>
                    </Tabs>
                </div>
            </div>
        </div>
        <Modal v-model="teamDynamic" width="1040">
            <p slot="header">
                <span>团队新闻</span>
            </p>
            <div class="modal-body-head">
                <p>广州飞瑞敖电子科技股份有限公司成功挂牌新三板，股票代码为870418</p>
                <span>2017-04-21</span>
            </div>
            <div>
                <p style="margin-bottom:10px;"><span style="line-height:1;">为进一步提高高校学生在移动互联网领域的应用创新能力，培养学生团队的自主创新意识，驻进高校积极开展相关实践和技术人才培养，教育部科技发展中心举办了三届“全国高校移动互联网应用开发创新大赛”，得到了广大高校的热烈响应。为继续推动移动互联网应用开发创新活动的开展，我们“中心”定于2017年4月~2017年11月举报“第四届全国高校移动互联网应用开发创新大赛”。现将有关事宜通知如下：​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1.5;">一、赛项主题</span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">全国高移动互联网开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网领域的开发和应用创新，促进成果转化。本次大赛分为移动创意赛、应用挑战赛、移动安全赛、移动命题赛、VR创新赛五个类别。移动创意赛特设北斗导航系统专区，鼓励应用我国自主建立的北斗导航系统，设计和开发移动互联网和导航定位等相关领域的相关应用。​​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">为进一步提高高校学生在移动互联网领域的应用创新能力，培养学生团队的自主创新意识，驻进高校积极开展相关实践和技术人才培养，教育部科技发展中心举办了三届“全国高校移动互联网应用开发创新大赛”，得到了广大高校的热烈响应。为继续推动移动互联网应用开发创新活动的开展，我们“中心”定于2017年4月~2017年11月举报“第四届全国高校移动互联网应用开发创新大赛”。现将有关事宜通知如下：​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1.5;">一、赛项主题</span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">全国高移动互联网开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网领域的开发和应用创新，促进成果转化。本次大赛分为移动创意赛、应用挑战赛、移动安全赛、移动命题赛、VR创新赛五个类别。移动创意赛特设北斗导航系统专区，鼓励应用我国自主建立的北斗导航系统，设计和开发移动互联网和导航定位等相关领域的相关应用。​​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">为进一步提高高校学生在移动互联网领域的应用创新能力，培养学生团队的自主创新意识，驻进高校积极开展相关实践和技术人才培养，教育部科技发展中心举办了三届“全国高校移动互联网应用开发创新大赛”，得到了广大高校的热烈响应。为继续推动移动互联网应用开发创新活动的开展，我们“中心”定于2017年4月~2017年11月举报“第四届全国高校移动互联网应用开发创新大赛”。现将有关事宜通知如下：​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1.5;">一、赛项主题</span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">全国高移动互联网开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网领域的开发和应用创新，促进成果转化。本次大赛分为移动创意赛、应用挑战赛、移动安全赛、移动命题赛、VR创新赛五个类别。移动创意赛特设北斗导航系统专区，鼓励应用我国自主建立的北斗导航系统，设计和开发移动互联网和导航定位等相关领域的相关应用。​​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">为进一步提高高校学生在移动互联网领域的应用创新能力，培养学生团队的自主创新意识，驻进高校积极开展相关实践和技术人才培养，教育部科技发展中心举办了三届“全国高校移动互联网应用开发创新大赛”，得到了广大高校的热烈响应。为继续推动移动互联网应用开发创新活动的开展，我们“中心”定于2017年4月~2017年11月举报“第四届全国高校移动互联网应用开发创新大赛”。现将有关事宜通知如下：​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1.5;">一、赛项主题</span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">全国高移动互联网开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网领域的开发和应用创新，促进成果转化。本次大赛分为移动创意赛、应用挑战赛、移动安全赛、移动命题赛、VR创新赛五个类别。移动创意赛特设北斗导航系统专区，鼓励应用我国自主建立的北斗导航系统，设计和开发移动互联网和导航定位等相关领域的相关应用。​​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">为进一步提高高校学生在移动互联网领域的应用创新能力，培养学生团队的自主创新意识，驻进高校积极开展相关实践和技术人才培养，教育部科技发展中心举办了三届“全国高校移动互联网应用开发创新大赛”，得到了广大高校的热烈响应。为继续推动移动互联网应用开发创新活动的开展，我们“中心”定于2017年4月~2017年11月举报“第四届全国高校移动互联网应用开发创新大赛”。现将有关事宜通知如下：​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1.5;">一、赛项主题</span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">全国高移动互联网开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网领域的开发和应用创新，促进成果转化。本次大赛分为移动创意赛、应用挑战赛、移动安全赛、移动命题赛、VR创新赛五个类别。移动创意赛特设北斗导航系统专区，鼓励应用我国自主建立的北斗导航系统，设计和开发移动互联网和导航定位等相关领域的相关应用。​​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">为进一步提高高校学生在移动互联网领域的应用创新能力，培养学生团队的自主创新意识，驻进高校积极开展相关实践和技术人才培养，教育部科技发展中心举办了三届“全国高校移动互联网应用开发创新大赛”，得到了广大高校的热烈响应。为继续推动移动互联网应用开发创新活动的开展，我们“中心”定于2017年4月~2017年11月举报“第四届全国高校移动互联网应用开发创新大赛”。现将有关事宜通知如下：​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1.5;">一、赛项主题</span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">全国高移动互联网开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网领域的开发和应用创新，促进成果转化。本次大赛分为移动创意赛、应用挑战赛、移动安全赛、移动命题赛、VR创新赛五个类别。移动创意赛特设北斗导航系统专区，鼓励应用我国自主建立的北斗导航系统，设计和开发移动互联网和导航定位等相关领域的相关应用。​​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">为进一步提高高校学生在移动互联网领域的应用创新能力，培养学生团队的自主创新意识，驻进高校积极开展相关实践和技术人才培养，教育部科技发展中心举办了三届“全国高校移动互联网应用开发创新大赛”，得到了广大高校的热烈响应。为继续推动移动互联网应用开发创新活动的开展，我们“中心”定于2017年4月~2017年11月举报“第四届全国高校移动互联网应用开发创新大赛”。现将有关事宜通知如下：​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1.5;">一、赛项主题</span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">全国高移动互联网开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网领域的开发和应用创新，促进成果转化。本次大赛分为移动创意赛、应用挑战赛、移动安全赛、移动命题赛、VR创新赛五个类别。移动创意赛特设北斗导航系统专区，鼓励应用我国自主建立的北斗导航系统，设计和开发移动互联网和导航定位等相关领域的相关应用。​​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">为进一步提高高校学生在移动互联网领域的应用创新能力，培养学生团队的自主创新意识，驻进高校积极开展相关实践和技术人才培养，教育部科技发展中心举办了三届“全国高校移动互联网应用开发创新大赛”，得到了广大高校的热烈响应。为继续推动移动互联网应用开发创新活动的开展，我们“中心”定于2017年4月~2017年11月举报“第四届全国高校移动互联网应用开发创新大赛”。现将有关事宜通知如下：​<br></span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1.5;">一、赛项主题</span></p>
                <p style="margin-bottom:10px;"><span style="line-height:1;">全国高移动互联网开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网领域的开发和应用创新，促进成果转化。本次大赛分为移动创意赛、应用挑战赛、移动安全赛、移动命题赛、VR创新赛五个类别。移动创意赛特设北斗导航系统专区，鼓励应用我国自主建立的北斗导航系统，设计和开发移动互联网和导航定位等相关领域的相关应用。​​<br></span></p>
            </div>
            <div slot="footer">
            
            </div>
        </Modal>
        <Modal
            v-model="jobApplication"
            @on-ok="jobApplicationok" id="jobApplication">
            <p slot="header">
                <span>职位申请</span>
            </p>
            <p>申请职位：<span>大算法工程师</span></p>
            <textarea name="" rows="" cols="" placeholder="此处填写申请说明，理由，自我简介等"></textarea>
        </Modal>
    </div>
</template>
<style scoped>
    #mc-content {
        padding: 40px 30px 0 30px;
    }
    .mc-content-head{
        position: relative;
    }
    #mc-content .content.tab-content{
        padding-top: 15px;
    }
    .mc-content-head .floatLeft{
        width: 195px;
        height: 130px;
        background: #ccc;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
    }
    .mc-content-head .floatLeft>img{
        width: 100%;
        height: 100%;
    }
    .mc-content-head_right{
        position: absolute;
        left: 215px;
        right: 0;
    }
    .mc-content-head_right>p{
        height: 33px;
        line-height: 33px;
        vertical-align: middle;
    }
    .mc-content-head_right .if_admin{
        position: absolute;
        top: 0px;
        right: 0px;
        color: #2F9DEA;
    }
    .mc-content-head_right .if_admin>i{
        font-size: 20px;
    }
    .mc-content-head_right>p>span{
        font-size: 16px;	
    }
    .mc-content-head_right .organize_titie{
        font-weight: bold;
    }
    .mc-content-head_right .official_website{
        padding: 0 3px;
        color: #fff;
        background: #2F9DEA;
        text-decoration: none;
    }
    .mc-content-head_right .authentication{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(../../../assets/icon/bg-team.png) -250px 0 no-repeat;
        vertical-align: middle;
        margin: 0 5px;
    }
    .mc-content-bottom>.head .nav-tabs li{
        display: inline-block;
    }
    .mc-content-bottom>.head .nav-tabs li>a {
        display: inline-block;
        height: 100%;
        line-height: 40px;
        padding: 0 27px;
        font-size: 16px;
        border-bottom: solid 3px transparent;
    }
    .mc-content-bottom>.head .nav-tabs>li.active>a{
        color: #2F9DEA;
        border-bottom: solid 3px #2F9DEA;
    }

    /*第二部分*/
    .team_leaguer{
        padding-top: 30px;
    }
    .team_leaguer li{
        display: inline-block;
        width: 300px;
        padding: 15px 20px 0 20px;
        height: 80px;
        border: 1px solid #e7e7e7;
        margin:0 18px 20px 0;
    }
    .team_leaguer li:hover{
        -moz-box-shadow: 2px 2px 2px #ccc;
        -webkit-box-shadow: 2px 2px 2px #ccc;
        box-shadow: 2px 2px 2px #ccc;
    }
    .team_leaguer li .overflow{
        line-height: 24px;
    }
    .leaguer_img{
        margin-right: 16px;
    }
    .leaguer_img img{
        width: 50px;
        height: 50px;
        border: 1px solid #e7e7e7;
        border-radius: 25px;
    }
    /*第三部分*/
    #team_news{
        padding-bottom: 40px;
    }
    #team_news>li{
        line-height: 55px;
        height: 55px;
        position: relative;
    }
    #team_news>li>p:first-child{
        position: absolute;
        left: 0;
        right: 100px;
        top: 0;
        bottom: 0;
        padding-right: 5%;
        text-indent: 14px;
    }
    #team_news>li>p:last-child{
        float: right;
        width: 100px;
        color: currentcolor;
    }
    #team_news>li:hover{
        background: #F3F9FD;
        color: #2F9DEA;
    }
    /*第四部分*/
    #advertises_for{
        padding-bottom: 40px;
    }
    #advertises_for>li{
        padding-bottom: 10px;
        border-bottom: 1px solid #E9F4FB;
        margin-bottom: 20px;
    }
    #advertises_for>li>div>.floatRight{
        width: 74px;
        height: 36px;
        line-height: 36px;
        background: #2F9DEA;
        color: #fff;
        text-align: center;
        cursor: pointer;
    }
    #advertises_for>li>div:first-child{
        height: 40px;
        line-height: 40px;
    }
    #advertises_for>li .abstract{
        margin:5px 0 20px 0;
        padding-right: 16%;
    }
    #advertises_for>li .panel-collapse>p{
        margin: 0 0 10px;
        padding-right: 16%;
    }   
    /*申请职位模态框*/ 
    #jobApplication textarea {
        margin-top: 10px;
        width: 100%;
        height: 84px;
    }
</style>
<script>
import project from '../../../components/project/projectlist'
// import masking from '../../common/vue/mask.vue'
import teamhead from './teamhead.vue'
export default {
    data: function () {
        return {
            //团队招聘的模态框开关
            jobApplication:false,
            //团队动态的模态框开关
            teamDynamic:false,
            //分页器总页数            
            allpage: 0,
            //当前页数
            nowpage: 1,
            //总条数
            allimfomation: 0,
            //每页显示多少条
            onepagenum: 12,
            //显示遮罩层
            ismask:false,
            //储存定时器
            timer:null,
            //mask高度设置
            maskheight:"115px"
        }
    },
    components:{
        project,
        // masking,
        teamhead
    },
    methods:{
        teamDynamicok:function(){
            this.$Message.info('点击了团队动态的确定');
        },
        jobApplicationok:function(){
            this.$Message.info('点击了申请工作的确定');
        },
        clickchargepage:function(){

        },
        toggleclick:function(){

        }
    },
    mounted(){
        this.$store.commit('CLOSE_MASK');
    }
}
</script>
