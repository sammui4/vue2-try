<template>
    <div>
        <ul class="mc-content-ul">
            <li class="mc-content-list" v-for="data in listdata">
                <a class="mc-content-list-img" href="employment-information-4.html">
                    <img :src="data.img" class="img" v-lazy="data.img"/>
                </a>
                <div class="mc-content-list-show">
                    <span><Icon type="eye"></Icon></span><span v-text="data.looknum">1273</span>
                </div>
                <div class="mc-content-list-detail">
                    <h4 class="text-not-overflow"><a href="employment-information-1.html" v-text="data.title">职场仍是男性的天下 教育行业最容易见到女高管</a></h4>
                    <span v-text="data.date">2017-03-08</span>
                    <p class="text-not-overflow" v-text="data.summary">女性就业率走高，晋升天花板仍在。</p>  
                </div>
            </li>
        </ul>
        <div class="pagination" v-if="allpage>1">
             <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
        </div>
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>
    </div>
</template>
<style>
.mc-content-ul{
    padding-bottom: 20px;
}
.mc-content-ul>.mc-content-list{
	padding: 20px 0 10px 0;
	overflow: auto;
}
.mc-content-ul>.mc-content-list>.mc-content-list-img{
	float: left;
	height: 140px;
	overflow: hidden;
	background: #002A80;
	display: block;
	width: 210px;
}
.mc-content-ul>.mc-content-list>.mc-content-list-img .img{
	width:100%;
	height: 100%;
}
.mc-content-ul>.mc-content-list>.mc-content-list-show{
	float: right;
	padding: 122px 40px 0 0;
	color: #768087;
}
.mc-content-list-show i{
    font-size: 18px;
}
.mc-content-list-show span{
    display: inline-block;
}
.mc-content-list-show span:first-child{
    
}
.mc-content-ul>.mc-content-list>.mc-content-list-detail{
	padding:0 144px 0 10px;
	overflow: hidden;
	height: 140px;
	color: #768087;
}
.mc-content-ul>.mc-content-list>.mc-content-list-detail>h4{
	font-weight: bold;
	font-size: 20px;
	margin-top: 1px;
	line-height: 1;
	height: 20px;
}
.mc-content-ul>.mc-content-list>.mc-content-list-detail>h4 a{
	color: #000;
}
.mc-content-ul>.mc-content-list>.mc-content-list-detail>h4 a:hover{
	text-decoration: none;
}
.mc-content-ul>.mc-content-list>.mc-content-list-detail>p{
	max-height: 74px;
	padding: 14px 0 4px 0;
}
.mc-content-ul>.mc-content-list>.mc-content-list-detail>span{
	display: block;
}

</style>
<script>
    import masking from '../../../components/mask/mask.vue'
    export default {
        data:function(){
            return {
                //分页器总页数
                allpage: 0,
                //当前页数
                nowpage: 1,
                //总条数
                allimfomation: 0,
                //每页显示多少条
                onepagenum: 12,
                //返回来的数据
                listdata:[],
                //屏蔽层高度
                maskheight:'115px',
                ismask:false,
                timer:null
            }
        },
        props:['url'],
        methods:{
            clickchargepage:function(val){
                var self = this;
                this.nowpage = val;
                this.ismask = true;
                var params = new URLSearchParams();
                params.append('onepagenum', self.onepagenum);
                params.append('nowpage', self.nowpage); 
                axios.post(self.url,params).then((res) => {
                    self.listdata = res.data.datalist;
                    this.timer = setTimeout(() => {
                        clearTimeout(this.timer);
                        this.ismask = false
                    },500)
                })              
            }
        },
        mounted:function(){
            var self = this;
            var params = new URLSearchParams();
            params.append('onepagenum', self.onepagenum);
            params.append('nowpage', self.nowpage);
            axios.post(self.url, params).then((res) => {
                self.allimfomation = res.data.allnum;
                self.listdata = res.data.datalist;
                self.allpage = Math.ceil(res.data.allnum / self.onepagenum); 
                console.log(res.data.datalist);
                self.$store.commit('CLOSE_MASK');
            })
        },
        components:{
            masking
        }
    }
</script>

