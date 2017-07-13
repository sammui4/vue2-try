<template>
    <div class="indexTab">
        <ul class="indexTabul">
            <li class="down_head" v-for="(headlists,index) in headlist">
                <select class="form-control" @change="interesting()" v-model="senddata[index].id">
                    <option v-for="interesting in headlists.data" :value="interesting.id" v-text="interesting.name"></option>
                </select>
            </li>
        </ul>
        <div class="tab-handle">
            <ul>
                <li v-if="account.powers==1"><router-link class="a-btn" :to="{path:'/project/projectcreate'}">创建项目</router-link></li>
            </ul>
        </div>
        <div>
            <projectlist :datalist="listdata"></projectlist>
        </div>
        <div class="pagination" v-if="allpage>1" id="padding_top">
             <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
        </div>
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking> 
    </div>
</template>

<script>
    import qs from 'qs';
    import masking from '../../components/mask/mask.vue'
    import projectlist from '../../components/project/projectlist.vue'
    export default {
        data:function(){
            return {
                account:{
                    powers:null    
                },
                //头的放数据的地方
                headlist:[],
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
                //头部的玩意的url
                headurl:'http://localhost:2233/projecttype.php',
                //获取数据
                dataurl:'http://localhost:2233/projectdata.php',
                //分页
                dataurl2:'http://localhost:2233/projectdata2.php',
                //要发送的数据暂时储存
                senddata:[],
                //显示遮罩层
                ismask:false,
                //储存定时器
                timer:null,
                //mask高度设置
                maskheight:"115px"
            }
        },
        methods:{
            interesting:function(){
                this.nowpage = 1;
                this.ha();
            },
            clickchargepage:function(val){
                this.nowpage = val;
                var self = this;
                this.ismask = true;
                axios.post(self.dataurl2, qs.stringify({
                    onepagenum:self.onepagenum,
                    typeId:self.senddata[0].id,
                    gradeId:self.senddata[1].id,
                    devDegreeId:self.senddata[2].id,
                    page:self.nowpage
                })).then((res) => {
                    self.listdata = res.data.datalist;
                    self.allpage = Math.ceil(res.data.allnum / self.onepagenum);
                    self.hideLoading();
                })                 
            },
            ha:function(){
                var self = this;
                this.ismask = true;
                // var params = new URLSearchParams();
                // params.append('onepagenum',self.onepagenum)
                // params.append('typeId', self.senddata[0].id);
                // params.append('gradeId', self.senddata[1].id);
                // params.append('devDegreeId', self.senddata[2].id);
                // params.append('page', self.nowpage);   
                // axios.post(self.dataurl, params).then((res) => {
                axios.post(self.dataurl, qs.stringify({
                    onepagenum:self.onepagenum,
                    typeId:self.senddata[0].id,
                    gradeId:self.senddata[1].id,
                    devDegreeId:self.senddata[2].id,
                    page:self.nowpage                    
                })).then((res) => {
                    self.listdata = res.data.datalist;
                    self.allpage = Math.ceil(res.data.allnum / self.onepagenum);
                    self.hideLoading();
                    self.$store.commit('CLOSE_MASK'); 
                })                
            },
            hideLoading(){
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.ismask = false;
                },500)
            },
        },
        mounted:function(){
                var self = this;
                this.account = JSON.parse(localStorage.getItem('user'));
                axios.post(self.headurl).then((res) =>{
                    self.headlist = res.data.datalist;
                    for(let i=0;i<res.data.datalist.length;i++){
                        var aa = new Object();
                        aa.id = res.data.datalist[i].data[0].id;
                        self.senddata.push(aa);
                    }  
                    self.ha();                     
                })
        },
        components:{
            masking,
            projectlist
        }
    }
</script>

<style scpeed>

</style>
