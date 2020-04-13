/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 04:09:47 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:04:11
 */

import { common as $$ } from "../../common/common";
import { ACTIVITYTYPE } from "../activity.data";
import { $activityZone, getZone } from "./activity.common";


/**
 * 组装选择学习活动的选择面板并返回
 * 
 * @param {String} type "init", "before"/"after" 
 * @returns {String}
 */
export function initSelectActivityPanel(type){
    if(typeof initSelectActivityPanel.map != "object"){
        let map = new Map()
            .set("init", "选择活动类型")
            .set("before", "<b>向前添加新学习活动</b>")
            .set("after", "<b>向后添加新学习活动</b>");
        initSelectActivityPanel.map = map;

        let str = "<div class='activitiy-radio-zone'>";
        str += `
        <div class="form-group">
            <label for="" class="control-label">活动名称:</label>
            <div><input type="text" class="form-control" name="activity-name"
                placeholder="学习活动的活动名"></div>
        </div><hr />
        <label class="control-label">活动类型:</label>
        `.trim();
        ACTIVITYTYPE.forEach(activity => {
            str += `
            <div class='radio'><label>
                <input type='radio' name='activity-type-select' value="${activity.type}">
                ${$$.space(2)}${activity.typename}
            </label></div>`.trim();
        });
        str += `
        <div class="alert alert-warning" style="display:none">
            <p>请选择活动类型并完善活动名称！</p>
        </div></div>
        `.trim();
        initSelectActivityPanel.panelBody = str;
    }
    let 
    str =  `
    <div class="design-initActivityZone">
    <div class="panel panel-success">
        <div class="panel-heading"><h3 class="panel-title">
            ${initSelectActivityPanel.map.get(type)}
        </h3></div>
        <div class="panel-body">
            ${initSelectActivityPanel.panelBody}
            <div class='btn-group pull-right'>
                <button class='btn btn-success confirm-${type}'">确定</button>
                <button class='btn btn-default cancel-select'>取消</button>
            </div>
        </div>
    </div>
    </div>`.trim();
    return str;
};

/**
 * 验证活动选择
 * 
 * @param {Object} $this confirm按钮对应的$(this)
 * @returns - false 未通过 - {activityname, type} 通过
 */
export function validateSelectActivity($this){
    let $panelBody = $this.parent().prev(),
        $input = $panelBody.find("input[type='text']"),
        $radios = $panelBody.find("input[type='radio']"),
        $warn = $panelBody.find(".alert"),
        //获取表单内容
        activityname = $input.val(),
        radio = [...$radios].filter(radio => radio.checked),
        type = (!!radio.length) ? radio[0].value : "";

    if(activityname === "" || type === ""){
        $warn.fadeIn("slow").delay(2000).fadeOut("slow");
        return false;
    }else{
        return {
            activityname: activityname, 
            type: type
        };
    }
}

/**
 * 选择活动的事件处理函数
 */
export function selectActivityHandler(){
    let initPanel = function(){
        let $menuBox = $(this).closest(".panel")
            .find(".menu-box");

        $activityZone.find(".menu-box").html("");
        $menuBox.append(initSelectActivityPanel("init"));
    };

    let cancelActivitySelect = function(){
        console.log("cancel");
        $(this).closest(".menu-box").html("");
        return false;
    };

    let confirmActivitySelect = function(){
        console.log("confirm");
        let $this = $(this),
            $zone = $this.closest(".menu-box").parent(),
            //获取对应zone
            zone = getZone(+$zone.data("index"), +$zone.data("parent")),
            //验证选择情况
            info = validateSelectActivity($this);

        if(info){
            zone.addActivity(info, "init");
            $this.next().click();
        }
        return false;
    };

    $$.delegate($activityZone, [
        {
            target: ".init-act",
            event: "click",
            handler: initPanel
        }, 
        {
            target: ".cancel-select",
            event: "click",
            handler: cancelActivitySelect
        }, 
        {
            target: ".confirm-init",
            event: "click",
            handler: confirmActivitySelect
        }
    ]);
};