/**
 * author: Shepherd.Lee
 * Date: 2019-08-30
 * info: 学习评价的introduction界面相关
 * index:
 *      selectNodeHandler()
 *      resetIntroduction()
 */


$(function(){
    _hello("design-introduction");
    selectNodeHandler();
});



/**
 * 学习评价区域 选择学习模式的处理
 * 包括调用INIT新建学习模式与introduction区域的隐藏等
 * @param {String} type 默认null 一个学习模式的值，手动触发选中效果 eg. dbl
 */
function selectNodeHandler(type = null){
    const NAME = "design-taskSelect";
    if(type != null){
        type = type.toLowerCase();
        select(type);
        return;
    }

    $(`input[name=${NAME}]`).change(() => {
        let value = $(`input[name=${NAME}]:checked`).val();//获取radio值
        log(`Select-value:${value}`);

        if(typeof value !== "undefined"){
            select(value);
        }
    });

    function select(value){
        $("#design-introduction-zone").addClass("hidden");
        $("#design-tasksZone").removeClass("hidden");
        //显示 重选模式 按钮
        $("#design-tasks-resetModal").removeClass("hidden");
        let $div = $("#design-tasksZone div:first-child");
        toggleTrigger("on");
        TASKZONE.taskZoneHandler();//taskZone本身的删除等效果
        INIT.initTaskNodes($div, value);//新建节点
    }
}



function resetIntroduction(){
    //恢复该界面的显示
    _removeClass($("#design-introduction-zone"), "hidden");
    toggleTrigger("off");

    //将原先的选中取消 技术原因，使用原生js
    const NAME = "design-taskSelect";
    let radios = document.getElementsByName(NAME);
    for(let radio of [...radios]){
        radio.checked = false;
    }
}