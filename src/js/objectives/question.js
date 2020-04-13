/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-17 03:26:34 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-29 01:50:29
 */

/*
 * ./js/objectives/question.js
 * 
 * 学习目标 - 问题设计区域的内容控制
 */

import { common as $$ } from '../common/common';
import { STD } from './standard';
import './question-handlers';
import questionData from '../../datas/objectives/question.json';


$$.hello('objectives/question');

/**
 * 对应问题设计区域的存储
 * 
 * @example
 * {
 *   "driverQuestion": "", // 学习驱动问题
 *   "coreQuestion": { // 学科核心问题
 *       "science": [],
 *       "technology": [],
 *       "engineering": [],
 *       "mathematics": []
 *   }
 * }
 * @global
 */
let QUESTION = questionData;
let questionProxy = $$.proxy(QUESTION); // 使用.self在外部修改QUESTION
export { questionProxy as QUESTION };


/**
 * 学科类型的中英文的映射的辅助函数
 * 
 * @example
 * science <=> 科学
 * @param {String} key 
 */
export function questionTypeMap(key) {
    key = key.trim();
    // 仅第一次调用时, 在函数本地存储转换用的字典
    if (typeof questionTypeMap.map !== 'object') {
        const map = new Map();
        const std_ch = ['科学', '技术', '工程', '数学'];
        
        for (let i = 0; i < 4; i++) {
            map
                .set(STD[i], std_ch[i])
                .set(std_ch[i], STD[i]);
        }
        questionTypeMap.map = map;
    }

    // 从函数本地存储的字典中直接获取对应的映射
    return questionTypeMap.map.get(key);
}


/**
 * 获取问题设计的学科核心问题的数据\
 * 在task的节点编辑中添加核心问题时调用
 * 
 * @example
 * [{
 *      value:"S-Q1 XXXX",
 *      type:"science",
 *      typename:"科学"
 *  }, ...]
 * @returns {Array}
 */
export function getCoreQuestions() {
    const $inputs = $('#questionDesign-coreQuestion .showCoreQuestion');
    const questions = [];
    let value, number, dataType;

    [...$inputs].forEach(input => {
        let $input = $(input);
        value = input.value;
        if (value === '') return;
        number = $input.prev().text(); // eg. number = S-Q1
        dataType = $input.data('coretype');

        questions.push({
            value   : number + ' ' + value, 
            type    : dataType,
            typename: questionTypeMap(dataType)
        });
    });

    return questions;
}


/**
 * 保存问题设计区域的数据
 * 
 * @example
 * {
 *   "driverQuestion":"",//学习驱动问题
 *   "coreQuestion":{//学科核心问题
 *       "science":[],
 *       "technology":[],
 *       "engineering":[],
 *       "mathematics":[]
 *   }
 * }
 */
export function saveQuestion() {
    if ( $$.isundef(QUESTION) ) {
        console.error('Please Init QUESTION');
        return;
    }

    const prefix = 'questionDesign';
    // 学科驱动问题数据保存
    $$.store(
        QUESTION, 'driverQuestion',
        $(`#${prefix}-driverQuestion`).val()
    );

    // 学科核心问题数据保存
    STD.forEach(key => {
        let $zone = $(`#${prefix}-coreQuestion-${key}`);
        (QUESTION.coreQuestion)[key] = [];

        [...$zone.find('input.showCoreQuestion')].forEach(input => {
            $$.store(
                QUESTION, ['coreQuestion', key],
                $(input).val()
            );
        });
    });
}