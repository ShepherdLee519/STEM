/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 04:48:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:04:05
 */

import { common as $$ } from "../../common/common";
import { $activityEditZone } from "./activity.common";
import { saveActivityData } from "./activity.saveload";
import { editActivityEvidenceHandler } from "./editactivity/activity.edit.evidence";
import { editActivityLinkHandler } from "./editactivity/activity.edit.link";
import { editActivityFileHandler } from "./editactivity/activity.edit.file";


/**
 * 编辑学习活动有关的事件处理函数
 */
export function editActivityHandler(){
    let hideActivity = function(){
        $$.hide($activityEditZone.children());
        return false;
    };

    let saveActivity = function(){
        saveActivityData();//保存数据
        $(this).next().click();//关闭
        return false;
    };


    $$.delegate($activityEditZone, [
        {
            target: [".design-editActivity-cancel", ".activity-remove"],
            event: "click",
            handler: hideActivity
        },
        {
            target: ".design-editActivity-confirm",
            event: "click",
            handler: saveActivity
        }
    ]);

    $$.multistep([
        editActivityEvidenceHandler,
        editActivityLinkHandler,
        editActivityFileHandler
    ]);
};