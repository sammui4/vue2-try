<template>
    <!--信息类型详细分布-->
    <div class="inforhead">
        <div class="choosen">
            <div class="form-cr" @click="isreading(false)" :class="isread==false?'active':''">
                <input type="radio" name="waitting_isRead" id="target_2_1-1" value="" checked="checked">
                <label for="target_2_1-1"><span class="box-icon"></span><span class="form-checkbox-inset-lable">未处理</span></label>
            </div>
            <div class="form-cr" @click="isreading(true)" :class="isread==true?'active':''">
                <input type="radio" name="waitting_isRead" id="target_2_1-2" value="">
                <label for="target_2_1-2"><span class="box-icon"></span><span class="form-checkbox-inset-lable">已处理</span></label>
            </div>    
        </div>
        <ul class="clear">
            <!--数据具体类型(全部、团队、项目、设备、场地)-->
            <li v-for="(item,index) in inforhead" v-text="item.texts" @click="clickChange(item.names,index)" v-bind:class="activenum==index?'active':''"></li>
        </ul>
        <div v-if="informationdataarray.length !=0">
            <ul class="commission">
                <li class="unread clear" v-if="isread==false" v-for="(information,index) in informationdataarray" @click="getinfomationdetail(index,information.id)">
                    <div class="floatRight" v-text="information.times"></div>
                    <a href="javascript:" data-toggle="modal" data-target="#wait_work-modal">
                        <div class="circle_point">
                            <p v-text="information.messagers"></p>
                            <p v-text="information.details"></p>
                        </div>
                    </a>
                </li>
                <li class="isread clear" v-if="isread==true" v-for="information in informationdataarray">
                    <div class="floatRight" v-text="information.times"></div>
                    <a href="javascript:" data-toggle="modal" data-target="#wait_work-modal">
                        <div class="circle_point">
                            <p v-text="information.messagers"></p>
                            <p v-text="information.details" v-if="information.details!==null"></p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div v-if="informationdataarray.length ==0">
            <div class="nonepic"></div>
        </div>
        <!--分页器-->
        <div class="pagination" v-if="allpage>1">
             <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
        </div>
        <Modal
            v-model="modal1"
            title="代办详情"
            @on-ok="ok"
            @on-cancel="cancel" id="wait_work-modal" width="600">
            <ul class="infomation_modal-detail">			
                <li class="clear" v-for="(value,key) in modaldata">
                    <span v-text="key">代办类型啊啊啊:</span>
                    <span v-text="value">申请信息</span>
                </li>
            </ul>


            <div class="choosen">
                <div class="form-cr">
                    <input type="radio" name="waitting_working" id="waitting_model-1" value="" checked="checked">
                    <label for="waitting_model-1"><span class="box-icon"></span><span class="form-checkbox-inset-lable">同意</span></label>
                </div>
                <div class="form-cr">
                    <input type="radio" name="waitting_working" id="waitting_model-2" value="">
                    <label for="waitting_model-2"><span class="box-icon"></span><span class="form-checkbox-inset-lable">拒绝</span></label>
                </div>
            </div>
            <div class="text_area">
                <textarea placeholder="请输入回复对方的内容"></textarea>
            </div>
        </Modal> 
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>     
    </div>
</template>
<script>
// import axios from 'axios'
import qs from 'qs';
//引入遮罩层
import masking from '../../../../components/mask/mask.vue'
// import {mapState} from 'vuex'
export default {
    data: function () {
        return {
            activeName: 'all',
            //信息类型
            inforurl: 'http://localhost:1235/php/dealwithpagebyadmin.php',
            //分页器点击切换
            pagationdataurl: 'http://localhost:1235/php/informationdata.php',
            //上面详情信息点击切换
            clickchangedata: 'http://localhost:1235/php/chargeinfomation.php',
            //点击未读信息显示
            unreadshowurl:'http://localhost:1235/php/unreadshow.php',
            //信息头部（那五个玩意）
            inforhead: [],
            //当前默认页
            activenum: 0,
            //是否已读？默认为未读
            isread: false,
            //信息数组
            informationdataarray: [],
            //用户id
            id:null,
            //分页器总页数
            allpage: 0,
            //当前页数
            nowpage: 1,
            //总条数
            allimfomation: 0,
            //每页显示多少条
            onepagenum: 12,
            //当前选项
            thistext: 'all',
            //模态框1
            modal1: false,
            //显示遮罩层
            ismask:false,
            //储存定时器
            timer:null,
            //mask高度设置
            maskheight:"115px",
            //当前的信息类型
            informationtype:null,
            //用于储存模态框的数据
            modaldata:{ 
                申请人:"蔡葆峰",
                申请使用日期:"2017-05-09",
                申请原因:"河南飞瑞敖蔡",
                申请时段:"第1节课,第2节课",
                设备:"物联网综合实验箱"             
            },
            //点击的数据是第几个,id是多少
            clicknum:Number,
            clickid:Number
        }
    },
    methods: {
        //详细信息点击切换
        clickChange: function (texts, index) {
            var self = this;
            this.maskheight ="230px";
            this.ismask = true;
            this.activenum = index;
            this.thistext = texts;
            self.nowpage = 1;
            axios.post(self.clickchangedata, qs.stringify({
                // account:self.account,
                id:self.id,
                types:texts,
                onepagenum:self.onepagenum,
                isread:self.isread
            })).then((res) => {
                self.informationdataarray = res.data.datalist;
                self.allpage = Math.ceil(res.data.allnum / self.onepagenum);
                self.hideLoading();
            })
        },
        //已读未读状态切换
        isreading: function (bolean) {
            var self = this;
            this.maskheight ="230px";
            this.ismask = true;
            this.isread = bolean; 
            self.nowpage = 1;
            axios.post(self.clickchangedata, qs.stringify({
                // account: self.account,
                id:self.id,
                types:self.thistext,
                onepagenum:self.onepagenum,
                isread:bolean
            })).then((res) => {
                self.informationdataarray = res.data.datalist;
                console.log(res.data.datalist);
                self.allpage = Math.ceil(res.data.allnum / self.onepagenum);
                self.hideLoading();
            });               
        },
        //点击分页器切换加载的函数
        clickchargepage: function (val) {
            var self = this;
            this.maskheight ="230px";
            this.ismask = true;
            self.nowpage = val;
            axios.post(self.pagationdataurl, qs.stringify({
                // account:self.account,
                id:self.id,
                types:self.thistext,
                onepagenum:self.onepagenum,
                nowpage:val,
                isread:self.isread
            })).then((res) => {
                self.informationdataarray = res.data.datalist;
                self.hideLoading();
            })
        },
        //模态框点击确定后返回处理信息并删除当前的information数据
        ok () {
            this.informationdataarray.splice(this.clicknum,1);
            this.$Message.info('点击了确定');
        },
        //模态框点击取消
        cancel () {
            this.$Message.info('点击了取消');
        },
        //进入模态框时传入id,个人建议初始化那时就把所有数据获取，通过index来获取，以便于减少请求
        getinfomationdetail(v1,v2){
            var self = this;
            this.clickid = v2;
            this.clicknum = v1;
            axios.post(self.unreadshowurl, qs.stringify({
                processInstId:v2
            })).then((res) => {
                self.modaldata =  res.data.modaldata;
                this.modal1 = true;
            })           
        },
        //隐藏loading显示
        hideLoading(){
            //在生产环境下的显示
            if(process.env.NODE_ENV !== 'development'){
               clearTimeout(this.timer)
               this.timer = setTimeout(() => {
                   clearTimeout(this.timer);
                   this.ismask = false
               },600)
            }else{
               clearTimeout(this.timer)
               this.timer = setTimeout(() => {
                   clearTimeout(this.timer);
                   this.ismask = false
               },600)
            }
        }
    },
    mounted: function () {
        var self = this;
        // console.log(this.$store.state.account);
        var power = this.$store.state.account.powers
        axios.post(self.inforurl, qs.stringify({
            powers:power
        })).then((res) => {
            self.inforhead = res.data;
        })

        this.id = this.$store.state.account.id;
        //默认请求未读的全部数据
        axios.post(self.clickchangedata, qs.stringify({
            // account:self.account,
            id:self.id,
            types:'all',
            onepagenum:self.onepagenum,
            isread:self.isread
        })).then((res) => {
            this.allimfomation = res.data.allnum;
            self.informationdataarray = res.data.datalist;
            self.allpage = Math.ceil(res.data.allnum / self.onepagenum);
            self.$store.commit('CLOSE_MASK');           
        })
    },
    components:{
        //引入masking组件
        masking
    },
    //通过computed把vuex中的某个值引入到组件中
    // computed: mapState([ 
    //     'account'
    // ])  
}
</script>
<style scoped>
.inforhead>ul>li {
    display: inline-block;
    background-color: #fff;
    margin-right: 10px;
    text-align: center;
    margin-bottom: 0;
    border-bottom: 1px solid transparent;
    margin-right: 30px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
}

.inforhead>div.pagination {
    padding-top: 20px;
}

.inforhead>ul>li.active {
    border-bottom: 1px solid #2F9DEA;
    color: #2F9DEA;
}

.inforhead .choosen {
    padding: 0px 10px;
    /*line-height: 50px;*/
    float: right
}


.commission>li {
    /*height: 55px;*/
    line-height: 55px;
    padding-right: 10px;
    border-bottom: 1px solid #E9F4FB;
    display: block;
}

.commission li:hover {
    cursor: pointer;
    background: #f3f9fd;
}

.commission li div.clear em {
    font-style: normal;
}

.commission li.unread>a {
    padding-right: 20px;
}

.commission li.unread .infomation_poiot {
    position: relative;
}

.commission li.unread .infomation_poiot:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #FF6F6F;
    top: 23px;
    left: 30px;
}

.commission li>a>div {
    text-indent: 25px;
}

.commission li div>a {
    overflow: hidden;
    display: block;
    color: #768087;
    text-decoration: none;
    text-indent: 25px;
}

.commission .circle_point {
    padding: 10px 0;
}

.commission li.unread .infomation_poiot>a {
    color: #000;
}

.commission li.unread div.circle_point {
    position: relative;
}

.commission li.unread div.circle_point:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #FF6F6F;
    top: 22px;
    left: 5px;
}

.commission li div.circle_point>p {
    line-height: 30px;
}

.commission li div.floatRight {
    min-width: 140px;
}

.commission li>a {
    overflow: hidden;
    display: block;
    text-decoration: none;
    color: #000;
}

</style>