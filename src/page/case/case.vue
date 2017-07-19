<template>
    <div class="indexTab" id="no_padding">
        <ul class="indexTabul" >
            <li class="changesomething" v-for="(cases,index) in casehead" v-text="cases.pagename" @click="toggleclick(index,cases.detail)" :class="active==index?'active':''"></li>
        </ul>
        <div>
            <component :is="currentView" :url="nowurl" :title="title"></component>
        </div>
        <div class="tab-handle">		
            <ul>
                <li v-if="active==0"><router-link class="a-btn" :to="{path:'/cases/caseupload'}">上传案例</router-link><router-link class="a-btn" :to="{path:'/cases/myupload'}">已上传的</router-link></li>
                <li v-if="account&&account.powers==0 && active==1"><a class="a-btn" href="javascript:">实验室使用安排</a></li>
                <li v-if="account&&account.powers==0 && active==2"><span class="a-btn" @click="changeapproval">切换审批</span><span>目前审批方式：</span><strong v-if="account&&account.approvalMethods==0">系统审批申请</strong><strong v-if="account&&account.approvalMethods==1">人工审批申请</strong></li>
                <li v-if="account&&account.powers==1 && active==2"><a class="a-btn" href="javascript:">预约设备</a></li>            
            </ul>						                      
        </div>        
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>
    </div>
     
</template>
<script>
    import axios from "axios"
    import masking from "../../components/mask/mask.vue"
    import listdetail from '../../components/caseListAndExperienceList/list_detail.vue'
    import caseass from '../case/children/caseass.vue'
    export default {
        data:function(){
            return{
                account:null,
                caseurl:'http://localhost:1235/php/case.php',
                casehead:null,
                currentView: 'casepot',
                maskheight:'60px',
                ismask:false,
                timer:null,
                //最上面默认显示的玩意
                active:0,
                //下一级默认显示的玩意
                active2:0,
                url:[
                        {
                            url:null
                        },
                        {
                            url:'http://localhost:1235/php/casecenter.php',
                        },
                        {
                            url:'http://localhost:1235/php/caseenquipment.php',
                        }
                ],
                nowurl:null,
                title:''
            }
        },
        methods:{
            toggleclick:function(v1,v2){
                this.maskheight = "115px";
                this.ismask = true;
                this.active = v1;
                this.currentView = v2;
                if(v1!==0){
                    this.nowurl = this.url[v1].url
                }
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
            changeapproval:function(){

            }
        },
        components:{
            casepot:caseass,
            casecenter:listdetail,
            caseenquipment:listdetail,
            masking
        },
        mounted:function(){
            var self = this;
            this.account = this.$store.state.account;
            axios.post(self.caseurl).then((res) =>{
                self.casehead = res.data;
                self.$store.commit('CLOSE_MASK');
            })

        }
    }
</script>
<style scoped>
     .changesomething.active{
         color:#2f9dea;
     }
     #no_padding{
         padding-left:0;
     }
</style>
