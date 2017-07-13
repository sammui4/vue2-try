<template>
    <div>
        <div class="mc-content-head clear">
            <div class="floatLeft">
                <img src="images/demoimg/team1.jpg" />
                <span class="team_type color_green">创新团队</span>
                <!--<span class="team_type color_yellow">创业团队</span>-->
            </div>
            <div class="mc-content-head_right">
                <p>
                    <span class="organize_titie">飞瑞敖科技</span>
                    <!--认证了的话-->
                    <span class="authentication"></span>
                    <!--有官网的话-->
                    <a class="official_website" href="javascript:">官网</a>
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
                <p><span>本团队依托材料与能源学院，从全校范围内挑选具备科研创新能力的学生，立足于提高学生的创新创业能力，以开</span></p>
                <!--当权限为团队管理员时，显示此图标-->
                <router-link :to="{path:'/team/teamadmin'}" class="if_admin">
                    <Icon type="gear-b"></Icon>
                </router-link>
            </div>
        </div>        
    </div>
</template>

<script>
export default {

}
</script>

<style>
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
        background: url(../../assets/icon/bg-team.png) -250px 0 no-repeat;
        vertical-align: middle;
        margin: 0 5px;
    }
</style>
