<template>
    <div>
        <div class="course-item" v-for="data in datalist">
            <div class="left">
                <a href="#" class="img-container">
                    <img src="../../assets/demo/cycg4.jpg" :src="data.img" v-lazy="data.img"/>
                </a>
            </div>
            <div class="right">
                <strong class="course-name">
                    <router-link :to="{ path: '/classes/classesdetail',query:{id:data.id} }" v-text="data.title">U理论</router-link>
                </strong>
                <div class="information _1">
                    <span v-text="data.lessontype">课程分类</span>
                </div>
                <div class="intro text-not-overflow">
                    <span class="common-lable">简介：</span>
                    <div class="content" v-text="data.summary">
                        我们作为网络广告行业的竞争对手有很多，大致可分为三类，1. 大型媒体类，如微博、微信、知乎等。这些公司的自有广告系统是我们竞争广告花费和社交流量的重要对手，我们面向多平台并专注植入式广告，比对手提供的服务更专注，花费更低。2. 网络广告平台，如好耶、易传媒、品友等。
                    </div>
                </div>
                <div class="information _2">
                    <span class="common-lable">开课时间：</span>
                    <span class="content" v-text="data.time">2016/7/8~2016/8/9</span>
                </div>
                <div class="bottom-btn-area" v-if="bottom!==undefined"> 
                    <router-link :to="{path:'/classes/classesadmin',query:{id:data.id}}" class="btn-type-1 btn-type-blue" v-if="bottom.powers==0">编辑开课信息</router-link>
                    <router-link :to="{path:'/classes/classesdetail',query:{id:data.id}}" class="btn-type-1 btn-type-blue" v-if="bottom.powers==1">课程详情</router-link>                    
                </div>
            </div>
        </div> 
		<div class="nonepic" v-if="datalist.length==0"></div>       
    </div>
</template>
<style scoped>
    .course-item{
        height: 270px;
        border-bottom: solid 1px #E9F4FB;
        margin-bottom: 30px;
        margin-top: 10px;
    }
    .course-item>.left{
        float: left;
        width: 360px;
        height: 240px;
    }
    .course-item>.left>.img-container{
        display: block;
        width: 360px;
        height: 240px;
    }
    .course-item>.right{
        position: relative;
        max-width: 690px;
        height: 240px;
        padding-left: 17px;
        overflow: hidden;
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
    .course-item .information._1{
        height: 24px;
        margin-bottom: 15px;
    }
    .course-item .information._1 span{
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
    .course-item .intro{
        max-height: 100px;
        margin-bottom: 10px;
        color: #768087;
    }
    .course-item .intro .common-lable{
        float: left;
    }
    .course-item .information._2{
        color: #768087;
    }
    .course-item .information._2 .common-lable{
        float: left;
    }
    .course-item .information._2 .content{
        display: inline-block;
        color: #4BCA88;
        margin-right: 12px;
    }
    .course-item .bottom-btn-area {
        position: absolute;
        left: 0;
        bottom: 0;
        padding-left: 17px;
    }

    @media screen and (max-width:1170px ) {
        .course-name{
            margin-bottom: 7px;
        }
        .course-item .information._1{
            margin-bottom: 7px;
        }
        
        .course-item .intro{
            margin-bottom: 7px;
        }
    }
    .course-name a{
        color: #3b4953;
    }
</style>
<script>
    export default {
        props:['datalist','bottom']
    }

</script>