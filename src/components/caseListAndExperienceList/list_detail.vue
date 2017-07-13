<template>
    <div class="list_item">
        <div class="list-item" v-for="datas in listdata">
            <div class="right" v-if="datas.num">
                <span class="description _1">数量：33</span>
            </div>
            <div class="left">
                <div class="img-container">
                    <img :src="datas.img" v-lazy="datas.img"/>
                </div>
                <div class="text-content">
                    <a href="javascript:" class="item-title common-a" v-text="datas.name"></a>
                </div>
            </div>
        </div>

        <div class="pagination" v-if="allpage>1">
             <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
        </div>
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>
    </div>
</template>
<script>
    // import axios from "axios"
    import qs from 'qs';    
    import masking from '../../components/mask/mask.vue'
    export default {
        data:function(){
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
                //屏蔽层高度
                maskheight:'115px',
                ismask:false,
                timer:null
            }
        },
        props:['url'],
        methods:{
            clickchargepage:function(val){
                var self = this;
                this.nowpage = val;
                this.ismask = true;
                // var params = new URLSearchParams();
                // params.append('onepagenum', self.onepagenum);
                // params.append('nowpage', self.nowpage); 
                // axios.post(self.url,params).then((res) => {
                axios.post(self.url,qs.stringify({
                    onepagenum:self.onepagenum,
                    nowpage:self.nowpage
                })).then((res) => {
                    self.listdata = res.data.datalist;
                    this.timer = setTimeout(() => {
                        clearTimeout(this.timer);
                        this.ismask = false
                    },500)
                })              
            }
        },
        mounted:function(){
            // console.log(this.url);
            var self = this;
            // var params = new URLSearchParams();
            // params.append('onepagenum', self.onepagenum);
            // params.append('nowpage', self.nowpage);
            // axios.post(self.url, params).then((res) => {
            axios.post(self.url, qs.stringify({
                onepagenum:self.onepagenum,
                nowpage:self.nowpage                
            })).then((res) => {
                self.allimfomation = res.data.allnum;
                self.listdata = res.data.datalist;
                self.allpage = Math.ceil(res.data.allnum / self.onepagenum); 
                // console.log(res.data.datalist);
                self.$store.commit('CLOSE_MASK');
            })
        },
        components:{
            masking
        }
    }
</script>
<style>
    .list_item{
        padding-top: 20px;
    }
    .list_item .pagination{
        padding: 30px;
    }
    .list-item{
        height: 80px;
        padding: 10px 0px;
        border-bottom: solid 1px #E9F4FB;
        overflow: hidden;
        margin-left:30px;
    }
    .list-item:hover{
        background-color: #f3f9fd;
    }
    .list-item>.left{
        height: 60px;
        overflow: hidden;
    }
    .list-item>.left .img-container{
        width: 60px;
        height: 60px;
        margin-left: 10px;
        float: left;
    }
    .list-item>.left .text-content{
        padding-left: 17px;
        overflow: hidden;
        word-wrap: break-word;     /*连续英文换行*/
    }
    .list-item>.left .text-content a{
        color:#3b4953;
    }
    .list-item>.right{
        position: relative;
        width: 150px;
        margin-left: 150px;
        height: 60px;
        float: right;
        overflow: hidden;
    }

</style>