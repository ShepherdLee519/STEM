/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 04:52:32 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:03:43
 */

import { common as $$ } from "../../../common/common";
import { $activityEditZone, editInfo } from "../activity.common";


let $modal = $("#linkModal");
$modal.appendTo(document.body);
$$.inject($modal);
let $showBody = $$._("#linkModal-show-body"),
    $showTemp = $$._("#linkModal-show-template"),

    $url = $$._("#linkModal-add-url"),
    $describe = $$._("#linkModal-add-describe");
$$.reject();

/**
 * 组装链接的tr 返回jquery对象
 * 
 * @param {String} describe 
 * @param {String} url 
 */
function initLinkRow(describe, url){
    let $newRow = $showTemp.clone().removeClass("hidden");
    $$.inject($newRow);
    $$._(".linkModal-show-describe").val(describe);
    $$._(".linkModal-show-url").val(url);
    $$.reject();
    return $newRow;
}

/**
 * 从tr(jquery)对象中提取link数据
 * 
 * @param {Object} $tr 
 */
function extractLink($tr){
    return {
        describe: $tr.find(".linkModal-show-describe").val(),
        url: $tr.find(".linkModal-show-url").val()
    };
}


let initLinkModal = function(){
    $modal.modal("show");
    let $body = editInfo.editzone.find(".link-body");

    //重置showBody
    $showBody.find("tr:not(:first)").remove();
    [...$body.children()].forEach(tr => {
        let $tr = $(tr);
        initLinkRow(
            $tr.find(".link-tr-describe").html(),
            $tr.find(".link-tr-url a").html()
        ).appendTo($showBody);                
    });
    return false;
};

let deleteLink = function(){
    $(this).closest("tr").remove();
    return false;
};

let createLink = function(){
    let url = $url.val(),
        describe = $describe.val();
    if(url !== ""){
        initLinkRow(describe, url).appendTo($showBody);
        $url.val("");
        $describe.val("");
    }
    return false;
};

let addLink = function(){
    //step.1 从$showBody 中获取数据
    let links = [];
    [...$showBody.find("tr:not(:first)")].forEach(tr => {
        links.push(extractLink($(tr)));
    });
    //step.2 装入link-body中
    let $body = editInfo.editzone.find(".link-body"),
        str = "";
    for(let link of links){
        str += `
        <tr>
            <td class="link-tr-describe">${link.describe}</td>
            <td class="link-tr-url">
                <a href="${link.url}" target="_blank">${link.url}</a>
            </td>
        </tr>`.trim();
    }
    $body.html(str);
    $modal.modal("hide");
    return false;
};

/**
 * 编辑学习活动中的链接部分的事件处理
 */
export function editActivityLinkHandler(){
    $$.delegate($activityEditZone, {
        target: ".change-link",
        event: "click",
        handler: initLinkModal
    });

    $$.delegate($modal, [
        {
            target: ".delete-link",
            event: "click",
            handler: deleteLink
        }, 
        {
            target: "#linkModal-add-btn",
            event: "click",
            handler: createLink
        }, 
        {
            target: "#confirmLink",
            event: "click",
            handler: addLink
        }
    ]);
}