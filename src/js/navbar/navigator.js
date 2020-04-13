/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-26 23:29:33 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:04:45
 */

import { common as $$ } from "../common/common";
import { saveData, getSession, SESSION_INFO } from "../saveload/saveload";
import injectPreview from "../pdf/pdf";


let $saveData = $("#saveData"),
    $savePDF = $("#savePDF"),
    $downloadPDF = $("#downloadPDF");

/**
 * 1. 用户名
 */
$("#username").html(
    getSession() ? SESSION_INFO.username : "本地模式"
);

/**
 * 2. 切换子页面 - design/preview
 */
let links = ["design", "preview"];
links.forEach(link => {
    $(`#${link}-link`).click(function(){
        $("#top-navbar > li").removeClass("active");
        $(this).parent().addClass("active");        
        $$.hide($("#containers-wrapper > div")).show($(`#${link}-container`));
        return false;
    });
});

$("#design-link").click(() => {
    $$.show($saveData).hide([$savePDF, $downloadPDF]);
});

$("#preview-link").click(() => {
    saveData();//先保存数据
    $$.hide($saveData).show([$savePDF, $downloadPDF]);
    injectPreview();//注入preview内容
});

/**
 * 3. navbar栏的若干按钮
 */
$saveData.click(() => {
    saveData();
    alert("保存成功！");
});