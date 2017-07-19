<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/match">大赛</Breadcrumb-item>
                <Breadcrumb-item>创建大赛信息</Breadcrumb-item>
            </Breadcrumb>
        </div> 
        
        <div id="mc-content">
            <!--<div class="mc-content-label">
                获奖信息
            </div>-->
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">赛事名称</span>
                </div>
                <div class="right">
                    <input type="text" name="" id="" value="" v-model="formdata.matchName"/>
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">链接地址</span>
                </div>
                <div class="right">
                    <input type="text" name="" id="" value="" v-model="formdata.matchUrl"/>
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">赛事级别</span>
                </div>
                <div class="right">
                    <select name="" v-model="formdata.matchLevel" @change="interesting()">
                        <option v-for="data in matchLevel" :value="data.id" v-text="data.name"></option>
                    </select>
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">比赛时间</span>
                </div>
                <div class="right">
                    <div class="time-select-warp">
                        <Date-picker type="date" placeholder="请选择起始日期" @on-change="changedate(arguments,0)" :clearable="false" class="form_datetime_inline" :value="formdata.startDate"></Date-picker>
                        <span>至</span>
                        <Date-picker type="date" placeholder="请选择终止日期" @on-change="changedate(arguments,1)" :clearable="false" class="form_datetime_inline" :value="formdata.endDate"></Date-picker>
                    </div>
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">赛事简介</span>
                </div>
                <div class="right">
                    <textarea name="" rows="8" cols="" v-model="formdata.matchIntro"></textarea>
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-item awards">
                <div class="left">
                    <span class="input-lable">奖项</span>
                </div>
                <div class="right">
                    <div class="awards-item" v-for="(data,index) in formdata.awardArray">
                        <input type="text" name="" id="" value="" v-model="data.awardARRAY"/>
                        <!--三个单元才能有得删除-->
                        <span @click="removeParent(index)" v-if="index>2"><Icon type="close" class="icon-remove icon-xx"></Icon></span>                      
                    </div>
                    <span class="add-other" @click="awardsItem_addOther()">添加一项</span>
                    <div class="input-item-tips">
                        <p>
                            1.请按奖项等级从高到低填写，否则无法用于统计
                            <br>
                            2.此项信息非必填项，但在登记获奖信息前须完善
                        </p>
                    </div>
                </div>
            </div>
            <div class="bottom-handle">
                <input class="btn-type-1 attribute-save" value="提交" @click="submit()"></input>
                <router-link :to="{path:'/match'}" class="btn-type-1 attribute-cancel">取消</router-link>
            </div>
        </div>            
        <Alert show-icon v-if="isalert" type="warning">
            {{errordata}}
        </Alert>         
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            //大赛分类（初始化时获取）
            matchLevel:[
                {
                    name:'校级',
                    id:2
                },
                {
                    name:'省市级',
                    id:3
                },
                {
                    name:'国家级',
                    id:4
                },
            ],
            //要上传的数据
            formdata:{
                matchName:'',
                matchUrl:'',
                matchLevel:'',
                startDate:'',
                endDate:'',
                matchIntro:'',
                awardArray:[
                    {
                        awardARRAY:''
                    },
                    {
                        awardARRAY:''
                    },
                    {
                        awardARRAY:''
                    }
                ]
            },
            //警告框相关
            isalert:false,
            errordata:'警告提示文案',
            timer:null
        }
    },
    mounted(){
        //获取日期
        this.$store.commit('GET_TODAY');
        //获取头部大数据？
        this.formdata.matchLevel = this.matchLevel[0].id
        
        this.formdata.startDate = this.$store.state.tomonthfirstday;
        this.formdata.endDate = this.$store.state.today;        
        this.$store.commit('CLOSE_MASK'); 
    },
    methods:{
        changedate(v1,v2){
            if(v2==0){
                 this.formdata.startDate=v1[0];
            }else if(v2==1){
                this.formdata.endDate=v1[0];
            }
        },
        //移除奖项
        removeParent(index){
            this.formdata.awardArray.splice(index,1);
        },
        awardsItem_addOther(){
            //检查奖项中是否出现空白项
            console.log(this.formdata.awardArray);
            for(var y=0;y<this.formdata.awardArray.length;y++){
                if(this.formdata.awardArray[y].awardARRAY==''){
                    this.errordata="奖项未填写完整";
                    this.alertshow();
                    return false
                }
            }
            console.log("a");
            var object = {
                awardARRAY:''
            }
            this.formdata.awardArray.push(object);
        },
        alertshow(){
            var self = this;
            this.isalert = true;
            this.timer = setTimeout(()=>{
                clearTimeout(self.timer);
                self.isalert = false;
                self.errordata='警告提示文案';
            }, 2500);
        }, 
        //提交检测
        submit(){
            if(this.formdata.matchName==''){
                this.errordata="大赛名称不能为空";
                this.alertshow();
                return false
            }else if(this.formdata.matchUrl==''){
                this.errordata="大赛链接不能为空";
                this.alertshow();
                return false
            }else if(this.formdata.matchIntro==''){
                this.errordata="大赛简介不能为空";
                this.alertshow();
                return false                
            }else{
                console.log(this.formdata);
            }
        }       
    }
}
</script>

<style scoped>

    .input-item{
        margin-top: 37px;
    }

    .input-item>.left{
        width: 86px;
        float: left;
        overflow: hidden;
    }
    .input-lable{
        display: block;
        margin-top: 10px;
    }
    .input-item>.right{
        position: relative;
        margin-left: 86px;
    }
    .input-item>.right input{
        width: 410px;
        padding: 9px;
        border: solid 1px #ccc;
    }
    .input-item>.right select{
        width:410px;
        height: 40px;
        padding: 10px 9px;
        border: solid 1px #ccc;
        background-color: #fff;
        background-color: transparent;
    }
    .input-item>.right textarea{
        width: 410px;
        padding: 8px;
        border: solid 1px #ccc;
    }
    /*A5C7FE*/
    .input-item>.right input:focus,
    .input-item>.right select:focus,
    .input-item>.right textarea:focus{
        outline: solid 1px #A5C7FE;
    }
    .time-select-warp input.form_datetime_inline{
        width: 170px;
    }
    .time-select-warp span{
        display: inline-block;
        margin: 0 7px 0 6px;
    }
    .awards-item{
        position: relative;
        margin-bottom: 17px;
    }
    .input-item>.right .awards-item input{
        padding-right: 42px;
    }
    .awards-item .icon-xx{
        position: absolute;
        left: 389px;
        top:12px;
        display: none;
        text-align: center;
        font-size: 16px;
        color: #e85959;
        background-color: #fff;
        cursor: pointer;
    }
    .awards-item:hover .icon-xx{
        display: block;
    }
    .input-item span.add-other{
        color: #2F9DEA;
        margin-top: 27px;
    }
    .input-item span.add-other:hover,
    .input-item span.add-other:active,
    .input-item span.add-other:focus,
    .input-item span.add-other:visited{
        text-decoration: none;
        cursor: pointer;
    }
    .input-item-tips{
        color: #eaac4d;
    }
    .awards .input-item-tips{
        margin-top: 27px;
    }
    .input-item-identifying{
        position: absolute;
        left: 435px;
        top: 6px;
        font-size: 19px;
        color: #e85959;
    }
    .ivu-alert.ivu-alert-with-icon{
        position: fixed;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }  
</style>
