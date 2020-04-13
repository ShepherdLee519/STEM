/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-23 04:03:38 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:05:34
 */

import { common as $$ } from "../../common/common";
import { TASKTYPE } from "../../taskzone/taskzone";


/**
 * 返回节点，用于加入子节点区域的模式类型
 * @param {String} type 
 * @param {Array<Object>} nodes
 */
export default function injectPreviewSubTaskzone(type, nodes){
    let $subTaskModal = $("#subTaskModalZone").clone()
        .removeAttr("id").removeClass("hidden"),
        $backup_inject = $$._();
    
    $$.inject($subTaskModal);
    
    let typename;
    //TASKTYPE在design.js中
    for(let tasktype of TASKTYPE){
        if(tasktype.task === type.toLowerCase()){
            typename = tasktype.name;
            break;
        }
    }
    $$._(".subTaskModal-name").html(typename);

    let str = ""
    for(let node of nodes){
        str += `
        <li>
            <img class="img-responsive subTaskModal-image" src="image/nodes/${type}/${node.imgsrc}">
            <label class="subTaskModal-nodename">${node.nodename}</label>
        </li>`.trim();
    }
    $$._(".subTaskModal-gallery").html(str);

    $$.reject();
    $$.inject($backup_inject);
    return $subTaskModal;
}