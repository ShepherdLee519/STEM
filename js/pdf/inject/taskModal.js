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