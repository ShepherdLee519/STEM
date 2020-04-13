/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-28 16:13:40 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-29 01:42:15
 */

/*
 * ./js/objectives/question-handlers.js
 * 
 * 学习目标 - 问题设计区域的相关事件处理
 */

import { common as $$ } from '../common/common';
import { STD } from './standard';


/*
 * 核心问题的事件处理过程中所需的辅助函数 
 */
/**
 * 调整核心问题区域的核心问题的：\
 *      1.前部的编号 eg.S-Q2\
 *      2.核心问题列表的收缩/展开 
 * 
 * @param {String} std 学科类型 eg.science 
 */
function questionAdjust(std) {
    $$.inject( $(`#questionDesign-coreQuestion-${std}`) );
    const $list   = $$._('.coreQuestionList');
    const $toggle = $$._('.toggleCoreQuestion');
    $$.reject();

    // 根据核心问题的数量，控制list的展开/收缩
    // glyphicon-chevron-down:收缩 glyphicon-chevron-up:展开
    const len = $list.children().length;
    const isShow = ( $target ) => $target.hasClass('glyphicon-chevron-up');
    const isHide = ( $target ) => $target.hasClass('glyphicon-chevron-down');
    const toggle = () => { $toggle.parent().click() };

    if (len == 0) { // 不存在核心问题
        if (isShow( $toggle )) toggle();
        return; // 直接返回 不需要下面的编号调节
    } else {
        if (isHide( $toggle )) toggle();
    }

    // 调整前部显示的核心问题编号 eg.S-Q2
    $list.find('li').each( (index, li) => {
        const $target = $(li).find('.coreQuestionNumber');
        //prefix: eg.S-Q
        const prefix = $target.data('originNumber');
        $target.html(prefix + (index + 1));
    });
}

/**
 * 将传进来的参数组装出一个coreQuestionListItem\
 * 并返回该listitem(<li>)的引用
 * 
 * @param {String} coreType - 核心问题学科类型 eg.science
 * @param {String} val = '' - input value
 * @returns {Object} jQuery对象，用append加入list
 */
function questionLiGenerator(coreType, val = ''){
    // 仅第一次调用时候组装每个类型的listitem并记忆在函数本地的对象中
    if (typeof questionLiGenerator.lis !== 'object') {
        const $lis = {};
    
        STD.forEach(type => {
            $lis[type] = $(`
            <li class="list-group-item col-sm-12 coreQuestionListItem">
            <div class="input-group">
            
                <span class="input-group-addon data-badge-${type} coreQuestionNumber"
                    data-origin-number = "${type[0].toUpperCase()}-Q">
                </span>

                <input type="text" class="form-control showCoreQuestion" 
                    data-coretype="${type}" value="" placeholder="">

                <span class="input-group-btn">
                    <button class="btn btn-danger deleteCoreQuestion-btn" data-type="${type}">
                        <span class="glyphicon glyphicon-minus deleteCoreQuestion"></span>
                    </button>
                </span>
                
            </div>
            </li>`.trim());
        });
        questionLiGenerator.lis = $lis;
    }
    
    // 除第一次组装外，每次调用直接从该函数存储的对象中返回
    return questionLiGenerator.lis[coreType].clone()
            .find('input').val(val) // 当前$li.find("input")
            .end(); // .end(), 返回$li
}


/*
 * 核心问题事件处理部分的处理函数
 */
/**
 * 点击添加核心问题的事件处理函数
 */
function addQuestion() {
    const $div = $(this).closest('.questionDesign-coreQuestion-eachQuestion');
    const $list = $div.find('.coreQuestionList');
    const $edit = $div.find('.editCoreQuestion');

    const val = $edit.val(); // 该val在loadQuestion时才有
    const std_name = $(this).data('type'); // 当前add所对应的学科类型
    
    // 添加新核心问题项
    $list.append(questionLiGenerator(std_name, val));
    $edit.val('');

    // 调整对应学科的核心问题区域
    questionAdjust(std_name);

    // 增加完项后，将滚轮移动到最末端
    $$.scroll($list, 'bottom');

    return false;
}

/**
 * 点击删除核心问题的事件处理函数
 */
function deleteQuestion(){
    const $this = $(this);
    const coreType = $this.data('type');
    const $li = $this.closest('.coreQuestionListItem');
    
    $li.remove();
    questionAdjust(coreType); // 删除后调整核心问题区
    
    return false;
}

/**
 * 点击收缩/展开核心问题列表的事件处理函数
 */
function toggleQuestion(){
    const $toggleBtn = $(this);
    const $toggle = $toggleBtn.find('.toggleCoreQuestion');
    const $list = $toggleBtn.closest('.questionDesign-coreQuestion-eachQuestion')
        .find('.coreQuestionList');

    if ( $toggle.hasClass('glyphicon-chevron-down') ) {
        $toggle.removeClass('glyphicon-chevron-down')
            .addClass('glyphicon-chevron-up');
        $$.show( $list );
        $$.replaceClass( $toggleBtn, 'btn-primary', 'btn-info' );
    } else {
        $toggle.removeClass('glyphicon-chevron-up')
            .addClass('glyphicon-chevron-down');
        $$.hide( $list );
        $$.replaceClass( $toggleBtn, 'btn-info', 'btn-primary' );
    }
    
    return false;
}


/**
 * 问题设计区域的事件处理函数\
 * IIFE
 */
;(function questionHandlers() {
    $$.delegate( $('#questionDesign-coreQuestion'), [
        // .addCoreQuestion-btn - 点击添加新核心问题项
        {
            target: '.addCoreQuestion-btn',
            event: 'click',
            handler: addQuestion
        },
        // .deleteCoreQuestion-btn - 删除核心问题项
        {
            target: '.deleteCoreQuestion-btn',
            event: 'click',
            handler: deleteQuestion
        },
        // .toggleCoreQuestion-btn - 收回/展开coreQuestionList
        {
            target: '.toggleCoreQuestion-btn',
            event: 'click',
            handler: toggleQuestion
        }
    ]);
})();