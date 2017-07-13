<template>
    <div>
        <div class="tab-handle">
            <span class="a-btn" @click="toggleclick">增加团队</span>
            <div class="info_show" v-show="active==true">
                <a href="#">创新团队</a>
                <a href="#">创业团队</a>
            </div>
        </div>
        <div class="item-type-1">
            <div class="head">
                <span>我创建的</span>
                <div class="handle-area">
                    <!-- <a href="#">创建团队</a> -->
                </div>
            </div> 
            <div class="content">
                <ul class="team_list">

                    <li class="clear">
                        <div class="floatLeft">
                            <!-- <img src="images/demoimg/team1.jpg" /> -->
                            <!--<span class="team_type color_green">创新团队</span>-->
                            <span class="team_type color_yellow">创业团队</span>
                            <!--尚未发布的加上这个-->
                            <div class="masking_surface">
                                <a href="">待发布</a>
                            </div>
                        </div>
                        <div class="mc-content-head_right">
                            <p>
                                <span class="organize_titie">飞瑞敖科技</span>
                                <!--认证了的话-->
                                <span class="authentication"></span>
                                <!--有官网的话-->
                                <a class="official_website" href="">官网</a>
                            </p>
                            <p>
                                <span>公司全称：</span>
                                <!--<span>广州飞瑞敖电子科技股份有限公司</span>-->
                                <!--无认证的-->
                                <span>无</span>
                            </p>
                            <p>
                                <span>行业领域：</span><span>通信-电信-网络设备</span>
                            </p>
                            <p class="team_summary">本团队依托材料与能源学院，从全校范围内挑选具备科研创新能力的学生，立足于提高学生的创新创业能力，以开</p>
                            <!--当权限为团队管理员时，显示此图标-->
                            <div class="if_admin">
                                <span class="toggle_show"><Icon type="plus-round"></Icon></span>
                                <a href="team-admin.html" ><Icon type="ios-gear"></Icon></a>	
                                <div class="info_show">
                                    <div>
                                        <a href="#">邀请成员</a>
                                        <a href="#">添加新闻</a>
                                        <a href="#">添加招聘</a>														
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul> 
            </div>
        </div>
        <div class="item-type-1">
            <div class="head">
                <span>我加入的</span>
                <div class="handle-area">
  
                </div>
            </div>  
            <div class="content">
                <ul class="team_list">
                    <li class="clear">
                        <div class="floatLeft">
                            <!-- <img src="images/demoimg/team1.jpg" /> -->
                            <span class="team_type color_green">创新团队</span>
                            <!--<span class="team_type color_yellow">创业团队</span>-->
                        </div>
                        <div class="mc-content-head_right">
                            <p>
                                <span class="organize_titie">飞瑞敖科技</span>
                                <!--认证了的话-->
                                <span class="authentication"></span>
                                <!--有官网的话-->
                                <a class="official_website" href="">官网</a>
                            </p>
                            <p>
                                <span>公司全称：</span>
                                <span>广州飞瑞敖电子科技股份有限公司</span>
                                <!--无认证的-->
                                <!--<span>无</span>-->
                            </p>
                            <p>
                                <span>行业领域：</span><span>通信-电信-网络设备</span>
                            </p>
                            <p class="team_summary">本团队依托材料与能源学院，从全校范围内挑选具备科研创新能力的学生，立足于提高学生的创新创业能力，以开</p>
                            <!--当权限为团队管理员时，显示此图标-->
                            <div class="if_admin">
                                <span class="toggle_show"><i class="icon-plus-sign"></i></span>
                                <a href="team-admin.html" ><i class="icon-cog"></i></a>	
                            </div>
                        </div>
                    </li>
                </ul>
            </div>          
        </div>  
        <!-- <div class="item-type-1">
            <div class="head">
                <span>我编辑的</span>
                <div class="handle-area">
                    
                </div>
            </div>  
            <div class="content">
            </div>          
        </div>        -->
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                active:false
            }
        },
        mounted:function(){
            this.$store.commit('CLOSE_MASK');
        },
        methods:{
            toggleclick:function(){
                this.active=!this.active
            }
        }
    }
</script>
<style scoped>
.tab-handle>.info_show{
	background: #fff;
	box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
}
.tab-handle>.info_show a{
	text-decoration: none;
	display: block;    
	padding: 7px 16px;
}
.tab-handle>.info_show a:hover{
	background: #F3F9FD;
}
/*teamlist*/
.team_list li{
	position: relative;
	padding:40px 0 40px 10px;
	border: 1px solid #eee;
}
.team_list .floatLeft{
	width: 195px;
	height: 130px;
	background: #ccc;
	margin-right: 20px;
	position: relative;
	overflow: hidden;
}
.team_list .floatLeft>img{
	width: 100%;
	height: 100%;
}
.team_list .floatLeft .masking_surface{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0,0,0,0.3);
}
.team_list .floatLeft .masking_surface a{
	display: block;
    position: relative;
    width: 129px;
    height: 41px;
    line-height: 41px;
    margin: 23% auto;
    text-align: center;
    z-index: 2;
    color: #FFF;
    letter-spacing: 1px;
    background: url(../../../assets/icon/sprite-1.png) no-repeat;	  
    text-decoration: none;
}

.mc-content-head_right{
	position: absolute;
	left: 220px;
	right: 0;
}
.mc-content-head_right>p{
	height: 33px;
	line-height: 33px;
	vertical-align: middle;
}
.mc-content-head_right .if_admin{
	position: absolute;
	top: 40px;
	right: 40px;
	color: #2F9DEA;
}
.mc-content-head_right .if_admin>a{
	text-decoration: none;
	margin-left: 20px;
}
.mc-content-head_right .if_admin i{
	font-size: 20px;
	color: #2f9dea;
}
.if_admin .info_show{
	position: absolute;
	color: currentcolor;
	top: 30px;
	right: 40px;
	width: 70px;
	display: none;
}
.if_admin .info_show.active{
	display: block;
}
.if_admin .info_show>div{
	border-radius:5px;
	overflow: hidden;	
}
.if_admin .info_show:before{
	position: absolute;
	top: -8px;
	right: 7px;
	content: '';
	border:4px solid transparent;
	border-bottom-color: #2f9dea;
}
.if_admin .info_show a{
	color: #fff;
	text-align: center;
	display: block;
	line-height: 24px;
	text-decoration: none;
}
.if_admin .info_show a:nth-child(odd){
	background: #2f9dea;
}
.if_admin .info_show a:nth-child(even){
	background: #46aff9;
}
</style>