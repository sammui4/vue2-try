<template>
    <div>
        <div class="competition-item" v-for="(data,index) in datalist">
            <div class="right" v-if="isedit==0">
                <div><router-link :to="{path:'/match/matchedit'}" class="common-a"><Icon type="edit"></Icon><span class="edit_left">编辑</span></router-link></div>
            </div>
            <div class="left">
                <div class="state" v-text="data.typename" :class="'_'+data.state">未开始</div>
                <div class="detail">
                    <a href="#" class="competition-title common-a" title="全国高校移动互联网应用开发创新大赛" v-text="data.title">全国高校移动互联网应用开发创新大赛</a>
                    <div class="time-horizon">
                        <span v-text="data.time">2016年6月6日</span>
                    </div>
                    <div class="intro" v-text="data.summary">
                        全国高校移动互联网应用开发创新大赛，旨在提升高校学生积极参与移动互联网领域的研究兴趣，激发学生团队创新热情，提高技术应用与程序开发能力，推动高校开展移动互联网应用领域的
                    </div>
                </div>
            </div>
        </div>
		<div class="nonepic" v-if="datalist.length==0"></div>
    </div>
</template>
<style scoped>
    /*赛事*/
    .competition-item{
        min-height: 20px;
        padding: 17px 0;
        border-bottom: solid 1px #E9F4FB;
    }
    .competition-item:hover{
        background-color: #f3f9fd;
    }
    .competition-item>.left{
        overflow: auto;
        overflow-x: hidden;
    }
    .competition-item>.left>.state{
        width: 100px;
        height: 100px;
        line-height: 100px;
        font-size: 16px;
        text-align: center;
        float: left;
    }
    .state._2{
        color: #fff;
        background-color: #2f9dea;
    }
    .state._3{
        color: #fff;
        background-color: #4bca88;
    }
    .state._4{
        color: #3b4953;
        background-color: #EBECED;
    }
    .competition-item>.left>.detail{
        padding-left: 117px;
    }
    .competition-item>.left>.detail strong{
        font-weight: normal;
    }
    .competition-title{
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;   /*超出显示省略号*/
        white-space: nowrap;       /*强制单行显示*/
    }

    .competition-item .time-horizon{
        color: #2f9dea;
        margin-top: 3px;
        overflow: hidden;
        text-overflow: ellipsis;   /*超出显示省略号*/
        white-space: nowrap;       /*强制单行显示*/
    }
    .competition-item .intro{
        max-height: 40px;
        margin-top: 7px;
        color: #768087;
        overflow: hidden;
        word-wrap: break-word;     /*连续英文换行*/
    }
    .competition-item>.right{
        position: relative;
        width: 300px;
        height: 100px;
        padding-left: 150px;
        float: right;
    }
    .competition-item>.right .link-1{
        position: absolute;
        bottom: 0;
        color: #2f9dea;
    }
    .competition-item>.right .link-1:hover{
        text-decoration: underline;
    }
    /*赛事end*/
</style>
<script>
export default {
    props: ['datalist','isedit']
}
</script>
