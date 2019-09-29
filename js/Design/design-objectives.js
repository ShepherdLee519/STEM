/**
 * author: Shepherd.Lee
 * Date: 2019-09-25
 * version: 2.0.0
 * info: 学习目标相关
 * index:
 *      initStandards()
 *      standardsHandlers()
 * 
 *      questionsHandlers()
 *      questionsAdjust()
 *      questionsNumberAdjust()
 *      CoreQuestionLiGenerator()
 * 
 *      getCoreQuestions()
 *      coreQuestionTypeMap()
 * 
 *      saveTheme()
 *      saveQuestion()
 */

/**
 * 对应课程主题区域的存储
 * @global
 */
var THEME = null;
/**
 * 对应问题设计区域的存储
 * @global
 */
var QUESTION = null;
/**
 * 对应课程标准内容的全局存储
 * @global
 */
var stdData = null;


const STANDARD_PATH = "./datas/standard/standard.json";
const STD = ["science", "technology", "engineering", "mathematics"];


$(function(){
    _hello("design-objectives");

    let path_theme      = "./datas/objectives/theme.json",
        path_question   = "./datas/objectives/question.json";
    
    THEME       = _get(path_theme);
    QUESTION    = _get(path_question);

    initStandards();//初始化课程标准区域
    questionsHandlers();//问题设计区域的事件处理函数
});


/**
 * 初始化课程标准区域的textarea内容
 */
function initStandards(){
    stdData = _get(STANDARD_PATH);
    const prefix = "questionDesign-courseStandard";
    let value = "";

    STD.forEach((type) => {
        value = "";
        stdData[type].forEach((std) => value += std + "\n\n");
        $(`#${prefix}-${type}`).val(value);
    });
    standardsHandlers();
}



/**
 * 1. 点击课程标准 收缩标准显示的form
 * 2. 点击每个课程标准前的学科名，放大/还原textarea的大小
 */
function standardsHandlers(){
    const prefix = "questionDesign-courseStandard";

    // 1. 点击课程标准 收缩标准显示的form
    let $legend     = $(`#${prefix} fieldset legend`),
        $label      = $legend.find("label"),
        $fromGroups = $(`#${prefix} fieldset`).children(".form-group");
    $legend.click(function(){
        $label.toggle();
        $fromGroups.toggleClass("hidden");
    });

    // 2. 点击每个课程标准前的学科名，放大/还原textarea的大小
    const DEFAULT_ROWS = 2;
    STD.forEach((type) => {
        $(`label[for=${prefix + "-" + type}]`).click(function(){
            $(this).attr("title", "点击以放大/收缩文本框来显示课程标准");
            let $textarea = $(this).next().find("textarea"),
                rows = $textarea.attr("rows"),
                newrows = (rows > DEFAULT_ROWS)?DEFAULT_ROWS:10;
            $textarea.attr("rows", newrows);
        });
        $(`#${prefix}-${type}`).click(function(){
            let rows = $(this).attr("rows"),
                newrows = (rows > DEFAULT_ROWS)?DEFAULT_ROWS:10;
            $(this).attr("rows", newrows);
        });
    })
}




/**
 * 问题设计区域的事件处理函数 - 新
 */
function questionsHandlers(){
    STD.forEach((std_name, index) => {
        _inject($(`#questionDesign-coreQuestion-${std_name}`));
        let $toggle = _(".toggleCoreQuestion"),
            $edit   = _(".editCoreQuestion"),
            $add    = _(".addCoreQuestion"),
            $list   = _(".coreQuestionList"),
            $toggleBtn  = $toggle.parent(),
            $addBtn     = $add.parent();
        _reject();

        $addBtn.click(() => {
            let val = $edit.val();

            $list.append(CoreQuestionLiGenerator(std_name, val));
            $edit.val("");
            questionsNumberAdjust(std_name);

            if($list.children().length == 1){
                questionsAdjust(std_name, 1);
            }else{
                questionsAdjust(std_name);
            }

            //增加完后，将滚轮移动到最末端
            let scrollHeight = $list.prop("scrollHeight");
            $list.animate({scrollTop:scrollHeight}, 400);
        });

        $toggleBtn.click(() => {
            if($toggle.hasClass("glyphicon-chevron-down")){
                $toggle.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
                $list.removeClass("hidden");
                _replaceClass($toggleBtn, "btn-primary", "btn-info");
            }else{
                $toggle.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
                $list.addClass("hidden");
                _replaceClass($toggleBtn, "btn-info", "btn-primary");
            }
        });
    });
}




/**
 * 调整核心问题区域的 核心问题数目
 * 调整coreQuestionList的显示与否：
 * @param {String} std - science
 * @param {Number} flag - 1显示、0隐藏、-1默认
 */
function questionsAdjust(std, flag = -1){
    _inject($(`#questionDesign-coreQuestion-${std}`));
    let $edit   = _(".editCoreQuestion"),
        $toggle = _(".toggleCoreQuestion"),
        $list   = _(".coreQuestionList"),
        len     = $list.children().length;
    
    $edit.attr("placeholder", `当前核心问题数：${len}`);
    _reject();

    if(flag == 1){
        if($toggle.hasClass("glyphicon-chevron-down")){
            $toggle.parent().click();
        }
    }else if(flag == 0 || len == 0){
        if($toggle.hasClass("glyphicon-chevron-up")){
            $toggle.parent().click();
        }
    } 

}






/**
 * 调整核心问题区域的 核心问题前的number值
 * @param {String} std - science
 */
function questionsNumberAdjust(std){
    _inject($(`#questionDesign-coreQuestion-${std}`));
    let $list   = _(".coreQuestionList"),
        $target = null, number = null;
    
    [...$list.find("li")].forEach((li, index) => {
        $target = $(li).find(".coreQuestionNumber");
        number = $target.attr("data-originNumber");
        $target.html(number + (index + 1));
    });
    _reject();

}




/**
 * 将传进来的参数组装出一个coreQuestionListItem
 * 并就一些事件进行封装处理
 * 并返回该listitem(<li>)的引用
 * @param {String} coreType - science
 * @param {String} val - input value
 * @returns {Object}
 */
function CoreQuestionLiGenerator(coreType, val = ""){
    let $li = $(`
    <li class="list-group-item col-sm-12 coreQuestionListItem">
    <div class="input-group">
        <span class="input-group-addon data-badge-${coreType} coreQuestionNumber"
            data-originNumber = "${coreType[0].toUpperCase()}-Q">
        </span>
        <input type="text" class="form-control showCoreQuestion" 
            data-coretype="${coreType}" placeholder="">
        <span class="input-group-btn">
            <button class="btn btn-danger">
                <span class="glyphicon glyphicon-minus deleteCoreQuestion"></span>
            </button>
        </span>
    </div>
    </li>`.trim()),

    $show       = $li.find(".showCoreQuestion").eq(0),
    $delete     = $li.find(".deleteCoreQuestion").eq(0),
    $deleteBtn  = $delete.parent();

    $show.val(val);
    $deleteBtn.click(() => {
        $li.remove(); 
        questionsAdjust(coreType);
        questionsNumberAdjust(coreType);
    });

    return $li;
}





/**
 * 获取问题设计的学科核心问题的数据
 * @param {Object} selectedCQ
 * @returns {Array}
 */
function getCoreQuestions(selectedCQ = null){
    const id = 'questionDesign-coreQuestion';
    let questions = [], value, dataType;

    if(selectedCQ != null){
        let selectedContent = [];
        for(let CQ of selectedCQ){
            selectedContent.push(CQ.content);
        }
        [...$(`#${id} div.${id}-eachQuestion`)].forEach((div) => {
            [...$(div).find("input.showCoreQuestion")].forEach((input) => {
                value = $(input).prev().text() + " " + $(input).val();
                let flag = (selectedContent.indexOf(value) >= 0);
                if(value !== ""){
                    dataType = $(input).attr("data-coretype");
                    questions.push({
                        value   : value, 
                        type    : dataType,
                        typename: coreQuestionTypeMap(dataType),
                        flag    : flag
                    });
                }
            })
        });
    }else{
        [...$(`#${id} div.${id}-eachQuestion`)].forEach((div) => {
            [...$(div).find("input.showCoreQuestion")].forEach((input) => {
                value = $(input).prev().text() + " " + $(input).val();
                if(value !== ""){
                    dataType = $(input).attr("data-coretype");
                    questions.push({
                        value   : value, 
                        type    : dataType,
                        typename: coreQuestionTypeMap(dataType)
                    });
                }
            })
        });
    }
    return questions;
}



/**
 * 学科类型的中英文的映射
 * @param {String} key 
 */
function coreQuestionTypeMap(key){
    let typeMap = {
        "science":"科学", "technology":"技术",
        "engineering":"工程", "mathematics":"数学"
    };

    for(let [k, v] of Object.entries(typeMap)){
        if(k === key) return v;
        else if(v === key) return k;
    }
}




/**
 * 保存课程主题区域的数据
 */
function saveTheme(){
    if(_isundef(THEME)){
        log("Please Init THEME");
        return;
    }

    const prefix = "courseTheme";
    ["themeName", "themeSituation"].forEach((key) => {
        _store(
            THEME, key,
            $(`#${prefix}-${key}`).val()
        );
    });
    STD.forEach((key) => {
        _store(
            THEME, ["people", key],
            $(`#${prefix}-people-${key}`).val()
        );
    });
    _store(
        THEME, "grade",
        $(`#${prefix}-grade option:selected`).val()
    );

    $.post("./db/data_save.php", {data:THEME, zone:"theme"}, (res) => {
        if(res) log("save theme successfully");
        else err("save theme failed");
    });
}



/**
 * 保存问题设计区域的数据
 */
function saveQuestion(){
    if(_isundef(QUESTION)){
        log("Please Init QUESTION");
        return;
    }

    const prefix = "questionDesign";
    _store(
        QUESTION, "driverQuestion",
        $(`#${prefix}-driverQuestion`).val()
    );
    STD.forEach((key) => {
        let $zone = $(`#${prefix}-coreQuestion-${key}`);
        (QUESTION.coreQuestion)[key] = [];
        [...$zone.find("input.showCoreQuestion")].forEach((input) => {
            _store(
                QUESTION, ["coreQuestion", key],
                $(input).val()
            );
        });
    });

    $.post("./db/data_save.php", {data:QUESTION, zone:"question"}, (res) => {
        if(res) log("save question successfully");
        else err("save question failed");
    });
}