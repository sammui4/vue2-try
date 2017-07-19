<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/classes">课程</Breadcrumb-item>
                <Breadcrumb-item>课程信息编辑</Breadcrumb-item>
            </Breadcrumb>
        </div>    
        <div id="mc-content">
            <div class="mc-content-head">
                <div class="left img-container">
                    <img src="../../../assets/demo/cycg3.jpg"/>
                </div>
                <div class="right">
                    <strong class="course-name">产品技术创新</strong>
                    <div class="information _1">
                        <span>课程分类</span>
                    </div>
                    <div class="intro text-not-overflow">
                        <span class="common-lable">简介：</span>
                        <div class="content">
                            我们作为网络广告行业的竞争对手有很多，大致可分为三类，1. 大型媒体类，如微博、微信、知乎等。这些公司的自有广告系统是我们竞争广告花费和社交流量的重要对手，我们面向多平台并专注植入式广告，比对手提供的服务更专注，花费更低。2. 网络广告平台，如好耶、易传媒、品友等。
                        </div>
                    </div>
                    <div class="information _2">
                        <span class="common-lable">开课时间：</span>
                        <span class="content">2016/7/8~2016/8/9</span>
                    </div>
                    <div class="bottom-btn-area">
                        <a href="#" class="btn-type-1 btn-type-blue">编辑开课信息</a>
                    </div>
                </div>
            </div>
            <div class="mc-content-bottom">
                <div class="head">
                    <Tabs value="name1">
                        <Tab-pane label="课程介绍" name="name1">标签一的内容</Tab-pane>
                        <Tab-pane label="开课信息" name="name2">
                            <!--放置开课时间表-->
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>开课时间</th>
                                        <th>备注</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            2016/7/8~2016/8/9
                                        </td>
                                        <td>
                                            上课地点：j5102
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            2016/7/8~2016/8/9
                                        </td>
                                        <td>
                                            上课地点：j5102
                                        </td>
                                    </tr>
                                </tbody>
                            </table>                                                   
                        </Tab-pane>
                        <Tab-pane label="主讲人" name="name3">
                            <div class="panel-group" id="accordion-1">
                                <div class="panel">
                                    <div class="panel-heading">
                                        <div class="left">
                                            <div class="img-container">
                                                <img src="../../../assets/default/hhu-portrait.png" alt="头像" />>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <strong>阿凡提</strong>
                                            <p>阿凡提是个有经验的专家，主导过原子弹、两弹一星、三代歼击机的研发，当前正在研发隐身轰炸机</p>
                                            <a class="handle collapsed" data-toggle="collapse" data-parent="#accordion-1" href="#collapse-0"><span class="icon-angle-down"></span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>                                                
                        </Tab-pane>
                        <Tab-pane label="课程目录" name="name4">
                            <ul id="case_catelogue">
                                <li class="clear" >
                                    <div class="floatRight">
                                        <!--<a href="#" data-toggle="modal" data-target="#video-show" data-keyboard="false">
                                            <i class="icon-film" title="查看"></i>
                                        </a>
                                        <a href="#">
                                            <span class="icon-arrow-down" title="下载"></span>	
                                        </a>-->
                                    </div>
                                    <div>
                                        <a href="javascript:">索尼大法好</a>
                                    </div>											
                                </li>	
                                <li class="clear" >
                                    <div class="floatRight">
                                        <a href="javascript:" title="查看">
                                            <Icon type="ios-film-outline" ></Icon>
                                        </a>
                                        <a href="javascript:" title="下载">
                                             <Icon type="arrow-down-c"></Icon>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="javascript:">索尼大法好</a>
                                    </div>											
                                </li>									
                            </ul>                                              
                        </Tab-pane>
                    </Tabs>                     
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return{      
            modal1: false        
        }
    },
    mounted(){
        this.$store.commit('CLOSE_MASK');
    }
}
</script>

<style scoped>
    .mc-content-head{
        position: relative;
        height: 270px;
    }
    .mc-content-head>.left{
        float: left;
        width: 360px;
        height: 240px;
    }
    .mc-content-head>.right{
        position: relative;
        max-width: 690px;
        height: 240px;
        margin-left: 360px;
        padding-left: 17px;
    }
    .mc-content-head>.right .information._1{
        height: 24px;
        margin-bottom: 15px;
    }
    .mc-content-head>.right .information._1 span{
        display: inline-block;
        height: 24px;
        line-height: 24px;
        margin-right: 10px;
        padding: 0 24px;
        font-size: 12px;
        color: #3b4953;
        background-color: #EBECED;
        -moz-user-select: none;
        -webkit-user-select: none;
            -ms-user-select: none;
        -khtml-user-select: none;
                user-select: none;
    }
    .mc-content-head>.right .intro{
        max-height: 100px;
        margin-bottom: 10px;
        color: #768087;
    }
    .mc-content-head>.right .intro .common-lable{
        float: left;
    }
    .mc-content-head>.right .information._2{
        color: #768087;
    }
    .mc-content-head>.right .information._2 .common-lable{
        float: left;
    }
    .mc-content-head>.right .information._2 .content{
        display: inline-block;
        color: #2F9DEA;
        margin-right: 12px;
    }
    .mc-content-head>.right .bottom-btn-area {
        position: absolute;
        left: 0;
        bottom: 0;
        padding-left: 17px;
    }

    @media screen and (max-width:1170px ) {
        .course-name{
            margin-bottom: 7px;
        }
        .mc-content-head>.right .information._1{
            margin-bottom: 7px;
        }
        
        .mc-content-head>.right .intro{
            margin-bottom: 7px;
        }
    }
    .course-name{
        display: block;
        height: 24px;
        line-height: 24px;
        margin-bottom: 17px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;   /*超出显示省略号*/
        white-space: nowrap;       /*强制单行显示*/
    
    }
    /*第二页*/
    .table thead{
        background-color: #E9F4FB;
        border: solid 1px #E9F4FB;
    }
    .table tr th{
        border-bottom: none;
    }
    .table tbody td{
        color: #768087;
        border: solid 1px #E6EFF4;          /*EDF5F9*/
        border-top: none;
        padding: 8px;
    }
    .table tbody td:first-of-type{
        width: 30%;
    }
    /*第三页*/
    #accordion-1 .panel-heading{
        overflow: auto;
    }
    #accordion-1 .panel-heading .left{
        width: 70px;
        height: 70px;
        float: left;
    }
    #accordion-1 .panel-heading .img-container{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: solid 1px #E9F4FB;
    }
    #accordion-1 .panel-heading .right{
        position: relative;
        min-height: 30px;
        padding: 0 50px 0 17px;
        overflow: hidden;
    }
    #accordion-1 .panel-heading .right>strong{
        line-height: 36px;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;   /*超出显示省略号*/
        white-space: nowrap;       /*强制单行显示*/
    }
    #accordion-1 .panel-heading .right>p{
        margin-top: 5px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;   /*超出显示省略号*/
        white-space: nowrap;       /*强制单行显示*/
    }
    #accordion-1 .panel-heading .right a.handle{
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-top: 17px;
        font-size: 26px;
        color: #2F9DEA;
    }
    .panel-heading {
        padding: 10px 15px;
        border-bottom:1px solid #f3f9fd;
    }
    /*第四页*/
    #case_catelogue{
        padding-right: 5%;
    }
    #case_catelogue>li{
        position: relative;
        padding-left: 12px;
    }
    #case_catelogue>li:before{
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        top: 14px;
        left: 5px;
        background: #ccc;
        content: "";
    }
    #case_catelogue>li>div:last-child>a{
        display: block;
    }

    #case_catelogue>li:hover{
        background: #eee;
    }
    #case_catelogue>li>div>a{
        padding: 9px;	
        color: #000;
        text-decoration: none;
    }
    #case_catelogue>li>div>a>i{
        font-size: 18px;
    }
    #case_catelogue>li>div.floatRight{
        padding-top: 9px;
    }
    #case_catelogue>li>div:last-child{
        overflow: hidden;
    }

    #case_catelogue li>a>span:last-child>span{
        padding: 5px;
    }
</style>
