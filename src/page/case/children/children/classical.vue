<template>
    <div>
        <div class="content-tabs-classify">
            <div class="first-content-tabs" v-for="(msg,index) in filters">
                <div class="classify-left" v-text="msg.name"></div>
                <div class="classify-right">
                    <div class="classify-list" v-for="(interesting,index2) in msg.data" :class="index2==msg.activenum?'active':''" >
                        <!--
                            v1:获取出来的具体整个分类后的数据
                            v2:整个分类
                            v3:
                            v4
                        -->
                        <span v-text="interesting.name" @click="clickchange(msg,interesting,index,index2)"></span>
                    </div> 
                    <div>
                        <gg :msg="msg.children" v-show="msg.active" :active="msg.active" :index="index"></gg>
                    </div>       
                </div>
            </div>             
        </div> 
        <div class="classify-wrapper">
             <!--放caselist--> 
        </div>    
        <!--分页器-->
        <div class="pagination" v-if="allpage>1">
             <Page :total="allpage*10" show-elevator @on-change="clickchargepage" :current="nowpage"></Page>
        </div>             
    </div>
</template>
<script>
    import caselist from '../../../../components/case/datalist.vue' 
    import masking from '../../../../components/mask/mask.vue'
    import qs from 'qs';   
    
    export default {
        data:function(){
            return {
                //传回来的头部
                filters:null,
                filterurl:'http://localhost:1235/php/filterlist.php',
                headurl:'http://localhost:1235/php/casenextheaddata.php',
                //分页器总页数
                allpage: 0,
                //当前页数
                nowpage: 1,
                //总条数
                allimfomation: 0,
                //每页显示多少条
                onepagenum: 12,
                sendarray:[],
                type:4 
            }

        },
        mounted:function(){
            var self = this;
            axios.post(self.filterurl).then((res) => {
                self.filters = res.data.datalist;
                for(let i=0;i<self.filters.length;i++){
                    self.sendarray[i]=-1;
                }
                self.$store.commit('GET_SENDARRAY', self.sendarray);
            })
        },
        methods:{
            //点击上面循环的玩意
            clickchange(v1,v2,v3,v4){
                var self =this;
                this.$children[v3].activenum = -1;
                this.$children[v3].open = false;
                Vue.set(this.filters[v3],'activenum',v4)
                Vue.set(this.filters[v3],'activeid',v2.id*1);  
                //把index和具体数字传到vuex中
                self.$store.commit('CHANGE_SENDARRAY', [v3,self.filters[v3].activeid]);
                console.log(this.sendarray);
                if(v2.text=='all' || v2.next=='false'){
                     Vue.set(this.filters[v3],'active',false);     
                }else{
                    //打开下一级
                    // this.open = true;
                    Vue.set(this.filters[v3],'active',true);   
                }    
                axios.post(self.headurl, qs.stringify({
                    // id:self.filters[v3].activeid,
                    page:1,
                    sendarray: JSON.stringify(self.$store.state.sendarray)
                })).then((res) => {
                    Vue.set(this.filters[v3],'children',res.data.headdata);
                })         
            },
            //点击分页器
            clickchargepage(val){
                
            }
        },
        components:{
            masking,
            caselist,
            gg:{
                name:'ga',
                template:`
                    <div class="next-content-tabs">
                        <div class="first-content-tabs">
                            <div class="classify-list" v-for="(interestings,index) in msg" :class="index==activenum?'active':''" @click="clickchange(interestings,index)">
                                <span v-text="interestings.name"></span>
                            </div>                        
                        </div>
                        <div class="next-content-tabs">
                            <ga v-if="open" :msg="data" :index="index"></ga>
                        </div>                       
                    </div>`,
                // props:['msg','activenum','open'],
                props:['msg','index'],
                data(){
                    return {
                        data:null,
                        activenum:-1,
                        open:false,
                        headurl:'http://localhost:1235/php/casenextheaddata.php',
                    }
                },
                methods:{
                    clickchange:function(v1,v2){
                        var self = this;
                        console.log(v1);
                        console.log(this.index);
                        this.activenum = v2; 

                        this.$store.commit('CHANGE_SENDARRAY', [this.index,v1.id*1]);   
                        //有下一级才显示        
                        if(v1.next=='true'){
                            this.open = true; 
                            //取消下下一级目录
                            if(this.$children[0]!==undefined){
                                // this.$children[0].activenum =-1;
                                // this.$children[0].open =false;
                                this.$children[0].reset();
                            }      
                        }else{
                             this.open = false;
                        }
                        this.data = this.msg;
                        axios.post(self.headurl, qs.stringify({
                            // id:self.filters[v3].activeid,
                            page:1,
                            sendarray: JSON.stringify(self.$store.state.sendarray)
                        })).then((res) => {
                            this.data = res.data.headdata
                        }) 
                    },
                    reset:function(){
                        this.activenum = -1;
                        this.open =false;
                    }                   
                },      
            }

        }
    }   
</script>
<style scoped>

</style>