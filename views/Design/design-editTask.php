<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-09-25
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
                <button class="btn btn-info text-center" id="taskCoreQuestion-AddBtn" style="width: 65px">
                    添加 <span class="glyphicon glyphicon-plus" ></span>
                </button>
                <button class="btn btn-danger text-center" id="taskCoreQuestion-ResetBtn" style="width: 65px">
                    重选 <span class="glyphicon glyphicon-plus" ></span>
                </button>
            </div>
            <div class="col-sm-9 pull-right hidden" id="taskCoreQuestion-ShowZone"></div>
            <div class="col-sm-9 pull-right well hidden" id="taskCoreQuestion-SelectZone"></div>
        </div>

        <div class="form-group">
        <label for="taskEvidence" class="col-sm-3 control-label">学习证据:</label>
        <div class="col-sm-12">
        <table class="table table-striped table-evidence">
            <thead>
                <tr><th class="content-header">证据内容</th>
                    <th class="coreQuestion-header">核心问题</th>
                    <th class="evaluate-header">学习评价</th>
                    <th class="add-header">
                        <button class="btn btn-info" id="addEvidence">
                            添加
                            <span class="glyphicon glyphicon-plus"></span>
                        </button>
                    </th></tr>
            </thead>
            <tbody id="evidence-body">
            <tr id="evidence-template" class="hidden">
                <td class="evidenceContent"></td>
                <td class="evidenceCoreQuestion"></td>
                <td class="evidenceEvaluate"></td>
                <td>
                    <div class="btn-group">
                    <button class="btn btn-danger deleteEvidence">
                        <span class="glyphicon glyphicon-minus"></span>
                    </button>
                    <button class="btn btn-default editEvidence">
                        <span class="glyphicon glyphicon-edit"></span>
                    </button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        
        </div>
    </form>
    <div class="btn-group pull-right" style="margin-top: 15px">
        <button class='btn btn-danger' id="design-confirmTaskEditBtn" style="width:80px">确定</button>
        <button class='btn btn-default' id="design-cancelTaskEditBtn" style="width:80px">取消</button>
    </div>
</div><!-- end design-editTaskZone-body -->
</div>


<!-- 新建学习证据 -->
<div class="modal fade" id="addEvidenceModal" tabindex="-1" 
    role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">

<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title">新建学习证据</h4>
</div>

<div class="modal-body">
<form class="form form-horizontal">
    <div class="form-group">
        <label class="col-sm-3 control-label">已选核心问题</label>
        <div class="col-sm-9 pull-right" id="add-evidenceSelectedQuestion"></div>
    </div>
    <hr />
    <div class="form-group">
        <label class="col-sm-3 control-label" for="evidenceContent">证据内容:</label>
        <div class="col-sm-9">
            <textarea class="form-control" name="evidenceContent" id="add-evidenceContent"
                rows="1" placeholder="填写学习证据名称 eg. 过滤实验报告"></textarea>
        </div> 
    </div>
    <div class="form-group">
        <label class="col-sm-3 control-label" for="evidenceCoreQuestion">核心问题:</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" name="evidenceCoreQuestion" id="add-evidenceCoreQuestion"
                placeholder="对应的核心问题的序号 eg.S-Q1,T-Q1">
        </div> 
    </div>
    <div class="form-group">
        <label class="col-sm-3 control-label" for="evidenceEvaluate">学习评价:</label>
        <div class="col-sm-4">
            <select class="form-control" id="add-evidenceEvaluate">
            <option value="">请选择</option>
            <?php
                $evaluate_ways = array(
                    "书面测试", "调查问卷", "口头汇报",
                    "同行评审", "概念图"  , "观察记录",
                    "制作成果", "展示绩效"
                );
                // $i = 0;
                foreach($evaluate_ways as $way){
                    echo '<option value='.$way.'>'.$way.'</option>';
                }
            ?>
            </select>
        </div>
    </div>
</form>
</div>

<div class="modal-footer">
    <button type="button" class="btn btn-info" id="confirmAddEvidence">确定</button>
    <button type="button" class="btn btn-default" data-dismiss="modal" id="cancelAddEvidence">取消</button>
</div>

</div><!-- /.modal-content -->
</div><!-- /.modal -->
</div>



<!-- 编辑学习证据 -->
<div class="modal fade" id="editEvidenceModal" tabindex="-1" 
    role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">

<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title">编辑学习证据</h4>
</div>

<div class="modal-body">
<form class="form form-horizontal">
    <div class="form-group">
        <label class="col-sm-3 control-label">已选核心问题</label>
        <div class="col-sm-9 pull-right" id="edit-evidenceSelectedQuestion"></div>
    </div>
    <hr />
    <div class="form-group">
        <label class="col-sm-3 control-label" for="evidenceContent">证据内容:</label>
        <div class="col-sm-9">
            <textarea class="form-control" name="evidenceContent" id="edit-evidenceContent"
                rows="1" placeholder="证据内容"></textarea>
        </div> 
    </div>
    <div class="form-group">
        <label class="col-sm-3 control-label" for="evidenceCoreQuestion">核心问题:</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" name="evidenceCoreQuestion" id="edit-evidenceCoreQuestion"
                placeholder="对应的核心问题的序号 eg.S-Q1,T-Q1">
        </div> 
    </div>
    <div class="form-group">
        <label class="col-sm-3 control-label" for="evidenceEvaluate">学习评价:</label>
        <div class="col-sm-4">
            <select class="form-control" id="edit-evidenceEvaluate">
            <option value="">请选择(无)</option>
            <?php
                $evaluate_ways = array(
                    "书面测试", "调查问卷", "口头汇报",
                    "同行评审", "概念图"  , "观察记录",
                    "制作成果", "展示绩效"
                );
                // $i = 0;
                foreach($evaluate_ways as $way){
                    echo '<option value='.$way.'>'.$way.'</option>';
                }
            ?>
            </select>
        </div>
    </div>
</form>
</div>

<div class="modal-footer">
    <button type="button" class="btn btn-info" id="confirmEditEvidence">确定</button>
    <button type="button" class="btn btn-default" data-dismiss="modal" id="cancelEditEvidence">取消</button>
</div>

</div><!-- /.modal-content -->
</div><!-- /.modal -->
</div>