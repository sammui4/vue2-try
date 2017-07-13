<template>
    <div class="no_find">
        <div class="go_error">
            <div class="pic-404">
                <img class="pic-404_parent" src="../../assets/icon/404.png" alt="404">
                <img class="pic-404_child_left" src="../../assets/icon/404_cloud.png" alt="404">
                <img class="pic-404_child_mid" src="../../assets/icon/404_cloud.png" alt="404">
                <img class="pic-404_child_right" src="../../assets/icon/404_cloud.png" alt="404">
            </div>
            <div class="right-404">
                <p>请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</p>
                <router-link :to="{path:'/index.html'}">首页</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
.no_find {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #f2f2f2;
}

.go_error {
    position: relative;
    width: 1200px;
    margin: 20px auto 60px;
    padding: 0 100px;
    overflow: hidden;
}

.pic-404 {
    position: relative;
    float: left;
    width: 600px;
    padding: 150px 0;
    overflow: hidden;
}

.pic-404>.pic-404_parent {
    width: 100%;
}

.right-404 {
    position: relative;
    float: left;
    width: 300px;
    padding: 150px 0;
    overflow: hidden;
}

.right-404>p {
    margin-bottom: 20px;
}


.pic-404_child_left {
    position: absolute;
    width: 80px;
    top: 17px;
    left: 220px;
    opacity: 0;
    animation-name: cloudLeft;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 1s;
}

.pic-404_child_mid {
    position: absolute;
    width: 46px;
    top: 10px;
    left: 420px;
    opacity: 0;
    animation-name: cloudMid;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 1.2s;
}

.pic-404_child_right {
    position: absolute;
    width: 62px;
    top: 100px;
    left: 500px;
    opacity: 0;
    animation-name: cloudRight;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 1s;
}

@keyframes cloudLeft {
    0% {
        top: 17px;
        left: 220px;
        opacity: 0;
    }
    20% {
        top: 33px;
        left: 188px;
        opacity: 1;
    }
    80% {
        top: 81px;
        left: 92px;
        opacity: 1;
    }
    100% {
        top: 97px;
        left: 60px;
        opacity: 0;
    }
}

@keyframes cloudMid {
    0% {
        top: 10px;
        left: 420px;
        opacity: 0;
    }
    20% {
        top: 40px;
        left: 360px;
        opacity: 1;
    }
    70% {
        top: 130px;
        left: 180px;
        opacity: 1;
    }
    100% {
        top: 160px;
        left: 120px;
        opacity: 0;
    }
}

@keyframes cloudRight {
    0% {
        top: 100px;
        left: 500px;
        opacity: 0;
    }
    20% {
        top: 120px;
        left: 460px;
        opacity: 1;
    }
    80% {
        top: 180px;
        left: 340px;
        opacity: 1;
    }
    100% {
        top: 200px;
        left: 300px;
        opacity: 0;
    }
}
</style>
<script>
export default {

}
</script>
