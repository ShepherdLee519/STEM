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

    $VIEW_PATH = 'views/'; //视图php的文件夹
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, 
            maximum-scale=1.0, user-scalable=no" />
        <title>STEM学习设计工具 - 测试界面</title>

        <!-- 网站的favicon -->
        <link rel="icon" href="image/icon/favicon.ico" type="image/x-icon" />
        
        <!------------------------- css & style ---------------------------->
        <!-- 导入bootstrap的css文件 -->
        <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
        <!-- 导入自定义css文件 -->
        <link rel="stylesheet" href="css/Design/design-style.css" />
        <link rel="stylesheet" href="css/pdf/pdf-style.css" />
        <link rel="stylesheet" href="beta/index.css" />

        <!-- <script type="text/javascript">
            /**
             * 页面触发 onbeforeunload 事件时进入
             * 此部分在服务器上开启
             * 1）在页面被关闭前会进入
             * 2）方法有返回值，才会自动弹框提示，否则不会弹框，但方法内容仍然会执行
             * 3）方法返回的值与页面最终是否被关闭无关，即返回什么值都不会影响
             */
            function pageClose() {
                log(new Date() + "：用户准备离开页面...");
                saveData();
                /*---------------------------------------*/
                // saveTheme();//学习目标 - 课程主题
                // saveQuestion();//学习目标 - 问题设计
                // saveTasks();//学习评价
                // saveActivity();//学习活动
                return true;
            }
        </script> -->
    </head>
    <body onbeforeunload="return pageClose()">
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
                        <li><a href="#" id="design-link">学习设计</a></li>
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
                @include $VIEW_PATH."preview.php";
            ?>

            <!-- ///////////////////////////////////////////////////////////////////// -->
        </div>

        <!-- 网络不良时候的刷新界面 -->
        <aside id="loading-aside">
            <p>正在读入，请稍等<span></span></p>
        </aside>

        <!-- 可能的页脚区域 -->
        <footer style="background-color: #CCCCFF; height: 50px;" id="footer">
            <h3 class="text-center" style="padding-top:10px">
                Copyright &copy;2019 STEM学习设计工具
            </h3>
        </footer>

        <!------------------------- javascript ---------------------------->
        <!-- 导入jquery库 -->
        <script src="js/jquery.min.js"></script>
        <!-- 导入bootstrap的相关js库 -->
        <script src="js/bootstrap/bootstrap.min.js"></script>
        <script src="js/bootstrap/bootstrapValidator.min.js"></script>
        <!-- 导入自定义的js文件 -->
        <script src="js/common.js"></script>
        <script src="js/navigator.js"></script>
        <!-- ///////////////////////////////////////////////////////////////////// -->

        <?php
            // design部分相关
            $design_js = array(
                "Design/",//path name
                "design", "design-node", "design-zone", "design-zones",
                "design-tasks", "design-activity-sl", "design-activity",
                "design-objectives", "design-introduction", "design-animation",
                "design-load"
            );
            
            for($i = 1; $i < count($design_js); $i++){
                ?><script src="js/<?php echo $design_js[0].$design_js[$i];?>.js"></script><?php
            }

            //预览 - 生成pdf部分相关
            $preview_js = array(
                "pdf/", //path name
                "html2canvas", "jsPdf.debug",
                "render",
                "inject/inject", "inject/cover", "inject/theme", "inject/coreQuestion",
                "inject/taskModal","inject/course", "inject/course-activity"
            );

            for($i = 1; $i < count($preview_js); $i++){
                ?><script src="js/<?php echo $preview_js[0].$preview_js[$i];?>.js"></script><?php
            }
        ?>
        <script src="beta/index.js"></script>

        <!-- ///////////////////////////////////////////////////////////////////// -->
    </body>
</html>