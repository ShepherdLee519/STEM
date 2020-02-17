/**
 * author: Shepherd.Lee
 * Date: 2020/01/23
 * version: 2.0.0
 * info: 学习目标区域的数据保存函数
 * index:
 *      - saveTheme
 *      - saveQuestion
 */


$(function(){
    _hello("objectives-save");
});


/**
 * 保存课程主题区域的数据
 * 
 * @example
 * {
 *   "themeName":"",//主题名称
 *   "themeSituation":"",//学习情境
 *   "people":{
 *       "science":"",
 *       "technology":"",
 *       "engineering":"",
 *       "mathematics":""
 *   },
 *   "grade":""//eg. 3
 *}
 */
function saveTheme(){
    if(_isundef(THEME)){
        err("Please Init THEME");
        return;
    }

    const prefix = "courseTheme";
    ["themeName", "themeSituation"].forEach(key => {
        _store(
            THEME, key,
            $(`#${prefix}-${key}`).val()
        );
    });
    STD.forEach(key => {
        _store(
            THEME, ["people", key],
            $(`#${prefix}-people-${key}`).val()
        );
    });
    _store(
        THEME, "grade",
        $(`#${prefix}-grade option:selected`).val()
    );
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
function saveQuestion(){
    if(_isundef(QUESTION)){
        err("Please Init QUESTION");
        return;
    }

    const prefix = "questionDesign";
    _store(
        QUESTION, "driverQuestion",
        $(`#${prefix}-driverQuestion`).val()
    );

    STD.forEach(key => {
        let $zone = $(`#${prefix}-coreQuestion-${key}`);
        (QUESTION.coreQuestion)[key] = [];

        [...$zone.find("input.showCoreQuestion")].forEach(input => {
            _store(
                QUESTION, ["coreQuestion", key],
                $(input).val()
            );
        });
    });
}