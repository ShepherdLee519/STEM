<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-12-26
 * dependencies: php/helper.php; views视图; 
 * info: 
 *      网页工具的入口(相当于index.html)，根据querystring中的p值，来选择渲染对应的views/中的视图与css/js文件
 *      该index.php中包含网页的header/footer与导航栏、container等主要躯干
 */

    require_once('php/helper.php'); //导入辅助函数

    $VIEW_PATH = './views/'; //视图php的文件夹
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, 
            maximum-scale=1.0, user-scalable=no" />
        <title>STEM学习设计工具</title>

        <!-- 网站的favicon -->
        <link rel="icon" href="image/icon/favicon.ico" type="image/x-icon" />
        
        <!------------------------- css & style ---------------------------->
        <!-- 导入bootstrap的css文件 -->
        <link rel="stylesheet" href="./dist/bootstrap/bootstrap.min.css" />
        <!-- 导入自定义css文件 -->
        <link rel="stylesheet" href="./dist/design.min.css" />
        <link rel="stylesheet" href="./dist/preview.min.css" />
        <!-- <link rel="stylesheet" href="./test.css" /> -->
    </head>
    <!-- <body onbeforeunload="return pageClose()"> -->
    <body>
        <!-- ///导航栏 -->
        <nav class="navbar navbar-default header" role="navigation" id="navbar">
            <div class="container-fluid">
                <!-- /导航栏最左侧的标题栏 -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="#" style="margin:0;padding:0;margin-right:5px;">
                        <img src="image/icon/logo.ico" class="img-responsive" width=50 alt="logo" />
                    </a>
                    <a class="navbar-brand navbar-title" href="#">STEM学习设计工具</a>
                </div><!-- /end -->

                <!-- //导航栏标题外的内容功能区 -->
                <div>
                    <!-- /切换功能的静态按钮 -->
                    <ul class="nav navbar-nav" id="top-navbar" style="margin-left: 100px;">
                        <li class="active"><a href="#" id="design-link">学习设计</a></li>
                        <li><a href="#" id="preview-link">结果预览</a></li>
                        <!-- <li><a href="#" id="B-link">分析数据</a></li> -->
                        <!-- <li><a href="#" id="C-link">定制模块</a></li> -->
                    </ul><!-- /end -->

                    <!-- /导航栏右侧的账户管理 -->
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="#" id="saveData"><b>保存数据</b></a>
                        </li>
                        <li>
                            <a href="#" id="savePDF" class="hidden"><b>提交报告</b></a>
                        </li>
                        <li>
                            <a href="#" id="downloadPDF" class="hidden"><b>下载报告</b></a>
                        </li>
                        <li class="dropdown">
                            <a href="#"><b id="username"></b></a>
                        </li>
                    </ul><!-- /end -->
                </div><!-- //end -->
            </div>
        </nav><!-- ///end -->

        <!-- 主要内容区域 -->
        <div class="container-fluid" id="containers-wrapper">
            <!-- ///////////////////////////////////////////////////////////////////// -->

            <?php
                if(!@include $VIEW_PATH.'Design/design.php'){
                    include $VIEW_PATH."default.php";
                }
            ?>

            <?php
                include $VIEW_PATH."preview.php";
            ?>

            <!-- ///////////////////////////////////////////////////////////////////// -->
        </div>

        <!-- 网络不良时候的刷新界面 -->
        <aside id="loadingcover"> 
            <p>正在读入，请稍等<span></span></p>
        </aside>

        <!-- 可能的页脚区域 -->
        <footer style="background-color: #CCCCFF; height: 50px;" id="footer">
            <h3 class="text-center" style="padding-top:10px">
                Copyright &copy;2019 STEM学习设计工具
            </h3>
        </footer>

        <!------------------------- javascript ---------------------------->
        <script src="./dist/bundle.js"></script>
        
        <!-- ///////////////////////////////////////////////////////////////////// -->
    </body>
</html>