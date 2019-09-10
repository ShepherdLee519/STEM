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
        <img src="image/activities/pyramid.png" width=550 />
    </div>
    <!-- 讨论规则 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 control-label">讨论规则:</label>
        <div class="col-sm-9">
            <textarea class="form-control activity-floor-top" rows=3
                placeholder=""></textarea>
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <!-- 讨论规则 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 col-sm-push-1 control-label">讨论规则:</label>
        <div class="col-sm-8 col-sm-push-1">
            <textarea class="form-control activity-floor-middle" rows=4
                placeholder=""></textarea>
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
    <!-- 讨论规则 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 col-sm-push-2 control-label">讨论规则:</label>
        <div class="col-sm-7 col-sm-push-2">
            <textarea class="form-control activity-floor-bottom" rows=5
                placeholder=""></textarea>
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>
</div>