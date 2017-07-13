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
            <table class="yard-form">
                <thead>
                    <tr>
                        <th>场地名称</th>
                        <th>使用对象</th>
                        <th>使用日期</th>
                        <th>申请时间</th>
                        <th>审批结果</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in informationdataarray">
                        <td v-text="data.sitename">会议室</td>
                        <td v-text="data.username">w</td>
                        <td v-text="data.usetime">2017年10月30日-2017年12月31日</td>
                        <td v-text="data.applytime">2017年3月30日</td>
                        <td>
                            <p class="isPassed" v-if="data.result==2">通过</p>
                            <p class="unPassed" v-if="data.result==1">不通过</p>
                            <p class="wattingForPass" v-if="data.result==0">审批中</p>
                        </td>
                        <td>
                            <p><span>申请原因：</span><span v-text="data.application_reason"></span></p>
                            <p><span>回复：</span><span v-text="data.apply"></span></p>
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
            ismask:true,
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
            newurl:'http://localhost:2233/site_application_record.php',
            //分页切换数据
            newpageurl:'http://localhost:2233/site_application_record_paga.php',
        }
    },
    mounted(){
        var self = this;
        // this.ismask = true;
        this.account = JSON.parse(localStorage.getItem('user'));
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
    .yard-form{
        width: 100%;
        margin-bottom: 50px;
    }
    .yard-form thead>tr{
        height: 45px;
        background: #f3f9fd;
        line-height: 45px;
    }
    .yard-form thead>tr>th,
    .yard-form tbody>tr>td{
        padding: 0 10px;
        border: 1px solid #E9F4FB;
        border-top: none;
        text-align: center;
    }
    .yard-form tbody>tr{
        height: 55px;
    }
    .yard-form thead>tr>th:nth-child(1),
    .yard-form thead>tr>th:nth-child(2){
        width: 110px;
    }
    .yard-form thead>tr>th:nth-child(3){
        width: 240px;
    }
    .yard-form thead>tr>th:nth-child(4){
        width: 130px;
    }
    .yard-form thead>tr>th:nth-child(5){
        width: 85px;
    }

    .yard-form tbody>tr>td>p{
        line-height: 30px;
    }
    .yard-form .isPassed{
        color: #4bca88;
        font-weight: bold;
        text-align: center;
    }
    .yard-form .unPassed{
        color: #FF6F6F;
        font-weight: bold;
        text-align: center;
    }
    .yard-form .wattingForPass{
        color: #F6BD10;
        font-weight: bold;
        text-align: center;
    }
</style>
