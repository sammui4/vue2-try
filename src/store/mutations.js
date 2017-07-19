export default {

    //获取用户信息
    GET_USERINFO(state,data){
        if(data){
            state.account = data;
            state.login = true;
        }
    },
    //获取地址
    GET_ADDRESS(state,data){
        state.bursterurl = data;
    },

    //设置屏蔽层高度并打开mask
    OPEN_MASK(state,height){
        state.maskheight = height;
        state.mask = true;
    },
    //关闭遮罩层
    CLOSE_MASK(state){
        state.mask = false;
    },
    //获取当前日期
    GET_TODAY(state){
        var date = new Date();
            if(date.getMonth()<10){            
                state.tomonthfirstday = date.getFullYear() +'-0'+(date.getMonth()+1)+'-01';
                if(date.getDate()<10){
                    state.today = date.getFullYear() +'-0'+(date.getMonth()+1)+'-0'+date.getDate();
                }else{
                    state.today = date.getFullYear() +'-0'+(date.getMonth()+1)+'-'+date.getDate();
                }
            }else{
                state.tomonthfirstday = date.getFullYear() +'-'+(date.getMonth()+1)+'-01';
                if(date.getDate()<10){
                    state.today = date.getFullYear() +'-'+(date.getMonth()+1)+'-0'+date.getDate();
                }else{
                    state.today = date.getFullYear() +'-'+(date.getMonth()+1)+'-'+date.getDate();
                }               
            }  
            if(date.getMonth()<9){
                state.lastmonth = date.getFullYear() +'-0'+date.getMonth();
                state.nowmonth = date.getFullYear() +'-0'+(date.getMonth()+1);   
                       
            }else if(date.getMonth()==9){
                state.lastmonth = date.getFullYear() +'-0'+date.getMonth();
                state.nowmonth = date.getFullYear() +'-'+(date.getMonth()+1); 
            }else{
                state.lastmonth = date.getFullYear() +'-'+date.getMonth();
                state.nowmonth = date.getFullYear() +'-'+(date.getMonth()+1); 
            }           
    },
    //获取当前日期那个月的首日
    GET_MONTHFIRSTDAY(){

    },
    //获取当月日期
    GET_NOWMONTH(){

    },
    //获取上个月日期
    GET_LASTMONTH(){

    },
    //退出登录
    LOGIN_OUT(state){
        state.account = null;
        state.login = false;
        localStorage.removeItem('user');
    }, 
    //登陆时记录用户信息
    RECORD_USERINFO(state,data){
        if(state.account){
            return 
        }else{
            state.account = data;
            state.login = true;
            localStorage.setItem('user', JSON.stringify(data.id));
        }
    },
    //记录项目创建者id
    RECORD_PROJECTCREATEID(state,projectcreaterid){
        state.projectcreaterid = projectcreaterid;
    },
    //删除项目创建者id
    DELETE_PROJECTCREATEID(state){
        state.projectcreaterid = null;
    },
    RECORD_PROJECTID(state,projectid){
        state.projectid = projectid;
    },
    DELETE_PROJECTID(state){
        state.projectid = null;
    },
    //获取发送的数组数据
    GET_SENDARRAY(state,sendarray){
        state.sendarray = sendarray;
    },
    //改变发送的数组数据
    CHANGE_SENDARRAY(state,somethingneedchange){
        state.sendarray[somethingneedchange[0]] = somethingneedchange[1]
    }
}