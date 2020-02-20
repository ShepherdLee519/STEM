/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-02-20 21:35:00 
 * @Last Modified by:   Shepherd.Lee 
 * @Last Modified time: 2020-02-20 21:35:00 
 */


$(function(){
    _hello("common");
});



//----------------- 控制台输出相关 ------------------- //
const log = console.log;
const err = console.error;
const cls = console.clear;


/**
 * 测试用，打印在控制台
 */
function _ok(){
    log("OK!!!!!!!!!");
}

/**
 * 在每个自定义js文件的$(function())中调用\
 * 输出js文件名 表明该文件成功引入
 * 
 * @param {String} filename 文件名
 * @param {String} suffix 后缀，默认"js"
 */
function _hello(filename, suffix = "js"){
    // log(`Hello! - ${filename}.${suffix}`);
}

/**
 * 标记废弃的函数
 * 
 * @param {String} name
 */
function _abandon(name){
    console.warn(`${name} has abandoned!`);
}





//----------------- 字符数字辅助相关 ------------------- //
/**
 * 返回用于填充在html中的空格(&nbsp;)
 * 
 * @param {Number} num = 8 空格数
 * @returns {String} 指定数量的空格(用于html)
 */
function _space(num = 8){
    return "&nbsp;".repeat(num);
}

/**
 * 返回用于填充用的随机字符(默认12位)
 * 
 * @param {Number} len = 12 随机字符长度
 * @returns {String} 返回该随机字符串
 */
function _random(len = 12){
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        num = chars.length,
        str = "";
    
    for(let i = 0; i < len; i++){
        str += chars.charAt(~~(Math.random()*num));
    }
    return str;
}

/**
 * 以n位字符串格式返回数字
 * 
 * @example
 * //returns 0012
 * _num(12, 4)
 * @param {Number} number 原数字
 * @param {Number} precision = 3 返回的位数
 * @returns {String}
 */
function _num(number, precision = 3){
    let i = 0, str = "";

    while(i < precision){
        str += number % 10;
        number = ~~(number/10);
        i++;
    }
    return [...str].reverse().join("");
}





//---------------- ajax相关 ------------------- //
/**
 * 将ajax的同步/异步模式切换\
 * 需要成对使用，先关闭异步再开启
 */
function _async(){
    $.ajaxSettings.async = !$.ajaxSettings.async;
}

/**
 * 将ajax的缓存功能开启/关闭
 * 
 * @param {String} type "on" or "off"
 */
function _cache(type = "on"){
    if(type == "on"){
        $.ajaxSetup ( {cache: true} );
    }else if(type == "off"){
        $.ajaxSetup ( {cache: false} );
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
function _get(path, async = true, cache = false){
    if(async) _async();
    if(!cache) _cache("off");

    let data;
    $.get(path, (res) => {
        data = res;
    });

    if(!cache) _cache("on");
    if(async) _async();
    return data;
}

/**
 * Promise包装的$.ajax
 * 
 * @param {String} obj ajax 参数对象\
 *      默认：type = GET, data = {}, dataType = "JSON"
 * @param {Boolean} nocache = true 默认使用添加随机数不加载缓存 
 */
function _request({type = "GET", data = {}, dataType = "JSON", url}
    , nocache = true){
    return new Promise(function(resolve, reject){
        nocache && (url = url + "?random=" + _random());
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
 * 异步运行生成器函数的运行工具
 * 
 * @param {Function} gen 一个生成器
 * @param  {...any} rest 生成器函数的参数列表
 */
function _run(gen, ...rest){
	let args = [].slice.call(rest, 1),
		it = gen.apply(this, args);

	return Promise.resolve()
    .then(function handleNext(value){
        let next = it.next(value);

        return (function handleResult(next){
            if(next.done) return next.value;

            return Promise.resolve(next.value)
            .then( 
                handleNext,
                (err) => Promise.resolve(
                    it.throw(err)
                ).then(handleResult)
            );
        })(next);
    });
}

/**
 * 利用信标进行数据传输
 * 
 * @param {String} path get的路径 
 * @param {Object} params 组装querystring的对象
 */
function _beacon(path, params){
    let url = path + "?" + $.param(params),
        beacon = new Image();
    
    beacon.src = url;
}





//----------------- query-DOM操作相关 ------------------- //
/**
 * 判断某个js对象是否为undefined的简写
 * 
 * @param {*} target 检查对象
 * @returns {Boolean} true-是undefined
 */
function _isundef(target){
    return target === void 0;
}

/**
 * 判断某个js对象的键值存在且非空
 * 
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
 * 
 *  @example
 *  _store(
 *      THEME, ["people", "science"],
 *      $(#courseTheme-people-science).val()
 *  );
 * 
 * @param {Object} global_var 
 * @param {String} key - 或者是一个String数组 
 * @param {Object} value 
 */
function _store(global_var, key, value){
    if(!Array.isArray(key)){
        if(!Array.isArray(global_var[key]))
            global_var[key] = value;
        else
            global_var[key].push(value);
    }else{
        let place, pre_place;
        place = global_var;
        key.forEach(k => {
            pre_place = place;
            place = pre_place[k];
        });
        if(!Array.isArray(pre_place[ key[key.length-1] ]))
            pre_place[ key[key.length-1] ] = value;
        else
            pre_place[ key[key.length-1] ].push(value);
    }
}

/**
 * 提取对象对应键的值的方法：
 * 
 *  @example
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
 * 将对象中指定位置的值存于html中(调用html())
 * 
 *  @example
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
 * 存储_()调用的对象\
 * 由_inject()注入 _reject()取出
 * 
 * @global
 * @default null
 */
var _TARGET = null;

/**
 * 注入节点 存于全局的_TARGET(存为jQuery对象)
 * 
 * @example
 * _inject(XXX);//注入
 * _(XX);//查询
 * _reject();//取出
 * @param {Object} target 存入的对象
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
 * 
 * @param {String} target find()中的字符串，即查询目标
 * @returns {Object} find的结果 
 *      - 保证只返回一个对象(非数组)
 *      - 默认会返回_TARGET自身
 */
function _(target = null){
    if(!target) return window._TARGET;
    return window._TARGET.find(target).eq(0);
}

/**
 * 求当前对象的第n个祖先(parent的parent...)
 * @param {Number} 第几代
 * @param {String} 验证祖先的选择器
 */
function ancestor(n, selector = null){
    _abandon("ancestor");
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





//----------------- 事件处理与动画相关 ------------------- //
/**
 * 在document上监听事件
 * 
 * @param {String} eventType 监听的事件类型
 * @param {Function} fn 事件函数
 * @param {Array} args = [] 事件函数的参数
 */
function _listen(eventType, fn, args = []){
    $(document).bind(eventType, function(){
        fn.apply(null, args);
    });
}

/**
 * 在document上触发事件
 * 
 * @param {String} eventType 触发的事件类型
 * @param {Boolean} hold = false 默认不保持，即触发后就取消绑定
 */
function _trigger(eventType, hold = false){
    $(document).trigger(eventType);
    if(!hold) $(document).unbind(eventType);
}

/**
 * 滚轮控制
 * 
 * @param {Object} $target  
 * @param {String} type = "top" / "bottom" 
 * @param {Number|String} speed = 400
 */
function _scroll($target, type, speed = 400){
    if(type === "top"){
        $target.animate({ scrollTop: 0 }, speed);
    }else if(type === "bottom"){
        let scrollHeight = $target.prop("scrollHeight");
        $target.animate({ scrollTop: scrollHeight }, speed);
    }
}




//----------------- css-class的操作相关 ------------------- //
/**
 * 安全的addClass操作 即有不加，无则加
 * 
 * @param {Object} $node jQuery对象
 * @param {String} classname 
 */
function _addClass($node, classname){
    _abandon("addClass");
    // if(!$node.hasClass(classname)){
        $node.addClass(classname);
    // }
}

/**
 * 安全的删除操作 有则删 无则不处理
 * 
 * @param {Object} $node jQuery对象 
 * @param {String} classname 
 */
function _removeClass($node, classname){
    _abandon("removeClass");
    // if($node.hasClass(classname)){
        $node.removeClass(classname);
    // }
}

/**
 * 交换两个对象的某个类 结果只有其中一个对象有目标类
 * 
 * @param {Object} $nodeA jQuery对象 
 * @param {Object} $nodeB jQuery对象 
 * @param {String} classname 
 */
function _exClass($nodeA, $nodeB, classname){
    if($nodeA.hasClass(classname)){
        $nodeA.removeClass(classname);
        $nodeB.addClass(classname);
    }else if($nodeB.hasClass(classname)){
        $nodeB.removeClass(classname);
        $nodeA.addClass(classname);
    }
}

/**
 * 目标对象删去A类 换上B类
 * 
 * @param {Object} $node jQuery对象
 * @param {String} classA
 * @param {String} classB
 */
function _replaceClass($node, classA, classB){
    $node.removeClass(classA).addClass(classB);
}

/**
 * _addClass("hidden") 的简写\
 * 可适用于节点数组 - 默认传入jQuery对象
 * 
 * @param {Object} $node 
 */
function _hide($node){
    if(!Array.isArray($node)){
        $node.addClass("hidden");
    }else{
        $node.forEach($target => {
            $target.addClass("hidden");
        });
    }
    return {show: _show};
}

/**
 * _removeClass("hidden") 的简写\
 * 可适用于节点数组 - 默认传入jQuery对象
 * 
 * @param {Object} $node 
 */
function _show($node){
    if(!Array.isArray($node)){
        $node.removeClass("hidden");
    }else{
        $node.forEach($target => {
            $target.removeClass("hidden");
        });
    }
    return {hide: _hide};
}



//----------------- 函数的辅助相关 ------------------- //
/**
 * 将func函数暴露给全局
 * 
 * @param {Function|Array<Function>} func 
 * @param {Object} global = window
 */
function _export(func, global = window){
    if(!Array.isArray(func)){
        func = [func];
    }
    func.forEach(f => {
        let name = f.name;
        global[name] = global[name] || f;
    });
}

/**
 * 函数的柯里化
 * 
 * @param {Function} func 
 * @param  {...any} oldargs 
 */
function _curry(func, ...oldargs){
    return (...newargs) => func(...oldargs, ...newargs);
}

/**
 * 给函数func()加锁，保证该函数的具体内容只会初始化一次
 * 
 * @param {Function} func 
 * @param {Object} global = window 
 */
function _lock(func, global = window){
    global["_locks"] = global["_locks"] || {};
    let locks = global["_locks"],
        name = func.name,
        _f = func;

    locks[name] = locks[name] || -1;//上锁 初始锁是开着的
    global[name] = function(){
        if(~locks[name]) return;
        _f();
        locks[name] = 1;//关锁
    };
}

/**
 * 分割任务的公用方法
 * 
 * @param {Array<Function>} steps 调用的函数数组
 * @param {Array<Array<*>>} argsArray 每个函数对应的参数列表的数组
 */
function _multistep(steps, argsArray = []){
    for(let i = 0, len = steps.length; i < len; i++){
        setTimeout(function(){
            steps[i].apply(null, argsArray[i] || []);
        }, 25);
    }
}
