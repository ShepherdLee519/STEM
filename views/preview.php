<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-09-21
 * info: 
 *      预览生成pdf部分的html代码
 *      其中的内容由injectPreview注入
 */

?>

<div id="preview-container" class="hidden">
<button class="hidden" id="renderPDF"></button>

<header id="coverZone">
<div class="cover-title">
    <h1>STEM学习单元设计报告</h1>
</div>
<article class="cover-designer">
    <h2>设计者：</h2>
    <table class="table table-bordered">
    <thead>
        <tr>
            <th class="cover-designer-type"></th><th class="cover-designer-name"></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>科学教师</td>
            <td id="cover-people-science">XXX</td>
        </tr><tr>
            <td>技术教师</td>
            <td id="cover-people-technology">XXXXX</td>
        </tr><tr>
            <td>工程教师</td>
            <td id="cover-people-engineering">XXXX</td>
        </tr><tr>
            <td>数学教师</td>
            <td id="cover-people-mathematics">XXXXXXX</td>
        </tr>
    </tbody>
    </table>
</article>
</header>

<main class="container-fluid"">
<article id="themeZone">
<h4>STEM学习单元主题：<span id="theme-name"></span></h4>
<h4>适用年级：<span id="theme-grade"></span></h4>

<div class="theme-background">
    <label>问题情境：</label>
    <p id="theme-situation"></p>
    <br />
    <label>学习驱动问题：</label>
    <p id="theme-question"></p>
</div>
</article>

<article id="coreQuestionZone">
<h4>【学习目标 - 学科核心问题】</h4>
<table class="table table-bordered">
<thead>
    <tr>
        <th>学科</th><th>学习目标</th><th>学科核心问题</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td class="coreQuestion-subject">科学</td>
        <td class="coreQuestion-standard">
            <ul class="list-unstyled coreQuestion-standard-science">
            </ul>
        </td>
        <td class="coreQuestion-question">
            <ul class="list-unstyled coreQuestion-question-science">
                <!-- <li><span class="coreQuestion-number"></span>
                    <span class="coreQuestion-content"></span></li> -->
            </ul>
        </td>
    </tr>
    <tr>
        <td class="coreQuestion-subject">技术</td>
        <td class="coreQuestion-standard">
            <ul class="list-unstyled coreQuestion-standard-technology">
            </ul>
        </td>
        <td class="coreQuestion-question">
            <ul class="list-unstyled coreQuestion-question-technology">
            </ul>
        </td>
    </tr>
    <tr>
        <td class="coreQuestion-subject">工程</td>
        <td class="coreQuestion-standard">
            <ul class="list-unstyled coreQuestion-standard-engineering">
            </ul>
        </td>
        <td class="coreQuestion-question">
            <ul class="list-unstyled coreQuestion-question-engineering">
            </ul>
        </td>
    </tr>
    <tr>
        <td class="coreQuestion-subject">数学</td>
        <td class="coreQuestion-standard">
            <ul class="list-unstyled coreQuestion-standard-mathematics">
            </ul>
        </td>
        <td class="coreQuestion-question">
            <ul class="list-unstyled coreQuestion-question-mathematics">
            </ul>
        </td>
    </tr>
</tbody>
</table>
</article> 

<article id="taskModalZone">
<h4>【任务模式】</h4>

<h3 class="taskModal-modal" id="taskModal-name"></h3>
<ul class="list-unstyled list-inline" id="taskModal-gallery">
    <!-- <li>
        <img class="img-responsive taskModal-image" src="image/nodes/DBL/DBL-1.png">
        <label class="taskModal-nodename">需求分析</label>
    </li> -->
</ul>
</article>

<article id="courseZone">
<h4>【课程设计】</h4>

<section class="task hidden" id="course-task-template">
    <div class="task-title">
        <h4><span class="task-nodename"></span>
            <span class="task-taskname"></span></h4>
    </div>
    <div class="task-info">
        <h4>任务描述：</h4><p class="task-content"></p>
    </div>
    <div class="task-info">
        <h4>学科核心问题：</h4>
        <ul class="list-unstyled task-coreQuestion">
            <!-- <li>S-Q1 安全水源和干净水源的区别是什么？</li> -->
        </ul>
    </div>
    <div class="task-info">
        <h4>学习证据：</h4>
        <table class="table table-bordered task-evidence-table">
        <thead>
        <tr><th>证据内容</th><th>对应核心问题</th><th>学习评价</th></tr>
        </thead>
        <tbody class="task-evidence"> 
        <!-- <tr>
            <td class="task-evidence-content">证据内容1</td>
            <td class="task-evidence-coreQuestion">S-Q1</td>
            <td class="task-evidence-evaluate">观察记录</td></tr> -->
        </tbody>
        </table>
    </div>
    <div class="task-info">
        <h4>活动设计：</h4>
        <ul class="list-unstyled list-inline task-activity">
           <!--  <li>
                <img class="img-responsive taskActivity-image" src="image/activities/pair-icon.png">
                <p>
                <label class="taskActivity-nodenumber">活动1</label>
                <label class="taskActivity-nodename">讨论"安全水源"和"干净水源"的差别</label></p>
            </li> -->
        </ul>
    </div>
    <div class="task-info task-info-hasActivity hidden">
        <h4>活动内容：</h4>
        <section class="activity-wrapper well">
            
        </section>
    </div>
    <div class="task-info task-info-hasSubNode hidden">
        <h4>子节点:</h4>
        <section class="subnode-wrapper well"></section>
    </div>
</section>

</article>

<div class="hidden">
<!-- ///////////////////////////////////////////////// -->

<?php
    @include "Preview/activity/pair.php";
    @include "Preview/activity/game.php";
    @include "Preview/activity/exp.php";
    @include "Preview/activity/roleplay.php";
    @include "Preview/activity/jigsaw.php";
    @include "Preview/activity/pyramid.php";

    //模态框
    include "Preview/modal/save_pdf_modal.php";
?>

<!-- ///////////////////////////////////////////////// -->
</div>

<article id="appendixZone" class="hidden">
<!-- <h1>附件</h1> -->
</article>

</main>

<!-- <footer>版权声明</footer> -->
</div>
