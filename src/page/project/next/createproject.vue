<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/project">项目</Breadcrumb-item>
                <Breadcrumb-item>新建项目</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div id="mc-content">
            <div class="mc-content-label">
                项目信息
            </div>
            <div class="form-content">
                <form>
                    <div class="input-item">
                        <div class="form-group new-project-name">
                            <label for="new-project-name">项目名称</label>
                            <input id="new-project-name" type="text" placeholder="请输入团队名称"/>
                        </div>
                        <span class="form-group-tips">该名称已存在!</span>
                    </div>
                    <div class="input-item">
                        <div class="form-group new-project-intro">
                            <label for="new-project-intro">项目简介</label>
                            <textarea id="new-project-intro" name="" rows="9" cols="75"></textarea>
                        </div>
                        <span class="form-group-tips">提示!</span>
                    </div>
                    <div class="input-item">
                        <div class="form-group new-project-picture">
                            <label for="new-project-picture">项目图片</label><!--需要修改-->
                            <div>
                                <div class="universal-picture-preview">
                                    <img src="../../../assets/default/hhu-portrait.png"/>
                                </div>
                                <!--<a href="#" class="btn btn-type-blue select-picture" data-toggle="modal" data-target="#modal-picture-change">更改图片</a>-->
                                <a href="javascript:" class="btn btn-type-blue select-picture" id="btn-select-ptcture-substitution" onclick="">上传图片</a>
                                <input type="file" name="" id="btn-select-ptcture" value="上传图片" style="display: none;" onchange="showURL(this)"/>
                            </div>                            
                            <my-upload field="img"
                            @crop-success="cropSuccess"
                            @crop-upload-success="cropUploadSuccess"
                            @crop-upload-fail="cropUploadFail"
                            v-model="show"
                            :width="140"
                            :height="140"
                            url="https://httpbin.org/post"
                            img-format="png"></my-upload>
                        </div>
                        <span class="form-group-tips">提示!</span>
                    </div>
                    <div class="input-item">
                        <div class="form-group new-project-type">
                            <label>项目类型</label>
                            <div class="project-type-list">
                                <div class="select-option">
                                    <input type="radio" name="project-type-option" id="project-type-option-1"><label for="project-type-option-1" class=""><span class="description">类型1</span></label>
                                </div>
                                <div class="select-option">
                                    <input type="radio" name="project-type-option" id="project-type-option-2"><label for="project-type-option-2" class=""><span class="description">类型2</span></label>
                                </div>
                                <div class="select-option">
                                    <input type="radio" name="project-type-option" id="project-type-option-3"><label for="project-type-option-3" class=""><span class="description">类型3</span></label>
                                </div>
                            </div>
                        </div>
                        <span class="form-group-tips">提示!</span>
                    </div>
                    <div class="input-item">
                        <div class="form-group new-project-property">
                            <label>项目属性</label>
                            <div class="project-property-list">
                                <div class="select-option">
                                    <input type="radio" name="project-property-option" id="project-property-option-1" checked="checked"><label for="project-property-option-1" class=""><span class="description">私有项目</span></label>
                                </div>
                                <div class="select-option">
                                    <input type="radio" name="project-property-option" id="project-property-option-2"><label for="project-property-option-2" class=""><span class="description">公开项目</span></label>
                                </div>
                            </div>
                        </div>
                        <span class="form-group-tips">提示!</span>
                    </div>
                    <div class="input-item">
                        <div class="form-group new-project-team-select">
                            <label>项目所属团队</label>
                            <div class="project-team-select">
                                <select class="form-control" name="">
                                    <option value="">梦之岛1队</option>
                                    <option value="">梦之岛2队</option>
                                    <option value="">梦之岛3队</option>
                                </select>
                            </div>
                        </div>
                        <span class="form-group-tips">提示!</span>
                    </div>
                    <div class="input-item">
                        <div class="form-group new-project-details">
                            <label for="new-project-details">项目详情</label>
                            <!--<textarea id="new-project-details" name="" rows="9" cols="75"></textarea>-->
                            <div id="new-project-details"></div>
                        </div>
                        <span class="form-group-tips">提示!</span>
                    </div>
                    <div class="input-item">
                        <div class="form-group new-project-accessory">
                            <label for="btn-select-accessory">附件上传</label>
                            <div>
                                <input type="file" name="" id="btn-select-accessory"/>
                            </div>
                        </div>
                        <span class="form-group-tips">提示!</span>
                    </div>
                    <!-- 操作区 -->
                    <div class="form-handle">
                        <div class="btn-left-container">
                            <input type="submit" value="提交" class="btn-type-1 attribute-save"/>
                            <input type="button" value="取消" class="btn-type-1 attribute-cancel"/>
                            <input type="button" value="保存为草稿" class="btn-type-1 attribute-draft"/>
                        </div>
                            
                    </div>	
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import myUpload from 'vue-image-crop-upload/upload-2.vue';
    import E from 'wangeditor';
    export default {
        components:{
            'my-upload': myUpload,
        },
        data:function(){
            return {
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
                //富文本框内容  
                editorContent: ''       
            }
        },
        mounted(){
            // console.log(this.$store.state.projectid);
            this.$store.commit('CLOSE_MASK');
            var editor = new E('#new-project-details')
            editor.customConfig.onchange = (html) => {
                this.editorContent = html;
            }
            editor.customConfig.zIndex = 4;
            editor.create();

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
        }
    }
</script>

<style scoped>
    .mc-content-label{
        height: 25px;
        line-height: 25px;
        border-left: solid 6px #3b4953;
        padding-left: 14px;
        margin-bottom: 68px;
    }
    .form-content{
        padding-left: 50px;
        padding-right: 50px;
    }
    .input-item{
        overflow: auto;
    }
    .form-content .form-group{
        margin-bottom: 40px;
        float: left;
    }
    label{
        margin-right: 15px;
        font-weight: normal;
        color: #505050;
    }
    .form-content input[type=text]{
        width: 250px;
    }
    .form-content input[type=file]{
        margin-top: 5px;
    }
    .form-content input[type=file]:focus{
        outline: none;
    }
    .new-project-name{
        display: inline-block;
        border-bottom: solid 1px #ccc;
    }
    .new-project-name input{
        border: none;
    }
    .new-project-name input:focus{
        outline: none;
    }
    .new-project-picture input[type=file]{
        margin-top: 17px;
        margin-left: 0px;
    }
    .universal-picture-preview{
        margin-top: 16px;
        float: left;
    }
    .new-project-picture .select-picture{
        float: left;
        margin-top: 115px;
        margin-left: 17px;
    }
    .new-project-picture .file-url{
        height: 30px;
        min-width: 500px;
        line-height: 30px;
        color: #787878;
        clear: both;
    }
    .form-group-tips{
        float: left;
    }
    .project-type-list .select-option,
    .project-property-list .select-option{
        margin: 16px 20px 0 0;
    }
    .new-project-team-select select{
        min-width: 123px;
        margin-top: 16px;
    }
    .form-handle{
        border-top: solid 1px #e0e0e0;
        padding-top: 7px;
    }
    .form-handle input{
        margin-left: 0;
    }

    .btn-left-container input[type=button],
    .btn-left-container button{
        margin: 0;
    }
    .checkbox-container{
        overflow: auto;
        margin-bottom: 15px;
    }
    .form-handle .checkbox-container input,
    .form-handle .checkbox-container label{
        float: left;
    }
    .form-handle .checkbox-container label{
        margin-left: 3px;
    }

    #btn-select-accessory{
        margin-top: 16px;
    }
    .btn_border {
        height: 40px;
        width: 370px;
        border: 1px solid #2F9DEA;
        color: #2F9DEA;
    }
    #new-project-details{
        /*height: 200px;*/
        border: solid 1px #ccc;
    }
</style>
