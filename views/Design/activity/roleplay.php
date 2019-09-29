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
            placeholder="角色设置说明">
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
            <td>
                <textarea class="activity-student-describe" rows=6
                    placeholder="请填写该环节下的学生活动内容"></textarea></td>
            <td>
                <textarea class="activity-teacher-describe" rows=6
                    placeholder="请填写该环节下的教师活动内容"></textarea></td>
        </tr><tr>
            <td>模拟表演</td>
            <td>
                <textarea class="activity-student-show" rows=6
                    placeholder="请填写该环节下的学生活动内容"></textarea></td>
            <td><textarea class="activity-teacher-show" rows=6
                    placeholder="请填写该环节下的教师活动内容"></textarea></td>
        </tr><tr>
            <td>点评总结</td>
            <td>
                <textarea class="activity-student-evaluate" rows=6
                    placeholder="请填写该环节下的学生活动内容"></textarea></td>
            <td><textarea class="activity-teacher-evaluate" rows=6  
                placeholder="请填写该环节下的教师活动内容"></textarea></td>
        </tr>
    </tbody>
</table>