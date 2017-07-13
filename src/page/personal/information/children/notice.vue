<template>
    <div class="inforhead">
        <div class="clear">
            <div class="choosen">
                <div class="form-cr" @click="isreading(false)" :class="isread==false?'active':''">
                    <input type="radio" name="waitting_isRead" id="target_2_1-1" value="" checked="checked">
                    <label for="target_2_1-1"><span class="box-icon"></span><span class="form-checkbox-inset-lable">未查看</span></label>
                </div>
                <div class="form-cr" @click="isreading(true)" :class="isread==true?'active':''">
                    <input type="radio" name="waitting_isRead" id="target_2_1-2" value="">
                    <label for="target_2_1-2"><span class="box-icon"></span><span class="form-checkbox-inset-lable">已查看</span></label>
                </div>    
            </div>
        </div>

        <div v-if="informationdataarray.length !=0">
            <ul class="commission">
                <li v-for="(data,index) in informationdataarray" :class="isread==true?'readed':'unread'">
                    <div class="floatRight" v-text="data.time">9999年12月31日 23:59:59</div>
                    <div class="infomation_poiot">	
                        <div class="floatLeft">
                            <div class="form-cr">
                                <!--表单的多选绑定-->
                                <input type="checkbox" name="" :id="'info_'+index" :value="data.id" v-model="selectData">
                                <label :for="'info_'+index"><span class="box-icon"></span><span class="form-checkbox-inset-lable"></span></label>
                            </div>												
                        </div>
                        <p @click="getinfomationdetail(index,data.id)"><span v-text="data.topic" class="spanright"></span><span v-text="data.content"></span></p>		
                    </div>
                </li>
            </ul>
            <div class="bottom-choose">
                <div class="form-cr choosen-all">
                    <input type="checkbox" name="" id="all_1" value="false" v-model="allchecked">
                    <label for="all_1"><span class="box-icon"></span><span class="form-checkbox-inset-lable"> </span></label>
                </div>		
                <input type="submit" name="" id="" value="标为已读" @click="markisread()" v-if="isread==false"/>
                <input type="submit" name="" id="" value="删除" @click="deletenotice()"/>
                <span>
                    {{selectData}} 
                    {{checkedCount}}
                </span> 
            </div>  
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
            title="消息详情"
            @on-ok="ok"
            @on-cancel="cancel" width="600">
            <ul class="infomation_modal-detail">			
                <li class="clear">
                    <span>信息类型:</span>
                    <span v-text="modaldata.topic">申请信息</span>
                </li>				  
                <li class="clear">
                    <span>详细信息:</span>
                    <span v-text="modaldata.content">BOOM7研发团队</span>
                </li>
            </ul>
        </Modal> 
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>
    </div>
</template>
<script>
// import axios from 'axios'
    import qs from 'qs';
    import masking from '../../../../components/mask/mask.vue'
    export default{
        components:{
            masking
        },
        data:function(){
            return{
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
                newurl:'http://localhost:2233/newsdata.php',
                //分页切换数据
                newpageurl:'http://localhost:2233/newspage.php',
                //模态框
                model1:false,
                //模态框数据
                modaldata:{
                    topic:null,
                    content:null
                },
                //点击的数据是第几个,id是多少
                clicknum:Number,
                clickid:Number,
                //用于存放多选中的多个id的数组
                selectData:[]
            }
        },
        methods:{
            //切换已读和未读
            isreading:function(bol){
                var self = this;
                this.isread = bol;
                this.ismask = true;
                self.nowpage = 1;
                axios.post(self.newurl, qs.stringify({
                    account:self.account,
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
            //隐藏loading显示
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
                    account:self.account,
                    onepagenum:self.onepagenum,
                    nowpage:val,
                    isread:self.isread
                })).then((res) => {
                    self.informationdataarray = res.data.datalist;
                    self.hideLoading();
                })            
            },
            //模态框点击确定
            ok () {
                this.$Message.info('点击了确定');
                if(this.isread==false){
                    this.informationdataarray.splice(this.clicknum,1);
                }
            },
            //模态框点击取消
            cancel () {
                this.$Message.info('点击了取消');
            },
            //进入模态框时传入id
            getinfomationdetail(v1,v2){
                this.modaldata.topic = this.informationdataarray[v1].topic;
                this.modaldata.content = this.informationdataarray[v1].content;
                this.clicknum = v1;
                this.clickid = v2;
                this.modal1 = true;
            },
            //点击标为已读按钮
            markisread(){
                this.allDataDealwith();
            },
            //点击删除按钮
            deletenotice(){
                this.allDataDealwith();
            },
            //对所有数据进行处理
            allDataDealwith(){
                for(let t=0;t<this.selectData.length;t++){
                    for(let b=0;b<this.informationdataarray.length;b++){
                        if(this.informationdataarray[b].id==this.selectData[t]){
                            this.informationdataarray[b].checked==false;
                            this.informationdataarray.splice(b,1);
                            break;
                        }           
                    }
                }
                //强制设置seleceData为空
                Vue.set(this,'selectData',[]);
            }
        },
        mounted:function(){
            var self = this;
            this.ismask = true;
            self.account = JSON.parse(localStorage.getItem('user')).account;
            axios.post(self.newurl, qs.stringify({
                account:self.account,
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
        computed:{
            //检测那个全选按钮
            allchecked:{
               get:function(){
                   //获取整个长度
                    return this.checkedCount == this.informationdataarray.length;
               },
               //如果已经有长度，则是返回id
               set:function(val){
                    if(val){
                        this.selectData = this.informationdataarray.map(function(item) {
                            return item.id
                        })                        
                    }else{
                        this.selectData=[];
                    }
               }
            },
            //点击那个按钮返回的id数组的长度
            checkedCount:{
                get:function(){
                    return this.selectData.length
                }
            }
        }
    }
</script>
<style scoped>
.commission{
	min-height: 55px;
}
.commission>li{
	/*height: 55px;*/
	line-height: 55px;
	padding-right: 10px;
	border-bottom: 1px solid #E9F4FB;
	display: block;
}
.commission li:hover{
	cursor: pointer;
	background: #f3f9fd;
}
.commission li div.clear em{
	font-style: normal;
}
.commission li.unread>a{
	padding-right: 20px;
}
.commission li.unread .infomation_poiot{
	position: relative;
}
.commission li.unread .infomation_poiot:before{
	content: "";
	position: absolute;
	width: 8px;
	height: 8px;
	border-radius:8px;
	background: #FF6F6F;
	top: 23px;
	left: 30px;	
}

.commission li div>p{
	overflow: hidden;
	display: block;
	color: #768087;
	text-decoration: none;
	text-indent: 25px;	
}

 .commission li>a>div{
	text-indent: 25px;	
}
.commission .circle_point{
	padding:10px 0;
}
.commission li.unread .infomation_poiot>p{
	color: #000;
}
.commission li.unread div.circle_point{
	position: relative;
}
.commission li.unread div.circle_point:before{
	content: "";
	position: absolute;
	width: 8px;
	height: 8px;
	border-radius:8px;
	background: #FF6F6F;	
	top: 22px;
	left: 5px;
}
.commission li div.circle_point>p{
	line-height: 30px;
}
.commission li div.floatRight{
	min-width: 140px;
}
.commission li>a{
	overflow: hidden;
	display: block;
	text-decoration: none;
	color: #000;
}
.commission .readed>a{
	color: #768087;
}
.commission li>a span{
	margin: 0 9px;
}
.commission span.spanright{
    margin-right: 8px;
}
.bottom-choose{
	padding-top:15px;
}

.bottom-choose>input{
	margin-left: 15px;
	background: #fff;
    border: 1px solid #ccc;
    outline: none;
    padding:5px 10px;
    color:#6d6d6d;
}
.inforhead>div.pagination {
    padding-top: 20px;
}
</style>