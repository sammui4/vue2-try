<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/cases">案例</Breadcrumb-item>
                <Breadcrumb-item>已上传的</Breadcrumb-item>
            </Breadcrumb>
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
    }
}
</script>

<style scoped>

</style>
