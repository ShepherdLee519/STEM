<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, 
            maximum-scale=1.0, user-scalable=no" />
        <title>STEM学习设计工具 - 教师端</title>

        <!-- 网站的favicon -->
        <link rel="icon" href="./image/icon/favicon.ico" type="image/x-icon" />
        
        <!------------------------- css & style ---------------------------->
        <!-- 导入bootstrap的css文件 -->
        <link rel="stylesheet" href="./beta/css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
        <!-- 导入自定义css文件 -->
        <link rel="stylesheet" href="css/Design/design-style.css" />
        <link rel="stylesheet" href="css/pdf/pdf-style.css" />
        <link rel="stylesheet" href="./beta/teacher.css" />
    </head>
    <body>
        <!-- ///导航栏 -->
        <nav class="navbar navbar-default header" role="navigation" id="navbar">
            <div class="container-fluid">
                <!-- /导航栏最左侧的标题栏 -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="#" style="margin:0;padding:0;margin-right:5px;">
                        <img src="./image/icon/logo.ico" class="img-responsive" width=50 alt="logo" />
                    </a>
                    <a class="navbar-brand navbar-title" href="#">STEM学习设计工具</a>
                </div><!-- /end -->

                <!-- //导航栏标题外的内容功能区 -->
                <div>
                    <!-- /切换功能的静态按钮 -->
                    <ul class="nav navbar-nav" id="top-navbar" style="margin-left: 100px;">
                        <li><a href="#" id="preview-link">作业阅览</a></li>
                        <li><a href="#" id="analyse-link">数据分析</a></li>
                    </ul><!-- /end -->

                    <form class="navbar-form navbar-right" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="查找指定学生">
                        </div>
                        <button type="submit" class="btn btn-default">查询</button>
                    </form>

                    <form class="navbar-form navbar-right">
                        <div class="form-group">
                          <label for="name" style="font-weight: normal;margin-right: 6px;font-size: 110%;">组别</label>
                          <select class="form-control">
                            <option>全部</option>
                            <option>1组</option>
                            <option>2组</option>
                            <option>3组</option>
                          </select>
                        </div>
                    </form>

                    <form class="navbar-form navbar-right">
                        <div class="form-group">
                          <label for="name" style="font-weight: normal;margin-right: 6px;font-size: 110%;">班级</label>
                          <select class="form-control">
                            <option>全部</option>
                            <option>1班</option>
                            <option>2班</option>
                            <option>3班</option>
                            <option>4班</option>
                          </select>
                        </div>
                    </form>
                </div><!-- //end -->
            </div>
        </nav><!-- ///end -->

        <main class="container-fluid">
        <div class="row"><div class="col-md-12">
            <div id="tree" class="col-md-3">
                <div class="tree">
                    <ul>
                    <li>
                        <span><i class="icon-folder-open"></i> 全部班级</span>
                        <ul>
                            <li>
                                <span><i class="icon-minus-sign"></i> A班</span>
                                <ul>
                                    <li>
                                        <span><i class="icon-minus-sign"></i> 第一小组</span>
                                        <ul>
                                            <li>
                                                <span><i class="icon-leaf"></i> A同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> B同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> C同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> D同学</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span><i class="icon-minus-sign"></i> 第二小组</span>
                                        <ul>
                                            <li>
                                                <span><i class="icon-leaf"></i> E同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> F同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> G同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> H同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> I同学</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <span><i class="icon-minus-sign"></i> B班</span>
                                <ul>
                                    <li>
                                        <span><i class="icon-minus-sign"></i> 第一小组</span>
                                        <ul>
                                            <li>
                                                <span><i class="icon-leaf"></i> J同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> K同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> L同学</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span><i class="icon-minus-sign"></i> 第二小组</span>
                                        <ul>
                                            <li>
                                                <span><i class="icon-leaf"></i> M同学</span>
                                            </li>
                                            <li>
                                                <span><i class="icon-leaf"></i> N同学</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    
                    </ul>
                    </div>
            </div>
            <div id="main" class="col-md-9">
                <?php 
                    @include "./views/preview.php";
                ?>
            </div>
        </div></div>
        </main>

        <!-- 可能的页脚区域 -->
        <footer style="background-color: #CCCCFF; height: 50px;" id="footer">
            <h3 class="text-center" style="padding-top:10px">
                Copyright &copy;2019 STEM学习设计工具
            </h3>
        </footer>

        <!------------------------- javascript ---------------------------->
        
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
        <script src="./beta/teacher.js"></script>
    </body>
</html>