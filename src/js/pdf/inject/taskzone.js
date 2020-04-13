/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-23 04:03:38 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:05:36
 */

import { common as $$ } from "../../common/common";
import { DATA } from "../../saveload/saveload";
import { TASKTYPE } from "../../taskzone/taskzone";


/**
 * 将数据从DATA中取出 注入preview中的#taskModalZone
 */
export default function injectPreviewTaskzone(){
    $$.inject($("#taskModalZone"));
    
    if($$.isundef(DATA) || $$.isundef(DATA.tasktype)) return;
    let type = DATA.tasktype, typename;
    //TASKTYPE在design.js中
    for(let tasktype of TASKTYPE){
        if(tasktype.task === type.toLowerCase()){
            typename = tasktype.name;
            break;
        }
    }
    $$._("#taskModal-name").html(typename);

    let str = ""
    for(let node of DATA.nodes){
        str += `
        <li>
            <img class="img-responsive taskModal-image" src="image/nodes/${type}/${node.imgsrc}">
            <label class="taskModal-nodename">${node.nodename}</label>
        </li>`.trim();
    }
    $$._("#taskModal-gallery").html(str);

    $$.reject();
}