<template>
    <div class="inforhead">
        <div>
            <div class="choosen">
                <div class="form-cr" @click="isreading(false)" :class="isread==false?'active':''">
                    <input type="radio" name="isDealwith" id="target_2_1-1" value="" v-bind:checked="isread==false?'checked':''">
                    <label for="target_2_1-1"><span class="box-icon"></span><span class="form-checkbox-inset-lable">未处理</span></label>
                </div> 
                <div class="form-cr" @click="isreading(true)" :class="isread==true?'active':''">
                    <input type="radio" name="isDealwith" id="target_2_1-3" value="" v-bind:checked="isread==true?'checked':''">
                    <label for="target_2_1-3"><span class="box-icon"></span><span class="form-checkbox-inset-lable">已处理</span></label>
                </div>     
            </div>
        </div>
        <div>
            <table class="teamOrProject">
                <thead>
                    <tr>
                        <th>申请团队</th>
                        <th>申请时间</th>
                        <th>申请人</th>
                        <th>申请结果</th>
                        <th>申请备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in informationdataarray">
                        <td v-text="data.applyteam">亚龙湾大哥</td>
                        <td v-text="data.applytime">2017年4月11日</td>
                        <td>W</td>
                        <td>
                            <p class="isPassed" v-if="data.result==2">通过</p>
                            <p class="unPassed" v-if="data.result==1">未通过</p>
                            <p class="wattingForPass" v-if="data.result==0">未审批</p>
                        </td>
                        <td>
                            <p v-text="data.apply_mask">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈v哈哈哈哈哈哈哈哈哈哈哈哈</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination" v-if=" allpage>1">
                <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
            </div>            
        </div>
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>
    </div>
</template>

<script>
import qs from 'qs'
import masking from '../../../../components/mask/mask'
export default {
    data(){
        return {
            isread:false,
            //mask高度设置
            maskheight:"230px",
            ismask:false,
            //还回来的数据
            informationdataarray:[],
            //用户信息
            account: {},
            //分页器总页数
            allpage: 0,
            //当前页数
            nowpage: 1,
            //总条数
            allimfomation: 0,
            //每页显示多少条
            onepagenum: 12,
            //模态框1
            modal1: false,
            //储存定时器
            timer:null,
            //切换和加载首页数据
            newurl:'http://localhost:1235/php/member_invitate.php',
            //分页切换数据
            newpageurl:'http://localhost:1235/php/member_invitate_paga.php',
        }
    },
    mounted(){
        var self = this;
        this.account = this.$store.state.account;
        axios.post(self.newurl, qs.stringify({
            id:self.account.id,
            onepagenum:self.onepagenum,
            isread:self.isread,
            nowpage:self.nowpage
        })).then((res) => {
            console.log(res.data);
            self.allimfomation = res.data.allnum;
            self.informationdataarray = res.data.datalist;
            self.allpage = Math.ceil(res.data.allnum / self.onepagenum);   
            self.$store.commit('CLOSE_MASK');    
            self.hideLoading();   
        })
    },
    components:{
        masking
    },
    methods:{
        //切换已读和未读
        isreading:function(bol){
            var self = this;
            this.isread = bol;
            this.ismask = true;
            self.nowpage = 1;

            axios.post(self.newurl, qs.stringify({
                id:self.account.id,
                onepagenum:self.onepagenum,
                isread:bol,
                nowpage:self.nowpage
            })).then((res) => {
                self.allimfomation = res.data.allnum;
                self.informationdataarray = res.data.datalist;
                self.allpage = Math.ceil(res.data.allnum / self.onepagenum);       
                self.hideLoading();   
            })
        },
        hideLoading(){
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                clearTimeout(this.timer);
                this.ismask = false;
            },500)
        },
        clickchargepage:function(val){
            var self = this;
            this.ismask = true;
            self.nowpage = val;
            axios.post(self.newpageurl, qs.stringify({
                id:self.account.id,
                onepagenum:self.onepagenum,
                nowpage:val,
                isread:self.isread
            })).then((res) => {
                self.informationdataarray = res.data.datalist;
                self.hideLoading();
            })            
        },        
    }  
}
</script>

<style scoped>
    .teamOrProject{
        width: 100%;
        margin-bottom:50px;
    }
    .teamOrProject thead>tr>th,
    .teamOrProject tbody>tr>td{
        padding: 0 10px;
        border: 1px solid #E9F4FB;
        border-top: none;
    }
    .teamOrProject thead>tr {
        height: 45px;
        line-height: 45px;
        background: #f3f9fd;
    }
    .teamOrProject tbody>tr{
        height: 55px;
    }
    .teamOrProject tbody>tr>td:nth-child(1),
    .teamOrProject thead>tr>th:nth-child(1){
        width: 160px;
        text-align: center;
    }
    .teamOrProject tbody>tr>td:nth-child(2),
    .teamOrProject thead>tr>th:nth-child(2){
        width: 130px;
        text-align: center;
    }
    .teamOrProject tbody>tr>td:nth-child(3),
    .teamOrProject thead>tr>th:nth-child(3){
        width: 130px;
        text-align: center;
    }
    .teamOrProject tbody>tr>td:nth-child(4),
    .teamOrProject thead>tr>th:nth-child(4){
        width: 130px;
        text-align: center;
    }
    .teamOrProject tbody>tr>td:nth-child(5),
    .teamOrProject thead>tr>th:nth-child(5){
        text-align: center;
    }
    .teamOrProject tbody>tr>td>p{
        line-height: 30px;
    }
    .teamOrProject .isPassed{
        color: #4bca88;
        font-weight: bold;
        text-align: center;
    }
    .teamOrProject .unPassed{
        color: #FF6F6F;
        font-weight: bold;
        text-align: center;
    }
    .teamOrProject .wattingForPass{
        color: #F6BD10;
        font-weight: bold;
        text-align: center;
    }
</style>