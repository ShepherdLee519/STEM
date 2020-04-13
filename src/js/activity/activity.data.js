/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-21 03:58:02 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-22 04:44:41
 */

import pairData from "../../datas/activity/pair.json";
import pyramidData from "../../datas/activity/pyramid.json";
import jigsawData from "../../datas/activity/jigsaw.json";
import roleplayData from "../../datas/activity/roleplay.json";
import gameData from "../../datas/activity/game.json";
import expData from "../../datas/activity/exp.json";

export const activityDataMap = new Map()
    .set("pair", pairData)
    .set("pyramid", pyramidData)
    .set("jigsaw", jigsawData)
    .set("roleplay", roleplayData)
    .set("game", gameData)
    .set("exp", expData);

export const ACTIVITYTYPE = [
    {type: "pair"   , typename: "思考-配对-共享"},
    {type: "pyramid", typename: "金字塔"},
    {type: "jigsaw",  typename: "拼图策略"},
    {type: "roleplay",typename: "角色扮演"},
    {type: "game",    typename: "游戏教学"},
    {type: "exp",     typename: "实验教学"}
];

/**
 * @constant
 * 对应datas/activity/下的不同学习活动的json格式的键名
 */
const ACTIVITYKEYS = {
    "pair": [
        ["name"],
        ["student", ["think", "pair", "share"]],
        ["teacher", ["think", "pair", "share"]],
    ],
    "pyramid": [
        ["name"], ["question"],
        ["floor", ["top", "middle", "bottom"]],
    ],
    "jigsaw": [
        ["name"],
        ["expert", ["task", "student", "teacher"]],
        ["former", ["task", "student", "teacher"]],
    ],
    "roleplay": [
        ["name"], ["setting"], 
        ["student", ["describe", "show", "evaluate"]],
        ["teacher", ["describe", "show", "evaluate"]],
    ],
    "game": [
        ["name"], ["rule"], ["place"], 
        ["student"], ["teacher"], ["reward"],
    ],
    "exp": [
        ["name"], ["step"], 
        ["student"], ["teacher"], ["environment"],
    ],
};

/**
 * 将缩略的键名数组展开
 * 
 * @example
 * input: pyramid
 * [
 *      ["name"], ["question"],
 *      ["floor", ["top", "middle", "bottom"]],
 * ]
 * output:
 * [
 *      ["activity", "name"],
 *      ["activity", "question"],
 *      ["activity", "floor", "top"],
 *      ["activity", "floor", "middle"],
 *      ["activity", "floor", "bottom"],
 * ]
 * @param {Array} keys 
 */
function expand(keys){
    let arr = [];
    for(let row of keys){
        row = ["activity", ...row];
        let last = row.length - 1,
            lastElem = row[last];
        if(!Array.isArray(lastElem)) arr.push(row);
        else{
            let _row = row.slice(0, last);
            lastElem.forEach(elem => 
                arr.push([..._row, elem]));
        }
    }
    return arr;
}

const ACTIVITYKEYS_proxy = new Proxy(ACTIVITYKEYS, {
    get(target, key){
        return expand(target[key]);
    }
})

export { ACTIVITYKEYS_proxy as ACTIVITYKEYS };