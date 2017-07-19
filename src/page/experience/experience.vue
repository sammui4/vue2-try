<template>
    <div class="indexTab" id="no_padding">
        <ul class="indexTabul" >
            <li class="changesomething" v-for="(experiences,index) in experiencehead" v-text="experiences.pagename" @click="toggleclick(index,experiences.detail)" :class="active==index?'active':''"></li>
        </ul>
        <div>
            <component :is="currentView" :url="nowurl" :title="title"></component>
        </div>
        <div class="tab-handle">		
            <ul>
                <li v-if="account&&account.powers==0 && active==0"><span class="a-btn" @click="changeapproval">切换审批</span><span>目前审批方式：</span><strong v-if="account&&account.approvalMethods==0">系统审批申请</strong><strong v-if="account&&account.approvalMethods==1">人工审批申请</strong></li>
                <li v-if="account&&account.powers==0 && active==1"><a class="a-btn" href="javascript:">实验室使用安排</a></li>
            </ul>						
                                
        </div> 
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>
    </div>
</template>
<style scoped>

</style>

<script>
    import axios from "axios"
    import masking from "../../components/mask/mask.vue"
    import listdetail from '../../components/caseListAndExperienceList/list_detail.vue'  
    export default {
        data:function(){
            return {      
                experienceurl:'http://localhost:1235/php/experience.php',
                account:null,
                experiencehead:null,
                maskheight:'60px',
                ismask:false,
                active:0,
                currentView: 'experience_dev',
                title:'',
                timer:null,
                nowurl:'http://localhost:1235/php/experience_dev.php',
                urlarray:[
                    {
                        url:'http://localhost:1235/php/experience_dev.php',
                    },
                    {
                        url:'http://localhost:1235/php/laboratory.php',
                    },
                    {
                        url:'http://localhost:1235/php/online_dev.php',
                    }
                ],
                arrays:null
            }
        },
        mounted:function(){
            this.account = this.$store.state.account;
            this.arrays = this.urlarray[0].array;
            var self = this;
            axios.post(self.experienceurl).then((res) =>{
                this.experiencehead = res.data;
            })    
            console.log(this.account.approvalMethods);        
        },
        components:{
            experience_dev:listdetail,
            laboratory:listdetail,
            online_dev:listdetail,
            masking
        },
        methods:{
            toggleclick:function(v1,v2){
                this.maskheight = "115px";
                this.ismask = true;
                this.active = v1;
                this.currentView = v2;
                this.nowurl = this.urlarray[v1].url;
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

        }
    }
</script>
<style scoped>
     #no_padding{
         padding-left:0;
     }    
</style>


