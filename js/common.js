/**
 * author: Shepherd.Lee
 * Date: 2019-07-25
 * version: 1.0.0
 * info: 网页的公共功能的调用以及部分辅助函数
 */

const log = console.log;

function _ok(){
    log("OK!!!!!!!!!");
}

function _hello(filename, suffix = "js"){
    log(`Hello! - ${filename}.${suffix}`);
}

function _space(num = 8){
    return "&nbsp;".repeat(num);
}

function _async(){
    //将ajax的异步转为同步执行，常用于同步获取必要的数据，记得完成后再次调用以恢复异步
    $.ajaxSettings.async = !$.ajaxSettings.async;
}

function _addClass(node, classname){
    //安全添加class即检查是否已经有相关class
    let $node = $(node);
    if(!$node.hasClass(classname)){
        $node.addClass(classname);
    }
}

function _removeClass(node, classname){
    //安全删除class即先检查是否有对应class
    let $node = $(node);
    if($node.hasClass(classname)){
        $node.removeClass(classname);
    }
}

$(function(){
    _hello("common");

    let querystring = window.location.search.substring(1),
        pattern = /p=([a-zA-Z0-9]*)&?/g;
    pattern.exec(querystring);
    let p = RegExp.$1;
    [].forEach.call($("#top-navbar").children(), (a) => _removeClass(a, "active"));
    $("#" + p + "-link").parent().addClass("active");
});