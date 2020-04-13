/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:19:40 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-28 16:03:15
 */

/*
 * ./js/common/funcs/object.js
 * 
 * 与对象操作相关的辅助函数
 * 需要用到common中的[Target]来存储临时的操作对象
 */

import { common, Add, Target } from '../commonObj';


/**
 * 判断某个js对象是否为undefined的简写
 * 
 * @param {Object} target 检查对象
 * @returns {Boolean} true-是undefined
 */
function isundef(target) {
    return target === void 0;
}

/**
 * 判断某个js对象的键值存在且非空
 * 
 * @param {Object} target
 * @param {String} key
 */
function exist(target, key) {
    common._abandon('exist');
    if ( !isundef(target) && 
       !isundef(target[key]) &&
       target[key] !== "" && 
       target[key] !== [] )
        return true;
    else
        return false;
}

/**
 * 保存对象对应键的值的方法：
 * 
 *  @example
 *  store(
 *      THEME, ["people", "science"],
 *      $(#courseTheme-people-science).val()
 *  );
 * 
 * @param {Object} global_var 
 * @param {String} key - 或者是一个String数组 
 * @param {Object} value 
 */
function store(global_var, key, value) {
    if ( !Array.isArray(key) ) {
        if ( !Array.isArray(global_var[key]) )
            global_var[key] = value;
        else
            global_var[key].push(value);
    } else {
        let place, pre_place;
        place = global_var;
        key.forEach(k => {
            pre_place = place;
            place = pre_place[k];
        });
        if ( !Array.isArray(pre_place[ key[key.length-1] ]) )
            pre_place[ key[key.length-1] ] = value;
        else
            pre_place[ key[key.length-1] ].push(value);
    }
}

/**
 * 提取对象对应键的值的方法：
 * 
 *  @example
 *  withdraw(
 *      THEME, ["people", key],
 *      $(#${prefix}-people-${key})
 *  );
 * @param {Object} global_var 
 * @param {String} key - 或者是一个String数组 
 * @param {Object} value - 默认为null时将取出的值返回 或存于value对应位置(val())
 */
function withdraw(global_var, key, value = null) {
    let place;
    if ( !Array.isArray(key) ) {
        if (value == null) return global_var[key];
        if ( !Array.isArray(global_var[key]) ) {
            value.val(global_var[key]);
        } else {
            console.log(global_var[key]);
        }
    } else {
        let pre_place;
        place = global_var;
        key.forEach(k => {
            pre_place = place;
            place = pre_place[k];
        });
        if (value == null) return pre_place[ key[key.length-1] ];
        if ( !Array.isArray(pre_place[ key[key.length-1] ]) ) {
            value.val(pre_place[ key[key.length-1] ]);
        } else {
            console.log(pre_place[ key[key.length-1] ]);
        }
    }
}

/**
 * 将对象中指定位置的值存于html中(调用html())
 * 
 *  @example
 *  html(
 *      THEME, ["people", key],
 *      $(#${prefix}-people-${key})
 *  );
 * @param {Object} global_var 
 * @param {String} key - 或者是一个String数组 
 * @param {Object} value - 存于value对应位置(val())
 */
function html(global_var, key, value) {
    let place;
    if ( !Array.isArray(key) ) {
        if ( !Array.isArray(global_var[key]) ) {
            value.html(global_var[key]);
        } else {
            console.log(global_var[key]);
        }
    } else {
        let pre_place;
        place = global_var;
        key.forEach(k => {
            pre_place = place;
            place = pre_place[k];
        });
        if ( !Array.isArray(pre_place[ key[key.length-1] ]) ) {
            value.html(pre_place[ key[key.length-1] ]);
        } else {
            console.log(pre_place[ key[key.length-1] ]);
        }
    }
}

/**
 * 注入节点 存于[Target](存为jQuery对象)
 * 
 * @example
 * inject(XXX);//注入
 * _(XX);//查询
 * reject();//取出
 * @param {Object} target 存入的对象
 */
function inject(target) {
    common[Target] = $(target);
}

/**
 * 将全局的_TARGET清空 - 取出
 */
function reject() {
    common[Target] = null;
}

/**
 * 相对于_TRAGET中的对象进行find操作，返回结果
 * 
 * @param {String} target find()中的字符串，即查询目标
 * @returns {Object} find的结果 
 *      - 保证只返回一个对象(非数组)
 *      - 默认会返回_TARGET自身
 */
function _(target = null) {
    if ( !target ) return common[Target];
    return common[Target].find(target).eq(0);
}

/**
 * 求当前对象的第n个祖先(parent的parent...)
 * @param {Number} 第几代
 * @param {String} 验证祖先的选择器
 */
function ancestor(n, selector = null){
    common._abandon("ancestor");
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

/**
 * 通用的代理，为暴露出的全局对象的接口增加通过[self]赋值的功能
 * 
 * @param {Object} obj 
 */
function proxy(obj) {
    return new Proxy(obj, {
        set(target, key, value) {
            if (key === 'self') {
                for (let [k, v] of Object.entries(value)) {
                    target[k] = v;
                }
                return true;
            }
            return false;
        }
    });
}


// 加入common空间
common[Add](
    isundef, exist,
    store, withdraw, html,
    inject, reject, _,
    proxy
);