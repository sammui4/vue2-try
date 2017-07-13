<template>
    <div class="indexTab">
        <ul class="indexTabul">
            <li class="changesomething" v-for="(statistics,index) in headdatas" v-text="statistics.texts" @click="toggleclick(index,statistics.names)" :class="active==index?'active':''"></li>
        </ul>
        <div>
            <component :is="currentView" :url="nowurl"></component>
        </div>   
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>                   
    </div>
</template>
<script>
// import axios from 'axios'
import qs from 'qs';
import team from './children/team.vue'
import project from './children/project.vue'
import site from './children/site.vue'
import masking from "../../components/mask/mask.vue"

export default {
    data: function () {
        return {
            headdatas: [],
            headdataurl: 'http://localhost:2233/statisticshead.php',
            active:0,
            account:null,
            maskheight:'60px',
            ismask:false,
            active:0,
            currentView: 'team',
            timer:null, 
            nowurl:null,
            urlarray:[
                {
                    url:''
                }
            ]          
        }
    },
    mounted:function(){
        var self = this;
        var power = JSON.parse(localStorage.getItem('user')).powers;
        axios.post(self.headdataurl, qs.stringify({
            powers:power
        })).then((res) => {
            self.headdatas = res.data;
            // console.log(self.headdatas);
        })        
    },
    methods:{
        changetitle(){
            var ele = document.getElementsByClassName('ivu-tabs-tab-active')[0].innerText;
            console.log(ele);
        },
        toggleclick:function(v1,v2){
            this.maskheight = "115px";
            this.ismask = true;
            this.active = v1;
            this.currentView = v2;
            console.log(v2);
            this.clearmask();
        },
        clearmask:function(){
            var self = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                clearTimeout(self.timer);
                self.ismask = false
            },500)            
        },
    },
    components:{
        team:team,
        project:project,
        site:site,      
        masking      
    }
}
</script>
<style scoped>
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
</style>