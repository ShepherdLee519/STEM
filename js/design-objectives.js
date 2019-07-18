/**
 * author: Shepherd.Lee
 * Date: 2019-07-17
 * info: 学习目标相关
 * index:
 *      initStandards()
 *      standardsHandlers()
 *      editCourseTheme()
 *      questionsHandlers()
 */

const STANDARD_PATH = "datas/standard/standard.json",
    STD = ["science", "technology", "engineering", "mathematics"];

$(function(){
    log("hello!! -design-objectives.js");
    initStandards();
    questionsHandlers();
});

function initStandards(){
    // 初始化课程标准区域的textarea内容
    _async();
    let stdData;
    $.get(STANDARD_PATH, (data) => stdData = data);
    _async();
    const prefix = "questionDesign-courseStandard";
    let value = "";
    STD.forEach((type) => {
        value = "";
        stdData[type].forEach((std) => value += std + "\n\n");
        $(`#${prefix}-${type}`).val(value);
    });
    standardsHandlers();
}







function standardsHandlers(){
    const prefix = "questionDesign-courseStandard";
    // 1. 点击课程标准 收缩标准显示的form
    let $legend = $(`#${prefix} fieldset legend`),
        $label = $legend.find("label"),
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






function editCourseTheme(){
    //courseTheme表单的模态框提交事件处理函数
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






function questionsHandlers(){
    const prefix = "questionDesign-coreQuestion";
    let template = `
        <div class="newCoreQuestion">
            <input type="text" class="form-control" placeholder="请对任务内容进行大致描述"><br />
            <span class="glyphicon glyphicon-minus deleteCoreQuestion">
        </div>
    `.trim();
    $(`#${prefix} .addCoreQuestion`).click(function(){
        // alert($(this).parent().prev().html()); //科学:
        let $this = $(this), $newnode = $(template),
            nodenumber = [...$this.parent().find("input")].length;
        $newnode.find(".deleteCoreQuestion").css("top", `${5+nodenumber*55}px`);
        $newnode.find(".deleteCoreQuestion").click(function(){
            let $self = $(this).parent(),
                $parent = $self.parent();
            $self.remove();
            adjustSpan($parent);
        });
        $this.before($newnode);
    });

    function adjustSpan($parent){
        //删除某一新建的核心问题节点后，对节点的-号的高度进行重新的调整
        [...$parent.find(".newCoreQuestion")].forEach((node, index) => {
            $(node).find(".deleteCoreQuestion").css("top", `${5+(index+1)*55}px`);
        });
    }
}