/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 03:25:49 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-25 04:08:23
 */

// import { ZONE } from "../../design";
import { ACTIVITYZONE } from "../class/activityzones";

let $activityZone     = $("#design-activities-zone"),
    $activityEditZone = $("#design-editActivityZone");

export { $activityZone, $activityEditZone };

export const editInfo = {
    nownode: null,
    nowtype: null,
    editzone: null
};

/**
 * 根据index与parentIndex从ZONE中获取对应zone对象返回
 * 
 * @param {Number} index 
 * @param {Number} parentIndex = -1
 */
export function getZone(index, parentIndex = -1){
    return (!~parentIndex) ?
        ACTIVITYZONE.zones[index] :
        ACTIVITYZONE.zones[ACTIVITYZONE.len][parentIndex][index];
}