<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-30
 * version: 2.0.0
 * info: 将不同的编辑学习活动菜单一次性导入
 */

$PATH = "/activity/";
$activities = array(
    "pair", "pyramid", "jigsaw", 
    "roleplay", "game", "exp"
);
$activities_name = array(
    "思考-配对-分享", "金字塔", "拼图策略",
    "角色扮演", "游戏教学", "实验教学"
);

for($i = 0; $i < count($activities); $i++){
?>
<div id="design-editActivityZone-<?php echo $activities[$i];?>" 
    class="design-editActivityZone hidden">
<div class="panel panel-success">

<div class="panel-heading">
    <h3 class="panel-title"><?php echo $activities_name[$i];?></h3>
</div>

<div class="panel-body design-editActivityZone-body">

<form class="form-horizontal" onsubmit="return false">
    <!-- 活动名称 -->
    <div class="form-group has-feedback">
        <label class="col-sm-3 control-label">活动名称:</label>
        <div class="col-sm-9">
            <input type="text" class="form-control activity-name"  placeholder="">
            <span class="glyphicon form-control-feedback"></span>
        </div>
    </div>

    <!--////////////////////////////////////////////////-->
    <?php 
        //学习活动编辑菜单的表单部分(活动名称以外)
        @include $PATH.$activities[$i].".php";
    ?>
    <!--////////////////////////////////////////////////-->
    <hr />
    <!-- 材料工具 -->
    <div class="form-group has-feedback">
        <label for="" class="col-sm-3 control-label">材料工具:</label>
        <br /><br />
        <div class="col-sm-12">
            <ul class="list-group">
                <li class="list-group-item">
                    <span class="glyphicon glyphicon-file"></span>
                    <div class="btn-group pull-right" style="margin-top:-7px">
                        <button class="btn btn-default">添加文件</button>
                    </div>
                </li>
                <li class="list-group-item">
                    <span class="glyphicon glyphicon-link"></span>
                    <div class="btn-group pull-right" style="margin-top:-7px">
                        <button class="btn btn-default">添加链接</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</form>

<hr />
<div class="btn-group pull-right">
    <button class="btn btn-success design-editActivity-confirm">确定</button>
    <button class="btn btn-default design-editActivity-cancel">关闭</button>
</div>

</div><!-- end panel-body -->
</div><!-- end panel -->
</div>
<?php
}

?>