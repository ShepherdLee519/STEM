<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-30
 * version: 2.0.0
 * info: 
 *      角色扮演 活动
 */
?>

<!-- 角色设置 -->
<div class="form-group has-feedback">
    <label class="col-sm-3 control-label">角色设置:</label>
    <div class="col-sm-9">
        <input type="text" class="form-control activity-setting"
            placeholder="">
        <span class="glyphicon form-control-feedback"></span>
    </div>
</div>

<hr />
<table class="table table-bordered design-editActivity-table">
    <thead>
        <tr>
        <th>阶段</th><th>学生活动</th><th>教师活动</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>角色刻画</td>
            <td class="activity-student-describe"></td>
            <td class="activity-teacher-describe"></td>
        </tr><tr>
            <td>模拟表演</td>
            <td class="activity-student-show"></td>
            <td class="activity-teacher-show"></td>
        </tr><tr>
            <td>点评总结</td>
            <td class="activity-student-evaluate"></td>
            <td class="activity-teacher-evaluate"></td>
        </tr>
    </tbody>
</table>
<div class="form-group">
    <div class="btn btn-group pull-right">
        <button class="btn btn-default reset-editActivityTable">清空表格</button>
    </div>
</div>