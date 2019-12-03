/**
 * author: Shepherd.Lee
 * Date: 2019-09-26
 * info: 从DATA中加载数据到#preview-container中的#courseZone
 *      
 */

$(function(){
    // _hello("inject-course");
});


/**
 * 将数据从DATA中取出 注入preview中的#courseZone
 */
function injectPreviewCourse(){
    log("    No.05 course");

    _inject($("#courseZone"));
    let $template = _("#course-task-template"),
        $courseZone = _();//#courseZone
    _reject();

    $courseZone.find(".task").remove();
    $courseZone.append($template);

    let number_map = ["一","二","三","四","五","六","七","八","九"];
    DATA.nodes.forEach((node, index) => {
        // log(node);
        let $task = $template.clone().removeAttr("id").removeClass("hidden");
        _inject($task);
        _(".task-nodename").html(`任务${number_map[index]}:${node.nodename}————`);
        _(".task-taskname").html(node.taskname);
        _(".task-content").html(node.taskcontent);
        
        //学科核心问题组装
        let str = "";
        if(_exist(node, "taskcorequestion")){
            node.taskcorequestion.forEach(coreQuestion => {
                str += `
                <li>${coreQuestion.content}</li>`.trim();
            });
        }
        _(".task-coreQuestion").html(str);
        
        
        //学习证据组装
        str = "";
        if(_exist(node, "taskevidence")){
            [...node.taskevidence].forEach(evidence => {
                str += `
                <tr>
                    <td class="task-evidence-content">${evidence.content}</td>
                    <td class="task-evidence-coreQuestion">${evidence.corequestion}</td>
                    <td class="task-evidence-evaluate">${evidence.evaluate}</td>
                </tr>`.trim();
            });
        }
        //如果是空的，将学习证据区域显示一个"无"
        _(".task-evidence").html(str);
        if(str === ""){
            let $evidenceWrapper = _(".task-evidence").ancestor(2);
            _(".task-evidence").parent().remove();
            $evidenceWrapper.append("<p>无</p>");
        }

        //活动设计组装
        str = "";
        let activities = getActivity().prime[index].activities;
        if(activities !== "" && !_isundef(activities)){
            _(".task-info-hasActivity").removeClass("hidden");
            let activitiesLen = activities.length;
            activities.forEach((activity, number) => {
                str += `
                <li>
                    <img class="img-responsive taskActivity-image" 
                        src="image/activities/${activity.type}-icon.png"
                        title="${activity.typename}">
                    <p>
                    <label class="taskActivity-nodenumber">活动${number+1}</label>
                    <label class="taskActivity-nodename">${activity.activity.name}</label></p>
                </li>`.trim();
                if(number < activitiesLen - 1){
                    str += `
                    <li class="arrow-li">
                        <img class="img-responsive arrow-image"
                            src="image/else/arrow.png">
                    </li>`.trim();
                }
                let $activity_content = injectPreviewCourseActivity(activity.type, activity, number+1);
                if($activity_content !== null){
                    _(".activity-wrapper").append($activity_content);
                }
            });
        }
        _(".task-activity").html(str);

        //处理子节点
        let subNodes =  DATA.nodes[index].next;
        if(subNodes !== ""){
            _(".task-info-hasSubNode").removeClass("hidden");
            _(".subnode-wrapper").append(injectPreviewSubTaskModal(subNodes.tasktype, subNodes.nodes));
            injectPreviewSubCourse(subNodes.nodes, _(".subnode-wrapper"), index);
        }

        _reject();
        $courseZone.append($task);
    });
}





/**
 * 将子节点数据 注入preview中的node的.subnode-wrapper 即$zone
 * @param {Array<Object>} nodes
 * @param {Object} $zone
 * @param {Number} parentIndex
 */
function injectPreviewSubCourse(nodes, $zone, parentIndex){
    let $inject = _();

    _inject($("#courseZone"));
    let $template = _("#course-task-template");
    _reject();

    let number_map = ["一","二","三","四","五","六","七","八","九"];
    nodes.forEach((node, index) => {
        let $task = $template.clone().removeAttr("id").removeClass("hidden");
        _inject($task);
        _(".task-nodename").html(`任务${number_map[index]}:${node.nodename}————`);
        _(".task-taskname").html(node.taskname);
        _(".task-content").html(node.taskcontent);
        
        //学科核心问题组装
        let str = "";
        if(_exist(node, "taskcorequestion")){
            node.taskcorequestion.forEach(coreQuestion => {
                str += `
                <li>${coreQuestion.content}</li>`.trim();
            });
        }
        _(".task-coreQuestion").html(str);
        
        //学习证据组装
        str = "";
        if(_exist(node, "taskevidence")){
            [...node.taskevidence].forEach(evidence => {
                str += `
                <tr>
                    <td class="task-evidence-content">${evidence.content}</td>
                    <td class="task-evidence-coreQuestion">${evidence.corequestion}</td>
                    <td class="task-evidence-evaluate">${evidence.evaluate}</td>
                </tr>`.trim();
            });
        }
        //如果是空的，将学习证据区域显示一个"无"
        _(".task-evidence").html(str);
        if(str === ""){
            let $evidenceWrapper = _(".task-evidence").ancestor(2);
            _(".task-evidence").parent().remove();
            $evidenceWrapper.append("<p>无</p>");
        }

        //活动设计组装
        str = "";
        let activities = getActivity().sub[parentIndex].nodes[index].activities;
        if(activities !== "" && !_isundef(activities)){
            _(".task-info-hasActivity").removeClass("hidden");
            let activitiesLen = activities.length;
            activities.forEach((activity, number) => {
                str += `
                <li>
                    <img class="img-responsive taskActivity-image" 
                        src="image/activities/${activity.type}-icon.png"
                        title="${activity.typename}">
                    <p>
                    <label class="taskActivity-nodenumber">活动${number+1}</label>
                    <label class="taskActivity-nodename">${activity.activity.name}</label></p>
                </li>`.trim();
                if(number < activitiesLen - 1){
                    str += `
                    <li class="arrow-li">
                        <img class="img-responsive arrow-image"
                            src="image/else/arrow.png">
                    </li>`.trim();
                }
                let $activity_content = injectPreviewCourseActivity(activity.type, activity, number+1);
                if($activity_content !== null){
                    _(".activity-wrapper").append($activity_content);
                }
            });
        }
        _(".task-activity").html(str);

        _reject();
        $zone.append($task);
    });

    _inject($inject);
}