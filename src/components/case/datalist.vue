<template>
    <div>
        <div class="data-list">
            <div class="data-dl" v-for="data in datalist">
                <dl>
                    <dt>
                        <a href="#">
                            <img src="../../assets/demo/course.png" :src="data.img" v-lazy="data.img"/>
                        </a>
                    </dt>
                    <dd>
                        <h4>
                            <a href="#" v-text="data.title">光照检测系统</a>
                        </h4>
                        <p v-text="data.summary">用一句话简单描述这个案例究竟是做什么的啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="nonepic" v-if="datalist.length==0"></div>       
    </div>
</template>
<style scoped>
    .data-dl{
        margin: 30px 30px 0 0;
        display: inline-block;
        width: 242px;
        border: 1px solid #ccc;
    }
    .data-dl dd,dt{
        line-height: 1;
    }
    .data-dl h4{
        font-size: 16px;
        height: 50px;
    }
    .data-dl h4 a{
        text-decoration: none;
    }
    .data-dl dl{
        margin: 0;
        position: relative;
        /*height: 248px;*/
        height: 208px;
        overflow: hidden;
    }
    .data-dl dl:hover{
        -moz-box-shadow: 2px 2px 2px #ccc;
        -webkit-box-shadow: 2px 2px 2px #ccc;
        box-shadow: 2px 2px 2px #ccc;
    }
    .data-dl dl:hover dd{
        top: 68px;
    }
    .data-dl dl a{
        display: block;
        color: #3b4953;
        padding: 8px 0;
    }
    .data-dl dt a{
        height: 160px;
        display: block;
        overflow: hidden;
        padding: 0;
        position: relative;
    }
    .data-dl dl dt a:after{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
                transition: all 0.35s;
        -moz-transition: all 0.35s;
        -webkit-transition: all 0.35s;
            -o-transition: all 0.35s;	
        background: rgba(0,0,0,0);
    }
    .data-dl dl:hover dt a:after{
        background: rgba(0,0,0,0.1);
    }
    .data-dl dt img{
        width: 100%;
        height: 100%;
    }
    .data-dl dd{
        padding: 0 10px;
        position: absolute;
        top: 160px;
        left:0;
        right:0;
        /*height: 248px;*/
        height: 193px;
                transition: all 0.35s;
        -moz-transition: all 0.35s;
        -webkit-transition: all 0.35s;
            -o-transition: all 0.35s;
        background: rgba(255,255,255,0.95);
        z-index: 2;
    }
    .data-dl dd>p{
        line-height: 18px;
        font-size: 14px;
        color:#768087;
    }
</style>
<script>
    export default {
        data:function(){
            return {
                //返回来的数据
                // datalist:null,
                // //分页器总页数
                // allpage: 0,
                // //当前页数
                // nowpage: 1,
                // //总条数
                // allimfomation: 0,
                // //每页显示多少条
                // onepagenum: 12,
                // //屏蔽层高度
                // maskheight:'115px',
                // ismask:false,
                // //跳转按钮                
            }
        },
        props:['datalist']
    }
</script>
