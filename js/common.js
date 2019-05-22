/**
 * author: Shepherd.Lee
 * Date: 2019-05-21
 * version: 1.0.0
 * info: 网页的公共功能的调用以及部分辅助函数
 */

const log = console.log;

function _ok(){
    log("OK!!!!!!!!!");
}

function _async(){
    //将ajax的异步转为同步执行，常用于同步获取必要的数据，记得完成后再次调用以恢复异步
    $.ajaxSettings.async = !$.ajaxSettings.async;
}

function _addClass(node, classname){
    let $node = $(node);
    if(!$node.hasClass(classname)){
        $node.addClass(classname);
    }
}

function _removeClass(node, classname){
    let $node = $(node);
    if($node.hasClass(classname)){
        $node.removeClass(classname);
    }
}

$(function(){
    log("Hello! - common.js");

    let querystring = window.location.search.substring(1),
        pattern = /p=([a-zA-Z0-9]*)&?/g;
    pattern.exec(querystring);
    let p = RegExp.$1;
    [].forEach.call($("#top-navbar").children(), (a) => _removeClass(a, "active"));
    $("#" + p + "-link").parent().addClass("active");
});