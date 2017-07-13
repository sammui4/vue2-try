<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item>个人资料</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div class="indexTab">
            <div class="clear" id="mypic">
                <div class="floatLeft img_container" @click="toggleShow" @mouseover="toggleover"  @mouseout="toggleover" v-bind:class="showpicmask?'show':''">
                    <img :src="imgDataUrl">
                </div>
                <div class="floatLeft">
                    <p class="account"><span class="strong">w</span></p>
                    <p>
                        <span>sammui4</span>
                        <span><Icon type="ios-telephone"></Icon></span><span>13049147796</span>
                        <span><Icon type="ios-email-outline"></Icon></span><span>490454041@qq.com</span>
                    </p>
                </div>
            </div>
            <ul class="info_item">
                <li>
                    <div>所属团队</div>
                </li>
            </ul>
        </div>
        <!--url:放置图片上传的路径，width和height是指限制上传的图片尺寸大小-->
        <!--
            url="http://localhost:2233/acceptImg.php"
            url="https://httpbin.org/post"
        -->
        <my-upload field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
		:width="120"
		:height="120"
		url="https://httpbin.org/post"
		img-format="jpg"></my-upload>

    </div>
</template>
<script>
    import myUpload from 'vue-image-crop-upload/upload-2.vue';
    // import VueCoreImageUpload  from 'vue-core-image-upload'; 
    export default{
        data:function(){
            return{
                //团片框动画
                showpicmask:false,
                //是否显示裁剪框
                show:false,
                //头像url
                headurl:null,
                //
                params:null,
                //
                headers:null,
                //发送给服务器的信息
                imgDataUrl:''
            }
        },
        methods:{
           toggleShow:function (){
                this.show = true
           },
           toggleover:function () {
               this.showpicmask = !this.showpicmask
           },
           cropSuccess:function (imgDataUrl, field) {
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
           },
           cropUploadSuccess:function (jsonData, field) {
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
           },
           cropUploadFail:function(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
           },
           imageuploaded:function(res) {
                if (res.errcode == 0) {
                    this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
                }
            }
        },
        components:{
            'my-upload': myUpload,
            // 'vue-core-image-upload': VueCoreImageUpload
        },
        mounted(){
            this.$store.commit('CLOSE_MASK');
        }
    }
</script>
<style scoped>
    #mypic{
        overflow: auto;
        padding: 23px 40px 40px 40px;
        border-bottom: solid 1px #E9F4FB;
    }
    .breadcrumb{
        padding: 0 30px;
        border-bottom: solid 1px #e0e0e0;
    }
    .indexTab .img_container{
        position: relative;
        width: 120px;
        height: 120px;
        border: solid 1px #E9F4FB;
        overflow:hidden;
    }
    .indexTab .img_container::before{
        content:"更换图片";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        width: 100%;
        height: 0;
        color: #2f9dea;
        transition: height 0.3s;
        -moz-transition: all 0.3s;
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        line-height: 120px;
    }
    .indexTab .img_container.show::before{
        height: 120px;
        background: rgba(0,0,0,0.1);
    }    
    #mypic .strong{
        font-size: 16px;
        font-weight: bold;
    }
    #mypic .floatLeft{
        margin-right: 20px;
    }
    #mypic .floatLeft>p{
        margin-top: 17px;
    }
    #mypic .floatLeft>p>span{
        margin-right: 17px;
    }
    #mypic .floatLeft>.account{
        padding-top: 40px;
    }
    .info_item li{
        padding: 17px 40px;
        border-bottom: solid 1px #E9F4FB
    }
    .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item:first-child{
        
    }
    #main .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area{
       box-sizing: content-box;
    }
</style>


