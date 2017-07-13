<template>
    <div class="informationtype">
        <ul>
            <li v-for="(value,index) in headtype" v-text="value.text" :class="index===active?'active':''" @click="changeinformation(index,value.components)"></li>
        </ul>
        <div>
            <component :is="currentView"></component>
        </div>
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking> 
    </div>
</template>

<script>
    import qs from 'qs'
    import masking from '../../../components/mask/mask.vue'
    import dev_ordered_record from './children/dev_ordered_record.vue'
    import site_application_record from './children/site_application_record.vue'
    import member_application from './children/member_application.vue'
    import member_invitate from './children/member_invitate.vue'
    export default {
        data(){
            return{
                headtype:[
                    {
                        text:'设备预约记录',
                        components:'dev_ordered_record'
                    },
                    {
                        text:'场地申请记录',
                        components:'site_application_record'                    
                    },
                    {
                        text:'团队和项目的成员申请',
                        components:'member_application'
                    },
                    {
                        text:'团队和项目的成员邀请',
                        components:'member_invitate'                    
                    }
                ],
                currentView:'dev_ordered_record',
                active:0,
                maskheight:'183px',
                ismask:false,
                timer:null
            }
        },
        mounted(){
            // this.$store.commit('CLOSE_MASK');
        },
        methods: {
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
            masking,
            dev_ordered_record,
            site_application_record,
            member_application,
            member_invitate
        }
    }
</script>

<style scoped>
  
</style>
