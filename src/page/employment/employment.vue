<template>
    <div class="indexTab">
        <ul class="indexTabul">
            <li v-for="(employment,index) in headdatas" class="changesomething" v-text="employment.texts" @click="toggleclick(index,employment.names)" :class="active==index?'active':''"></li>
        </ul>
        <div>
            <component :is="currentView" :url="nowurl"></component>
        </div> 
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>   
    </div>
</template>
<style>

</style>
<script>
    import employments from './children/employment_list.vue'
    import masking from "../../components/mask/mask.vue"
    export default {
        data:function(){
            return {
                active:0,
                maskheight:'60px',
                ismask:false,
                headdatas:[
                    {
                        texts:'就业信息',
                        names:'employment_information'
                    },
                    {
                        texts:'招聘信息',
                        names:'recruitment_information'                        
                    }
                ],
                currentView:'employment_information',
                headurl:'http://localhost:2233/employmenthead.php',
                nowurl:'http://localhost:2233/employment_information.php',
                //总页数
                allpage: 0,
                //当前页数
                nowpage: 1,
                urlarray:[
                    {
                        url:'http://localhost:2233/employment_information.php'
                    },
                    {
                        url:'http://localhost:2233/recruitment_information.php'
                    }
                ]
            }
        },
        mounted:function(){
            var self = this;
            // axios.post(self.headurl).then((res) =>{
            //     self.headdatas = res.data;
                // self.$store.commit('CLOSE_MASK');
            // })

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
        },
        components:{
            employment_information:employments,
            recruitment_information:employments,
            masking
        }
    }
</script>
