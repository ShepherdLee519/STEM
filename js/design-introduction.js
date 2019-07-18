/**
 * author: Shepherd.Lee
 * Date: 2019-07-18
 * info: 学习评价的introduction界面相关
 * index:
 *      selectNodeHandler()
 *      resetIntroduction()
 */


$(function(){
    log("hello!! -design-introduction.js");
    selectNodeHandler();
});







function selectNodeHandler(){
    const NAME = "design-taskSelect";
    $(`input[name=${NAME}]`).change(() => {
        let value = $(`input[name=${NAME}]:checked`).val();//获取radio值
        log(value);

        if(typeof value !== "undefined"){
            $("#design-introduction-zone").addClass("hidden");
            $("#design-tasksZone").removeClass("hidden");
            //显示 重选模式 按钮
            $("#design-tasks-resetModal").removeClass("hidden");
            let $div = $("#design-tasksZone div:first-child");
            TASKZONE.taskZoneHandler();//taskZone本身的删除等效果
            INIT.initTaskNodes($div, value);//新建节点
        }
    });
}







function resetIntroduction(){
    //恢复该界面的显示
    _removeClass($("#design-introduction-zone"), "hidden");

    //将原先的选中取消 技术原因，使用原生js
    const NAME = "design-taskSelect";
    let radios = document.getElementsByName(NAME);
    for(let radio of [...radios]){
        radio.checked = false;
    }
}