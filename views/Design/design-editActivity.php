<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-09-25
 * version: 2.0.0
 * info: 将不同的编辑学习活动菜单一次性导入
 */

$PATH_activity = "activity/";
$activities = array(
    "pair", "pyramid", "jigsaw", 
    "roleplay", "game", "exp"
);
$activities_name = array(
    "思考-配对-共享", "金字塔", "拼图策略",
    "角色扮演", "游戏教学", "实验教学"
);

for($i = 0; $i < count($activities); $i++){
?>
<div id="design-editActivityZone-<?php echo $activities[$i];?>" 
    class="design-editActivityZone hidden">
<div class="panel panel-success">

<div class="panel-heading">
    <h3 class="panel-title"><?php echo $activities_name[$i];?>
    <span class="pull-right glyphicon glyphicon-remove activity-remove"></span></h3>
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
    include $PATH_activity.$activities[$i].".php";
?>
<!--////////////////////////////////////////////////-->


<!-- 添加学习证据区域 -->
<hr />
<div class="form-group">
    <label for="" class="col-sm-5 control-label"
        style="display:inline-block;margin-left: 35px;"    
    ><b style="font-size: 16px;">选择本活动对应的学习证据</b></label>
    <div class="col-sm-4">
        <button class="btn btn-success select-activityEvidence">添加 <span class="glyphicon glyphicon-plus" ></span></button>
        <button class="btn btn-default hidden reset-activityEvidence">清空重置</button>
    </div>
</div>
<div class="form-group activityEvidenceZone">
    <div class="col-sm-12">
    <table class="table table-striped table-evidence">
        <thead>
            <tr><th>学习证据内容</th>
                <th>学习评价</th></tr>
        </thead>
        <tbody class="activityEvidenceBody">
    
        </tbody>
    </table>
    </div>
</div>

<!-- 材料工具显示区域 -->
<div class="form-group text-center">
    <h4>
        <label class="col-sm-6" style="font-size: 16px">相关材料与工具</label>
    </h4>
</div>
<hr />
<div class="form-group">
    <label for="" class="col-sm-3 control-label">链接：</label>
    <div class="col-sm-9">
    <table class="table table-striped">
        <thead>
            <tr><th>资源描述</th>
                <th>资源链接</th></tr>
        </thead>
        <tbody class="link-body">
            <!-- <tr><td class="link-tr-describe">这是一个资源</td>
                <td class="link-tr-url">
                    <a href="https://www.baidu.com" target="_blank">https://www.baidu.com</a>
                </td>
            </tr> -->
        </tbody>
    </table>
    <div class="btn-group pull-right">
        <button class="btn btn-success change-link">链接资源管理</button>
    </div>
    </div>
</div>
<div class="form-group">
    <label for="" class="col-sm-3 control-label">文件：</label>
    <div class="col-sm-9">
    <ul class="list-group list-unstyled file-ul">
    </ul>
    <div class="btn-group pull-right">
        <button class="btn btn-success change-file">文件资源管理</button>
    </div>
    </div>
</div>
<div class="form-group">
    <label for="" class="col-sm-3 control-label">其他：</label>
    <div class="col-sm-9">
        <textarea class="form-control material-text" rows=4 
            placeholder="可以列出所需的软件工具、手工材料等"></textarea>
    </div>
</div>

</form>

<hr />


</div><!-- end panel-body -->
<div class="btn-group pull-right" style="margin-top: 15px;">
    <button class="btn btn-success design-editActivity-confirm">确定</button>
    <button class="btn btn-default design-editActivity-cancel">取消</button>
</div>
</div><!-- end panel -->
</div>

<?php
}

?>













<!-- ------------------------------- 模态框区域 ------------------------------------- -->
<!-- 编辑学习证据 -->
<div class="modal fade" id="activityEvidenceModal" tabindex="-1" 
    role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">

<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title">选择对应的学习证据</h4>
</div>

<div class="modal-body">
<form class="form form-horizontal">

<div class="form-group">
    <div class="col-sm-12">
        <table class="table table-striped">
            <thead>
                <tr><th>学习证据内容</th>
                    <th>学习评价</th>
                    <th></th></tr>
            </thead>
            <tbody id="activityEvidenceShowZone">
                <!-- <tr><td>学习证据内容1</td><td>问卷调查</td>
                    <td><input class="form-control" type="checkbox"></td>
                </tr> -->
            </tbody>
        </table>
    </div>
</div>

</form>
</div>

<div class="modal-footer">
    <button type="button" class="btn btn-success" id="confirmActivityEvidence">确定</button>
    <button type="button" class="btn btn-default" data-dismiss="modal" 
        id="cancelActivityEvidence">取消</button>
</div>

</div><!-- /.modal-content -->
</div><!-- /.modal -->
</div>


<!-- 管理链接资源 -->
<div class="modal fade" id="linkModal" tabindex="-1" 
    role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">

<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title">链接资源管理</h4>
</div>

<div class="modal-body">
<form class="form form-horizontal">

<div id="linkModal-show">
    <div class="form-group">
        <h3>
        <label for="" class="col-sm-4 control-label">已有链接资源：</label>
        </h3>
    </div>
    <div class="form-group">
    <div class="col-sm-12">
        <table class="table table-striped">
        <thead>
            <tr><th>资源描述</th>
                <th>资源链接</th>
                <th></th></tr>
        </thead>
        <tbody id="linkModal-show-body">
            <tr id="linkModal-show-template" class="hidden">
                <td><input class="form-control linkModal-show-describe"></td>
                <td><input class="form-control linkModal-show-url"></td>
                <td>
                    <button class="btn btn-danger delete-link">
                        <span class="glyphicon glyphicon-minus"></span>
                    </button>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
</div>

<hr />
<div id="linkModal-add">
    <div class="form-group">
        <h3>
        <label for="" class="col-sm-4 control-label">新建链接资源：</label>
        </h3>
    </div>
    <div class="form-group">
        <label for="" class="col-sm-3 control-label">链接地址：</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="linkModal-add-url">
        </div>
    </div>
    <div class="form-group">
        <label for="" class="col-sm-3 control-label">链接描述：</label>
        <div class="col-sm-9">
            <textarea class="form-control" rows=3 id="linkModal-add-describe"
                placeholder="链接资源的简要描述"></textarea>
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-3 pull-right">
            <button class="btn btn-success" id="linkModal-add-btn">添加链接</button>
        </div>
    </div>
</div>

</form>
</div>

<div class="modal-footer">
    <button type="button" class="btn btn-success" id="confirmLink">确定</button>
    <button type="button" class="btn btn-default" data-dismiss="modal" 
        id="cancelLink">取消</button>
</div>

</div><!-- /.modal-content -->
</div><!-- /.modal -->
</div>



<!-- 上传资源 -->
<div class="modal fade" id="fileModal" tabindex="-1" 
    role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">

<div class="modal-header">
    <button type="button" class="close" 
        data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title">文件资源管理</h4>
</div>

<div class="modal-body">

<form class="form-horizontal" role="form">

<div id="fileModal-show">
    <div class="form-group">
        <h3>
        <label for="" class="col-sm-4 control-label">已有资源列表：</label>
        </h3>
    </div>
    <div class="form-group">
    <div class="col-sm-12">
        <table class="table table-striped">
        <thead>
            <tr><th>资源名</th>
                <th>资源类型</th>
                <th></th></tr>
        </thead>
        <tbody id="fileModal-show-body">
            <tr id="fileModal-show-template" class="hidden">
                <td class="fileModal-show-filename"></td>
                <td class="fileModal-show-type"></td>
                <td>
                    <button class="btn btn-danger delete-file">
                        <span class="glyphicon glyphicon-minus"></span>
                    </button>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
</div>
</form>

<hr />
<form id="fileUpload-form" class="form-horizontal" role="form" 
    method="POST" enctype="multipart/form-data">
<div id="fileModal-add">
    <div class="form-group">
        <h3>
        <label for="" class="col-sm-4 control-label">上传新资源：</label>
        </h3>
    </div>
    <br />
    <div class="form-group">
        <div class="col-sm-3 control-label">选择文件：</div>
        <div class="col-sm-9">
            <div class="input-group">
                <input id="addFile-location" class="form-control">
                <label class="input-group-btn">
                    <input type="button" id="addFile-check" value="浏览文件" class="btn btn-success">
                </label>
            </div>
        </div>
        <input type="file" name="addFile" accept="*/*" id="addFile-file" style="display:none">
    </div>
    <button type="submit" id="addFile-submit" class="hidden"></button>
    <div class="form-group">
        <div class="col-sm-3 control-label">重命名：</div>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="addFile-name" name="name" 
                placeholder="上传后的文件名(默认为原名)，请勿带空格与\/等特殊制字符">
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-2 pull-right">
            <button class="btn btn-success" id="addFile-upload" style="width:60px;">上传</button>
            <button class="btn btn-default hidden" id="addFile-reset">重置</button>
        </div>
    </div>
</div>
</form>
</div>

<div class="modal-footer">
    <button type="button" id="confirmFile" class="btn btn-success">确定</button>
    <button type="button" id="cancelFile" class="btn btn-default" data-dismiss="modal">取消</button>
</div>

<!-- ///////////////////////////////////// -->
</div><!-- /.modal-content -->
</div><!-- /.modal -->
</div>