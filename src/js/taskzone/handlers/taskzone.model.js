/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-18 03:17:05 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-29 04:06:45
 */

/*
 * ./js/taskzone/handlers/taskzone.model.js
 * 
 * 学习评价区域的模式选择相关的事件处理
 */

import { common as $$ } from '../../common/common';
import { $introZone, $resetModal, $taskZone } from './taskzone.common';
import { TASKZONE } from '../taskzone.class';
import { DATA } from '../../saveload/saveload';
import { ACTIVITYZONE } from '../../activity/activity';
import { toggleTrigger } from '../../navbar/navbar';


/**
 * 选择模式的radio按钮的事件处理
 * IIFE
 */
;(function selectModalTool() {
    const $input = $('input[name=design-taskSelect]', $introZone);
    $input.change( () => {
        const value = $input.filter(':checked').val(); // 获取radio值
        $$.isundef(value) || selectModal(value);
    });
})();


/**
 * 选择对应的学习模式并初始化节点
 * 
 * @param {String} value 
 */
export function selectModal(value) {
    $$.exClass($introZone, $taskZone, 'hidden');
    $$.show($resetModal);

    // 界面收放动画效果
    toggleTrigger('on');

    const $div = $taskZone.children('.taskZone').eq(0);
    TASKZONE.initTaskNodes($div, value); // 新建节点
}


/**
 * 重置学习任务区域
 */
export function resetModal() {
    // 重置DATA、 学习活动与任务区域
    DATA.reset(); // 重置DATA
    ACTIVITYZONE.deleteZones(); // 重置学习活动

    // 重置任务区域
    $$.hide([$taskZone, $resetModal]).show($introZone);
    toggleTrigger('off');

    // 将原先的选中取消
    [...$introZone.find('input')].forEach(radio => {
        radio.checked = false;
    });

    $taskZone.find('.subTaskZone').remove()
        .end().find('.node').remove();
};