<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-18
 * version: 1.0.0
 * info: 
 *      不同学习活动的视图的展示
 */

    require_once('php/helper.php'); //导入辅助函数
    $VIEW_PATH = 'views/activity/'; //activity视图php的文件夹
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>STEM学习设计工具 - 活动预览</title>

        <!-- 网站的favicon -->
        <link rel="icon" href="image/icon/favicon.ico" type="image/x-icon" />
        
        <!------------------------- css & style ---------------------------->
        <!-- 导入bootstrap的css文件 -->
        <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
        <style>
            div.activity-show{
                /* border: 1px dashed #ccc; */
            }
            textarea{
                overflow:auto;
                background-attachment:fixed;
                background-repeat:no-repeat;
                border-style:solid;
                border-color:#ccc; 
                margin: -8px -30px -13px -8px;
                width: 110%; height: 100%;
            }
        </style>
    </head>
    <body>
        <!-- ///导航栏 -->
        <nav class="navbar navbar-default header" role="navigation" id="navbar">
            <div class="container-fluid">
                <!-- /导航栏最左侧的标题栏 -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="#" style="margin:0;padding:0;margin-right:5px;">
                        <img src="image/logo.ico" class="img-responsive" width=50 alt="logo" />
                    </a>
                    <a class="navbar-brand" href="#">STEM学习设计工具</a>
                </div><!-- /end -->

                <!-- //导航栏标题外的内容功能区 -->
                <div>
                    <!-- /切换功能的静态按钮 -->
                    <ul class="nav navbar-nav" id="top-navbar" style="margin-left: 100px;">
                        <li><a href="index.php?p=design" id="design-link">学习设计</a></li>
                        <li><a href="index.php?p=result" id="A-link">设计结果</a></li>
                        <li><a href="#" id="B-link">分析数据</a></li>
                        <li><a href="#" id="C-link">定制模块</a></li>
                    </ul><!-- /end -->

                    <!-- /导航栏右侧的账户管理 -->
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                账户管理<b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">退出</a></li>
                                <li><a href="#">切换账户</a></li>
                            </ul>
                        </li>
                    </ul><!-- /end -->
                </div><!-- //end -->
            </div>
        </nav><!-- ///end -->

        <!-- 主要内容区域 -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 col-md-push-2">
            <!-- ///////////////////////////////////////////////////////////////////// -->

            <?php
                $activities = array(
                    "pair", "pyramid", "jigsaw", 
                    "roleplay", "game", "exp"
                );

                for($i = 0; $i < count($activities); $i++){
                    ?>
                        <div class="activity-show col-md-6">
                            <?php
                                @include $VIEW_PATH.$activities[$i].".php";
                            ?>
                        </div>
                    <?php
                }
            ?>

            <!-- ///////////////////////////////////////////////////////////////////// -->
                </div>
            </div>
        </div>

        <!-- 可能的页脚区域 -->
        <footer style="background-color: #CCCCFF; height: 50px;">
            <h3 class="text-center" style="padding-top:10px">版权声明</h1>
        </footer>

        <!------------------------- javascript ---------------------------->
        <!-- 导入jquery库 -->
        <script src="js/jquery.min.js"></script>
        <!-- 导入bootstrap的相关js库 -->
        <script src="js/bootstrap/bootstrap.min.js"></script>
        <script src="js/bootstrap/bootstrapValidator.min.js"></script>
        <!-- 导入自定义的js文件 -->
        <script src="js/common.js"></script>
    </body>
</html>