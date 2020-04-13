/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-18 04:01:51 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:06:41
 */

import { common as $$ } from "../../common/common";
import { $edit, taskInfo_backup, getTarget } from "./taskzone.common";
import { getCoreQuestions, questionTypeMap } from "../../objectives/objectives";


/**
 * 编辑框相关的事件处理
 */
export default function editTaskHandler(){
    /**
     * 编辑框的事件处理 - 确定/取消
     */

    let $confirmBtn = $("#design-confirmTaskEditBtn", $edit),
        $cancelBtn = $("#design-cancelTaskEditBtn", $edit);

    //点击按钮确定编辑
    $confirmBtn.click(() => {
        saveTaskHandler(taskInfo_backup);
        $$.hide($edit);
        return false;
    });

    //点击取消按钮关闭编辑区域
    $cancelBtn.click(() => {
        $$.hide($edit);
        return false;
    });

    //点击右上角的X关闭编辑区域
    $edit.find(".panel-title span").click(() => {
        $cancelBtn.click();
    });

    $$.multistep([
        editTaskEvidenceHandler,
        editTaskCoreQuestionHandler
    ]);
}

/**
 * 编辑框中的核心问题部分的事件处理
 */
function editTaskCoreQuestionHandler(){
    let $coreQuestionZone = $("#taskCoreQuestion", $edit).parent();
    $$.inject($coreQuestionZone);
    let $addCQ      = $$._("#taskCoreQuestion-AddBtn"),
        $resetCQ    = $$._("#taskCoreQuestion-ResetBtn"),
        $showCQ     = $$._("#taskCoreQuestion-ShowZone"),
        $selectCQ   = $$._("#taskCoreQuestion-SelectZone");
    $$.reject();

    let addCoreQuestion = function(){
        $$.hide($showCQ).show($selectCQ);
        let str = "", 
            coreQuestions = getCoreQuestions();//见design-objectives.js

        if(coreQuestions.length == 0){
            //当前未填写核心问题
            str += `
            <p>${$$.space()}请先在<b>学习目标-问题设计-学科核心问题</b>中完善核心问题的内容
                ，完善后请重新点击上方"+"按钮</p>
            <button class="btn btn-danger pull-right" 
                id="taskCoreQuestion-cancelSelect">关闭</button>
            `.trim();
        }else{
            //填写了核心问题，组装复选框
            coreQuestions.forEach((q, index) => {
                str += `
                <label class="checkbox-inline">
                    <input type="checkbox" value="${index}">
                    ${q.value}${$$.space(2)}
                    <span class="badge pull-right badge-${q.type}">${q.typename}</span>
                </label>
                <br />
                `.trim();
            });
            str += `
            <br />
            <div class="btn-group pull-right">
                <button class="btn btn-danger" id="taskCoreQuestion-confirmSelect">确定</button>
                <button class="btn btn-default" id="taskCoreQuestion-cancelSelect">取消</button>
            </div>
            `.trim();
        }
        $selectCQ.html(str);
        return false;
    };
    let resetCoreQuestion = function(){
        $("#taskCoreQuestion-AddBtn").click();
        return false;
    };
    let confirmCoreQuestion = function(){
        let $checkboxes = $(this).parent().parent().find("input[type='checkbox']"),
            checked = [...$checkboxes].filter(checkbox => checkbox.checked),
            values = checked.map(checkbox => checkbox.value);

        if(values.length == 0){
            $$.hide([$selectCQ, $resetCQ]).show($addCQ);
            $showCQ.html("");
            return false;
        }

        let str = "<ul class='list-group'>",
            coreQuestions = getCoreQuestions();

        values.forEach(value => {
            let question = coreQuestions[value];
            str += `
            <li class="list-group-item">
                <span class="badge badge-${question.type}">${question.typename}</span>
                <span class="li-content">${question.value}</span>
            </li>
            `.trim();
        });
        str += "</ul>";

        $showCQ.html(str);
        $$.hide([$selectCQ, $addCQ]).show([$showCQ, $resetCQ]);
        return false;
    };
    let cancelCoreQuestion = function(){
        //重新读入 恢复show区域的显示
        let target = getTarget(),
            taskcorequestion = target["taskcorequestion"];

        $showCQ.html("");
        if(taskcorequestion && taskcorequestion.length){
            let str = "<ul class='list-group'>";
            taskcorequestion.forEach(corequestion => {
                str += `
                <li class="list-group-item">
                    <span class="badge badge-${questionTypeMap(corequestion.type)}">
                        ${corequestion.type}</span>
                    <span class="li-content">${corequestion.content}</span>
                </li>
                `.trim();
            });
            str += "</ul>";
            $showCQ.html(str);
            $$.hide($addCQ).show($resetCQ);
        }else{
            $$.hide($resetCQ).show($addCQ);
        }
        $$.hide($selectCQ).show($showCQ);
        return false;
    };
    
    $$.delegate($coreQuestionZone, [
        {
            target: "#taskCoreQuestion-AddBtn",
            event: "click",
            handler: addCoreQuestion
        },
        {
            target: "#taskCoreQuestion-ResetBtn",
            event: "click",
            handler: resetCoreQuestion
        },
        {
            target: "#taskCoreQuestion-confirmSelect",
            event: "click",
            handler: confirmCoreQuestion
        },
        {
            target: "#taskCoreQuestion-cancelSelect",
            event: "click",
            handler: cancelCoreQuestion
        }
    ]);
}

/**
 * 编辑框中的学习评价部分的事件处理
 */
function editTaskEvidenceHandler(){
    //当前编辑框下已选核心问题
    let $selectedCQ = $("#taskCoreQuestion-ShowZone", $edit);
    //编辑框中的学习评价部分相关jQuery对象
    $$.inject($(".table-evidence", $edit));
    let $addBtn     = $$._("#addEvidence"),
        $body       = $$._("#evidence-body"),
        $template   = $$._("#evidence-template");
    $$.reject();
    //编辑框的学习评价列表对应的正在编辑的评价对象备份
    let $content_editing        = null,
        $coreQuestion_editing   = null,
        $evaluate_editing       = null;

    //添加学习证据模态框相关jQuery对象
    let $addEvidenceModal = $("#addEvidenceModal");
    $$.inject($addEvidenceModal);
    let $addSelectedCQ  = $$._("#add-evidenceSelectedQuestion"),
        $addContent     = $$._("#add-evidenceContent"),
        $addCQ          = $$._("#add-evidenceCoreQuestion"),
        $addEvaluate    = $$._("#add-evidenceEvaluate"),
        $addConfirm     = $$._("#confirmAddEvidence"),
        $addCancel      = $$._("#cancelAddEvidence");
    $$.reject();

    //编辑学习证据模态框相关jQuery对象
    let $editEvidenceModal = $("#editEvidenceModal");
    $$.inject($editEvidenceModal);
    let $editSelectedCQ = $$._("#edit-evidenceSelectedQuestion"),
        $editContent    = $$._("#edit-evidenceContent"),
        $editCQ         = $$._("#edit-evidenceCoreQuestion"),
        $editEvaluate   = $$._("#edit-evidenceEvaluate"),
        $editConfirm    = $$._("#confirmEditEvidence"),
        $editCancel     = $$._("#cancelEditEvidence");
    $$.reject();

    $addEvidenceModal.appendTo(document.body);
    $editEvidenceModal.appendTo(document.body);

    //点击开启添加学习证据的模态框
    $addBtn.click(() => {
        $addEvidenceModal.modal("show");
        $addSelectedCQ.html("").append($selectedCQ.html());
        
        //清除已填写的数据
        $addContent.val(""); $addCQ.val("");
        $addEvaluate.find("option").eq(0).prop("selected", true);
        return false;
    });

    //确认添加学习证据
    $addConfirm.click(() => {
        let $newRow = $template.clone().removeAttr("id").removeClass("hidden");
        const evidenceCls = ["evidenceContent", "evidenceCoreQuestion", "evidenceEvaluate"];
        evidenceCls.forEach(clsname => {
            $newRow.find(`td.${clsname}`).eq(0).html($(`#add-${clsname}`).val());
        });
        $body.append($newRow);
        $addCancel.click();
        return false;
    });

    $body
    //删除学习证据
    .delegate(".deleteEvidence", "click", function(){
        $(this).closest("tr").remove();
        return false;
    })
    //点击打开编辑学习证据框
    .delegate(".editEvidence", "click", function(){
        $editEvidenceModal.modal("show");
        $$.inject($(this).closest("tr"));
        $content_editing        = $$._(".evidenceContent"),
        $coreQuestion_editing   = $$._(".evidenceCoreQuestion"),
        $evaluate_editing       = $$._(".evidenceEvaluate");
        $$.reject();
        
        $editSelectedCQ.html("").append($selectedCQ.html());
        $editContent.val($content_editing.html());
        $editCQ.val($coreQuestion_editing.html());
        const Evaluates = ["请选择", "书面测试", "调查问卷", "口头汇报", 
            "同行评审", "概念图", "观察记录", "制作成果", "展示绩效"];
        let evaluate_index = Evaluates.indexOf($evaluate_editing.html());
        evaluate_index = (!~evaluate_index)?0:evaluate_index;
        $editEvaluate.find("option").eq(evaluate_index).prop("selected", true);
        return false;
    });

    //确认保存学习证据的编辑
    $editConfirm.click(() => {
        $content_editing.html($editContent.val());
        $coreQuestion_editing.html($editCQ.val());
        $evaluate_editing.html($editEvaluate.val());
        $editCancel.click();
        return false;
    });
    //关闭、取消学习证据的编辑
    $editCancel.click(() => {
        $content_editing = null;
        $coreQuestion_editing = null;
        $evaluate_editing = null;
        $editEvidenceModal.modal("hide");
        return false;
    });
}

/**
 * 编辑区域的保存 => 存入DATA
 * 
 * @param {TaskInfo} taskInfo 
 */
function saveTaskHandler(taskInfo){
    let target = getTarget(taskInfo);
    target.taskname = $("#taskName", $edit).val();
    target.taskcontent = $("#taskContent", $edit).val();

    //核心问题的存储处理
    target["taskcorequestion"] = [];
    let $selectedCQ = $edit.find("#taskCoreQuestion-ShowZone");
    if($selectedCQ.html() !== ""){
        [...$selectedCQ.find("li")].forEach(li => {
            let type = $(li).find("span.badge").html(),
                content = $(li).find("span.li-content").html();
            target["taskcorequestion"].push({
                type: type, content:content
            });
        });
    }

    //学习证据的存储处理
    target["taskevidence"] = [];
    [...$("#evidence-body").children()].forEach((tr, index) => {
        if(index == 0) return;//template 跳过
        $$.inject($(tr));
        target["taskevidence"].push({
            content: $$._(".evidenceContent").html(),
            corequestion: $$._(".evidenceCoreQuestion").html(),
            evaluate: $$._(".evidenceEvaluate").html()
        });
        $$.reject();
    });
}

/**
 * 点击图片节点时候调用，利用TaskInfo进行编辑框的内容填充
 * 
 * @param {TaskInfo} taskInfo 
 */
export function initEditTaskHandler(taskInfo){
    let {
        taskname, taskcontent, 
        taskcorequestion, taskevidence
    } = getTarget(taskInfo);

    $$.inject($edit);
    //状填任务名称与任务描述
    $$._("#taskName").val(taskname);
    $$._("#taskContent").val(taskcontent);

    //装填核心问题区域
    let $addCQ      = $$._("#taskCoreQuestion-AddBtn"),
        $resetCQ    = $$._("#taskCoreQuestion-ResetBtn"),
        $showCQ     = $$._("#taskCoreQuestion-ShowZone");
    
    if(taskcorequestion && taskcorequestion.length){
        let str = "<ul class='list-group'>";
        taskcorequestion.forEach(corequestion => {
            str += `
            <li class="list-group-item">
                <span class="badge badge-${questionTypeMap(corequestion.type)}">
                    ${corequestion.type}</span>
                <span class="li-content">${corequestion.content}</span>
            </li>
            `.trim();
        });
        str += "</ul>";
        $showCQ.html(str);
        $$.hide($addCQ).show($resetCQ);
    }else{
        $showCQ.html("");
        $$.show($addCQ).hide($resetCQ);
    }
    $$.show($showCQ);

    //装填学习证据区域
    [...$("#evidence-body").children()].forEach((tr, index) => {
        if(index == 0) return;
        $(tr).remove();
    });
    if(taskevidence && taskevidence.length > 0){
        let $addEvidenceBtn = $("#confirmAddEvidence"),
            $content        = $("#add-evidenceContent"),
            $coreQuestion   = $("#add-evidenceCoreQuestion"),
            $evaluate       = $("#add-evidenceEvaluate");
        
        taskevidence.forEach(evidence => {
            $content.val(evidence.content);
            $coreQuestion.val(evidence.corequestion);
            for(let option of [...$evaluate.children()]){
                $(option).prop("selected", false);
                if($(option).val() == evidence.evaluate){
                    $(option).prop("selected", true);
                }
            }
            $addEvidenceBtn.click();
        });
    }
    $$.reject();
}