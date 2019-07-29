<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-27
 * version: 2.0.0
 * info:
 *      design.php中导入，学习评价节点的编辑菜单
 *      考虑将该菜单置为绝对的固定位置
 */
?>

<div class="panel panel-info">
<div class="panel-heading">
    <h3 class="panel-title">编辑任务环节<label></label>
        <span class="pull-right glyphicon glyphicon-remove"></span></h3>
</div>
<div class="panel-body" id="design-editTaskZone-body">
    <form class="form form-horizontal">
        <div class="form-group">
            <label for="taskName" class="col-sm-3 control-label">任务名称:</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="taskName" 
                    name="taskName" placeholder="请输入任务名称">
            </div>
        </div>
        <div class="form-group">
            <label for="taskContent" class="col-sm-3 control-label">任务描述:</label>
            <div class="col-sm-9">
                <textarea class="form-control" name="taskContent" id="taskContent"
                    rows="4" placeholder="请对任务内容进行大致描述"></textarea>
            </div>      
        </div>
        <div class="form-group">
            <label for="taskCoreQuestion" class="col-sm-3 control-label" id="taskCoreQuestion">核心问题:</label>
            <div class="col-sm-9">
                <button class="btn btn-danger text-center" id="taskCoreQuestion-AddBtn" style="width: 35px">
                    <span class="glyphicon glyphicon-plus" ></span>
                </button>
            </div>
            <div class="col-sm-9 pull-right hidden" id="taskCoreQuestion-ShowZone"></div>
            <div class="col-sm-9 pull-right well hidden" id="taskCoreQuestion-SelectZone"></div>
        </div>
        <div class="form-group">
            <label for="taskEvidence" class="col-sm-3 control-label">学习证据:</label>
            <div class="col-sm-9">
                <textarea class="form-control" name="taskEvidence" id="taskContent"
                    rows="4" placeholder="学习证据描述"></textarea>
            </div>      
        </div>
        <div class="form-group">
            <label for="taskEvaluate" class="col-sm-3 control-label">学习评价:</label>
            <div class="col-sm-9">
                <?php
                    $evaluate_ways = array(
                        "书面测试", "调查问卷", "口头汇报",
                        "同行评审", "概念图"  , "观察记录",
                        "制作成果", "展示绩效"
                    );
                    $i = 0;
                    foreach($evaluate_ways as $way){
                        echo '
                            <div class="col-sm-5">
                                <label class="checkbox-inline">
                                    <input type="checkbox" value='.$i++.'>'.$way.'
                                </label>
                            </div>';
                    }
                ?>
            </div>
        </div>
        <div class="btn-group pull-right">
            <!-- <button class='btn btn-info' id="design-taskEditBtn">编辑</button> -->
            <button class='btn btn-default' id="design-confirmTaskEditBtn" style="width:80px">确定</button>
            <button class='btn btn-danger' id="design-cancelTaskEditBtn" style="width:80px">取消</button>
        </div>
    </form>
</div><!-- end design-editTaskZone-body -->
</div>