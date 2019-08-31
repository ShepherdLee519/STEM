/**
 * author: Shepherd.Lee
 * Date: 2019-08-29
 * version: 2.0.0
 * info: 学习目标相关
 * index:
 *      initStandards()
 *      standardsHandlers()
 * 
 *      editCourseTheme()
 * 
 *      questionsHandlers()
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
    let stdData = _get(STANDARD_PATH);
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
    })
}



/**
 * courseTheme表单的模态框提交事件处理函数
 */
function editCourseTheme(){
    const prefix = "courseTheme";
    let targets = [
        "themeName", "themeSituation",
        "people-science", "people-technology",
        "people-engineering", "people-mathematics",
        "grade"
    ],//目标节点的id名 要加上prefix-
    $value;

    targets.forEach((target) => {
        $value = $(`#${prefix}-${target}`).val();
        $(`#${prefix}-${target}-view`).val($value);//view - value
    });
    //修改了提交事件，最后要手动再关闭模态框
    $("#editCourseTheme").modal("hide");
}



/**
 * 问题设计区域的事件处理函数
 */
function questionsHandlers(){
    const prefix = "questionDesign-coreQuestion";
    let template = `
    <div class="newCoreQuestion">
        <input type="text" class="form-control" placeholder="请对任务内容进行大致描述"><br />
        <span class="glyphicon glyphicon-minus deleteCoreQuestion">
    </div>
    `.trim();

    $(`#${prefix} .addCoreQuestion`).click(function(){
        let $this = $(this), $newnode = $(template),
            coreType = $this.parent().find("input:first-child").attr("data-coretype"),
            nodenumber = [...$this.parent().find("input")].length;
        $newnode.find("input").eq(0).attr("data-coretype", coreType);
        $newnode.find(".deleteCoreQuestion").css("top", `${5+nodenumber*55}px`);
        $newnode.find(".deleteCoreQuestion").click(function(){
            let $self = $(this).parent(),
                $parent = $self.parent();
            $self.remove();
            adjustSpan($parent);
        });
        $this.before($newnode);
        return false;
    });

    function adjustSpan($parent){
        //删除某一新建的核心问题节点后，对节点的-号的高度进行重新的调整
        [...$parent.find(".newCoreQuestion")].forEach((node, index) => {
            $(node).find(".deleteCoreQuestion").css("top", `${5+(index+1)*55}px`);
        });
    }
}



/**
 * 获取问题设计的学科核心问题的数据
 * @returns {Array}
 */
function getCoreQuestions(){
    const id = 'questionDesign-coreQuestion';
    let questions = [], value, dataType;

    [...$(`#${id} div.${id}-eachQuestion`)].forEach((div) => {
        [...$(div).find("input")].forEach((input) => {
            value = $(input).val();
            if(value !== ""){
                dataType = $(input).attr("data-coretype");
                questions.push({
                    value   : value, 
                    type    : dataType,
                    typename: coreQuestionTypeMap(dataType)
                });
            }
        })
    })
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
        [...$zone.find("input")].forEach((input) => {
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