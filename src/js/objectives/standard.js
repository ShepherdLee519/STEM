/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-17 03:26:34 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-04-15 02:40:11
 */

/*
 * ./js/objectives/standard.js
 * 
 * 学习目标 - 问题设计中的课程标准的相关内容
 */

import { common as $$ } from '../common/common';
import stdData from '../../datas/standard/standard.json';


$$.hello('objectives/standard');

/**
 * 课程标准数据的全局存储
 * 
 * @example
 * {
 *   "science": [],
 *   "technology": [],
 *   "engineering": [],
 *   "mathematics": []
 * }
 * @global
 * @default null
 */
export let STDDATA = stdData;
/**
 * @constant 课程名数组
 * @default
 * ['science', 'technology', 'engineering', 'mathematics']
 */
export const STD = [
    'science', 'technology', 'engineering', 'mathematics'
];


/**
 * 初始化课程标准区域的显示内容\
 * IIFE
 */
;(function initStandards(){
    /**
     * @example
     * {
     *  "science": [],
     *  "technology": [],
     *  "engineering": [],
     *  "mathematics": []
     * } 
     */
    const $targets = $('#questionDesign-standards-tbody').children();
    
    for (let i = 0; i < 4; i++) {
        let standards = STDDATA[ STD[i] ], // 某学科的标准数组
            $td = $targets.eq(i).find('td:last'),
            str = standards[0];

        for (let j = 1, len = standards.length; j < len; j++) {
            str += '<br />';
            str += standards[j];
        }
        $td.html(str);
    }
})();