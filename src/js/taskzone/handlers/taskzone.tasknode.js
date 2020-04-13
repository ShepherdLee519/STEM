/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-18 03:17:05 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-29 04:19:42
 */

/*
 * ./js/taskzone/handlers/taskzone.tasknode.js
 * 
 * 学习评价区域的节点相关的事件处理，包括重置模式、删除节点在内
 */

import { common as $$ } from '../../common/common';
import { $taskZone, $resetModal, $edit, taskInfo_backup, 
    backupTaskInfo, getTool } from './taskzone.common';
import { resetModal } from './taskzone.model';
import { initEditTaskHandler } from './taskzone.edit';
import { TASKZONE } from '../taskzone.class';
import { DATA } from '../../saveload/saveload';
import { ACTIVITYZONE } from '../../activity/activity';


/**
 * 删除任务的事件处理函数
 */
function deleteTask() {
    const $zone = $(this).parent();
    $zone.removeClass('hover');

    if ( !$taskZone.children().index($zone) ) {
        resetModal(); // 删除一级，重置全部
        return;
    }

    // 作为子节点
    const parentIndex = +$zone.data('parent');
    const id = '#' + $zone[0].id;
    const $parent = TASKZONE.getTaskZone();

    // 将父节点的样式恢复
    $parent.find('.img-zone.selected-parent')
        .removeClass('selected-parent')
        .parent().addClass('node-wrap');

    // 从DATA中删除
    DATA.nodes[parentIndex].next = '';
    // 从taskZone中删除
    $(id).remove();
    
    $parent.addClass('first-level');
    $parent.find('.node').eq(parentIndex)
        .find('span').removeClass('hasSubNode');

    // 从学习任务中删除
    ACTIVITYZONE.deleteZones(parentIndex);
}

/**
 * 点击节点图片编辑节点的事件处理函数
 */
function showEdit() {
    const taskInfo = getTool(this).taskInfo;

    $$.show($edit);
    if ( taskInfo_backup !== taskInfo ) 
        $$.scroll( $edit.find('form'), 'top' );
    $edit.find('.panel-title label').eq(0)
        .html(` - ${taskInfo.nodename}`);   
            
    backupTaskInfo(taskInfo); // 备份
    initEditTaskHandler(taskInfo); // 读入DATA中数据初始化$edit区域
}


/**
 * 主要包括:
 * 1. 删除任务的事件
 * 2. 点击图片打开编辑框事件
 * 3. 重置模式的事件
 */
export default function taskZoneHandler() {
    $$.delegate($taskZone, [
        // hover 显示虚线红框
        {
            target: '.delete-task',
            event: 'mouseover',
            handler: function() {
                $(this).parent().addClass('hover');
            }
        },
        {
            target: '.delete-task',
            event: 'mouseout',
            handler: function() {
                $(this).parent().removeClass('hover');
            }
        },
        // 点击 删除任务
        {
            target: '.delete-task',
            event: 'click',
            handler: deleteTask
        },
        // 点击图片 显示编辑框
        {
            target: 'img',
            event: 'click',
            handler: showEdit
        }
    ]);

    // 重置模式按钮
    $resetModal.click(function() {
        resetModal();
        $$.hide( $resetModal );
    });
}