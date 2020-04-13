/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 04:52:12 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:03:36
 */

import { common as $$ } from "../../../common/common";
import { $activityEditZone, editInfo } from "../activity.common";


//模态框相关的引用对象
let $modal      = $("#activityEvidenceModal");
$modal.appendTo(document.body);
$$.inject($modal);
let $select     = $$._("#activityEvidenceSelectZone"),
    $selected   = $$._("#activityEvidenceSelectedZone"),
    $show       = $$._("#activityEvidenceShowZone");
$$.reject();


/**
 * 组装学习证据的tr
 * 
 * @param {Object} $tbody tr填装的目的tbody 
 * @param {Array} evidences 学习证据对象的数组 
 * @param {Boolean} selected = false 是否默认选中 
 */
function initEvidenceRow($tbody, evidences, selected = false){
    let str = "";
    evidences.forEach(evidence => {
        str += `
        <tr>
            <td class="content-td">${evidence.content}</td>
            <td class="evaluate-td">${evidence.evaluate}</td>
            <td class="checkbox-td"><input type="checkbox" 
                ${selected?"checked":""}></td>
        </tr>`.trim();
    });
    $tbody.html(str);
}

/**
 * 提取学习证据
 * 
 * @param {Object} $tbody
 * @return {Array} 
 */
function extractEvidence($tbody){
    let evidences = [];
    [...$tbody.children()].forEach(tr => {
        $$.inject($(tr));
        if($$._("input")[0].checked){
            evidences.push({
                content: $$._(".content-td").html(),
                evaluate: $$._(".evaluate-td").html()
            });
        }
        $$.reject();
    });
    return evidences;
}


let initEvidenceModal = function(){
    $modal.modal("show");
    $(this).next().click();
    
    let [nowInfo, evidences, selectedInfo] = editInfo.nownode.zone.evidences;
    //当前学习证据
    $show.parent().find("caption b").html(nowInfo.activityname);
    initEvidenceRow($show, nowInfo.evidences, true);
    //可选学习证据
    initEvidenceRow($select, evidences);
    //已选学习证据
    if(selectedInfo.length){
        $$.show([$selected, $selected.prev()]);
    }else{
        return false;
    }
    selectedInfo.forEach(info => {
        let $table = $selected.find("table").eq(0).clone(true);
        $table.find("caption b").html(info.activityname);
        $table.attr("data-id", info.id);
        initEvidenceRow(
            $table.find(".selectedZone"), 
            info.evidences, true
        );
        $table.removeClass("hidden").appendTo($selected);
    });
    return false;
};

let resetEvidence = function(){
    $select.html("");
    $show.html("");
    $$.hide([$selected, $selected.prev()]);
    $selected.find("table:not(:first)").remove();
    return false;
};

let appendTo = function($zone, event){
    $(event.target).closest("tr").appendTo($zone);
    return false;
}

let selectedChange = function(){
    let $tr = $(this).closest("tr"),
        $table = $tr.closest("table"),
        id = $table.data("id") + '-' + $tr.index();
    $tr.attr("data-id", id);
    if($(this).prop("checked")){
        let $target = $select.find(`tr[data-id="${id}"]`);
        if($target.length){
            $target.remove();
            $tr.removeClass("cancel");
        }else{
            $(this).prop("checked", false);
        }
    }else{
        $tr.clone().appendTo($select);
        $tr.addClass("cancel");
    }
    return false;
};

let confirmEvidence = function(){
    let $trs = $show.clone();
    $trs.find(".checkbox-td").remove();
    editInfo.editzone.find(".activityEvidenceBody").html($trs.html());

    let evidences_after = [{
        id: editInfo.nownode.id,
        evidences: extractEvidence($show)
    }];
    [...$selected.find("table:not(:first)")].forEach(table => {
        evidences_after.push({
            id: $(table).data("id"),
            evidences: extractEvidence($(table).find(".selectedZone"))
        });
    });
    editInfo.nownode.zone.evidences = evidences_after;
    $(this).next().click();//cancel
    return false;
};

/**
 * 编辑学习活动中的学习证据部分的事件处理
 */
export function editActivityEvidenceHandler(){
    $$.delegate($activityEditZone, [
        //点击打开选择学习证据模态框
        {
            target: ".select-activityEvidence",
            event: "click",
            handler: initEvidenceModal
        }, 
        //重置学习证据区域
        {
            target: ".reset-activityEvidence",
            event: "click",
            handler: resetEvidence
        }
    ]);

    $$.delegate($modal, [
        //当前学习证据 - 取消 -> 可选学习证据
        {
            target: "#activityEvidenceShowZone input",
            event: "change",
            handler: $$.curry(appendTo, $select)
        }, 
        //可选学习证据 - 确认 -> 当前学习证据
        {
            target: "#activityEvidenceSelectZone input",
            event: "change",
            handler: $$.curry(appendTo, $show)
        },
        //已选学习证据 - 取消/确认 -> 可选学习证据 
        {
            target: ".selectedZone input",
            event: "change",
            handler: selectedChange
        },
        //确认 修改学习证据数据(显示警告信息) 修改$body 
        {
            target: "#confirmActivityEvidence",
            event: "click",
            handler: confirmEvidence
        }
    ]);
}