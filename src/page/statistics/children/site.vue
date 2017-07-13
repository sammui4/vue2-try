<template>
    <div>
        <ul class="statics_padding">
            <li v-for="line in linedata">
                <lines :datatype="1" :color="color" :title="line.title" :subtext="line.subtext" :legend="line.legend" :url="line.url"></lines>  
            </li>
        </ul>
    </div>
</template>
<script>
    // import axios from 'axios'
    import linechart from '../../../components/chart/linechart.vue'
    export default {
        data:function(){
            return {
                color : ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3',  '#a9e04b', '#759fd3','#ffa893', '#506bbe', '#febc48', 'ba86f8'],
                linedata:[
                    {
                        title:'场地申请次数/通过次数',
                        subtext:'',
                        legend:['申请次数','通过次数'],
                        url:[
                            {
                                name:'申请次数',
                                type:'bar',
                                barWidth: '15%',
                                /*stack: '项目数量',*/
                                data:[13,14]
                            },
                            {
                                name:'通过次数',
                                type:'bar',
                                barWidth: '15%',
                                /*stack: '项目数量',*/
                                data:[12,13]
                            }
                        ]
                    },
                    {
                        title:'场地使用率统计',
                        subtext:'',
                        legend:['创业区','创客空间','商业路演区','会议室'],
                        url:[
                            {
                                name:'创业区',
                                type:'bar',
                                barWidth: '15%',
                                /*stack: '项目数量',*/
                                data:[13,14]
                            },
                            {
                                name:'创客空间',
                                type:'bar',
                                barWidth: '15%',
                                /*stack: '项目数量',*/
                                data:[12,13]
                            },
                            {
                                name:'商业路演区',
                                type:'bar',
                                barWidth: '15%',
                                /*stack: '项目数量',*/
                                data:[12,13]
                            },
                            {
                                name:'会议室',
                                type:'bar',
                                barWidth: '15%',
                                /*stack: '项目数量',*/
                                data:[12,13]
                            },
                        ]
                    }
                ]

            }
        },
        components:{
            lines:linechart
        }
    }
</script>
<style scoped>

</style>
