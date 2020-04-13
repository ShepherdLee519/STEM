/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 04:24:35 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:04:02
 */

import { common as $$ } from "../../common/common";
import { $activityEditZone, $activityZone, getZone, editInfo } from "./activity.common";
import { initSelectActivityPanel, validateSelectActivity } from "./activity.select";
import { loadActivityData } from "./activity.saveload";
 

let getZoneIndex = ($that) => {
    let $node = $that.closest(".design-act-node-wrapper");
    return [
        getZone(+$node.data("index"), +$node.data("parent")), 
        $node.index() - 1 //init-act
    ]; 
}; 


let insertNode = function(){
    let $menuBox = $(this).parent().find(".menu-box"); 
    $activityZone.find(".menu-box").html("");
    $menuBox.append(initSelectActivityPanel($(this).data("type")));
    return false;
};

let confirmInsert = function(pos, event){
    let $this = $(event.target),
        //获取对应zone以及自身相对位置index
        [zone, index] = getZoneIndex($this),
        //验证选择情况
        info = validateSelectActivity($this);
    
    if(info){
        zone.addActivity(info, pos, index);
        $this.next().click();
    }
    return false;
};

let removeNode = function(){
    let $this = $(this),
        //获取对应zone以及自身相对位置index
        [zone, index] = getZoneIndex($this);
    
    zone.deleteActivity(index);
    return false;
};

let editActivity = function(){
    let $this = $(this),
        //获取对应zone以及自身相对位置index
        [zone, index] = getZoneIndex($this),
        node = zone.nodelist[index];
    
    let type = node.type,
        $editZone   = $(`#design-editActivityZone-${type}`),
        activityname = $this.prev().html();
    
    let flag = editInfo.nownode !== node; 
    editInfo.nownode = node;
    editInfo.editzone = $editZone;
    editInfo.nowtype = type;
    loadActivityData();
    
    $$.hide($activityEditZone.children()).show($editZone);
    flag && $$.scroll($editZone.find(".panel-body"), "top");
    $editZone.find(".activity-name").val(activityname);
};


/**
 * 点击插入新节点/删除节点/编辑节点的动态事件处理函数
 */
export function dynamicActivityHandler(){
    $$.delegate($activityZone, [
        //点击插入节点的箭头 组装选择框
        {
            target: ".insert-node",
            event: "click",
            handler: insertNode
        }, 
        //确认向前插入节点
        {
            target: ".confirm-before",
            event: "click",
            handler: $$.curry(confirmInsert, "before")
        }, 
        //确认向后插入节点
        {
            target: ".confirm-after",
            event: "click",
            handler: $$.curry(confirmInsert, "after")
        }, 
        //点击删除学习活动节点
        {
            target: ".remove-node",
            event: "click",
            handler: removeNode
        }, 
        //点击编辑打开编辑框
        {
            target: ".edit-activity-btn",
            event: "click",
            handler: editActivity
        }
    ]);
};