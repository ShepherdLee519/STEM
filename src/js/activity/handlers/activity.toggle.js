/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 03:51:12 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:04:15
 */

import { common as $$ } from "../../common/common";
import { $activityZone } from "./activity.common";


/**
 * 关于面板收缩的事件处理函数
 */
export function togglePanelHandler(){
    const SPEED = 400;//slide-speed

    let toggleActivityZone = function(){
        $(this).next().slideToggle(SPEED);
        return false;
    };

    let toggleActivityNode = function(){
        let $heading = $(this),
            $content = $heading.next(),
            $panel   = $heading.parent();
        
        $content.toggleClass("hidden");
        $panel.toggleClass("panel-default").toggleClass("panel-toggle");
        $heading.find(".panel-title b").html(
            $content.hasClass("hidden") ? 
                $content.find(".design-activity-name").html() :
                $panel.data("typename")
        );
        return false;
    };

    let toggleHasSubActivityZone = function(){
        $(this).parent().next(".subZones").slideToggle(SPEED);
        return false;
    };

    $$.delegate($activityZone, [
        //toggle - design-act-zone-content
        {
            target: [
                ".design-act-zone > .panel-heading", 
                ".design-act-subZone > .panel-heading"
            ],
            event: "click",
            handler: toggleActivityZone
        }, 
        //toggle - design-act-node-content
        {
            target: ".design-act-node > .panel-heading",
            event: "click",
            handler: toggleActivityNode
        }, 
        //toggle - subZones
        {
            target: ".design-act-zone-hassub",
            event: "click",
            handler: toggleHasSubActivityZone
        }
    ]);
};