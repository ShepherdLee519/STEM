<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-27
 * version: 2.0.0
 * dependencies: design-introduction.php;design-editTask.php;design-objectives.php
 * info: 
 *      p=design => 渲染的<学习设计>页面
 *      row
 *          - design-objectives
 *          - design-tasks(-- design-introduction-zone)
 *          - design-activities
 */
?>

<!-- 保存/读写文件 至数据库的样例 -->
<!-- <div id="test-design-SL" style="margin-top: 50px">
    <div class="btn-group">
        <button class="btn btn-default" id="test-save">Save</button>
        <button class="btn btn-default" id="test-load">Load</button>
    </div>
</div> -->

<div class="row" style="overflow: hidden;" id="design-container">
    <!-- 学习目标区域 -->
    <div class="col-md-5" id="design-objectives">
        <div class="text-center design-objectives-header navbar navbar-default">
            <h4>学习目标
                <a><span class="pull-right togglebtn" id="togglebtn1" data-direction = "left"
                    title="点击此处展开">&lt;&lt;</span></a>
            </h4>
        </div>
        <div id="design-objectives-zone">
        <!-- ///////////////////////////////////////////////////////////////////// -->

            <?php
                //导入关于学习目标的html页面内容
                @include "design-objectives.php";
            ?>

        <!-- ///////////////////////////////////////////////////////////////////// -->
        </div>
    </div>

    <!-- 学习评价区域 -->
    <div class="col-md-6" id="design-tasks">
        <div class="text-center design-tasks-header navbar navbar-default">
            <h4>学习评价
                <button class="btn btn-default hidden" id="design-tasks-resetModal">
                    重选模式</button>
            </h4>
        </div>

        <div id="design-introduction-zone">
        <!-- ///////////////////////////////////////////////////////// -->

            <?php
                //在未选择模式的情况下的关于模式选择的介绍界面与选择select
                @include "design-introduction.php";
            ?>

        <!-- //////////////////////////////////////////////////////// -->
        </div>

        <!-- 所有一级节点与二级节点(学习评价节点)的容器 -->
        <div id="design-tasksZone" class="row hidden">
            <div class="col-md-5 first-level taskZone">
                <span class="glyphicon glyphicon-remove pull-right delete-task" 
                        title="删除任务环节"></span>
            </div>
        </div>
        
        <!-- 编辑节点的菜单 -->
        <div class="hidden" id="design-editTaskZone">
        <!-- ///////////////////////////////////////////////////////// -->

            <?php
                //编辑节点菜单的样式- 考虑位置固定
                @include "design-editTask.php";
            ?>

        <!-- //////////////////////////////////////////////////////// -->
        </div>

        <!-- 新建二级节点的选择菜单 -->
        <div class="hidden init-panel" id="design-initSubTaskZone">
            <div class="panel panel-warning">
                <div class="panel-heading">
                    <h3 class="panel-title">选择子教学模式</h3>
                </div>
                <div class="panel-body">
                </div>
            </div>
        </div><!-- end design-initSubTaskZone -->
    </div>

    <!-- 学习活动区域 -->
    <div class="col-md-1" id="design-activities">
        <div class="text-center design-activities-header navbar navbar-default"><h4>学习活动</h4></div>
        <!-- 学习活动的容器区域 -->
        <div id="design-activities-zone">
            <!-- 这里将动态加入学习活动的节点 -->
        </div>

        <!-- 编辑节点的菜单 -->
        <div id="design-editActivityZone">
        <!-- ///////////////////////////////////////////////////////// -->

        <?php
            //学习活动的菜单(不同)导入
            @include "design-editActivity.php";
        ?>

        <!-- //////////////////////////////////////////////////////// -->
        </div>
    </div>
</div>