<template>
    <div class="statistic">
        <p>日期范围：
            <Date-picker type="month" placeholder="请选择起始日期" style="width: 150px" :options="option2" :value="startDate" @on-change="changedate(arguments,0)"></Date-picker>
            到<Date-picker type="month" placeholder="请选择结束日期" style="width: 150px" :options="option2" :value="endDate" @on-change="changedate(arguments,1)"></Date-picker>
        </p>
        <div class="echarts">
            <IEcharts :option="line1" :loading="loading" @ready="onReady(line1)" @click="onClick"></IEcharts>
        </div>
        <Alert show-icon v-show="isalert">
            开始日期必须小于结束日期！
        </Alert>
    </div>
</template>
<script>
// import axios from 'axios'
import qs from 'qs';
import IEcharts from 'vue-echarts-v3/src/lite.vue';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
export default {
    //date:放日期类型
    //color:颜色配置
    //title:标题
    //url:要传入的url地址 
    //legend:初始化的标题   
    props:['datetype','color','title','url','legend'],
    data: function () {
        return {
            option1: {
                //日期过滤器
                disabledDate(date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            },            
            option2: {
                //月份过滤器
                disabledDate(month) {
                    return month && month.valueOf() > Date.now();
                }
            },
            loading: false,
            value:[],
            startDate:null,
            endDate:null,
            isalert:false,
            timer:null,
            //第一个条形图的数据
            line1: {
                titlename:'team',
                title : {
                    //条形图标题
                    text: null,                    
                    // text: '团队发展阶段数量统计',
                    textstyle:{
                        fontSize:16,
                        fontWeight:'normal'
                    },
                    subtext: '',
                    x:'left',
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    bottom:0,
                    itemWidth:14,
                    //数据分类
                    data:null,
                    // data:['初创团队','成熟团队','已孵化']
                },
                grid: {
                    top:'18%',
                    left: '12%',
                    right: '12%',
                    bottom: '12%',
                    containLabel: true
                },           
                xAxis : [
                    {
                        type : 'category',
                        //放x轴下标，默认同步月份，多个月份时,可以被改变
                        data:null,
                        // data : ['2017-4','2017-5']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine : {
                            show : false
                        },
                        axisTick : {
                            show : false
                        },
                        splitLine : {
                            linestyle : {
                                color : '#d8d8d8'
                            }
                        }
                    }
                ],
                //放数据的地方
                series:null,
                // series : [
                //     {              
                //         type:'bar',
                //         barWidth: '35%',
                //         stack: '人数',
                //         //放每个月份的初创团队的数据
                //         name:'初创团队',
                //         data:[4,1]
                //     },
                //     {  
                //         type:'bar',
                //         stack: '人数',
                //         name:'成熟团队',
                //         data:[2,1]
                //     },
                //     {
                        
                //         type:'bar',
                //         stack: '人数',
                //         name:'已孵化',
                //         data:[2,2]
                //     }
                // ],
                //颜色配置
                color : null    
            }, 
        }
    },
    mounted: function () {
        this.startDate = this.$store.state.lastmonth;
        this.endDate = this.$store.state.nowmonth;  
        this.value[0]=this.startDate;
        this.value[1]=this.endDate;
        this.line1.xAxis[0].data = this.value;  
        this.line1.color = this.color;   
        this.line1.title.text = this.title;
        this.line1.title.subtext=this.subtext;	    
        this.line1.legend.data=this.legend;
        // this.line1.series[0].name = this.seriesname;
        //暂时传假参数
        this.line1.series = this.url;          
    },
    methods: {
        //当数据加载完毕后取消loading
        onReady(obj) {
            this.loading = false;
        },
        onClick(event, instance, echarts) {
            console.log(arguments);
        },
        //计算当前月份
        changedate(chart,v1){
            var self = this;  
            this.value[v1] = chart[0];
            if(v1==0){
                this.startDate = chart[0];
            }else{
                this.endDate = chart[0];               
            }
            
            if(parseInt(this.startDate.replace(/-/g,'')) - parseInt(this.endDate.replace(/-/g,''))<0){ 
                this.loading=true;
                //发送数据和获取数据
                getdata();
            }else{
                this.isalert = true;
            }    
        },
        changetitle(){
            var ele = document.getElementsByClassName('ivu-tabs-tab-active')[0].innerText;
            console.log(ele);
        },
        //发送和获取数据
        getdata(){
            var self = this;
            this.timer = setTimeout(function() {
                clearTimeout(self.timer);
                self.loading = false;
            }, 1500);
        }
    },
    components: {
        IEcharts
    },

}
</script>
<style scoped>
.ivu-date-picker {
    display: inline-block;
    margin: 0 10px;
}

.statistic {
    display: inline-block;
    width: 500px;
    margin-right: 30px;
    margin-bottom: 30px;
    position: relative;
}

.indexTabul>li.active {
    color: #2F9DEA;
}


#indexTab>ul{
    padding-left: 30px;
}
#indexTab .ivu-tabs-nav-scroll{
    padding-left: 30px;
}
#indexTab .ivu-tabs-tab{
    line-height: 55px;
    text-align: center;
    padding: 0 16px;
}
.echarts {
    width: 484px;
    height: 324px;
    padding: 7px;
    border:solid 1px #ccc;
}
.echarts canvas,
.echarts>div{
    height: 308px;
}
.statistic>p{
    margin-bottom: 10px;
}
.statistic .ivu-alert-with-icon{
    display: inline-block;
    position: absolute;
    top: 50px;
    left:50%;
    transform: translateX(-50%);
}
#indexTab .ivu-tabs .ivu-tabs-tabpane{
    padding-left: 30px;
}
</style>