<template>
    <div>
        <div id="mc-content">
            <lessonlist :datalist="listdata" :bottom="account"></lessonlist>
            <div class="pagination" v-if="allpage>1">
                <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
            </div>
            <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>
        </div>

    </div>
</template>

<script>
    import qs from 'qs';
    import lessonlist from '../../components/lesson/lessonlist'
    import masking from "../../components/mask/mask.vue"
    import {mapState} from 'vuex'
    export default {
        data(){
            return{
                // powers:null,
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
                dataurl:'http://localhost:1235/php/lessondata.php',
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
                // var params = new URLSearchParams();
                // params.append('onepagenum', self.onepagenum);
                // params.append('nowpage', self.nowpage); 
                // axios.post(self.url,params).then((res) => {
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
        mounted:function(){
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
            lessonlist,
            masking
        },
        computed: mapState([
            'account'
        ])        
    }
</script>

<style>

</style>



