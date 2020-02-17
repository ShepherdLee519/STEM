/**
 * author: Shepherd.Lee
 * Date: 2020/02/03
 * version: 2.0.0
 * info: 学习目标相关
 * index:
 *      - initStandards
 *      - questionHandlers
 * 
 *      - questionAdjust
 *      - questionLiGenerator
 * 
 *      - questionTypeMap
 *      - getCoreQuestions
 */


/**-------------------------- 全局变量 -------------------------- */
/**
 * 对应课程主题区域的存储
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
 * @global
 * @default null
 */
var THEME = null;
/**
 * 对应问题设计区域的存储
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
 * @global
 * @default null
 */
var QUESTION = null;
/**
 * 课程标准数据的全局存储
 * 
 * @example
 * {
 *   "science":[],
 *   "technology":[],
 *   "engineering":[],
 *   "mathematics":[]
 * }
 * @global
 * @default null
 */
var STDDATA = null;


/**-------------------------- 常量 -------------------------- */
/**
 * @constant 课程名数组
 * @default
 * ["science", "technology", "engineering", "mathematics"]
 */
const STD = ["science", "technology", "engineering", "mathematics"];


$(function(){
    _hello("objectives");

    let theme_path      = "./datas/objectives/theme.json",
        question_path   = "./datas/objectives/question.json";
    
    //初始化全局变量THEME与QUESTION的JSON格式
    THEME       = _get(theme_path);
    QUESTION    = _get(question_path);

    initStandards();//初始化课程标准区域
    questionHandlers();//问题设计区域的事件处理函数    
});


/**
 * 初始化课程标准区域的显示内容\
 * 读入的课程标准数据备份在全局STDDATA
 */
function initStandards(){
    /**
     * @example
     * {
     *  "science":[],
     *  "technology":[],
     *  "engineering":[],
     *  "mathematics":[]
     * } 
     */
    let standard_path = "./datas/standard/standard.json";

    _run(function *(){
        let $targets = $("#questionDesign-standards-tbody").children(),
            standardArray = yield _request({url: standard_path}, false);
        STDDATA = standardArray;
        
        for(let i = 0; i < 4; i++){
            let standards = standardArray[ STD[i] ],//某学科的标准数组
                $td = $targets.eq(i).find("td:last"),
                str = standards[0];

            for(let j = 1, len = standards.length; j < len; j++){
                str += "<br />";
                str += standards[j];
            }
            $td.html(str);
        }
    });
}


/**
 * 问题设计区域的事件处理函数
 */
function questionHandlers(){
    $("#questionDesign-coreQuestion")//事件委托中的外围对象
    //.addCoreQuestion-btn - 点击添加新核心问题项
    .delegate(".addCoreQuestion-btn", "click", function(){
        let $addBtn = $(this),
            $div = $addBtn.closest(".questionDesign-coreQuestion-eachQuestion"),
            $list = $div.find(".coreQuestionList"),
            $edit = $div.find(".editCoreQuestion"),

            val = $edit.val(),//该val在loadQuestion时才有
            std_name = $addBtn.data("type");//当前add所对应的学科类型
        
        //添加新核心问题项
        $list.append(questionLiGenerator(std_name, val));
        $edit.val("");

        //调整对应学科的核心问题区域
        questionAdjust(std_name);

        //增加完项后，将滚轮移动到最末端
        _scroll($list, "bottom");

        return false;
    })

    //.deleteCoreQuestion-btn - 删除核心问题项
    .delegate(".deleteCoreQuestion-btn", "click", function(){
        let $this = $(this),
            coreType = $this.data("type"),
            $li = $this.closest(".coreQuestionListItem");
        
        $li.remove();
        questionAdjust(coreType);//删除后调整核心问题区
        
        return false;
    })

    //.toggleCoreQuestion-btn - 收回/展开coreQuestionList
    .delegate(".toggleCoreQuestion-btn", "click", function(){
        let $toggleBtn = $(this),
            $toggle = $toggleBtn.find(".toggleCoreQuestion"),
            $list = $toggleBtn.closest(".questionDesign-coreQuestion-eachQuestion")
                        .find(".coreQuestionList");

        if($toggle.hasClass("glyphicon-chevron-down")){
            $toggle.removeClass("glyphicon-chevron-down")
                .addClass("glyphicon-chevron-up");
            $list.removeClass("hidden");
            _replaceClass($toggleBtn, "btn-primary", "btn-info");
        }else{
            $toggle.removeClass("glyphicon-chevron-up")
                .addClass("glyphicon-chevron-down");
            $list.addClass("hidden");
            _replaceClass($toggleBtn, "btn-info", "btn-primary");
        }
        
        return false;
    });
}


/**
 * 调整核心问题区域的核心问题的：\
 *      1.前部的编号 eg.S-Q2\
 *      2.核心问题列表的收缩/展开 
 * 
 * @param {String} std 学科类型 eg.science 
 */
function questionAdjust(std){
    _inject($(`#questionDesign-coreQuestion-${std}`));
    let $list   = _(".coreQuestionList"),
        len = $list.children().length,
        $toggle = _(".toggleCoreQuestion"),
        $target = null, prefix = null;
    _reject();

    //根据核心问题的数量，控制list的展开/收缩
    //glyphicon-chevron-down:收缩 glyphicon-chevron-up:展开
    if(len == 0 && $toggle.hasClass("glyphicon-chevron-down")) return;
    else if( (len == 0 && $toggle.hasClass("glyphicon-chevron-up")) || 
             (len != 0 && $toggle.hasClass("glyphicon-chevron-down")) ){
        $toggle.parent().click();
    }

    //调整前部显示的核心问题编号 eg.S-Q2
    $list.find("li").each((index, li) => {
        $target = $(li).find(".coreQuestionNumber");
        //prefix: eg.S-Q
        prefix = $target.data("originNumber");
        $target.html(prefix + (index + 1));
    });
}


/**
 * 将传进来的参数组装出一个coreQuestionListItem\
 * 并返回该listitem(<li>)的引用
 * 
 * @param {String} coreType - 核心问题学科类型 eg.science
 * @param {String} val = "" - input value
 * @returns {Object} jQuery对象，用append加入list
 */
function questionLiGenerator(coreType, val = ""){
    if(typeof questionLiGenerator.lis !== "object"){
        let $lis = {};
    
        STD.forEach(type => {
            $lis[type] = $(`
            <li class="list-group-item col-sm-12 coreQuestionListItem">
            <div class="input-group">
                <span class="input-group-addon data-badge-${type} coreQuestionNumber"
                    data-origin-number = "${type[0].toUpperCase()}-Q">
                </span>
                <input type="text" class="form-control showCoreQuestion" 
                    data-coretype="${type}" value="" placeholder="">
                <span class="input-group-btn">
                    <button class="btn btn-danger deleteCoreQuestion-btn" data-type="${type}">
                        <span class="glyphicon glyphicon-minus deleteCoreQuestion"></span>
                    </button>
                </span>
            </div>
            </li>`.trim());
        });
        questionLiGenerator.lis = $lis;
    }
    
    return questionLiGenerator.lis[coreType].clone()
            .find("input").val(val)//当前$li.find("input")
            .end();//.end(), 返回$li
}


/**
 * 学科类型的中英文的映射的辅助函数
 * 
 * @example
 * science <=> 科学
 * @param {String} key 
 */
function questionTypeMap(key){
    key = key.trim();
    if(typeof questionTypeMap.map !== "object"){
        let map = new Map(),
            std_ch = ["科学", "技术", "工程", "数学"];
        
        for(let i = 0; i < 4; i++){
            map
                .set(STD[i], std_ch[i])
                .set(std_ch[i], STD[i]);
        }
        questionTypeMap.map = map;
    }

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
function getCoreQuestions(){
    let $inputs = $("#questionDesign-coreQuestion .showCoreQuestion"),
        questions = [], 
        value, number, dataType;

    [...$inputs].forEach(input => {
        let $input = $(input);
        value = input.value;
        if(value === "") return;
        number = $input.prev().text();//number = S-Q1
        dataType = $input.data("coretype");

        questions.push({
            value   : number + " " + value, 
            type    : dataType,
            typename: questionTypeMap(dataType)
        });
    });

    return questions;
}