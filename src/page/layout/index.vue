<template>
    <div>
        <header>
            <div id="header-logo">
    
            </div>
            <div class="hh-handle">
                <div class="hh-handle hh-user" @mouseover="toggleclass(1)" @mouseout="toggleclass(2)">
                <!--<div class="hh-handle hh-user">-->
                    <div class="hhu-portrait">
                        <img alt="头像" v-if="account.img!=='' && account.img!==null" :src="account.img"/>
                        <img alt="头像" v-else src="../../assets/default/hhu-portrait.png" />
                    </div>
                    <div class="hhu-handle-expand">
                        <span class="icon-caret-right">
    
                        </span>
                    </div>
                    <div class="hhu-handle-window" v-bind:class="isshow?'_visible':''">
                    <!--<div class="hhu-handle-window">-->
                        <div class="figure-triangle">
                            <div class="shade"></div>
                        </div>
                        <div class="top">
                            <div class="_1">
                                <div class="portrait">
                                    <a href="#/personal">
                                        <img alt="头像" v-if="account.img!=='' && account.img!==null" :src="account.img"/>
                                        <img alt="头像" v-else src="../../assets/default/hhu-portrait.png" />
                                    </a>
                                </div>
                                <div class="description">
                                    <strong class="text-ellipsis-1" v-text="account.account"></strong>
                                    <p class="text-ellipsis-1">海洋本111</p>
                                </div>
                            </div>
                            <div class="_2">
                                <a href="#" class="window-handle  personal-data" data-toggle="modal" data-target="#modal-password-editing">修改密码</a>
                            </div>
                        </div>
                        <div class="bottom">
                            <router-link class="window-handle  log-out-exit" :to="{path:'/login'}">退出登录</router-link>
                        </div>
                        <div class="interesting"></div>
                    </div>
                </div>
                <ul class="hh-link hh-handle">
                    <li>
                        <router-link :to="{path:'/index/information'}"><Icon type="email"></Icon></router-link>
                    </li>
                </ul>
                <div class="hh-handle hh-search">
                    <input type="button" name="" id="" value="" />
                    <input type="text" name="" id="" value="" placeholder="搜索团队、项目、课程、实验、案例" />
                </div>
            </div>
        </header>
        <div id="side-left">
            <ul class="sl-content">
                <!--最左边的东西-->
                <li v-for="(source,index) in leftside" :class="$route.path.indexOf(source.detail)>-1 && $route.path.indexOf(source.detail)<2?'active':''">
                    <span class="a-icon" v-bind:style="{'background-position-x':-22*index+'px'}"></span>
                    <router-link :to="source.src" v-text="source.pagename" v-if="source.src.indexOf('http')<0"></router-link>
                    <a :href="source.src" v-text="source.pagename" v-else></a>
                </li>
            </ul>
        </div>
        <div id="main">
            <router-view class="view"></router-view>
        </div>
        <masking v-show="ismask" v-bind:style="{'top':maskheight}"></masking>
    </div>
</template>

<script>
// import axios from 'axios'
import qs from 'qs';
import masking from '../../components/mask/mask.vue'
import {mapState} from 'vuex'
export default {
    name: 'app',
    data: function () {
        return {
            active: true,
            leftside: [],
            url: 'http://localhost:2233/leftside.php',
            account: {},
            //右边的玩意
            isshow:false,
            //屏蔽层相关
            ismask:true,
            maskheight:'60px',
            timer:null
        }
    },
    mounted: function () {
        var self = this;   
        var item = JSON.parse(localStorage.getItem('user'));
        this.account = item;
        console.log(item);
        //把登陆的用户信息传入到vuex中
        // this.$store.commit('GET_USERINFO', self.account);
        // var params = new URLSearchParams();
        // params.append('powers', self.account.powers);
        // axios.post(this.url,params).then(function (res) {
        axios.post(this.url,qs.stringify({powers:self.account.powers})).then(function (res) {
            self.leftside = res.data;
        }).catch(function (err) {
                console.log(err);
        })    
    },
    methods: {
        interesting: function (res) {
            return '{background:' + res * -22 + 'px 0}'
        },
        showyou:function(){
            this.isshow=!this.isshow;
        },
        hideyou:function(){
            var self = this;
            setTimeout(function() {
                this.isshow=!this.isshow;
                console.log(self.isshow);
            }, 600); 
        },
        toggleclass:function(){
            this.isshow=!this.isshow;
        },
        ha:function(){
            this.$store.commit('CLOSE_MASK');
        }
    },
    //监控路由
    watch:{
        ismasking:function(val){
            var self = this;
            // console.log(val);
            if(val==false){  
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    clearTimeout(self.timer);
                    self.ismask = false;
                    this.ha();
                },800) 
            }else{
                this.maskheight = this.$store.state.maskheight;
                this.ismask = true;
            }
        },
        '$route': 'ha',       
    },
    components:{
        masking
    },
    //使用vuex
    computed:mapState({
        ismasking: state => state.mask,
        // account: state => state.account,
        account:function(state){
            if(state.account==null){
                this.$store.dispatch('FLASH_USERINFO');
            }
            return state.account;
        }
    })
}
</script>

<style scoped>
#header-logo {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: 420px;
    height: 60px;
    background-color: #2f9dea;
    background-repeat: no-repeat;
    background-position: 22px 12px;
    background-image: url(../../assets/icon/logo_manage-header.png);
}

.view>header{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 60px;
    z-index: 5;
    background-color: #2f9dea;
}



#main {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0;
    right: 0;
    background-color: #fff;
    width: 100%;
    height:100%;
    padding: 60px 0 0 210px;
}


.hh-handle {
    height: 100%;
    padding: 0 10px;
    float: right;
}

.hh-user {
    position: relative;
    width: 92px;
    margin-right: 0;
    height: 100%;
}

.hh-user._mouseover {
    background-color: #39A2ED;
}

.hh-user._mouseover .hhu-handle-expand span {
    /*鼠标移入，三角图标向下旋转*/
    margin-top: 22px;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    /* IE 9 */
    -webkit-transform: rotate(90deg);
    /* Safari and Chrome */
    -o-transform: rotate(90deg);
    /* Opera */
    -moz-transform: rotate(90deg);
    /* Firefox */
}

.hhu-portrait {
    width: 36px;
    height: 36px;
    margin-top: 12px;
    margin-left: 11px;
    float: left;
    border: solid 1px #39A2ED;
    overflow: hidden;
    border-radius: 50%;
}

.hhu-portrait img {
    width: 100%;
    height: 100%;
}

.hhu-handle-expand {
    width: 40px;
    height: 100%;
    margin-right: 4px;
    float: right;
    color: #f8f8f8;
}

.hhu-handle-expand span {
    transition: transform 0s;
    -moz-transition: transform 0s;
    /* Firefox 4 */
    -webkit-transition: -webkit-transform 0s;
    /* Safari 和 Chrome */
    -o-transition: -o-transform 0s;
    /* Opera */
    display: inline-block;
    width: 20px;
    height: 18px;
    text-align: center;
    margin-left: 8px;
    margin-top: 20px;
    font-size: 20px;
}

.hhu-handle-window {
    position: absolute;
    top: 70px;
    left: -168px;
    display: none;
    /*一开始隐藏*/
    width: 240px;
    height: 210px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px 0 #e0e0e0;
    border: solid 1px #e0e0e0;
    z-index: 1000;
}

.hhu-handle-window._visible{
	display: block;
}


.hhu-handle-window .figure-triangle {
    position: absolute;
    width: 16px;
    top: -21px;
    left: 187px;
    height: 16px;
    border: solid 10px transparent;
    border-bottom: solid 11px #b8b8b8;
}
.hhu-handle-window .interesting{
    position: absolute;
    top: -16px;
    height:16px;
    left:0;
    right:0;
}
.hhu-handle-window .figure-triangle .shade {
    position: absolute;
    width: 16px;
    bottom: -12px;
    left: -10px;
    height: 16px;
    border: solid 10px transparent;
    border-bottom: solid 11px #fff;
}

.hhu-handle-window .top {
    height: 160px;
    padding-left: 18px;
    padding-top: 16px;
    border-bottom: solid 1px #eee;
}

.hhu-handle-window .top ._1 {
    height: 56px;
}

.hhu-handle-window .top ._1 .portrait {
    float: left;
    width: 56px;
    height: 56px;
    border: solid 1px #f3f9fd;
    border-radius: 50%;
    overflow: hidden;
}

.hhu-handle-window .top ._1 .portrait img {
    width: 100%;
    height: 100%;
}

.hhu-handle-window .top ._1 .description {
    width: 164px;
    height: 56px;
    padding: 0 12px;
    float: left;
}

.hhu-handle-window .top ._1 .description strong {
    display: inline-block;
    max-width: 100%;
    height: 30px;
    font-weight: normal;
    line-height: 30px;
}

.hhu-handle-window .top ._1 .description p {
    height: 17px;
    font-size: 12px;
    color: #999;
    overflow: hidden;
}

.hhu-handle-window .window-handle {
    display: inline-block;
    height: 48px;
    line-height: 48px;
    color: #505050;
}

.hhu-handle-window .window-handle:hover {
    text-decoration: none;
}

.hhu-handle-window .top ._2 {
    position: relative;
    height: 87px;
}

.hhu-handle-window .window-handle.personal-data {
    position: absolute;
    top: 40px;
    left: 0;
}

.hhu-handle-window .bottom {
    height: 49px;
    padding-left: 18px;
}

.hh-link {
    height: 100%;
}

.hh-link li {
    height: 100%;
    float: right;
}

.hh-link li a {
    display: inline-block;
    min-width: 50px;
    height: 100%;
    line-height: 60px;
    padding: 0 10px;
    font-size: 16px;
    text-align: center;
    color: #eee;
    float: right;
    vertical-align: middle;
}
.hh-link li a i{
    font-size: 22px;
    vertical-align: middle;
}
.hh-search {
    width: 295px;
    height: 34px;
    margin-top: 12px;
    margin-right: 24px;
    border-bottom: solid 1px #BEE1F9;
}

.hh-search input[type=text] {
    width: 234px;
    margin-left: 5px;
    color: #f8f8f8;
}

.hh-search input {
    /* height: 36px; */
    padding: 8px 0;
    border: none;
    float: right;
    background: none;
}

.hh-search input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #f8f8f8;
}

.hh-search input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #f8f8f8;
}

.hh-search input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #f8f8f8;
}

.hh-search input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #f8f8f8;
}

.hh-search input[type=button] {
    width: 32px;
    height: 36px;
    margin-left: 3px;
    opacity: 0.7;
    background: url(../../assets/icon/btn-search-hh.png) 5px 8px no-repeat;
}
#side-left {
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 210px;
    z-index: 4;
    background-color: #f8f8f8;
    background-color: rgba(247, 157, 234, .05);
    border-right: solid 1px #eee;
    overflow: hidden
}
/*最左边的东西*/
.sl-content {
    width: 230px;
    height: 100%;
    padding-right: 7px;
    padding-top: 16px;
    overflow: hidden;
    overflow-y: scroll;
}

.sl-content li {
    max-width: 100%;
    height: 36px;
    margin: 5px 0;
    border-left: solid 4px transparent;
}

.sl-content li span.a-icon {
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin: 0 6px 0 20px;
    background: url(../../assets/icon/sprite-0.png) no-repeat;
    float: left;
}

.sl-content li>a {
    color: #000;
    font-size: 14px;
}

.sl-content li.active span {
    background-position-y: -22px;
}

.sl-content .router-link-active {
    color: #2f9dea;
}





</style>