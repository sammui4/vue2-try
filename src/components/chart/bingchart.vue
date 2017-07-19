<template>
    <div class="statistic">
        <p>日期范围：
            <Date-picker type="date" placeholder="请选择起始日期" style="width: 150px" :options="option1" :value="startDate" @on-change="changedate(arguments,0)" :clearable="false"></Date-picker>
            到<Date-picker type="date" placeholder="请选择结束日期" style="width: 150px" :options="option1" :value="endDate" @on-change="changedate(arguments,1)" :clearable="false"></Date-picker>
        </p>
        <div class="echarts">
                <IEcharts :option="pie1" :loading="loading" @ready="onReady(pie1)" @click="onClick"></IEcharts> 
            <!-- <div class="bie_charts"></div> -->
        </div>
        <Alert show-icon v-if="isalert">
            {{isalertinformation}}
        </Alert>
    </div>
</template>
<script>
// import axios from 'axios'
import IEcharts from 'vue-echarts-v3/src/lite.vue';
// import echarts from 'echarts/lib/echarts'
import qs from 'qs';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
export default {
    //date:放日期,当前日期和起始日期
    //color:颜色配置
    //title:标题
    //subtext:副标题
    //url:改变日期时要传入的url地址
    //legend:初始化的标题
    props:['datetype','color','title','subtext','url','legend','seriesname'],
    data: function () {
        return {
            option1: {
                //日过滤器
                disabledDate(date) {
                    return date && date.valueOf() > Date.now();
                }
            },            
            option2: {
                //月过滤器
                disabledDate(month) {
                    return month && month.valueOf() > Date.now();
                }
            },
            //加载数据时显示loading
            loading: false,
            //是否有警告框
            isalert:false,
            isalertinformation:'',
            //时间值
            startDate:null,
            endDate:null,
            //定时器
            timer:null,
            //第一个条形图的数据
            pie1:{
                title : {
                    //标题名称（可提取部分）
                    title:'',
                    // text: '团队人员分布统计',
                    textstyle:{
                        fontSize:16,
                        fontWeight:'normal'
                    },
                    //副标题（可提取部分） 
                    subtext: '',
                    // subtext: '团队数量：100',                    
                    x:'left',
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    bottom:0,
                    itemWidth:14,
                    //下面的标题数据分组（可提取部分） 初始化必备，改变数据时也必备
                    data: null
                    // data: ['1-5人','5-10人','10人以上']
                },
                //饼状图数据（可提取部分）
                series : [
                    {
                        // name: '团队数量',
                        name: null,
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        //改变日期时读取的是这两个
                        data:null,
                        // data:[
                        //     {value:15, name:'1-5人'},
                        //     {value:25, name:'5-10人'},
                        //     {value:60, name:'10人以上'},
                        // ],
                        label: {
                            normal: {
                                textstyle: {
                                    color: '#3b4953'
                                }
                            }
                        },
                        itemstyle: {
                            emphasis: {
                                shadowBlur: 3,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                //颜色设置(可提取部分)
                color : []                       
            }
        }
    },
    mounted: function () {
        var self = this;
        var power = this.$store.state.account.powers;
        //获取当前日期
        this.$store.commit('GET_TODAY');
        this.startDate = this.$store.state.tomonthfirstday;
        this.endDate = this.$store.state.today;
        this.pie1.color = this.color;   
        this.pie1.title.text = this.title;
        this.pie1.title.subtext=this.subtext;	    
        this.pie1.legend.data=this.legend;
        //这两个无法
        this.pie1.series[0].name = this.seriesname;
        //暂时传假参数
        this.pie1.series[0].data = this.url;      
         
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
            if(v1 == 0){
                this.startDate = chart[0];
            }else{
                this.endDate = chart[0];
            }
            //检查数据
            // if(this.startDate==''){
            //     this.openisalert("请输入起始日期！");
            // }else if(this.endDate==''){
            //     this.openisalert("请输入结束日期！");
            // }else if(this.startDate!=='' && this.endDate!==''){
                //如果一个月大于
                if(parseInt(this.startDate.replace(/-/g,'')) - parseInt(this.endDate.replace(/-/g,''))<0){      
                    //发送数据和获取数据
                    console.log(this.startDate);
                    console.log(this.endDate);
                    this.getdata();
                }else{
                    this.openisalert("开始日期必须小于结束日期！");
                }   
            // }   
        },
        changetitle(){
            var ele = document.getElementsByClassName('ivu-tabs-tab-active')[0].innerText;
            console.log(ele);
        },
        //获取数据
        getdata(){
            //要改变的数据位置
            // this.pie1.series[0].data[0].value = this.res.data.max5;
            // this.pie1.series[0].data[1].value = this.res.data.max10;
            // this.pie1.series[0].data[2].value = this.res.data.min10;
            // this.pie1.title.subtext= this.subtext+ res.data.TeamCount;
            var self = this;
            this.loading = true;
            this.timer = setTimeout(function() {
                clearTimeout(self.timer);
                self.loading = false;
            }, 1500);
        },
        //打开警告框
        openisalert(val){
            var self = this;
            this.isalertinformation=val;
            this.isalert = true;        
            this.timer = setTimeout(function() {
                clearTimeout(self.timer);
                self.isalert = false;
            }, 1500);             
        }
    },
    components: {
        IEcharts,
        // echarts
        // Echarts,
        // masking
    }

    
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

#indexTab {
    padding: 0px 0 0 0;
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