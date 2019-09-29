<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-30
 * version: 2.0.0
 * info: 
 *      思考-配对-共享 活动
 */
?>

<table class="table table-bordered design-editActivity-table">
    <thead>
        <tr>
        <th>阶段</th><th>学生活动</th><th>教师活动</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><label>思考</label></td>
            <td>
                <textarea class="activity-student-think" rows=6 
                    placeholder="请填写该环节下的学生活动内容"></textarea></td>
            <td>
                <textarea class="activity-teacher-think" rows=6
                    placeholder="请填写该环节下的教师活动内容"></textarea></td>
        </tr><tr>
            <td><label>配对</label></td>
            <td>
                <textarea class="activity-student-pair" rows=6
                    placeholder="请填写该环节下的学生活动内容"></textarea></td>
            <td><textarea class="activity-teacher-pair" rows=6
                    placeholder="请填写该环节下的教师活动内容"></textarea></td>
        </tr><tr>
            <td><label>共享</label></td>
            <td>
                <textarea class="activity-student-share" rows=6
                    placeholder="请填写该环节下的学生活动内容"></textarea></td>
            <td><textarea class="activity-teacher-share" rows=6
                    placeholder="请填写该环节下的教师活动内容"></textarea></td>
        </tr>
    </tbody>
</table>