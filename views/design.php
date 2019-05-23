<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-05-22
 * version: 2.0.0
 * info: 
 *      p=design => 渲染的学习设计页面
 */
?>


<div class="row" style="overflow: hidden;">
    <div class="col-md-2" id="design-structure">
        <div>结构</div>
        <div id="test-design-SL" style="margin-top: 50px">
            <div class="btn-group">
                <button class="btn btn-default" id="test-save">Save</button>
                <button class="btn btn-default" id="test-load">Load</button>
            </div>
        </div>
    </div>


    <div class="col-md-5" id="design-tasks">
        <div class="text-center design-header navbar navbar-default"><h4>任务环节</h4></div>

        <div id="design-tasksZone" class="row hidden" style="height: auto">
            <div class="col-md-4"></div>
        </div>

        <div id="design-initTaskZone">
            <button class="btn btn-default" id="design-initTaskBtn">添加任务</button>
            <div class="panel panel-info hidden">
                <div class="panel-heading">
                    <h3 class="panel-title">选择教学模式</h3>
                </div>
                <div class="panel-body" id="design-initTask-panelBody">
                </div>
            </div>
        </div>
        
        <div class="hidden design-editTaskZone">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title">编辑任务环节<label></label>
                        <span class="pull-right glyphicon glyphicon-remove"></span></h3>
                </div>
                <div class="panel-body" id="design-editTaskZone-body">
                    <form class="form form-horizontal">
                        <div class="form-group">
                            <label for="taskname" class="col-sm-3 control-label">任务名称:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="taskname" 
                                    name="taskname" placeholder="请输入任务名称"  readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="taskcontent" class="col-sm-3 control-label">任务描述</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" name="taskcontent" id="taskcontent"
                                    rows="5" placeholder="请对任务内容进行大致描述" readonly></textarea>
                            </div>      
                        </div>
                        <div class="btn-group pull-right">
                            <button class='btn btn-info' id="design-taskEditBtn">编辑</button>
                            <button class='btn btn-default' id="design-confirmTaskEditBtn">确定</button>
                        </div>
                    </form>
                </div><!-- end design-editTaskZone-body -->
            </div>
        </div><!-- end design-deitTaskZone -->

        <div class="hidden design-initSubTaskZone">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title">选择教学模式</h3>
                </div>
                <div class="panel-body">
                </div>
            </div>
        </div><!-- end design-initSubTaskZone -->
    </div>


    <div class="col-md-5" id="design-activities">
        <div class="text-center design-header navbar navbar-default"><h4>学习活动</h4></div>
        <div id="design-activities-zone">
        </div>
    </div>
</div>





