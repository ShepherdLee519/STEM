/*
 * author: Shepherd.Lee
 * Date: 2019-08-27
 * info: 部分简化操作的公共功能与函数
 * index:
 */

const log = console.log;
const err = console.error;

/**
 * @global 存储_()调用的对象 
 * 由_inject()注入 _reject()取出
 */
var _TARGET = null;

$(function(){
    _hello("common");

    let querystring = window.location.search.substring(1),
        pattern = /p=([a-zA-Z0-9]*)&?/g;
    pattern.exec(querystring);
    let p = RegExp.$1;
    [].forEach.call($("#top-navbar").children(), (a) => _removeClass(a, "active"));
    $("#" + p + "-link").parent().addClass("active");
});



//----------------- 控制台输出相关 ------------------- //
/**
 * 测试用，打印在控制台
 */
function _ok(){
    log("OK!!!!!!!!!");
}

/**
 * 在每个自定义js文件的$(function())中调用
 * 输出js文件名 表明该文件成功引入
 * @param {String} filename 文件名
 * @param {String} suffix 后缀，默认"js"
 */
function _hello(filename, suffix = "js"){
    log(`Hello! - ${filename}.${suffix}`);
}





//----------------- html-String辅助相关 ------------------- //
/**
 * 返回用于填充在html中的空格(&nbsp;)
 * @param {Number} num 空格数 默认8
 * @returns {String} 指定数量的空格(用于html)
 */
function _space(num = 8){
    return "&nbsp;".repeat(num);
}





//---------------- 对象操作相关 ------------------- //
/**
 * 判断某个js对象是否为undefined的简写
 * @param {Object} target 
 */
function _isundef(target){
    return typeof target == "undefined";
}


/**
 * 判断某个js对象的键值存在且非空
 * @param {Object} target
 * @param {String} key
 */
function _exist(target, key){
    if(!_isundef(target) && 
       !_isundef(target[key]) &&
       target[key] !== "" && 
       target[key] !== [])
        return true;
    else
        return false;
}


/**
 * 保存对象对应键的值的方法：
 *  example:
 *  _store(
 *      THEME, ["people", key],
 *      $(#${prefix}-people-${key}).val()
 *  );
 * @param {Object} global_var 
 * @param {String} key - 或者是一个String数组 
 * @param {Object} value 
 */
function _store(global_var, key, value){
    let place;
    if(!Array.isArray(key)){
        if(!Array.isArray(global_var[key]))
            global_var[key] = value;
        else
            global_var[key].push(value);
    }else{
        let pre_place;
        place = global_var;
        key.forEach((k) => {
            pre_place = place;
            place = pre_place[k];
        });
        if(!Array.isArray(pre_place[key[key.length-1]]))
            pre_place[key[key.length-1]] = value;
        else
            pre_place[key[key.length-1]].push(value);
    }
}

/**
 * 提取对象对应键的值的方法：
 *  example:
 *  _withdraw(
 *      THEME, ["people", key],
 *      $(#${prefix}-people-${key})
 *  );
 * @param {Object} global_var 
 * @param {String} key - 或者是一个String数组 
 * @param {Object} value - 默认为null时将取出的值返回 或存于value对应位置(val())
 */
function _withdraw(global_var, key, value = null){
    let place;
    if(!Array.isArray(key)){
        if(value == null) return global_var[key];
        if(!Array.isArray(global_var[key])){
            value.val(global_var[key]);
        }else{
            log(global_var[key]);
        }
    }else{
        let pre_place;
        place = global_var;
        key.forEach((k) => {
            pre_place = place;
            place = pre_place[k];
        });
        if(value == null) return pre_place[key[key.length-1]];
        if(!Array.isArray(pre_place[key[key.length-1]])){
            value.val(pre_place[key[key.length-1]]);
        }else{
            log(pre_place[key[key.length-1]]);
        }
    }
}


/**
 * 将对象中制定位置的值存于html中(调用html())
 *  example:
 *  _html(
 *      THEME, ["people", key],
 *      $(#${prefix}-people-${key})
 *  );
 * @param {Object} global_var 
 * @param {String} key - 或者是一个String数组 
 * @param {Object} value - 存于value对应位置(val())
 */
function _html(global_var, key, value){
    let place;
    if(!Array.isArray(key)){
        if(!Array.isArray(global_var[key])){
            value.html(global_var[key]);
        }else{
            log(global_var[key]);
        }
    }else{
        let pre_place;
        place = global_var;
        key.forEach((k) => {
            pre_place = place;
            place = pre_place[k];
        });
        if(!Array.isArray(pre_place[key[key.length-1]])){
            value.html(pre_place[key[key.length-1]]);
        }else{
            log(pre_place[key[key.length-1]]);
        }
    }
}

/**
 * 注入节点 存于全局的_TARGET
 * @param {Object} target 
 */
function _inject(target){
    window._TARGET = $(target);
}

/**
 * 将全局的_TARGET清空 - 取出
 */
function _reject(){
    window._TARGET = null;
}

/**
 * 相对于_TRAGET中的对象进行find操作，返回结果
 * @param {String} target_attr find()中的字符串，即查询目标
 * @returns {Object} find的结果 
 *      - 保证只返回一个对象(非数组)
 *      - 默认会返回_TARGET自身
 */
function _(target_attr = null){
    if(!target_attr) return window._TARGET;
    return window._TARGET.find(target_attr).eq(0);
}

/**
 * 求当前对象的第n个祖先(parent的parent...)
 * @param {Number} 第几代
 * @param {String} 验证祖先的选择器
 */
function ancestor(n, selector = null){
    let $goal = $(this);
    for(let i = 1; i <= n; i++){
        $goal = $goal.parent();
    }
    if(selector) return ($goal.is(selector))?$goal:null;
    else return $goal;
}
$.fn.extend({
    ancestor:ancestor
});




//---------------- ajax相关 ------------------- //
/**
 * 将ajax切换为同步
 */
function _async(){
    //将ajax的异步转为同步执行，常用于同步获取必要的数据，记得完成后再次调用以恢复异步
    $.ajaxSettings.async = !$.ajaxSettings.async;
}

/**
 * 封装的get操作，返回调用的结果
 * @param {String} path $.get的路径
 * @returns {Object} 返回get调用返回的数据 
 */
function _get(path){
    _async();
    let data;
    $.get(path, (res) => {
        data = res;
    });
    _async();
    return data;
}






//----------------- class的操作相关 ------------------- //
/**
 * 安全的addClass操作 即有不加，无则加
 * @param {Object} node 
 * @param {String} classname 
 */
function _addClass(node, classname){
    //安全添加class即检查是否已经有相关class
    let $node = $(node);
    if(!$node.hasClass(classname)){
        $node.addClass(classname);
    }
}

/**
 * 安全的删除操作 有则删 无则不处理
 * @param {Object} node 
 * @param {String} classname 
 */
function _removeClass(node, classname){
    //安全删除class即先检查是否有对应class
    let $node = $(node);
    if($node.hasClass(classname)){
        $node.removeClass(classname);
    }
}

/**
 * 交换两个对象的某个类 结果只有其中一个对象有目标类
 * @param {Object} nodeA 
 * @param {Object} nodeB 
 * @param {String} classname 
 */
function _exClass(nodeA, nodeB, classname){
    let $nodeA = $(nodeA), $nodeB = $(nodeB);
    if($nodeA.hasClass(classname)){
        $nodeA.removeClass(classname);
        $nodeB.addClass(classname);
    }else if($nodeB.hasClass(classname)){
        $nodeB.removeClass(classname);
        $nodeA.addClass(classname);
    }
}

/**
 * 删去A 换上B类
 * @param {Object} node
 * @param {String} classA
 * @param {String} classB
 */
function _replaceClass(node, classA, classB){
    let $node = $(node);
    _removeClass($node, classA);
    _addClass($node, classB);
}