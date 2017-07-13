<template>
    <div class="content_wrapper">
        <div id="main-content">
            <Form ref="formCustom" :model="senddata" :rules="ruleCustom">
                <div class="logo"></div>
                <div class="user-name login-input">
                    <input type="text" v-model="senddata.account" @keyup="logininto($event)"/>
                </div>
                <div class="password login-input ">
                    <input type="password" v-model="senddata.password" @keyup="logininto($event)"/>
                </div>
                <span id="btn-login" @click="loginClick">登录</span>
                <div class="tips _hidden" v-if="mes.active==true" v-text="mes.errordata"></div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
.content_wrapper {
    min-height: 100%;
    font-size: 14px;
    color: rgb(59, 73, 83);
    font-family: "PingFang SC", Helvetica, "Helvetica Neue", 微软雅黑, Tahoma, Arial, sans-serif;
    overflow: auto;
    background: radial-gradient(rgb(33, 198, 254), rgb(61, 147, 254));
}

#main-content {
    position: absolute;
    bottom: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    margin-bottom: -300px;
    margin-left: -300px;
    border: solid 1px transparent;
    background: url(../../assets/icon/login_bg.png)center no-repeat;
    background-size: 100%;
}

#main-content .logo {
    height: 64px;
    margin-top: 120px;
    margin-bottom: 80px;
    background-position: center;
    background-size: auto 75%;
    background-repeat: no-repeat;
    background-image: url(../../assets/icon/login_logo.png)
}

#main-content .login-input {
    width: 305px;
    height: 36px;
    margin: 0 auto;
    margin-bottom: 30px;
    padding-left: 43px;
    border: solid 1px #99deff;
    border-color: rgba(255, 255, 255, .75);
    border-radius: 5px;
    background-position: 8px 50%;
    background-size: auto 24px;
    background-repeat: no-repeat;
}

#main-content .login-input._active {
    box-shadow: 0 0 3px #fff;
}

#main-content .user-name {
    background-image: url(../../assets/icon/login_user.png);
}

#main-content .password {
    background-image: url(../../assets/icon/login_password.png);
}

#main-content .login-input input {
    display: block;
    width: 305px;
    padding: 9px 0;
    /*margin-top: 8px;*/
    border: none;
    background: no-repeat;
    color: #fff;
    font-size: 16px;
}

#main-content .login-input input:focus {
    outline: none;
}

#btn-login {
    display: block;
    width: 350px;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    margin-top: 40px;
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    color: #24c0fe;
}

#btn-login:hover,
#btn-login:focus,
#btn-login:visited {
    text-decoration: none;
}

#btn-login:hover {
    background-color: #f0f0f0;
}

#btn-login:active {
    background-color: #e5f6ff;
}

#main-content .tips {
    margin-top: 20px;
    text-align: center;
    color: #f5ce46;
}
</style>
<script>
    // import axios from 'axios'
    import qs from 'qs';
    export default {
        data: function () {
            return {
                
                loginurl: 'http://localhost:2233/login.php',
                senddata: {
                    account: '',
                    password: ''
                },
                userinfo: null,
                errordata: '',
                active: false,
                mes:{
                    errordata: '',
                    active: false
                },
                ruleCustom: {
                    // passwd: [
                    //     { validator: validatePass, trigger: 'blur' }
                    // ],
                    // passwdCheck: [
                    //     { validator: validatePassCheck, trigger: 'blur' }
                    // ]
                }
            }
        },
        methods: {
            loginClick: function () {
                if (this.senddata.account == '' && this.senddata.password !== '') {
                    // this.active == true;
                    // this.errordata == '账号不能为空';
                    Vue.set(this.mes,'active',true);
                    Vue.set(this.mes,'errordata','账号不能为空');
                    return

                } else if(this.senddata.password == '' && this.senddata.account !== '') {
                    Vue.set(this.mes,'active',true);
                    Vue.set(this.mes,'errordata','密码不能为空');
                    return
                }else if(this.senddata.account == '' && this.senddata.password == ''){
                     Vue.set(this.mes,'active',true);
                     Vue.set(this.mes,'errordata','账号和密码不能为空');                   
                }else {
                    var self = this;
                    // var params = new URLSearchParams();
                    // params.append('account', self.senddata.account);
                    // params.append('password', self.senddata.password);
                    // axios.post(self.loginurl, params).then((res) => {
                    axios.post(self.loginurl, qs.stringify(self.senddata)).then((res) => {
                        //密码错误的话显示文字
                        if (res.data.state == false) {
                            self.mes.active = true;
                            self.mes.errordata = res.data.messager;
                            //密码正确就跳转到首页
                        } else {
                            localStorage.setItem('user', JSON.stringify(res.data[0]));
                            this.userinfo = res.data[0];
                            //把登陆信息传到后台
                            this.$store.commit('RECORD_USERINFO', res.data[0]);
                            this.$router.push({ path: '/index.html' });

                        }
                    }).catch(function (_respond) {
                        console.log(_respond);
                    })
                }
            },
            logininto: function (v1) {
                if (v1.keyCode == 13) {
                    this.loginClick();
                }
            }
        },
        computed: {
            unload_user: function () {
                return this.$store.state.account;
            }
        }
    }
</script>