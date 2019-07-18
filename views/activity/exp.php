<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-18
 * version: 1.0.0
 * info: 
 *      实验教学 活动
 */
?>

<div class="panel panel-success">
<div class="panel-heading">
    <h3 class="panel-title">实验教学</h3>
</div>
<div class="panel-body">
<form class="form-horizontal" onsubmit="return false">
    <!-- 活动名称 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 control-label">活动名称:</label>
        <div class="col-sm-7">
            <input type="text" class="form-control" id="" 
                name="" placeholder="">
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <!-- 实验安排 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 control-label">实验安排:</label>
        <div class="col-sm-7">
            <textarea class="form-control" id="" rows=2
                name="" placeholder=""></textarea>
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <!-- 实验环境 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 control-label">实验环境:</label>
        <div class="col-sm-7">
            <textarea class="form-control" id="" rows=2
                name="" placeholder=""></textarea>
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <!-- 学生活动 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 control-label">学生活动:</label>
        <div class="col-sm-7">
            <textarea class="form-control" id="" rows=2
                name="" placeholder=""></textarea>
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <!-- 教师活动 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 control-label">教师活动:</label>
        <div class="col-sm-7">
            <textarea class="form-control" id="" rows=2
                name="" placeholder=""></textarea>
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <table class="table table-bordered">
        <thead>
            <tr>
            <th>阶段</th><th>学生活动</th><th>教师活动</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>角色刻画</td><td><textarea></textarea></td><td><textarea></textarea></td>
            </tr><tr>
            <td>模拟表演</td><td><textarea></textarea></td><td><textarea></textarea></td>
            </tr><tr>
            <td>点评总结</td><td><textarea></textarea></td><td><textarea></textarea></td>
            </tr>
        </tbody>
    </table>
</form>
</div><!-- end panel-body -->
</div><!-- end panel -->