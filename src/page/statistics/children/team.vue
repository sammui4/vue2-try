<template>
    <div>
        <ul class="statics_padding">
            <li v-for="bing in bingdata">
                <bing :datatype="0" :color="color" :title="bing.title" :subtext="bing.subtext" :legend="bing.legend" :seriesname="bing.seriesname" :url="bing.url"></bing>
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
                        title:'团队人员分布统计',
                        subtext:'团队数量',
                        seriesname:'团队数量',
                        legend:['1-5人','5-10人','10人以上'],
                        url:[
                            {value:15, name:'1-5人'},
                            {value:25, name:'5-10人'},
                            {value:60, name:'10人以上'}
                        ]
                    }
                ],
                color:['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3',  '#a9e04b', '#759fd3','#ffa893', '#506bbe', '#febc48', 'ba86f8'],
                linedata:[
                    {
                        title:'团队发展阶段数量统计',
                        subtext:'',
                        legend:['初创团队','成熟团队','已孵化'],
                        url:[
                            {
                                
                                type:'bar',
                                barWidth: '35%',
                                stack: '人数',
                                //放每个月份的初创团队的数据
                                name:'初创团队',
                                data:[3,4]
                            },
                            {  
                                type:'bar',
                                stack: '人数',
                                name:'成熟团队',
                                data:[1,2]
                            },
                            {
                                
                                type:'bar',
                                stack: '人数',
                                name:'已孵化',
                                data:[1,2]
                            }
                        ]
                    }
                ]
                //下一组数据


            }
        },
        components:{
            bing:bingchart,
            lines:linechart
        },
        mounted(){
            this.$store.commit('CLOSE_MASK');
        }
    }
</script>
<style scoped>

</style>
