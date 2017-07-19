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
            <table class="equipment-form">
                <thead>
                    <tr>
                        <th>设备名称</th>
                        <th>使用日期/课时</th>
                        <th>申请时间</th>
                        <th>审批结果</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in informationdataarray">
                        <td v-text="data.devName">物联网联合实现箱</td>
                        <td>
                            <p v-text="data.userTime">2017年4月10号</p>
                            <p class="classspan">
                                <span v-for="data in spanArray" v-text="data.text">课时1</span>
                            </p>
                        </td>
                        <td v-text="data.useTime">2017年4月9号</td>
                        <td>
                            <p class="isPassed" v-if="data.result==2">通过</p>
                            <p class="unPassed" v-if="data.result==1">不通过</p>
                            <p class="wattingForPass" v-if="data.result==0">审批中</p>
                        </td>
                        <td>
                            <p><span>编号：</span><span>110</span></p>
                            <p><span>地址：</span><span class="text-not-overflow"><span v-for="data in arrdressArray" v-text="data.text" class="isin"></span></span></p>
                            <p><span>管理员回复：</span><span class="text-not-overflow">dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                        </td>
                    </tr>
                </tbody>
            </table> 
            <!--分页器-->
            <div class="pagination" v-if="allpage>1">
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
        return{
            formdata:[
                {
                    id:'target_2_1-1',
                    text:'未处理'
                },
                {
                    id:'target_2_1-3',
                    text:'已处理'
                },
            ],
            spanArray:[
                {
                    text:"课时1"
                },
                {
                    text:"课时2"
                },
                {
                    text:"课时3"
                },
                {
                    text:"课时4"
                },
                {
                    text:"课时5"
                }
            ],
            arrdressArray:[
                {
                    text:'创新创业学院C栋教学楼203 创新实验室A01,'
                },
                {
                    text:'创新创业学院C栋教学楼203 创新实验室A01,'
                },                
                {
                    text:'创新创业学院C栋教学楼203 创新实验室A01,'
                },
            ],
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
            newurl:'http://localhost:1235/php/dev_ordered_record.php',
            //分页切换数据
            newpageurl:'http://localhost:1235/php/dev_ordered_record_paga.php',
        }
    },
    mounted(){
            var self = this;
            // this.ismask = true;
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
    methods: {
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
        }
    },
    components: {
        masking
    }
}
</script>

<style scoped>
    .equipment-form{
        width:100%;
        margin-bottom: 50px;
    }
    .equipment-form thead>tr{
        position: relative;
        height: 45px;
        line-height: 45px;
        background: #f3f9fd;
    }
    .equipment-form thead>tr>th,
    .equipment-form tbody>tr>td{
        padding: 0 10px;
        border: 1px solid #E9F4FB;
        border-top: none;
    }

    .equipment-form thead>tr>th:nth-child(1){
        width: 160px;
    }

    .equipment-form thead>tr>th:nth-child(2){
        min-width: 224px;
        left: 160px;
        right: 700px;
    }

    .equipment-form thead>tr>th:nth-child(3),
    .equipment-form thead>tr>th:nth-child(4){
        width: 150px;
        text-align: center;
    }

    .equipment-form thead>tr>th:nth-child(5){
        width: 400px;
        overflow: hidden;
    }
    .equipment-form tbody>tr>td:nth-child(5)>p{
        line-height: 24px;
        position: relative;
    }
    .equipment-form tbody>tr>td:nth-child(5)>p:nth-child(2)>span:first-child{
        position: absolute;
        left: 0;
        top: 0;
    }
    .equipment-form tbody>tr>td:nth-child(5)>p:nth-child(2)>span:last-child{
        padding-left: 50px;
        display: inline-block;
        max-width: 372px;
    }
    .equipment-form tbody>tr>td:nth-child(5)>p:nth-child(3)>span:first-child{
        position: absolute;
        left: 0;
        top: 0;	
    }
    .equipment-form tbody>tr>td:nth-child(5)>p:nth-child(3)>span:last-child{
        padding-left: 92px;
        display: inline-block;
        max-width: 372px;
    }
    .equipment-form tbody>tr>td:nth-child(5)>p:nth-child(1){
        padding-top: 10px;
        line-height: 30px;
    }
    .equipment-form tbody>tr>td:nth-child(5)>p>span{
        margin-right:8px;
    }
    .equipment-form tbody>tr>td:nth-child(5)>p>span:first-child{
        font-weight: bold;
    }
    .equipment-form tbody>tr>td:nth-child(3){
        text-align: center;
    }
    .equipment-form .classspan>span,
    .equipment-form .isin{
        margin-right: 13px;
    }
    .equipment-form .isPassed{
        color: #4bca88;
        font-weight: bold;
        text-align: center;
    }
    .equipment-form .unPassed{
        color: #FF6F6F;
        font-weight: bold;
        text-align: center;
    }
    .equipment-form .wattingForPass{
        color: #F6BD10;
        font-weight: bold;
        text-align: center;
    }
</style>