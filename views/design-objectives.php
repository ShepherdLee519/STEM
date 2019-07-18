<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-17
 * version: 2.0.0
 * info: 
 *      原p=baseinfo => 渲染的基本信息页面
 *      现由design.php引入，作为第一个侧栏的内容
 *      注意侧栏需用flex布局，使得上下行同宽
 */
?>

<link rel="stylesheet" href="css/design-objectives-style.css" />
<!-- <div> -->
<div class="row" style="overflow: hidden;" id="objectives-zone">
<div class="col-md-12 objectives-rows-wrap">
    <div class="objectives-row" id="courseTheme">
        <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">课程主题</h3>
        </div>
        <div class="panel-body">
            <form class="form-horizontal" onsubmit="return false">
                <!-- 主题名称 -->
                <div class="form-group has-feedback">
                    <label for="courseTheme-themeName-view" class="col-sm-3 control-label">主题名称:</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" readonly id="courseTheme-themeName-view" 
                            name="courseTheme-themeName-view" placeholder="STEM主题的名称">
                        <span class="glyphicon form-control-feedback"></span>
                    </div>
                </div>
                <!-- 学习情境 -->
                <div class="form-group has-feedback">
                    <label for="courseTheme-themeSituation-view" class="col-sm-3 control-label">学习情境:</label>
                    <div class="col-sm-9">
                        <textarea class="form-control" readonly id="courseTheme-themeSituation-view" 
                            name="courseTheme-themeSituation-view" rows=3></textarea>
                        <span class="glyphicon form-control-feedback"></span>
                    </div> 
                </div>
                <!-- 参与人员 -->
                <div class="form-group has-feedback">
                    <label for="courseTheme-people-view" class="col-sm-3 control-label">参与人员:</label>
                    <div class="col-sm-9 col-sm-push-1">
                        <div id="courseTheme-people-view-zone">
                            <div><!-- 第一行: 科学 技术-->
                                <label for="courseTheme-people-science-view" class="col-sm-3 control-label">科学:</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" readonly id="courseTheme-people-science-view" 
                                        name="courseTheme-people-science-view">
                                </div>
                                <label for="courseTheme-people-technology-view" class="col-sm-3 control-label">技术:</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" readonly id="courseTheme-people-technology-view" 
                                        name="courseTheme-technology-view">
                                </div>
                            </div>
                            <div style="position:relative;top:5px;"><!-- 第二行: 工程 数学 -->
                                <label for="courseTheme-people-engineering-view" class="col-sm-3 control-label">工程:</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" readonly id="courseTheme-people-engineering-view" 
                                        name="courseTheme-people-engineering-view">
                                </div>
                                <label for="courseTheme-people-mathematics-view" class="col-sm-3 control-label">数学:</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" readonly id="courseTheme-people-mathematics-view" 
                                        name="courseTheme-people-mathematics-view">
                                </div>
                            </div>
                        </div><!-- /end courseTheme-people-view-zone -->
                    </div>
                </div>
                <!-- 对象年级 -->
                <div class="form-group has-feedback">
                    <label for="courseTheme-grade-view" class="col-sm-3 control-label">教学对象:</label>
                    <div class="col-sm-5">
                        <select readonly class="form-control" name="courseTheme-grade-view" id="courseTheme-grade-view">
                            <option value="1">一年级</option>  <option value="2">二年级</option>
                            <option value="3">三年级</option>  <option value="4">四年级</option>
                            <option value="5">五年级</option>  <option value="6">六年级</option>
                        </select>
                    </div>
                </div>
            </form>
            <div class="col-sm-5 col-sm-push-8">
                <button class="btn btn-default btn-md" style="width:100px;"
                    data-toggle="modal" data-target="#editCourseTheme">编辑</button>
            </div>

            <!-- //////////////////////////////////////////////////////////////////////// -->
            <!-- 模态框（Modal） -->
            <div class="modal fade" id="editCourseTheme" tabindex="-1" role="dialog" aria-labelledby="editCourseThemeLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="editCourseThemeLabel">STEM主题编辑</h4>
                        </div>
                        <div class="modal-body">
                        <form class="form-horizontal">
                            <!-- 主题名称 -->
                            <div class="form-group has-feedback">
                                <label for="courseTheme-themeName" class="col-sm-2 control-label">主题名称:</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="courseTheme-themeName" name="courseTheme-themeName" placeholder="STEM主题的名称">
                                    <span class="glyphicon form-control-feedback"></span>
                                </div>
                            </div>
                            <!-- 学习情境 -->
                            <div class="form-group has-feedback">
                                <label for="courseTheme-themeSituation" class="col-sm-2 control-label">学习情境:</label>
                                <div class="col-sm-8">
                                    <textarea class="form-control" id="courseTheme-themeSituation" name="courseTheme-themeSituation" rows=7></textarea>
                                    <span class="glyphicon form-control-feedback"></span>
                                </div> 
                            </div>
                            <!-- 参与人员 -->
                            <div class="form-group has-feedback">
                                <label for="courseTheme-people" class="col-sm-2 control-label">参与人员:</label>
                                <div class="col-sm-10 col-sm-push-1">
                                    <div id="courseTheme-people-zone">
                                        <div><!-- 第一行: 科学 技术-->
                                            <label for="courseTheme-people-science" class="col-sm-2 col-sm-pull-2 control-label">科学:</label>
                                            <div class="col-sm-4 col-sm-pull-2">
                                                <input type="text" class="form-control" id="courseTheme-people-science" 
                                                    name="courseTheme-people-science">
                                            </div>
                                            <label for="courseTheme-people-technology" class="col-sm-2 col-sm-pull-3 control-label">技术:</label>
                                            <div class="col-sm-4 col-sm-pull-3">
                                                <input type="text" class="form-control" id="courseTheme-people-technology" 
                                                    name="courseTheme-technology">
                                            </div>
                                        </div>
                                        <div style="position:relative;top:5px;"><!-- 第二行: 工程 数学 -->
                                            <label for="courseTheme-people-engineering" class="col-sm-2 col-sm-pull-2 control-label">工程:</label>
                                            <div class="col-sm-4 col-sm-pull-2">
                                                <input type="text" class="form-control" id="courseTheme-people-engineering" 
                                                    name="courseTheme-people-engineering">
                                            </div>
                                            <label for="courseTheme-people-mathematics" class="col-sm-2 col-sm-pull-3 control-label">数学:</label>
                                            <div class="col-sm-4 col-sm-pull-3">
                                                <input type="text" class="form-control" id="courseTheme-people-mathematics" 
                                                    name="courseTheme-people-mathematics">
                                            </div>
                                        </div>
                                    </div><!-- /end courseTheme-people-zone -->
                                </div>
                            </div>
                            <!-- 对象年级 -->
                            <div class="form-group">
                                <label for="courseTheme-grade" class="col-sm-2 control-label">教学对象:</label>
                                <div class="col-sm-4">
                                    <select class="form-control" name="courseTheme-grade" id="courseTheme-grade">
                                        <option value="1">一年级</option> <option value="2">二年级</option>
                                        <option value="3">三年级</option> <option value="4">四年级</option>
                                        <option value="5">五年级</option> <option value="6">六年级</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary" onclick="editCourseTheme();">提交更改</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal -->
            </div>
        </div>
        </div><!-- /end panel-primary -->
    </div>

    <div class="objectives-row" id="questionDesign">
        <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">问题设计</h3>
        </div>
        <div class="panel-body">
            <!-- 课程标准的显示表格 -->
            <form class="form-horizontal" id="questionDesign-courseStandard">
                <fieldset>
                    <legend id="questionDesign-courseStandard-lengend">课程标准
                        <label style="font-size:80%">(点击此处展开)</label>
                    </legend>
                    <div class="form-group has-feedback hidden">
                        <label for="questionDesign-courseStandard-science" class="col-sm-2 control-label"
                            title = "点击以放大/收缩文本框来显示课程标准">科学:</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="questionDesign-courseStandard-science" 
                                name="questionDesign-courseStandard-science" rows=2></textarea>
                            <span class="glyphicon form-control-feedback"></span>
                        </div> 
                    </div>
                    <div class="form-group has-feedback hidden">
                        <label for="questionDesign-courseStandard-technology" class="col-sm-2 control-label"
                            title = "点击以放大/收缩文本框来显示课程标准">技术:</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="questionDesign-courseStandard-technology" 
                                name="questionDesign-courseStandard-technology" rows=2></textarea>
                            <span class="glyphicon form-control-feedback"></span>
                        </div> 
                    </div>
                    <div class="form-group has-feedback hidden">
                        <label for="questionDesign-courseStandard-engineering" class="col-sm-2 control-label"
                            title = "点击以放大/收缩文本框来显示课程标准">工程:</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="questionDesign-courseStandard-engineering" 
                                name="questionDesign-courseStandard-engineering" rows=2></textarea>
                            <span class="glyphicon form-control-feedback"></span>
                        </div> 
                    </div>
                    <div class="form-group has-feedback hidden">
                        <label for="questionDesign-courseStandard-mathematics" class="col-sm-2 control-label"
                            title = "点击以放大/收缩文本框来显示课程标准">数学:</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="questionDesign-courseStandard-mathematics" 
                                name="questionDesign-courseStandard-mathematics" rows=2></textarea>
                            <span class="glyphicon form-control-feedback"></span>
                        </div> 
                    </div>
                    <hr />
                </fieldset>
            </form>

            <!-- 具体问题的填写/显示表格 -->
            <form class="form-horizontal" onsubmit="return false" id="questionDesign-realForm">
                <!-- 学习驱动问题 -->
                <div class="form-group has-feedback">
                    <label for="questionDesign-driverQuestion" class="col-sm-3 control-label">学习驱动问题:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="questionDesign-driverQuestion" 
                            name="questionDesign-driverQuestion" placeholder="请输入任务名称">
                        <span class="glyphicon form-control-feedback"></span>
                    </div>
                </div>
                <!-- 学科核心问题 -->
                <div class="form-group has-feedback">
                    <label for="questionDesign-coreQuestion" class="col-sm-3 control-label">学科核心问题:</label>
                    <br /><br />
                    <div class="col-sm-12" id="questionDesign-coreQuestion">
                        <div class="questionDesign-coreQuestion-eachQuestion">
                            <label for="questionDesign-coreQuestion-science" class="col-sm-2 control-label">科学:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" placeholder="请对任务内容进行大致描述"><br />
                                <span class="glyphicon glyphicon-plus addCoreQuestion">
                            </div> 
                        </div>
                        <div class="questionDesign-coreQuestion-eachQuestion">
                            <label for="questionDesign-coreQuestion-technology" class="col-sm-2 control-label">技术:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" placeholder="请对任务内容进行大致描述"><br />
                                <span class="glyphicon glyphicon-plus addCoreQuestion">
                            </div>
                        </div>
                        <div class="questionDesign-coreQuestion-eachQuestion">
                            <label for="questionDesign-coreQuestion-engineering" class="col-sm-2 control-label">工程:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" placeholder="请对任务内容进行大致描述"><br />
                                <span class="glyphicon glyphicon-plus addCoreQuestion">
                            </div>
                        </div>
                        <div class="questionDesign-coreQuestion-eachQuestion">
                            <label for="questionDesign-coreQuestion-mathematics" class="col-sm-2 control-label">数学:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" placeholder="请对任务内容进行大致描述">
                                <span class="glyphicon glyphicon-plus addCoreQuestion">
                            </div>
                        </div>
                    </div> 
                </div>
            </form>
            <div class="col-sm-5 col-sm-push-8">
                <button class="btn btn-info btn-md" style="width:100px;">确认</button>
            </div>
        </div>
        </div><!-- /end panel-primary -->
    </div>
</div>
</div>