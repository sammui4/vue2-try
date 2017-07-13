<template>
    <div>
        <ul class="statics_padding">
            <li v-for="bing in bingdata">
                <bing :datatype="0" :color="color" :title="bing.title" :subtext="bing.subtext" :legend="bing.legend" :url="bing.url"></bing>
            </li>
            <li v-for="line in linedata">
                <lines :datatype="1" :color="color" :title="line.title" :subtext="line.subtext" :legend="line.legend" :url="line.url"></lines>  
            </li>
        </ul>        
    </div>
</template>
<script>
    // import axios from 'axios'
    import bingchart from '../../../components/chart/bingchart.vue'
    import linechart from '../../../components/chart/linechart.vue'
    export default {
        data:function(){
            return {
                bingdata:[
                    {
                        title:"项目发展状态统计",
                        subtext:"团队数量",
                        
                        legend:['需求调研','方案设计','开发实施','完成交付'],
                        url:[
                            {value:15, name:'需求调研'},
                            {value:20, name:'方案设计'},
                            {value:25, name:'开发实施'},
                            {value:40, name:'完成交付'}
                        ]
                    }
                ],
                color:['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3',  '#a9e04b', '#759fd3','#ffa893', '#506bbe', '#febc48', 'ba86f8'],
                linedata:[
                    {
                        title:'项目数量统计',
                        subtext:'',
                        legend:['普通项目','二级项目','一级项目','优秀项目'],
                        url:[
                            {
                                
                                type:'bar',
                                barWidth: '35%',
                                stack: '人数',
                                //放每个月份的初创团队的数据
                                name:'普通项目',
                                data:[3,4]
                            },
                            {  
                                type:'bar',
                                stack: '人数',
                                name:'二级项目',
                                data:[1,2]
                            },
                            {
                                
                                type:'bar',
                                stack: '人数',
                                name:'一级项目',
                                data:[1,2]
                            },
                            {
                                
                                type:'bar',
                                stack: '人数',
                                name:'优秀项目',
                                data:[1,2]
                            }
                        ]
                    }
                ],

            }
        },
        components:{
            bing:bingchart,
            lines:linechart
        }
    }
</script>
