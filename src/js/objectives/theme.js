/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-17 03:25:38 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-28 15:51:27
 */

/*
 * ./js/objectives/theme.js
 * 
 * 学习目标 - 课程主题区域的相关内容
 */

import { common as $$ } from '../common/common';
import { STD } from './standard';
import themeData from '../../datas/objectives/theme.json';


$$.hello('objectives/theme');

/**
 * 对应课程主题区域的存储
 * 
 * @example
 * {
 *   "themeName": "", // 主题名称
 *   "themeSituation": "", // 学习情境
 *   "people": {
 *       "science": "",
 *       "technology": "",
 *       "engineering": "",
 *       "mathematics": ""
 *   },
 *   "grade": "" // eg. 3
 *}
 * @global
 */
let THEME = themeData;
let themeProxy = $$.proxy(THEME); // 使用.self在外部修改THEME
export { themeProxy as THEME };


/**
 * 保存课程主题区域的数据
 * 
 * @example
 * {
 *   "themeName": "", // 主题名称
 *   "themeSituation": "", // 学习情境
 *   "people": {
 *       "science": "",
 *       "technology": "",
 *       "engineering": "",
 *       "mathematics": ""
 *   },
 *   "grade": "" // eg. 3
 *}
 */
export function saveTheme(){
    if ( $$.isundef(THEME) ) {
        console.error('Please Init THEME');
        return;
    }

    const prefix = 'courseTheme';
    ['themeName', 'themeSituation'].forEach(key => {
        $$.store(
            THEME, key,
            $(`#${prefix}-${key}`).val()
        );
    });
    STD.forEach(key => {
        $$.store(
            THEME, ['people', key],
            $(`#${prefix}-people-${key}`).val()
        );
    });
    $$.store(
        THEME, 'grade',
        $(`#${prefix}-grade option:selected`).val()
    );
}