<template>
    <div class="indexTab">
        <ul class="clear indexTabul">
            <!--个人首页上面的五个玩意-->
            <li v-for="(value,index) in indexheads" :class="$route.path.indexOf(value.details)>-1?'active':''" class="changesomething">
                <router-link :to="value.src" v-text="value.pagename"></router-link>
            </li>
        </ul>
        <div class="bodycontent">
            <router-view></router-view>
        </div>
        <!--<Back-top :height="200"></Back-top>-->
    </div>
</template>
<style scoped>
.bodycontent {
    padding: 20px 30px 30px 0;
}
</style>
<script>
//   import axios from 'axios'
import qs from 'qs';
export default {
    data: function () {
        return {
            indexrouterurl: 'http://localhost:2233/indexrouter.php',
            indexheads: []
        }
    },
    mounted: function () {
        var self = this;
        //console.log(this.$store.state.account);
        var powers = JSON.parse(localStorage.getItem('user')).powers;
        // var params = new URLSearchParams();
        // params.append('powers',powers);
        // axios.post(self.indexrouterurl,params).then(function(res){
        axios.post(self.indexrouterurl, qs.stringify({
            powers: powers
        })).then(function (res) {
            self.indexheads = res.data;
        }).catch(function (err) {
            console.log(err)
        })

    }
}
</script>