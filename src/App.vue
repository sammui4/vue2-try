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
.form-cr{
  display: inline-block;
  margin-left: 8px;
}
.form-cr,
.form-cr *,
.form-cr *:before,
.form-cr *:after{
  box-sizing: border-box;
}
.form-cr input[type=radio],
.form-cr input[type=checkbox]{
  display: none;
}
.form-cr input[type=radio] + label,
.form-cr input[type=checkbox] + label{
  cursor: pointer;
  font-weight: normal;
  /*display: inline;*/
}
.form-cr input[type=radio] + label .box-icon{
  position: relative;
  display: inline-block;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: solid 1px #979797;
}
.form-cr input[type=checkbox] + label .box-icon{
  position: relative;
  display: inline-block;
  top: 3px;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: solid 1px #979797;
}
.form-cr input[type="radio"]:checked + label .box-icon{
  border-color: #34A6EA;
}
.form-cr input[type="checkbox"]:checked + label .box-icon{
  background-color: #34A6EA;
  border-color: #34A6EA;
}
.form-cr input[type="radio"]:checked + label .box-icon:before {
    content: "";
    position: absolute;
    left: 3px;
    top: 3px;
    width: 6px;
    height: 6px;
    border: 3px solid #34A6EA;
    border-radius: 50%;
}
.form-cr input[type="checkbox"]:checked + label .box-icon:before {
    content: "";
    position: absolute;
    left: 2px;
    top: 3px;
    width: 10px;
    height: 6px;
    border-left: 2px solid #FFF;
    border-bottom: 2px solid #FFF;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}
.ivu-breadcrumb{
    padding: 28px 0 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

