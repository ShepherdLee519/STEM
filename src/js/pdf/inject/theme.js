/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-23 03:40:33 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:05:41
 */

import { common as $$ } from "../../common/common";
import { THEME, QUESTION } from "../../objectives/objectives";


/**
 * 将数据从THEME/QUESTION中取出\
 * 注入preview中的#themeZone
 */
export default function injectPreviewTheme(){
    $$.inject($("#themeZone"));

    let grades = ["", "小学一年级", "小学二年级", "小学三年级",
        "小学四年级", "小学五年级", "小学六年级"];
    $$._("#theme-grade").html(grades[+THEME.grade]);

    $$.map($$.html, 
        [
            THEME,
            "themeName",
            $$._("#theme-name")
        ],
        [
            THEME,
            "themeSituation",
            $$._("#theme-situation")
        ],
        [
            QUESTION,
            "driverQuestion",
            $$._("#theme-question")
        ]
    );
    
    $$.reject();
}