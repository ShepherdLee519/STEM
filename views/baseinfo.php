<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-04-22
 * version: 1.0.0
 * info: 
 *      p=baseinfo => 渲染的基本信息页面
 */
?>


<div class="row" style="overflow: hidden;">
    <div class="col-md-9" id="baseinfo-theme">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">STEM主题</h3>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" onsubmit="return false">
                    <!-- 主题名称 -->
                    <div class="form-group has-feedback">
                        <label for="baseinfo-theme-name-view" class="col-sm-2 control-label">主题名称:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" readonly id="baseinfo-theme-name-view" name="baseinfo-theme-name-view" placeholder="STEM主题的名称">
                            <span class="glyphicon form-control-feedback"></span>
                        </div>
                    </div>
                    <!-- 情境描述 -->
                    <div class="form-group has-feedback">
                        <label for="baseinfo-theme-describe-view" class="col-sm-2 control-label">情境描述:</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" readonly id="baseinfo-theme-describe-view" name="baseinfo-theme-describe-view" rows=7></textarea>
                            <span class="glyphicon form-control-feedback"></span>
                        </div> 
                    </div>
                    <!-- 参与人员 -->
                    <div class="form-group has-feedback">
                        <label for="baseinfo-theme-people-view" class="col-sm-2 control-label">参与人员:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" readonly id="baseinfo-theme-people-view" name="baseinfo-theme-people-view" placeholder="参与的人员名单">
                            <span class="glyphicon form-control-feedback"></span>
                        </div>
                    </div>
                    <div class="col-sm-4" style="margin-left: 80%;">
                        <button class="btn btn-default btn-lg" data-toggle="modal" data-target="#editTheme">编辑</button>
                    </div>
                    <!-- 模态框（Modal） -->
                    <div class="modal fade" id="editTheme" tabindex="-1" role="dialog" aria-labelledby="editThemeLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title" id="editThemeLabel">STEM主题编辑</h4>
                                </div>
                                <div class="modal-body">
                                    <!-- 主题名称 -->
                                    <div class="form-group has-feedback">
                                        <label for="baseinfo-theme-name" class="col-sm-2 control-label">主题名称:</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control" id="baseinfo-theme-name" name="baseinfo-theme-name" placeholder="STEM主题的名称">
                                            <span class="glyphicon form-control-feedback"></span>
                                        </div>
                                    </div>
                                    <!-- 情境描述 -->
                                    <div class="form-group has-feedback">
                                        <label for="baseinfo-theme-describe" class="col-sm-2 control-label">情境描述:</label>
                                        <div class="col-sm-8">
                                            <textarea class="form-control" id="baseinfo-theme-describe" name="baseinfo-theme-describe" rows=7></textarea>
                                            <span class="glyphicon form-control-feedback"></span>
                                        </div> 
                                    </div>
                                    <!-- 参与人员 -->
                                    <div class="form-group has-feedback">
                                        <label for="baseinfo-theme-people" class="col-sm-2 control-label">参与人员:</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control" id="baseinfo-theme-people" name="baseinfo-theme-people" placeholder="参与的人员名单">
                                            <span class="glyphicon form-control-feedback"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                    <button type="button" class="btn btn-primary" onclick="editTheme();">提交更改</button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-md-3" id="baseinfo-subject">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">STEM学科</h3>
            </div>
            <div class="panel-body">
                <form class="form-horizontal">
                    <!-- 年级 -->
                    <div class="form-group">
                        <label for="baseinfo-subject-grade" class="col-sm-4 control-label">年级:</label>
                        <div class="col-sm-6">
                            <select class="form-control" name="baseinfo-subject-grade" id="baseinfo-subject-grade">
                                <option value="1">一年级</option>
                                <option value="2">二年级</option>
                                <option value="3">三年级</option>
                                <option value="4">四年级</option>
                                <option value="5">五年级</option>
                                <option value="6">六年级</option>
                            </select>
                        </div>
                    </div>
                    <!-- 学科 -->
                    <div class="form-group has-feedback">
                        <label for="baseinfo-subject-subject" class="col-sm-4 control-label">所学科目:</label>
                        <div class="col-sm-5 checkbox" id="baseinfo-subject-checkbox" style="background-color: white">
                            <label class="checkbox">
                                <input type="checkbox" name="baseinfo-subject-subject" value="1">科学(Science)
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="baseinfo-subject-subject" value="2">技术(Technology)
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="baseinfo-subject-subject" value="3">工程(Engineering)
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="baseinfo-subject-subject" value="4">数学(Mathematics)
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>



<!-- -------------------------------------------------------------------- -->



<div class="row">
    <div class="col-md-12" id="baseinfo-course">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">课程标准</h3>
            </div>
            <div class="panel-body">
                <div class="col-sm-12" id="courseDivs">
                    <div class="well col-sm-11 hidden" id="baseinfo-course-science">
                        <h3>科学S:</h3>
                    </div>
                    <div class="well col-sm-11 hidden" id="baseinfo-course-technology">
                        <h3>技术T:</h3>
                    </div>
                    <div class="well col-sm-11 hidden" id="baseinfo-course-engineering">
                        <h3>工程E:</h3>   
                    </div>
                    <div class="well col-sm-11 hidden" id="baseinfo-course-mathematics">
                        <h3>数学M:</h3>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-12" id="baseinfo-question">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">问题设计</h3>
            </div>
            <div class="panel-body">
                <form class="form-horizontal">
                    <!-- 学习驱动问题 -->
                    <div class="form-group has-feedback">
                        <label for="baseinfo-question-qudong" class="col-sm-2 control-label">学习驱动问题:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="baseinfo-question-qudong" name="baseinfo-question-qudong" placeholder="学习驱动问题">
                            <span class="glyphicon form-control-feedback"></span>
                        </div>
                    </div>
                    <!-- 学科核心问题 -->
                    <div class="form-group has-feedback">
                        <label for="baseinfo-question-core-view" class="col-sm-2 control-label">学科核心问题:</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" id="baseinfo-question-core-view" name="baseinfo-question-core-view" rows=8></textarea>
                            <span class="glyphicon form-control-feedback"></span>
                        </div> 
                    </div>
                </form>
                <div  style="margin-left: 80%;">
                    <button class="btn btn-default btn-lg" data-toggle="modal" data-target="#editQuestion">编辑</button>
                </div>
                
                <!-- 模态框（Modal） -->
                <div class="modal fade" id="editQuestion" tabindex="-1" role="dialog" aria-labelledby="editQuestionLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="editQuestionLabel">学科核心问题编辑</h4>
                            </div>
                            <div class="modal-body">
                                <form class="form-horizontal">
                                    <!-- 学科 -->
                                    <div class="form-group">
                                        <label for="baseinfo-question-subject" class="col-sm-3 control-label">学科:</label>
                                        <div class="col-sm-4">
                                            <select class="form-control" name="baseinfo-question-subject" id="baseinfo-question-subject">
                                                <option value="1">科学</option>
                                                <option value="2">技术</option>
                                                <option value="3">工程</option>
                                                <option value="4">数学</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!-- 学科核心问题 -->
                                    <div class="form-group has-feedback">
                                        <label for="baseinfo-question-core" class="col-sm-3 control-label">学科核心问题:</label>
                                        <div class="col-sm-8">
                                            <textarea class="form-control" id="baseinfo-question-core" name="baseinfo-question-core" rows=7></textarea>
                                            <span class="glyphicon form-control-feedback"></span>
                                        </div> 
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" onclick="editQuestion();">提交更改</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal -->
                </div>
            </div>
        </div>
    </div>
</div>