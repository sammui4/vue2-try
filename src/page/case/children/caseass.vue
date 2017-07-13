<template>
    <div> 
        <ul class="nextpage">
            <li v-for="(cases,index) in casetype" v-text="cases.pagename" :class="index===active?'active':''" @click="changeinformation(index,cases.components)">经典案例</li>
        </ul>          
         <component :is="currentView"></component> 
         <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking> 
    </div>
</template>
<script>
    // import axios from 'axios'
    import classical from './children/classical.vue'
    import increase from './children/increase.vue'
    import masking from '../../../components/mask/mask.vue'
    import qs from 'qs';   
    export default {
        data:function(){
            return{
                active: 0,            
                casetype: [
                    {
                        pagename:'经典案例',
                        //绑定哪个组件
                        components:'classical'
                    },
                    {
                        pagename:'增长案例',
                        components:'increase'
                    }
                ],
                currentView:'classical',
                maskheight:'150px',
                ismask:false,
                timer:null
            }
        },
        methods:{
            changeinformation: function (v1, v2) {
                this.ismask = true;
                this.active = v1;
                this.currentView = v2;
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.ismask = false
                },500)
            }
            
        },
        components:{
            classical,
            increase,
            masking
        }
    }
</script>
<style scoped>
    .nextpage>li{
        display: inline-block;
        padding-left:30px;
        margin-right: -10px;
        line-height: 34px;
        height: 34px;
        cursor: pointer;
    }
</style>