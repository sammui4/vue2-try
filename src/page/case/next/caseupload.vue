<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/cases">案例</Breadcrumb-item>
                <Breadcrumb-item>案例上传</Breadcrumb-item>
            </Breadcrumb>
        </div>  

        <div id="mc-content">
            <!--<div class="mc-content-label">
                获奖信息
            </div>-->
            <div class="input-item file-upload">
                <div class="left">
                    <span class="input-lable">文件上传</span>
                </div>
                <div class="right">
                    <span class="btn btn-type-blue" id="file-substitution-1" @click="selectfile">选择文件</span>
                    <span id="file-upload-tips-1" class="text-ellipsis-1">当前未选择任何文件</span>
                    <input type="file" onchange="showURL(this,'#file-upload-tips-1',true)" name="" class="btn-select-file" id="file-1" value="上传文件" style="display: none;" @click="selectfiletoselect"/>
                    <span class="input-item-identifying">*</span>
                </div>
                <p class="tips">提示：只能上传word、pdf格式的文件</p>
            </div>
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">案例名称</span>
                </div>
                <div class="right">
                    <input type="text" name="" id="" value="" />
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">案例分类</span>
                </div>
                <div class="right">
                    <input type="text" name="" id="" value="" />
                    <!-- 需要时增加一个select -->
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">案例简介</span>
                </div>
                <div class="right">
                    <textarea name="" rows="8" cols=""></textarea>
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-item">
                <div class="left">
                    <span class="input-lable">权限</span>
                </div>
                <div class="right">
                    <select name="">
                        <option value="">请选择</option>
                        <option value="">级别1</option>
                        <option value="">级别2</option>
                        <option value="">级别3</option>
                    </select>
                    <span class="input-item-identifying">*</span>
                </div>
            </div>
            <div class="input-tips">
                <h4 class="title">温馨提示</h4>
                <p>1.温馨提示1</p>
                <p>2.请添加一些使用说明</p>
            </div>
            <div class="bottom-handle">
                <a href="#" class="btn-type-1 attribute-save">提交</a>
                <a href="#" class="btn-type-1 attribute-cancel">取消</a>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data:function(){
        return {

        }
    },
    mounted(){
        this.$store.commit('CLOSE_MASK');
    },
    methods:{
        selectfile(){
            this.selectfiletoselect();
        },
        selectfiletoselect(){
            console.log("a");
        }
    }
}
</script>

<style scoped>
    .input-item{
        margin-top: 37px;
    }
    .input-item.file-upload>.right{
        height: 40px;
    }
    .input-item>.left{
        width: 86px;
        float: left;
        overflow: hidden;
    }
    .input-item>.tips{
        margin-left: 86px;
        padding-top: 7px;
        width: 375px;
        color: #999;
    }
    .input-lable{
        display: block;
        margin-top: 10px;
    }
    .input-item>.right{
        position: relative;
        margin-left: 86px;
    }
    .input-item>.right input{
        width: 375px;
        padding: 9px;
        border: solid 1px #ccc;
    }
    .input-item>.right select{
        width: 375px;
        height: 40px;
        padding: 10px 9px;
        border: solid 1px #ccc;
        background-color: #fff;
        background-color: transparent;
    }
    .input-item>.right select.case-class{
        display: block;
        margin-bottom: 7px;
    }
    .input-item>.right textarea{
        width: 375px;
        padding: 8px;
        border: solid 1px #ccc;
    }
    .input-item>.right input:focus,
    .input-item>.right select:focus,
    .input-item>.right textarea:focus{
        outline: solid 1px #A5C7FE;
    }  
    .input-item-identifying{
        position: absolute;
        left: 395px;
        top: 6px;
        font-size: 19px;
        color: #e85959;
    }
    #file-substitution-1{
        float: left;
        margin-top: 3px;
        padding: 6px 12px;
    }
    #file-upload-tips-1{
        float: left;
        display: inline-block;
        margin-top: 3px;
        width: 292px;
        height: 34px;
        line-height: 34px;
        padding: 0 7px;
        border: solid 1px #ddd;
        color: #999;
        overflow: hidden;
    }
    .input-tips{
        margin-top: 60px;
        margin-left: 86px;
    }
    .input-tips>.title{
        font-weight: bold;
        margin-bottom: 17px;
    }
    .input-tips>p{
        color: #768087;
    }
</style>
