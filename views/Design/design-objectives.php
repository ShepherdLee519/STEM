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
        <!-- <legend id="questionDesign-courseStandard-lengend">课程标准
            <label style="font-size:80%"></label>
        </legend> -->

        <!-- 这里是展示四种不同的课程标准 应当以只读的形式进行展示 -->
        <div class="form-group has-feedback hidden">
            <label for="questionDesign-courseStandard-science" class="col-sm-2 control-label"
                title = "点击以放大/收缩文本框来显示课程标准">科学:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="questionDesign-courseStandard-science" 
                    name="questionDesign-courseStandard-science" rows=2 readonly></textarea>
                <span class="glyphicon form-control-feedback"></span>
            </div> 
        </div>
        <div class="form-group has-feedback hidden">
            <label for="questionDesign-courseStandard-technology" class="col-sm-2 control-label"
                title = "点击以放大/收缩文本框来显示课程标准">技术:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="questionDesign-courseStandard-technology" 
                    name="questionDesign-courseStandard-technology" rows=2 readonly></textarea>
                <span class="glyphicon form-control-feedback"></span>
            </div> 
        </div>
        <div class="form-group has-feedback hidden">
            <label for="questionDesign-courseStandard-engineering" class="col-sm-2 control-label"
                title = "点击以放大/收缩文本框来显示课程标准">工程:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="questionDesign-courseStandard-engineering" 
                    name="questionDesign-courseStandard-engineering" rows=2 readonly></textarea>
                <span class="glyphicon form-control-feedback"></span>
            </div> 
        </div>
        <div class="form-group has-feedback hidden">
            <label for="questionDesign-courseStandard-mathematics" class="col-sm-2 control-label"
                title = "点击以放大/收缩文本框来显示课程标准">数学:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="questionDesign-courseStandard-mathematics" 
                    name="questionDesign-courseStandard-mathematics" rows=2 readonly></textarea>
                <span class="glyphicon form-control-feedback"></span>
            </div> 
        </div>
        <hr />

        <table class="table table-bordered" style="width: 90%;margin-left:5%;">
        <caption style="font-size:18px;color:black;font-weight:bold;">课程标准</caption>
        <tbody>
            <tr>
                <td>科学</td>
                <td>S1. 能够通过模型描述水循环系统；（模型举例：概念图、表格、流程图等）。<br />
                    S2. 能够测量并绘制数据图，以证明过滤材料的吸附能力和其表面积相关。<br />
                    S3. 能够设计控制变量的实验方案，以探究过滤材料与过滤效果的关系。<br />
                    S4. 能够获取关于溶液过滤效果物理检测方法的信息。（如：肉眼检测法、色标法、分光光度计等）。
                </td>
            </tr>
            <tr>
                <td>技术</td>
                <td>T1. 能使用数字工具绘制图表、探究数据的规律。<br />
                    T2. 能够创建数字作品清晰的传达自己的思想。<br />
                    T3. 能利用协作性数字工具与他建立联系去探索问题 。
                </td>
            </tr>
            <tr>
                <td>工程</td>
                <td>E1. 定义一个简单的设计问题，用于反映某个需求，这个需求包括了在物料、时间和成本上的成功标准和约束条件。<br />
                    E2. 基于问题的约束条件和成功标准，提出并比较多个可能的问题解决方案。<br />
                    E3. 通过设计和实施控制变量的测试方案和故障测试方案，寻找模型或原型系统可改进的方面。
                </td>
            </tr>
            <tr>
                <td>数学</td>
                <td>M1. 在具体情境中了解简单的数量关系，并能解决简单的实际问题。（如：总价=单价*数量）。<br />
                    M2. 通过实例了解表面积的意义以及度量单位，能进行单位之间的换算，接受单位的实际意义。<br />
                    M3. 了解比例尺，在具体情境中，能将实际距离与图上距离换算。
                </td>
            </tr>
        </tbody>
        </table>
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