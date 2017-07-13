<template>
    <div>
        <div class="breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/cases">案例</Breadcrumb-item>
                <Breadcrumb-item v-text="$route.params.caseid"></Breadcrumb-item>
            </Breadcrumb>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    mounted(){
         this.$store.commit('CLOSE_MASK');
    }
}
</script>
