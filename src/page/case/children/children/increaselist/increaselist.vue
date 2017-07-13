<template>
    <div class="table-list">
        <ul>
            <li class="form-header clear">
                <ul>
                    <li>名称</li>
                </ul>										
                <ul>
                    <li>作者</li>
                    <li>上传时间</li>
                    <li>浏览次数</li>
                    <li class="operating">操作</li>
                </ul>

            </li>
            <li class="form-data clear">
                <dl>
                    <dt>
                        <img src="../../../../../assets/default/hhu-portrait@3x.png"/>
                    </dt>
                    <dd>
                        <h4 class="text-ellipsis-1">TFT-LCDAMOLED电机矢量控制单电阻电流采样关键技术</h4>
                        <span>一级分类</span>
                        <span>二级分类</span>													
                        <p>华为技术有限公司是一家生产销售通信设备的民营通信科技公司，于1987年正式注册成立.华为技术有限公司是一家生产销售通信设备的民营通信科技公司，于1987年正式注册成立</p>
                    </dd>
                </dl>
                <ul class="clear">
                    <li class="lh100">w</li>
                    <li class="lh100">2017-03-13</li>
                    <li class="lh100">2233</li>
                    <li class="operating"><a href=""><Icon type="arrow-down-a" title="下载"></Icon></a></li>	
                </ul>										
            </li>
        </ul>
    </div>
</template>
<script>
    
</script>
<style scoped>
    /*表格列表*/
.table-list>ul>li{
	overflow: hidden;
}
.table-list>ul>li li{
	margin-bottom: 0;
}
.table-list>ul>li:first-child{
	height: 58px;
	line-height: 58px;
	border-bottom: 1px solid #f3f9fd;
	font-weight: bold;
	padding-left: 30px;
}

.table-list .form-data{
	height: 100px;
	padding-left: 30px;
}
.table-list .form-data li.lh100{
     line-height: 100px; 
}
.table-list>ul>li:not(first-child){
	border-top: 1px solid #f3f9fd;
}

.table-list>ul>.form-data:hover{
	background: #f3f9fd;
}
.table-list>ul>li:first-child:hover{
	background: #fff;
}
.table-list .form-data .operating a{
	color: #2F9DEA;
	display: inline-block;
	height: 20px;
	vertical-align: middle;
}
.table-list ul li:not(first-child)>ul a i{
	font-size: 20px;
}
.table-list .form-data .operating:before{
	content: "";
	height: 100px;
	display: inline-block;
	vertical-align: middle;
}
.table-list .form-data .operating{
	line-height: 1;
	height: 100px;
}
.table-list ul li:not(first-child)>ul a:hover{
	text-decoration: none;
}
.table-list ul li:not(first-child) dl dt{
	width: 72px;
	height: 80px;
	float: left;
	overflow: hidden;
}
.table-list ul li:not(first-child) dl{
	padding-top: 10px;
}
.table-list ul li:not(first-child) dl dt img{
	width: 100%;
	height: 100%;
}
.table-list ul li:not(first-child) dl dd{
	overflow: hidden;
	height: 90px;
	padding: 0 120px 0 15px;
}
.table-list ul li:not(first-child) dl dd h4{
	font-size: 14px;
	margin-top: 0;
	font-weight: bold;
	margin-bottom: 8px;
}
.table-list ul li:not(first-child) dl dd span{
	margin-right: 22px;
}
.table-list ul li:not(first-child) dl dd p{
	padding-top: 5px;
	color: #768087;
	height: 47px;
	font-size: 12px;
	overflow: hidden;
	line-height: 1.2;
}

@media screen and (min-width:1366px){
	.table-list ul li ul:first-child,
	.table-list .form-data dl{
		float: left;
		width: 50%;
	}
	.table-list ul li ul:last-child,
	.table-list .form-data ul{
		float: left;
		width: 50%;
	}
	.table-list>ul>li>ul:last-child li{
		float: left;
		width: 30%;
	}
	
	.table-list>ul>li ul:last-child li:nth-child(3){
		width: 24%;
	}
	
	.table-list>ul>li ul:last-child li:last-child{
		width: 16%;
	}	
}

@media screen and (max-width:1366px){
	.table-list .form-data,.table-list .form-header{
		position: relative;
	}
	.table-list>ul li ul:first-child{
		float: left;
		min-width: 566px;
	}
	.table-list .form-data dl{
		float: left;
		max-width: 566px;
	}
	.table-list>ul li ul:last-child,
	.table-list .form-data ul{
		position: absolute;
		left: 566px;
		right: 0;
		top: 0;
		bottom: 0;
	}	
	.table-list>ul>li>ul:last-child li{
		float: left;
		width: 29%;
	}

	.table-list ul li ul:last-child li:nth-child(3){
		width: 24%;
	}
	
	.table-list ul li ul:last-child li:last-child{
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 90px;
		z-index: 1;
	}
	.table-list .form-data ul:last-child li.operating{
		height: 100px;
		line-height: 1;
		display: inline-block;
	}
	.table-list .form-data ul:last-child li.operating:before{
		    content:"";
    		display:inline-block;
    		height:100%;
    		vertical-align:middle;	
	}
}

</style>