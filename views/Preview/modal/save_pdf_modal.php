<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-09-29
 * info: 
 *      保存pdf触发的模态框（Modal）
 *      id: savePdfModal
 */

?>


<div class="modal fade" id="savePdfModal" tabindex="-1" role="dialog" 
    aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog">

<div class="modal-content">

<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="myModalLabel">提交报告</h4>
</div>

<div class="modal-body">

<div id="savePdf-uploading" class="text-center">
    <label style="font-size:130%;color:#666">您的报告正在提交中，请稍后...</label>
    <img src="image/else/loading.gif" width=35/>
</div>

<div id="savePdf-uploaded" class="text-center alert alert-success">
    <h2>您的报告提交成功！</h2>
    <label>您可以点击导航栏的<span style="font-size:120%;"> 下载报告 </span>来获取</label>
</div>

</div>

<div class="modal-footer">
    <button type="button" class="btn btn-default" id="savePdf-cancel"
        data-dismiss="modal">关闭</button>
</div>

</div><!-- /.modal-content -->

</div><!-- /.modal -->
</div>