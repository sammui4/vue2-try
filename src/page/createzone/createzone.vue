

<template>
    <div id="mc-content">
        <div class="banner">
            <div class="img-container">
                <img src="http://localhost:1235/images/site/site.jpg" placeholder="http://localhost:1235/images/site/site.jpg" />
            </div>
        </div>
        <div class="site-list-warp">
            <div class="head">
                <span>空间场地</span>
            </div>
            <ul class="site-list">
                <li class="site-item" v-for="data in listdata">
                    <a href="#" class="img-container">
                        <img src="http://localhost:1235/images/site/site-chuangyequ.jpg" :src="data.bigImgUrl" v-lazy="data.bigImgUrl"/>
                    </a>
                    <div class="right">
                        <strong class="site-name"><a href="#" class="common-a" v-text="data.areaName">创业区</a></strong>
                        <div class="information">
                            <span class="common-lable">面积：</span>
                            <span class="content" v-text="data.regionArea">500</span><span>m²</span>
                        </div>
                        <div class="intro">
                            <span class="common-lable">简介：</span>
                            <div class="content" v-text="data.areaIntro">
                                我们作为网络广告行业的竞争对手有很多，大致可分为三类，1. 大型媒体类，如微博、微信、知乎等。这些公司的自有广告系统是我们竞争广告花费和社交流量的重要对手，我们面向多平台并专注植入式广告，比对手提供的服务更专注，花费更低。2. 网络广告平台，如好耶、易传媒、品友等。这些公司是典型的DSP会与我们竞争广告商代理权和花费。我们的流量获取方式不同，所以导致成本远低于他们。3. 模仿竞争者，详见：商业计划
                            </div>
                        </div>
                        <a href="#" class="btn-type-1 btn-type-blue" data-toggle="modal" data-target="#modal-side-apply">申请使用</a><!--仅在团队管理员可以使用-->
                    </div>
                </li>                
            </ul>
            <div class="pagination" v-if="allpage>1" id="padding_top">
                <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    // import {mapState} from 'vuex'
    import masking from '../../components/mask/mask.vue'    
    export default {
        data(){
            return{
                //分页器总页数
                allpage: 0,
                //当前页数
                nowpage: 1,
                //总条数
                allimfomation: 0,
                //每页显示多少条
                onepagenum: 12,
                //返回来的数据
                listdata:[],
                dataurl:'http://localhost:2233/createzone.php',
                //屏蔽层高度
                maskheight:'60px',
                ismask:false,
                timer:null
            }
        },
        methods:{
            clickchargepage:function(val){
                var self = this;
                this.nowpage = val;
                this.ismask = true;
                axios.post(self.dataurl,qs.stringify({
                    onepagenum:self.onepagenum,
                    nowpage:val
                })).then((res) => {
                    self.listdata = res.data.datalist;
                    this.timer = setTimeout(() => {
                        clearTimeout(this.timer);
                        this.ismask = false
                    },500)
                })              
            }
        },
        mounted(){
            var self = this;
            axios.post(self.dataurl, qs.stringify({
                onepagenum:self.onepagenum,
                nowpage:self.nowpage               
            })).then((res) => {
                self.allimfomation = res.data.allnum;
                self.listdata = res.data.datalist;
                self.allpage = Math.ceil(res.data.allnum / self.onepagenum); 
                self.$store.commit('CLOSE_MASK');
            })                  
        },
        components:{
            masking
        },
        // computed: mapState([
        //     'account'
        // ])
    }
</script>

<style>
    .banner {
        position: relative;
        /*padding-bottom: 33.5%;*/
    }
    .site-list-warp>.head {
        height: 43px;
        margin-top: 40px;
        border-bottom: solid 3px #E9F4FB;
    }
    .site-list li {
        height: 285px;
        margin: 25px 0 0 0;
        padding-bottom: 25px;
        border-bottom: solid 1px #E9F4FB;
    }   
    .site-list li .img-container {
        width: 390px;
        height: 260px;
        float: left;
        overflow: hidden;
    } 
    .site-list li .right {
        position: relative;
        padding-left: 17px;
        height: 100%;
        margin-right: 0;
        max-width: 677px;
        border: solid 1px transparent;
        overflow: hidden;
    }
    .site-item .site-name {
        display: block;
        height: 24px;
        line-height: 24px;
        margin-top: 13px;
        margin-bottom: 20px;
        overflow: hidden;
        font-size: 16px;
    }
    .site-item .information,
    .site-item .intro{
        color: #768087;
    }
    .site-item .information{
        height: 24px;
        line-height: 24px;
        margin-top: 10px;
        overflow: hidden;
    }
    .site-item .information>span{
        display: inline-block;
        height: 100%;
        line-height: 24px;
    }
    .site-item .intro{
        margin-top: 10px;
    }
    .site-item .intro .common-lable{
        float: left;
    }
    .site-item .intro .content{
        max-height: 120px;
        margin-left: 44px;
        overflow: hidden;
        word-wrap: break-word;     /*连续英文换行*/
    }
    .site-item .btn-type-blue{
        position: absolute;
        left: 0;
        bottom: 0;
        margin-left: 17px;
    }
</style>
