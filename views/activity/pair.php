<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-18
 * version: 1.0.0
 * info: 
 *      思考-配对-共享 活动
 */
?>

<div class="panel panel-success">
<div class="panel-heading">
    <h3 class="panel-title">思考-配对-共享</h3>
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
    <table class="table table-bordered">
        <thead>
            <tr>
            <th>阶段</th><th>学生活动</th><th>教师活动</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>思考</td><td><textarea></textarea></td><td><textarea></textarea></td>
            </tr><tr>
            <td>配对</td><td><textarea></textarea></td><td><textarea></textarea></td>
            </tr><tr>
            <td>共享</td><td><textarea></textarea></td><td><textarea></textarea></td>
            </tr>
        </tbody>
    </table>
</form>
</div><!-- end panel-body -->
</div><!-- end panel -->