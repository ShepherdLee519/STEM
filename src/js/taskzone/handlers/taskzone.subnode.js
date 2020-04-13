/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-18 04:24:53 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:06:59
 */

import { common as $$ } from "../../common/common";
import { TASKZONE } from "../taskzone.class";
import { $taskZone, $initsubzone, getTool } from "./taskzone.common";

/**
 * 添加二级任务的事件处理
 */
export default function addSubNodeHandler(){
    let initOrShowSubTask = function(){
        let taskInfo = getTool(this).taskInfo;

        //点击箭头，添加二级节点, 如果是子节点，跳过
        if(taskInfo.isSubNode) return;
        //已存在该结点的二级节点 - 显示/隐藏
        if(existsSubTask(taskInfo.index)){
            toggleSubTask(taskInfo.index);
            return;
        }
    
        //复制并准备二级节点菜单的容器
        taskInfo.$div.find(".init-panel").remove();
        let $panel = $initsubzone.clone()
            .toggleClass("hidden").removeAttr("id")
            .insertBefore($(this));
        TASKZONE.initTaskPanel($panel.find(".panel-body"));
    };

    let addSubTask = function(){
        let {$node, $zone, taskInfo} = getTool(this),
            $body = $zone.find(".init-panel .panel-body"),
            val = $body.find("input[type='radio']:checked").val();
            
        if($$.isundef(val)){
            alert("您没有选择子模式类型!");
            return;
        }

        hideSelectedTask();
        $node.find(".img-zone").addClass("selected-parent");
        $node.find(".glyphicon-chevron-down").addClass("hasSubNode");
        $node.find(".node-content").removeClass("node-wrap");
        hideSubTasks();
        TASKZONE.initSubTaskNodes(val, taskInfo.index);

        $("#cancelAddSubTask").click();
    };

    $$.delegate($taskZone, [
        //点击箭头，弹出选择模式面板
        {
            target: ".glyphicon-chevron-down",
            event: "click",
            handler: initOrShowSubTask
        },
        //确认添加二级节点
        {
            target: "#confirmAddSubTask",
            event: "click",
            handler: addSubTask
        },
        //关闭添加二级节点的菜单
        {
            target: "#cancelAddSubTask",
            event: "click",
            handler: function(){
                $(this).closest(".node").find(".init-panel")
                    .toggleClass("hidden");
            }
        }
    ]);
}


/**
 * 点击主task的下拉箭头时候判定该节点是否存在对应二级task
 * 
 * @param {Number} index
 */
function existsSubTask(index){
    let ids = [...$taskZone.children()]
        .map(node => $(node).attr("id"));
    return ~ids.indexOf(`subTaskZone-${index}`);
}


/**
 * 将所有子模式区域隐藏
 */
function hideSubTasks(){
    [...$taskZone.children(".subTaskZone")]
        .forEach(node => $$.hide($(node)));
}


/**
 * 显示二级task时候对应一级task会添加selected-parent类\
 * 使用hideSelectedTask在二级节点收回时候取消该类
 */
function hideSelectedTask(){
    [...$taskZone
        .children(".taskZone").eq(0)
        .children("div.node")].forEach(node => {
        let $node = $(node);
        $node.find(".img-zone").removeClass("selected-parent");
        $node.find(".node-content").addClass("node-wrap");
    });
}


/**
 * 切换子节点的效果
 * 1. 已经点开的场合 又将之关闭 - if
 * 2. 已经点开的场合， 点开了另一个子模式 - else
 * 
 * @param {Number} index 
 */
function toggleSubTask(index){
    hideSelectedTask();
    let $subTaskZone = $taskZone.find(`#subTaskZone-${index}`),
        $firstTaskZone = $taskZone.children().eq(0);
    if(!$subTaskZone.hasClass("hidden")){
        $firstTaskZone.addClass("first-level");
        $$.hide($subTaskZone);
    }else{
        hideSubTasks();
        $firstTaskZone.removeClass("first-level");
        $$.show($subTaskZone);
        let $parentNodeImg = $firstTaskZone
            .children("div.node").eq(index).find(".img-zone");
        $parentNodeImg.addClass("selected-parent");
        $parentNodeImg.parent().removeClass("node-wrap");
    }
}