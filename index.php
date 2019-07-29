<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-27
 * version: 2.0.0
 * dependencies: php/helper.php; views视图; 
 * info: 
 *      网页工具的入口(相当于index.html)，根据querystring中的p值，来选择渲染对应的views/中的视图与css/js文件
 *      该index.php中包含网页的header/footer与导航栏、container等主要躯干
 */

    require_once('php/helper.php'); //导入辅助函数

    $VIEW_PATH = 'views/'; //视图php的文件夹
    $p = _get('p'); //_get于helper中，安全获取$_GET中的变量
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
        <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
        <!-- 导入自定义css文件 -->
        <!-- ///////////////////////////////////////////////////////////////////// -->

        <!-- 渲染p值对应的css文件 格式:p-style.css -->
        <link rel="stylesheet" href="css/<?php echo ucfirst($p)."/".$p; ?>-style.css" />

        <!-- ///////////////////////////////////////////////////////////////////// -->
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
                        <li>
                            <a href="#" id="test-saveBtn"><b>Save</b></a>
                        </li>
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
            <!-- ///////////////////////////////////////////////////////////////////// -->

            <?php
                /** 根据p值，渲染对应的视图php */
                /** 格式：($VIEW_PATH/)Design/design.php */
                if(!@include $VIEW_PATH.ucfirst($p).'/'.$p.".php"){
                    include $VIEW_PATH."default.php";
                }
            ?>

            <!-- ///////////////////////////////////////////////////////////////////// -->
        </div>

        <!-- 可能的页脚区域 -->
        <footer style="background-color: #CCCCFF; height: 50px;">
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
        <!-- ///////////////////////////////////////////////////////////////////// -->

        <?php
            // 根据p值，加载对应的js文件 - 某个p值可能对应多个文件，这里用数组的方式记录js文件名
            $design_js = array(
                "Design/",//path name
                "design", "design-zone", "design-tasks", "design-activity",
                "design-objectives", "design-introduction", "design-animation"
            );
            // $XXX.js = array();
            
            switch($p){
                case "design":
                    for($i = 1; $i < count($design_js); $i++){
                        ?><script src="js/<?php echo $design_js[0].$design_js[$i];?>.js"></script><?php
                    }
                    break;
            }
        ?>

        <!-- ///////////////////////////////////////////////////////////////////// -->
        
        <!-- 保存本地功能测试 -->
        <script>
            $("#test-saveBtn").click(function(){
                log("hello");
                let testData = {
                    "type":"design",
                    "typename":"学习设计"
                };
                $.post("./php/design/test_save_local.php", {data:testData}, (res) => {
                    log(res);
                });
                return false;
            }); 
        </script>
    </body>
</html>