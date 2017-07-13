<template>
    <div class="masking">
        <Spin size="large"></Spin>
    </div>
</template>
<script>
    export default{

    }
</script>
<style scoped>
.masking{
    /*padding-top: 65px;*/
    position: fixed;
    top: 115px;
    right: 0;
    left: 210px;
    padding-left: 30px;
    overflow: auto;
    border: none;
    display:block;
    z-index: 3;
    bottom:0;
    background:rgba(255,255,255,1);
    text-align: center;
}
.masking.active{
    display: block;
    top: 0px;
}
.masking.active2{
    display: block;
    top:55px;
}
.masking .ivu-spin-large{
    display: inline-block;
    position:fixed;
    top: 50%;
    left:50%;
    transform:translate(-50%,-50%);
}
#app .ivu-spin-large .ivu-spin-dot{
    width: 80px;
    height: 80px;
}
</style>