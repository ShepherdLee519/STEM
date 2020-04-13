/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-18 03:22:37 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-29 03:59:00
 */

/*
 * ./js/taskzone/handlers/taskzone.common.js
 * 
 * 学习评价区域相关的事件处理函数的公共值与辅助函数
 */

import { common as $$ } from '../../common/common';
import { TASKZONE } from '../taskzone.class';
import { DATA } from '../../saveload/saveload';


$$.inject( $('#design-tasks') );
const $taskZone    = $$._('#design-tasksZone');
const $resetModal  = $$._('#design-tasks-resetModal');
const $introZone   = $$._('#design-introduction-zone');
const $edit        = $$._('#design-editTaskZone');
const $initsubzone = $$._('#design-initSubTaskZone');
$$.reject();
export { $taskZone, $resetModal, $introZone, $edit, $initsubzone };


/**
 * 编辑前注入，用于取消编辑时候的还原
 */
export let taskInfo_backup = null;
export function backupTaskInfo(taskInfo) {
    taskInfo_backup = taskInfo;
}


/**
 * 事件处理中辅助获得taskInfo的辅助函数\
 * 仅模块内使用
 * 
 * @param {Object} that 传入this 
 * @returns {Object} $node, $zone, taskInfo
 */
export function getTool(that) {
    const $node = $(that).closest('.node');
    const $zone = $node.parent();
    
    const index = $zone.children('.node').index($node); 
    const parentIndex = $zone.hasClass('subTaskZone') ?
            +$zone.attr('data-parent') : -1;
            
    const taskInfo = TASKZONE.getTaskInfo(index, parentIndex);
    
    return {
        $node: $node, 
        $zone: $zone,
        taskInfo: taskInfo
    };
}


/**
 * 编辑的填充过程中，对目标node数据的筛选
 * 
 * @param {TaskInfo} taskInfo = taskInfo_backup
 */
export function getTarget(taskInfo = taskInfo_backup) {
    return ( !taskInfo.isSubNode ) ? 
            DATA.nodes[taskInfo.index] :
            DATA.nodes[taskInfo.parentIndex].next
                .nodes[taskInfo.index];
}