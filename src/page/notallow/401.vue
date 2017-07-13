
<template>
    <div class="clear">
        <div class="lock">
            <Icon type="locked"></Icon>
        </div>
        <div class="lock_right">
            <p>你无权进入该页面</p>
        </div>
        <div>
            <ul>
                <items :model='model' v-for='model in ha' :key="model"></items>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data: function () {
        return {
            ha: [{
                "id": "1",
                "data": {
                    "menuName": "项目管理",
                    "menuCode": "",
                },
                "childTreeNode": [{
                    "data": {
                        "menuName": "项目",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": []
                }, {
                    "data": {
                        "menuName": "我的任务",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": [
                        {
                            "data": {
                                "menuName": "项目",
                                "menuCode": "BusProject",
                            },
                            "childTreeNode": []
                        }
                    ]
                }, {
                    "data": {
                        "menuName": "人员周报",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": [
                        {
                            "data": {
                                "menuName": "项目",
                                "menuCode": "BusProject",
                            },
                            "childTreeNode": []
                        }
                    ]
                }]
            }, {
                "id": "2",
                "data": {
                    "menuName": "数据统计",
                    "menuCode": "BusClock",
                },
                "childTreeNode": []
            }, {
                "id": "3",
                "data": {
                    "menuName": "人事管理",
                    "menuCode": "",
                },
                "childTreeNode": []
            }, {
                "id": "4",
                "data": {
                    "menuName": "基础管理",
                    "menuCode": "",
                },
                "childTreeNode": []
            }]
        }
    },
    components: {
        items: {
            name: 'items',
            props: ['model'],
            components: {},
            data() {
                return {
                    open: false,
                    isFolder: true
                }
            },
            computed: {
                isFolder: function () {
                    return this.model.childTreeNode && this.model.childTreeNode.length
                }
            },
            methods: {
                toggle: function () {
                    if (this.isFolder) {
                        this.open = !this.open
                    }
                },
            },
            template: `    
            <li style="padding-left: 25px;">
                <div @click='toggle'>
                    <i v-if='isFolder' class="fa " :class="[open?'fa-folder-open':'fa-folder']"></i>
                    <!--isFolder判断是否存在子级改变图标-->
                    <i v-if='!isFolder' class="fa fa-file-text"></i> {{model.data.menuName}}
                </div>
                <ul v-show="open" v-if='isFolder'>
                    <items v-for='cel in model.childTreeNode' :model='cel'></items>
                </ul>
            </li>`
        }
    },
    mounted(){
        this.$store.commit('CLOSE_MASK');
    }

}
</script>

<style scoped>
.lock_right{
    margin-bottom: 50px;
}

.lock i {
    font-size: 100px;
}

</style>