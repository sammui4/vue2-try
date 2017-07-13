<template>
    <div class="informationtype">
        <ul>
            <li v-for="(value,index) in informationtype" :class="index===active?'active':''" v-text="value.pagename" @click="changeinformation(index,value.components)"></li>
        </ul>
        <div>
            <component :is="currentView"></component>
        </div>
        <masking v-if="ismask" v-bind:style="{'top':maskheight}"></masking>  
    </div>
</template>
<style scoped>

</style>
<script>
import axios from 'axios'
import dealwith from './children/dealwith.vue'
import notice from './children/notice.vue'
import masking from '../../../components/mask/mask.vue'
export default {
    data: function () {
        return {
            informationrouterurl: 'http://localhost:2233/informationrouter.php',
            informationtype: [
                {
                    pagename:'待办',
                    //绑定哪个组件
                    components:'dealwith'
                },
                {
                    pagename:'消息',
                    components:'notice'
                }
            ],
            active: 0,
            currentView: 'dealwith',
            maskheight:'200px',
            ismask:false,
            timer:null
        }
    },
    mounted: function () {
        // var self = this;
        // axios.post(this.informationrouterurl).then((res) => {
        //     self.informationtype = res.data;
            // self.$store.commit('CLOSE_MASK');
        // })
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
    components: {
        dealwith,
        notice,
        masking
    }

}
</script>