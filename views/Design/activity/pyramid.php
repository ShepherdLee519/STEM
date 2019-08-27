<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-30
 * version: 2.0.0
 * info: 
 *      金字塔 活动
 */
?>


<!-- 问题 -->
<div class="form-group has-feedback">
    <label for="" class="col-sm-3 control-label">问题:</label>
    <div class="col-sm-7">
        <input type="text" class="form-control activity-question" 
            placeholder="">
        <span class="glyphicon form-control-feedback"></span>
    </div>
</div>
<div class="editActivity-pyramidZone">
    <div class="editActivity-img">
        <img src="image/activities/pyramid.png" width=300/>
    </div>
    <!-- 讨论规则 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 control-label">讨论规则:</label>
        <div class="col-sm-9">
            <input type="text" class="form-control activity-floor-top"
                placeholder="">
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <!-- 讨论规则 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 col-sm-push-2 control-label">讨论规则:</label>
        <div class="col-sm-7 col-sm-push-2">
            <input type="text" class="form-control activity-floor-middle" 
                placeholder="">
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <!-- 讨论规则 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 col-sm-push-4 control-label">讨论规则:</label>
        <div class="col-sm-5 col-sm-push-4">
            <input type="text" class="form-control activity-floor-bottom" 
                placeholder="">
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
</div>