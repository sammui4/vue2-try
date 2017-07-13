<template>
     <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/team">团队</Breadcrumb-item>
                <Breadcrumb-item >团队管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div id="mc-content">
            <teamhead></teamhead>
        </div>
    </div> 
</template>

<script>
import teamhead from './teamhead'
export default {
    data:function(){
        return{

        }
    },
    components:{
        teamhead
    }
}
</script>

<style>

</style>
