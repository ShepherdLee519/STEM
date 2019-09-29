<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-09-25
 * version: 2.0.0
 * info: 
 *      原p=baseinfo => 渲染的基本信息页面
 *      现由design.php引入，作为第一个侧栏<学习目标>的内容
 *      注意侧栏需用flex布局，使得上下行同宽
 *      该侧栏原本占比5/12, 缩小后为3/12
 *       row
 *          -objectives-rows-wrap
 *              - #courseTheme
 *              - #questionDesign
 *                  -- #questionDesign-courseStandard
 *                  -- #questionDesign-realForm
 */
?>

<!-- <div> -->
<div class="row" style="overflow: hidden;" id="objectives-zone">
<!-- 下 objectives-rows-wrap通过控制样式实现flex布局 -->
<div class="col-md-12 objectives-rows-wrap">

<!-- 课程主题 表单区域 -->
<div class="objectives-row" id="courseTheme">
    <div class="panel panel-primary">
    <div class="panel-heading">
        <h3 class="panel-title">课程主题</h3>
    </div>
    <div class="panel-body">
        <form class="form-horizontal" onsubmit="return false">
            <!-- 主题名称 -->
            <div class="form-group has-feedback">
                <label for="courseTheme-themeName" class="col-sm-2 control-label">主题名称:</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="courseTheme-themeName" 
                        name="courseTheme-themeName" placeholder="STEM主题的名称">
                    <span class="glyphicon form-control-feedback"></span>
                </div>
            </div>
            <!-- 学习情境 -->
            <div class="form-group has-feedback">
                <label for="courseTheme-themeSituation" class="col-sm-2 control-label">学习情境:</label>
                <div class="col-sm-10">
                    <textarea class="form-control" id="courseTheme-themeSituation" 
                        name="courseTheme-themeSituation" rows=5></textarea>
                    <span class="glyphicon form-control-feedback"></span>
                </div> 
            </div>
            <!-- 参与人员 -->
            <div class="form-group has-feedback">
                <label for="courseTheme-people" class="col-sm-2 control-label">参与人员:</label>
                <div class="col-sm-10 col-sm-push-1">
                <div id="courseTheme-people">
                    <div>
                        <label for="courseTheme-people-science" class="col-sm-3 control-label">科学:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="courseTheme-people-science" 
                                name="courseTheme-people-science">
                        </div>
                    </div>
                    <div>
                        <label for="courseTheme-people-technology" class="col-sm-3 control-label">技术:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="courseTheme-people-technology" 
                                name="courseTheme-people-technology">
                        </div>
                    </div>
                    <div>
                        <label for="courseTheme-people-engineering" class="col-sm-3 control-label">工程:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="courseTheme-people-engineering" 
                                name="courseTheme-people-engineering">
                        </div>
                    </div>
                    <div>
                        <label for="courseTheme-people-mathematics" class="col-sm-3 control-label">数学:</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="courseTheme-people-mathematics" 
                                name="courseTheme-people-mathematics">
                        </div>
                    </div>
                </div><!-- /end courseTheme-people-zone -->
                </div>
            </div>
            <!-- 对象年级 -->
            <div class="form-group has-feedback">
                <label for="courseTheme-grade" class="col-sm-2 control-label">教学对象:</label>
                <div class="col-sm-6">
                    <select class="form-control" name="courseTheme-grade" id="courseTheme-grade" disabled>
                        <option value="1">一年级</option>  <option value="2">二年级</option>
                        <option value="3">三年级</option>  <option value="4">四年级</option>
                        <option value="5" selected="selected">五年级</option>  <option value="6">六年级</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
    </div><!-- /end panel-primary -->
</div>

<!-- 问题设计 表单区域 -->
<div class="objectives-row" id="questionDesign">
<div class="panel panel-primary">

<div class="panel-heading">
    <h3 class="panel-title">问题设计</h3>
</div>

<div class="panel-body">
    <!-- 课程标准的显示表格 -->
    <form class="form-horizontal" id="questionDesign-courseStandard">
    <fieldset>
        <legend id="questionDesign-courseStandard-lengend">课程标准
            <label style="font-size:80%">(点击此处展开)</label>
        </legend>

        <!-- 这里是展示四种不同的课程标准 应当以只读的形式进行展示 -->
        <div class="form-group has-feedback">
            <label for="questionDesign-courseStandard-science" class="col-sm-2 control-label"
                title = "点击以放大/收缩文本框来显示课程标准">科学:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="questionDesign-courseStandard-science" 
                    name="questionDesign-courseStandard-science" rows=2 readonly></textarea>
                <span class="glyphicon form-control-feedback"></span>
            </div> 
        </div>
        <div class="form-group has-feedback">
            <label for="questionDesign-courseStandard-technology" class="col-sm-2 control-label"
                title = "点击以放大/收缩文本框来显示课程标准">技术:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="questionDesign-courseStandard-technology" 
                    name="questionDesign-courseStandard-technology" rows=2 readonly></textarea>
                <span class="glyphicon form-control-feedback"></span>
            </div> 
        </div>
        <div class="form-group has-feedback">
            <label for="questionDesign-courseStandard-engineering" class="col-sm-2 control-label"
                title = "点击以放大/收缩文本框来显示课程标准">工程:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="questionDesign-courseStandard-engineering" 
                    name="questionDesign-courseStandard-engineering" rows=2 readonly></textarea>
                <span class="glyphicon form-control-feedback"></span>
            </div> 
        </div>
        <div class="form-group has-feedback">
            <label for="questionDesign-courseStandard-mathematics" class="col-sm-2 control-label"
                title = "点击以放大/收缩文本框来显示课程标准">数学:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="questionDesign-courseStandard-mathematics" 
                    name="questionDesign-courseStandard-mathematics" rows=2 readonly></textarea>
                <span class="glyphicon form-control-feedback"></span>
            </div> 
        </div>
        <hr />
    </fieldset>
    </form>

<!-- 具体问题的填写/显示表格 -->
<form class="form-horizontal" onsubmit="return false" id="questionDesign-realForm">

<!-- 学习驱动问题 -->
<div class="form-group has-feedback">
    <label for="questionDesign-driverQuestion" class="col-sm-3 control-label">学习驱动问题:</label>
    <div class="col-sm-9">
        <input type="text" class="form-control" id="questionDesign-driverQuestion" 
            name="questionDesign-driverQuestion" placeholder="请输入任务名称">
        <span class="glyphicon form-control-feedback"></span>
    </div>
</div>

<!-- 学科核心问题 -->
<div class="form-group has-feedback">
<label for="questionDesign-coreQuestion" class="col-sm-3 control-label">学科核心问题:</label>
<br /><br />

<div class="col-sm-12" id="questionDesign-coreQuestion" style="margin-top: 10px;">


<div class="questionDesign-coreQuestion-eachQuestion">
    <label for="questionDesign-coreQuestion-science" class="col-sm-2 control-label">科学:</label>
    <div class="col-sm-10" id="questionDesign-coreQuestion-science">
        <div class="btn-group">
            <button class="btn btn-primary">
                <span class="glyphicon glyphicon-chevron-down toggleCoreQuestion"></span>
            </button>
            <button class="btn btn-info">
                <span class="glyphicon glyphicon-plus addCoreQuestion"></span>
            </button>
        </div>

        <input type="text" class="form-control editCoreQuestion" 
            placeholder="当前核心问题数：0">
        
        <ul class="list-group coreQuestionList hidden col-sm">
        </ul>
    </div> 
</div>
<div class="questionDesign-coreQuestion-eachQuestion">
    <label for="questionDesign-coreQuestion-technology" class="col-sm-2 control-label">技术:</label>
    <div class="col-sm-10" id="questionDesign-coreQuestion-technology">
        <div class="btn-group">
            <span class="input-group-btn">
                <button class="btn btn-primary">
                    <span class="glyphicon glyphicon-chevron-down toggleCoreQuestion"></span>
                </button>
            </span>
            <span class="input-group-btn">
                <button class="btn btn-info">
                    <span class="glyphicon glyphicon-plus addCoreQuestion"></span>
                </button>
            </span>
        </div>

        <input type="text" class="form-control editCoreQuestion" 
            placeholder="当前核心问题数：0">

        <ul class="list-group coreQuestionList hidden">
        </ul>
    </div> 
</div>
<div class="questionDesign-coreQuestion-eachQuestion">
    <label for="questionDesign-coreQuestion-engineering" class="col-sm-2 control-label">工程:</label>
    <div class="col-sm-10" id="questionDesign-coreQuestion-engineering">
        <div class="btn-group">
            <span class="input-group-btn">
                <button class="btn btn-primary">
                    <span class="glyphicon glyphicon-chevron-down toggleCoreQuestion"></span>
                </button>
            </span>
            <span class="input-group-btn">
                <button class="btn btn-info">
                    <span class="glyphicon glyphicon-plus addCoreQuestion"></span>
                </button>
            </span>
        </div>

        <input type="text" class="form-control editCoreQuestion" 
            placeholder="当前核心问题数：0">
            
        <ul class="list-group coreQuestionList hidden">
        </ul>
    </div> 
</div>
<div class="questionDesign-coreQuestion-eachQuestion">
    <label for="questionDesign-coreQuestion-mathematics" class="col-sm-2 control-label">数学:</label>
    <div class="col-sm-10" id="questionDesign-coreQuestion-mathematics">
        <div class="btn-group">
            <span class="input-group-btn">
                <button class="btn btn-primary">
                    <span class="glyphicon glyphicon-chevron-down toggleCoreQuestion"></span>
                </button>
            </span>
            <span class="input-group-btn">
                <button class="btn btn-info">
                    <span class="glyphicon glyphicon-plus addCoreQuestion"></span>
                </button>
            </span>
        </div>

        <input type="text" class="form-control editCoreQuestion" 
            placeholder="当前核心问题数：0">
        
        <ul class="list-group coreQuestionList hidden">
        </ul>
    </div> 
</div>

</div><!-- end questionDesign-coreQuestion -->
</div>
</form><!-- end questionDesign-realForm -->

</div>
</div><!-- /end panel-primary -->
</div>

</div>
</div>