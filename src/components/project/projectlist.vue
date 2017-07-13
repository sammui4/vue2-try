<template>
    <div>
        <div class="project-item" v-for="(data,index) in datalist">
            <!--<router-link :to="{path:'./project/projectdetail/'+data.id}" class="img-container">-->
            <router-link :to="{path:'/project/projectdetail',query:{id:data.id}}" class="img-container">
                <img :src="data.img" alt="" v-lazy="data.img" />
            </router-link>
            <div class="right">
                <strong class="project-name">
                    <router-link :to="{path:'/project/projectdetail',query:{id:data.id}}" class="common-a" title="项目项目名称名称项目名称项目名称项目名称" v-text="data.title">项目项目名称名称项目名称项目名称项目名称</router-link>
                </strong>
                <div class="information _1">
                    <span v-text="data.typename">方向分类</span>
                    <span v-text="data.levelname">等级分类</span>
                </div>
                <div class="intro" v-text="data.summary">
                    随着人们对智能手机的依赖越来越重，手机厂商针对人们的使用需求，为智能手机配备了大容量电池，以达到更好的续航效果....
                </div>
            </div>
            <span class="decorate" v-text="data.statename">进行中</span>
            <div class="project-legal-status" v-if="data.approval_status<3">
                <div class="full-bg"></div>
                <a href="#" class="common common_1" v-if="data.approval_status==0">未提交...</a>
                <a href="#" class="common common_2" v-if="data.approval_status==1">待审核...</a>
                <a href="#" class="common common_3" v-if="data.approval_status==2">未通过...</a>
            </div>
        </div>
		<div class="nonepic" v-if="datalist.length==0"></div>
    </div>
</template>
<style scoped>
.project-item {
    position: relative;
    width: 519px;
    height: 180px;
    padding: 13px 12px;
    background-color: #fff;
    border: solid 1px #ccc;
    display: inline-block;
    margin: 20px 19px 5px 0;
    overflow: hidden;
}

.project-item .img-container {
    display: block;
    width: 224px;
    height: 150px;
    float: left;
}

.project-item .right {
    width: 222px;
    height: 150px;
    margin-left: 12px;
    padding-top: 3px;
    float: left;
}

.project-item .project-name {
    display: block;
    font-weight: normal;
    height: 40px;
    overflow: hidden;
    word-wrap: break-word;
}

.project-item .information {
    height: 20px;
    margin-top: 3px;
    overflow: hidden;
}

.project-item .information>span {
    display: inline-block;
    line-height: 20px;
    height: 100%;
}

.project-item .information._1>span {
    margin-right: 7px;
    padding: 0 10px;
    font-size: 12px;
    color: #3b4953;
    background-color: #EBECED;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}

.project-item .intro {
    font-size: 13px;
    color: #768087;
    margin-top: 9px;
    height: 72px;
    overflow: hidden;
    word-wrap: break-word;
}

.project-item .decorate {
    width: 56px;
    background-color: #4BCA88;
    color: #fff;
    height: 24px;
    line-height: 24px;
    background-image: none;
}
.project-item .team-legal-status{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
}
.project-item .full-bg{
    background-color: #000;
    filter: alpha(opacity=30);
    -moz-opacity: 0.3;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 2;
}
.project-item .common{
    display: block;
    position: absolute;
    width: 129px;
    height: 41px;
    line-height: 41px;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    z-index: 2;
    color: #FFF;
    letter-spacing: 1px;
    background: url(../../assets/icon/sprite-1.png) no-repeat;
}
.project-legal-status .common_2{
    background-position-y: -51px;
}
.project-legal-status .common_3{
    background-position-y: -101px;
}



</style>
<script>
export default {
    props:['datalist']
}
</script>