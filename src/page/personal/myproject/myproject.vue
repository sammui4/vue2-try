<template>
    <div>
        <div class="item-type-1">
            <div class="head">
                <span>我创建的</span>
                <div class="handle-area">
                    <a href="#">创建团队</a>
                </div>
            </div> 
            <div class="content">
                 <projectlist :datalist="createproject"></projectlist> 
            </div>
        </div>
        <div class="item-type-1">
            <div class="head">
                <span>我加入的</span>
                <div class="handle-area">
                    <!-- <a href="#">加入项目</a> -->
                </div>
            </div>  
            <div class="content">
                 <projectlist :datalist="joinproject"></projectlist> 
            </div>          
        </div>
    </div>
</template>
<script>
    import qs from 'qs';
    import projectlist from '../../../components/project/projectlist.vue'
    export default {
        data(){
            return{
                dataurl:'http://localhost:1235/php/myproject.php',
                createproject:[],
                joinproject:[]
            }
        },
        mounted(){
            var self = this;   
            var account = this.$store.state.account; 
            console.log(this.account.id);
            axios.post(self.dataurl, qs.stringify({
                id:account.id,
            })).then((res) => {
                self.createproject = res.data.myCreateProject;
                self.joinproject = res.data.myJoinProject;
                self.$store.commit('CLOSE_MASK');
            }); 
                
        },

        methods:{

        },
        components:{
            projectlist
        }
    }
</script>
<style scoped>

</style>