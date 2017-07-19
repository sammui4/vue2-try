<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/classes">课程</Breadcrumb-item>
                <Breadcrumb-item>新建课程</Breadcrumb-item>
            </Breadcrumb>
        </div>  
        <div id="mc-content">
            <div class="course-name">
                课程：U理论
            </div>
            <div class="input-item link">
                <div class="input-lable">
                    链接
                </div>
                <div class="input-content">
                    <input type="text" name="" id="" value="" placeholder="请输入链接"/>
                </div>
            </div>
            <div class="input-item kkxx">
                <div class="input-lable">
                    开课信息
                </div>
                <div class="input-content">
                    <div class="table-warp">
                        <table class="table _edit">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>备注</th>
                                    <th class="table-handle">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in datalist">
                                    <td>
                                        <span v-text="index+1">1</span>
                                    </td>
                                    <td>
                                        <Date-picker type="date" placeholder="请选择起始日期" style="width: 100%" @on-change="changedate(arguments,0,index)" :value="data.startDate" ></Date-picker>
                                    </td>
                                    <td>
                                        <Date-picker type="date" placeholder="请选择起始日期" style="width: 100%" @on-change="changedate(arguments,1,index)" :value="data.endDate" ></Date-picker>
                                    </td>
                                    <td>
                                        <input type="text" name="" id="" value="" placeholder="请填写备注信息"  class="td-input"/>
                                    </td>
                                    <td class="table-handle">
                                        <strong @click="removeform(index)">
                                            <Icon type="trash-b" class="icon-trash"></Icon>
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                <!--编辑状态下显示-->
                        <div class="add-tr" @click="addform">
                            <Icon type="plus" class="icon-xx" ></Icon><span>添加一项</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="bottom-handle">
                <input type="submit" value="提交" class="btn-type-1 attribute-save" @click="submit()"/>
                <router-link :to="{path:'/'}" class="btn-type-1 attribute-cancel">取消</router-link> 
            </div>
        </div>  
        <Alert show-icon v-if="isalert">
            第<span v-for="data in errornum">{{data}},</span>行  开始日期必须小于结束日期！
        </Alert>    
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            isalert:false,
            //表格数据，初始化获取
            datalist:[
                {
                    startDate:'2017-07-11',
                    endDate:'2017-07-13',

                }
            ],
            errornum:[],
        }
    },
    mounted(){
        this.$store.commit('GET_TODAY');
        this.$store.commit('CLOSE_MASK');
    },
    methods:{
        addform(){
            let object = {
                startDate:this.$store.state.tomonthfirstday,
                endDate:this.$store.state.today
            }
            // console.log(object);
            this.datalist.push(object);
            // console.log(this.datalist);
        },
        removeform(val){
            console.log(val);
            this.datalist.splice(val,1);
            // console.log(this.datalist);
        },
        //日期发生了改变
        changedate(v1,v2,v3){
            // console.log(v1[0]);
            if(v2==0){
                this.datalist[v3].startDate=v1[0];
            }else{
                this.datalist[v3].endDate=v1[0];
            }
           
        },
        //提交检测
        submit(){
            for(let t=0;t<this.datalist.length;t++){
                if(parseInt(this.datalist[t].startDate.replace(/-/g,''))-parseInt(this.datalist[t].endDate.replace(/-/g,''))>=0){
                    this.errornum.push(t+1);  
                }
            }
            console.log(this.errornum);
            if(this.errornum.length>0){
                this.alertshow();
                return false
            }else{
                //通过判断则发送表单
                console.log("a");
            }
            
        },
        alertshow(){
            var self = this;
            this.isalert = true;
            this.timer = setTimeout(()=>{
                clearTimeout(self.timer);
                self.isalert = false;
            }, 1500);
        }
    }
}
</script>

<style scoped>
    .course-name {
        display: block;
        height: 24px;
        line-height: 24px;
        margin-bottom: 17px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #2F9DEA;
    }
    /* .course-name {
        color: #2F9DEA;
    } */
    .input-lable{
        margin-bottom: 16px;
    }
    .input-item.link input{
        width: 100%;
        padding: 9px;
        border: solid 1px #e0e0e0;
    }
    .input-item input:focus{
        outline: solid 1px #A5C7FE;
    }
    .kkxx table{
        margin-bottom: 0;
        width: 100%;
        max-width: 100%;
    }
    .kkxx table thead{
        background-color: #EDF5F9;
        border: solid 1px #EDF5F9;
    }
    .kkxx table tr th{
        border-bottom: none;
        padding: 8px
    }
    .kkxx table tbody td{
        color: #768087;
        border: solid 1px #E6EFF4;          /*EDF5F9*/
        border-top: none;
        padding: 0 8px;
    }
    .kkxx table._edit td.table-handle{
        padding: 8px;
    }
    .kkxx table td.table-handle .icon-trash{
        color: #88a4b9;
        font-size: 18px;
        cursor: pointer;
    }
    .kkxx table td>span{
        display: block;
        padding: 8px;
        overflow: hidden;
        text-overflow: ellipsis;   /*超出显示省略号*/
        white-space: nowrap;       /*强制单行显示*/
    }
    .kkxx table td>input{
        width: 100%;
        padding: 8px;
        border: none;
    }
    .kkxx table td>select{
        border: none;
        box-shadow: none;
                appearance:none;
        -moz-appearance:none; /* Firefox */
        -webkit-appearance:none; /* Safari 和 Chrome */
    }
    .kkxx table td>.td-input{
        display: none;
    }
    .kkxx table td>.td-input:focus{
        outline: solid 1px #98BFF8;
    }
    .kkxx table._edit td{
        padding: 0;
    }
    /* .kkxx table._edit td>div{
        display: none;
    } */
    .kkxx table._edit td>.td-input{
        display: block;
    }
    .add-tr{
        width: 80px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-top: none;
        color: #2F9DEA;
        cursor: pointer;
    }
    .add-tr .icon-xx{
        margin-right: 3px;
    }
    .ivu-alert.ivu-alert-with-icon{
        position: fixed;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
</style>

