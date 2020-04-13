/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 04:52:53 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:03:39
 */

import { common as $$ } from "../../../common/common";
import { SESSION_INFO } from "../../../saveload/saveload";
import { $activityEditZone, editInfo } from "../activity.common";


let $modal = $("#fileModal");
$modal.appendTo(document.body);

$$.inject($modal.find("#fileModal-show"));
let $showBody = $$._("#fileModal-show-body"),
    $showTemp = $$._("#fileModal-show-template");
$$.reject();

let $modalAdd = $modal.find("#fileModal-add");
$$.inject($modalAdd);
let $location   = $$._("#addFile-location"),
    $check      = $$._("#addFile-check"),
    $file       = $$._("#addFile-file"),
    $name       = $$._("#addFile-name"),
    $submit     = $$._("#addFile-submit"),
    $upload     = $$._("#addFile-upload"),
    $reset      = $$._("#addFile-reset");
$$.reject();

var upload_path = "/";

/**
 * 组装文件信息的tr
 * 
 * @param {String} filename 
 * @param {String} fullpath 
 */
function initFileRow(filename, fullpath){
    let $newRow = $showTemp.clone()
        .removeClass("hidden").removeAttr("id");
    initFileRow.pattern = initFileRow.pattern || /\.[^\.]+$/;
    let type = initFileRow.pattern.exec(fullpath)
        .toString().substring(1);

    $$.inject($newRow);
    $$._(".fileModal-show-filename").html(filename);
    $$._(".fileModal-show-filename").attr("data-fullpath", fullpath);
    $$._(".fileModal-show-type").html(type);
    $$.reject();
    return $newRow;
}

/**
 * 提取tr中的文件信息
 * 
 * @param {Object} $tbody 
 */
function extractFile($tbody){
    let str = "",
        $filename, filename;
    [...$tbody.find("tr:not(:first)")].forEach(tr => {
        $filename = $(tr).find(".fileModal-show-filename");
        filename = $filename.html().trim();
        str +=  `
            <li class="list-group-item file-li"
                data-fullpath=${$filename.attr("data-fullpath")}
                title="点击下载< ${filename} >">
                ${filename}</li>
        `.trim();
    });
    return str;
}


let initFileModal = function(){
    let $fileUl = editInfo.editzone.find(".file-ul");
    $showBody.find("tr:not(:first)").remove();
    for(let file of [...$fileUl.children()]){
        initFileRow(
            $(file).html(),
            $(file).data("fullpath")
        ).appendTo($showBody);
    }
    $modal.modal("show");
    return false;
};

let downloadFile = function(){
    let $a = $(`<a href="${$(this).data("fullpath")}" download></a>`)
    $a.addClass("hidden").appendTo(document.body);
    $a[0].click();
    $a.remove();
    return false;
};

let uploadFile = function(){
    let formData = new FormData($("#fileUpload-form")[0]);
    formData.append("userid", SESSION_INFO.userid);
    formData.append("username", SESSION_INFO.username);

    $.ajax({
        type: "POST",
        url: "./php/upload/upload_file.php",
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success(res){
            console.log(res);
            initFileRow(
                res.filename,
                upload_path + res.fullname
            ).appendTo($showBody);
        },
        error(res){
            console.error(upload_path);
            console.error(res);
            alert("File Upload Occured ERROR!");
        }
    });
    return false;
};

let deleteFile = function(){
    let $tr = $(this).closest("tr"),
        fullpath = $tr.find(".fileModal-show-filename").data("fullpath");
    fullpath = fullpath.replace(upload_path, '../.' + upload_path);
    $$.beacon("./php/upload/delete_file.php", {filepath: fullpath});
    $tr.remove();
    return false;
};

let addFile = function(){
    let $fileUl = editInfo.editzone.find(".file-ul");
    $fileUl.html(extractFile($showBody));
    $modal.modal("hide");
    return false;
};


/**
 * 编辑学习活动中的文件上传部分的事件处理
 */
export function editActivityFileHandler(){
    //path 异步确定
    //上传文件的文件夹 - 注意末尾必须有/
    upload_path = SESSION_INFO.session ?
        `./userdata/${SESSION_INFO.userid}_${SESSION_INFO.username}/upload/` :
        "./upload/";

    //上传控件相关的一些handler
    $file.change(() => $location.val($file.val()));
    $check.click(() => $file.click());
    $upload.click(() => {
        $submit.click();
        return false;
    });
    $reset.click(() => {
        $name.val("");
        $location.val("");
        $file.val("");
        return false;
    });

    $$.delegate($activityEditZone, [
        {
            target: ".change-file",
            event: "click",
            handler: initFileModal
        }, 
        {
            target: ".file-li",
            event: "click",
            handler: downloadFile
        }
    ])

    $$.delegate($modal, [
        {
            target: "#fileUpload-form",
            event: "submit",
            handler: uploadFile
        }, 
        {
            target: ".delete-file",
            event: "click",
            handler: deleteFile
        }, 
        {
            target: "#confirmFile",
            event: "click",
            handler: addFile
        }
    ]);
}