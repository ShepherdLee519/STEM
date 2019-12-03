/**
 * author: Shepherd.Lee
 * Date: 2019-09-21
 * info: 从DATA中加载数据到#preview-container中的#taskModalZone
 *      
 */

$(function(){
    // _hello("inject-taskModal");
});


/**
 * 将数据从DATA中取出 注入preview中的#taskModalZone
 */
function injectPreviewTaskModal(){
    log("    No.04 taskModal");

    _inject($("#taskModalZone"));
    
    if(_isundef(DATA) || _isundef(DATA.tasktype)) return;
    let type = DATA.tasktype, typename;
    //TASKTYPE在design.js中
    for(let tasktype of TASKTYPE){
        if(tasktype.task === type.toLowerCase()){
            typename = tasktype.name;
            break;
        }
    }
    _("#taskModal-name").html(typename);

    let str = ""
    for(let node of DATA.nodes){
        str += `
        <li>
            <img class="img-responsive taskModal-image" src="image/nodes/${type}/${node.imgsrc}">
            <label class="taskModal-nodename">${node.nodename}</label>
        </li>`.trim();
    }
    _("#taskModal-gallery").html(str);

    _reject();
}



/**
 * 返回节点，用于加入子节点区域的模式类型
 * @param {String} type 
 * @param {Array<Object>} nodes
 */
function injectPreviewSubTaskModal(type, nodes){
    let $subTaskModal = $("#subTaskModalZone").clone()
        .removeAttr("id").removeClass("hidden"),
        $backup_inject = _();
    
    _inject($subTaskModal);
    
    let typename;
    //TASKTYPE在design.js中
    for(let tasktype of TASKTYPE){
        if(tasktype.task === type.toLowerCase()){
            typename = tasktype.name;
            break;
        }
    }
    _(".subTaskModal-name").html(typename);

    let str = ""
    for(let node of nodes){
        str += `
        <li>
            <img class="img-responsive subTaskModal-image" src="image/nodes/${type}/${node.imgsrc}">
            <label class="subTaskModal-nodename">${node.nodename}</label>
        </li>`.trim();
    }
    _(".subTaskModal-gallery").html(str);

    _reject();
    _inject($backup_inject);
    return $subTaskModal;
}