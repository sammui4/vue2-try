<template>
    <div>
        <div class="team-info-card-type1 _legal" v-for="(data,index) in datalist">
            <div class="top">
                <router-link :to="{path:'team/teamdetail',query:{id:data.id}}" class="img-container">
					<img src="../../assets/demo/team1.jpg" :src="data.img" v-lazy="data.img"/>
                </router-link>
                <div class="team-description">
                    <div class="content">
                        <span class="">团队简介：</span>
                        <p class="body-text text-not-overflow" v-text="data.summary">团队成立于2016年8月8日，致力于物联网相关软件开发，目前已取得XXX等成果。团队成立于2016年8月8日，致力于物联网相关软件开发，目前已取得XXX等成果。</p>
                    </div>
                    <div class="full-bg"></div>
                    <a href="javascript:1" class="full-alink"></a>
					<router-link :to="{path:'team/teamdetail',query:{id:data.id}}"  class="full-alink"></router-link>
                </div>
            </div>
            <div class="bottom">
                <strong class="team-name">
					<router-link :to="{path:'team/teamdetail',query:{id:data.id}}"  class="common-a" v-text="data.name">团队名称团队名称团队名称团队名称团队名称</router-link>
                </strong>
                <div class="team-leader-name">
                    <span class="comment-label">负责人：</span>
                    <span class="content">
                        <a href="javascript:3" class="common-a" v-text="data.header">Mr chen</a>
                    </span>
                </div>
                <span class="team-personnel-status _full" v-if="data.own==0">已满员</span>
                <span class="team-personnel-status _full" v-else>还缺<strong v-text="data.own"></strong>人</span>
            </div>
            <div class="team-type-drt">
                <span class="description" v-text="data.typename">
                    团队类别
                </span>
                <div class="full-bg"></div>
                <a href="javascript:4" class="full-alink"></a>
            </div>
            <div class="team-legal-status">
                <div class="full-bg"></div>
                <a href="javascript:5" class="common-a">审核状态</a>
            </div>
        </div>
		<div class="nonepic" v-if="datalist.length==0">

		</div>
    </div>
</template>
<style scoped>
.team-info-card-type1 .top{
	position: relative;
	height: 180px;
	border-bottom: solid 1px #eee;
	overflow: hidden;
}
.team-info-card-type1 a.img-container{
	display: block;
	height: 100%;
}
.team-info-card-type1 .bottom{
	position: relative;
	height: 88px;
	background-color: #fff;
	padding: 0 13px;
	border: solid 1px transparent;
	border-top-color: #fff;
	z-index: 2;
}

.team-info-card-type1 .team-name{
	display: block;
	height: 20px;
	line-height: 20px;
	font-size: 14px;
	margin-top: 13px;
	font-weight: normal;
	overflow: hidden;
	text-overflow: ellipsis;   /*超出显示省略号*/
	white-space: nowrap;       /*强制单行显示*/
}
.team-info-card-type1 .team-leader-name{
	height: 20px;
	margin-top: 6px;
	overflow: hidden;
	text-overflow: ellipsis;   /*超出显示省略号*/
	white-space: nowrap;       /*强制单行显示*/
}
.team-info-card-type1 .team-leader-name span{
	display: inline-block;
	height: 20px;
	line-height: 20px;
	color: #999;
	font-size: 12px;
}
.team-info-card-type1 .team-leader-name span .common-a{
	color: #999;
}
.team-info-card-type1 .team-personnel-status,
.team-info-card-type1 .team-site{
	display: block;
	height: 20px;
	margin-top: 5px;
	overflow: hidden;
	font-size: 12px;
	color: #768087;
	text-overflow: ellipsis;   /*超出显示省略号*/
	white-space: nowrap;       /*强制单行显示*/
}
.team-info-card-type1 .team-personnel-status._full{
	color: #4bca88;
}
.team-info-card-type1 .team-personnel-status._unfull{
	color: #e85959;
}
.team-info-card-type1 .team-description{
	display: none;
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	height: 150px;
	transition:top 0.45s;
	-moz-transition:top 0.45s; /* Firefox 4 */
	-webkit-transition:top 0.45s; /* Safari and Chrome */
	-o-transition:top 0.45s; /* Opera */
	border-top: solid 1px transparent;
	z-index: 1;
}
.team-info-card-type1._legal .team-description{
	display: block;
}
.team-info-card-type1:hover .team-description{
	top: 30px;
}
.team-info-card-type1 .team-description .full-bg{
	background-color: #000;
	filter:alpha(opacity=60); 
	-moz-opacity:0.6; /*Firefox私有，透明度50%*/
	opacity:0.6;
}
.team-info-card-type1 .team-description .content{
	position: relative;
	width: 80%;
	margin-left: 10%;
	margin-top: 17px;
	height: 120px;
	font-size: 13px;
	z-index: 1;
	color: #fff;
}
.team-info-card-type1 .team-description .content p.body-text{
	text-indent: 2em;
	padding-top: 5px;
	font-family: "宋体";
	height: 95px;
}
.team-type-drt {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 25px;
}
.team-type-drt .description {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    line-height: 25px;
    text-align: center;
    color: #fff;
    z-index: 2;
}
a.full-alink {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 4;
}
.team-type-drt .full-bg {
    background-color: #000;
    filter: alpha(opacity=60);
    -moz-opacity: 0.6;
    opacity: 0.6;
	z-index: 1;
}
</style>
<script>
export default {
    data:function(){
        return {
            
        }
    },
	props:['datalist'],
	mounted:function(){
		var self = this;
	}
}
</script>
