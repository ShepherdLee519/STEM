/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-23 03:37:24 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:05:30
 */

import { common as $$ } from "../../common/common";
import { STD, THEME } from "../../objectives/objectives";


/**
 * 将数据从THEME中取出 注入preview中的#coverZone
 */
export default function injectPreviewCover(){
    $$.inject($("#coverZone"));
    //STD中是四个学科，见design-objectives.js
    STD.forEach(std => {
        $$.html(
            THEME,
            ["people", std],
            $$._(`#cover-people-${std}`)
        );
    });
    $$.reject();
}