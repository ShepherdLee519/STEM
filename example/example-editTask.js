// 点击编辑按钮
$("#design-taskEditBtn").click(() => {
    $edit.find("input").removeAttr("readonly");
    $edit.find("textarea").removeAttr("readonly");
    flag = true;
    return false;
});

// 点击确认按钮
$("#design-confirmTaskEditBtn").click(() => {
    if(!flag){
        $edit.find(".panel-title span").click();
        return;
    }else{
        //保存编辑的内容
        let taskname = $("#taskname").val(), 
            taskcontent = $("#taskcontent").val(),
            node = nodeInfo.node,  level = node.level, 
            index = nodeInfo.index, parentIndex = nodeInfo.parentIndex;

        log(`level: ${level}, index: ${index}, parent: ${parentIndex}`);
        if(Number.parseInt(level) == 1){
            DATA.nodes[index].taskname = taskname;
            DATA.nodes[index].taskcontent = taskcontent;
        }else{
            node.taskname = taskname;
            node.taskcontent = taskcontent;
            DATA.nodes[parentIndex].next.nodes[index] = node;
        }
        $edit.find("input").attr("readonly", "readonly");
        $edit.find("textarea").attr("readonly", "readonly");
        flag = false;
        return false;
    }
});
