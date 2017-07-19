<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<style>
  @import 'common/css/common.css';
  #app{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    min-width: 1200px;
  }
  #app .active>a{
    color:#2f9dea;
  }


  #main .ivu-breadcrumb>span:last-child{
    color: #777;
    font-weight: 400;
  }
</style>
<script>
export default {
  data:function(){
    return {

    }
  }

}
</script>

