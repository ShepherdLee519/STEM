/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:19:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-28 04:33:32
 */

/*
 * ./js/common/funcs/ajax.js
 * 
 * 与ajax为主的post/get调用以及相关的参数设置的辅助函数
 */

import { common, Add } from '../commonObj';


/**
 * 将ajax的同步/异步模式切换\
 * 需要成对使用，先关闭异步再开启
 */
function exasync(){
    common._abandon("async");
    $.ajaxSettings.async = !$.ajaxSettings.async;
}

/**
 * 将ajax的缓存功能开启/关闭
 * 
 * @param {String} type "on" or "off"
 */
function excache(type = 'on') {
    if (type == 'on') {
        $.ajaxSetup( {cache: true} );
    } else if (type == 'off') {
        $.ajaxSetup( {cache: false} );
    }
}

/**
 * 封装的简化get操作，返回调用的结果\
 * 默认采用同步方式
 * 
 * @param {String} path $.get的目标路径
 * @param {Boolean} async = true 默认异步
 * @param {Boolean} cache = false 默认不加载缓存
 * @returns {*} 返回get调用返回的数据 
 */
function get(path, async = true, cache = false) {
    common._abandon("get"); 
    if(async) exasync();
    if(!cache) excache("off");

    let data;
    $.get(path, (res) => {
        data = res;
    });

    if(!cache) excache("on");
    if(async) exasync();
    return data;
}

/**
 * Promise包装的$.ajax
 * 
 * @param {String} obj ajax 参数对象\
 *      默认：type = GET, data = {}, dataType = "JSON"
 * @param {Boolean} nocache = true 默认使用添加随机数不加载缓存 
 * @returns {Object} 返回Promise对象
 */
function request({type = 'GET', data = {}, dataType = 'JSON', url}
    , nocache = true) {
    return new Promise(function(resolve, reject) {
        nocache && (url = `${url}?random=${common.random()}`);
        $.ajax({
            url: url,
            data: data,
            type: type,
            dataType: dataType,
            
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

/**
 * 利用信标进行数据传输
 * 
 * @param {String} path get的路径 
 * @param {Object} params 组装querystring的对象
 */
function beacon(path, params) {
    let url = path + '?' + $.param(params),
        beacon = new Image();
    
    beacon.src = url;
}


// 加入common空间
common[Add](
    [exasync, "async"], [excache, "cache"], 
    get, request, beacon
);