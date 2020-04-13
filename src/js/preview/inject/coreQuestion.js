/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-23 03:57:31 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:05:20
 */

import { common as $$ } from "../../common/common";
import { STDDATA, STD, QUESTION } from "../../objectives/objectives";


/**
 * 将数据从QUESTION中取出 注入preview中的#coreQuestionZone
 */
export default function injectPreviewCoreQuestion(){
    $$.inject($("#coreQuestionZone"));

    //STD见desing-objectives.js
    STD.forEach((std) => {
        let str = "";
        STDDATA[std].forEach(standard => {
            str += `<li>${standard}</li>`
        });
        $$._(`.coreQuestion-standard-${std}`).html(str);

        str = "";
        let std_suffix = std.substring(0,1).toUpperCase() + "-Q";
        if($$.isundef(QUESTION) || $$.isundef(QUESTION["coreQuestion"])) return;
        QUESTION["coreQuestion"][std].forEach((question, index) => {
            str += `
            <li><span class="coreQuestion-number">${std_suffix + (index+1)}</span>
                    <span class="coreQuestion-content">${question}</span></li>
            `.trim();
        });
        $$._(`.coreQuestion-question-${std}`).html(str);
    });

    $$.reject();
}