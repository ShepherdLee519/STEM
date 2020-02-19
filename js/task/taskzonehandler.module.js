const TaskZoneHandlerModule = function(){
    _inject($("#design-tasks"));
    let $taskZone    = _("#design-tasksZone"),
        $resetModal  = _("#design-tasks-resetModal"),
        $introZone   = _("#design-introduction-zone"),
        $edit        = _("#design-editTaskZone"),
        $initsubzone = _("#design-initSubTaskZone");
    _reject();

    /**
     * 编辑前注入，用于取消编辑时候的还原
     */
    let taskInfo_backup = null;

    /**
     * 事件处理中辅助获得taskInfo的辅助函数\
     * 仅模块内使用
     * 
     * @param {Object} that 传入this 
     * @returns {Object} $node, $zone, taskInfo
     */
    function getTool(that){
        let $node = $(that).closest(".node"),
            $zone = $node.parent(),
        
            index = $zone.children(".node").index($node), 
            parentIndex = $zone.hasClass("subTaskZone") ?
                +$zone.attr("data-parent") : -1,
            taskInfo = TASKZONE.getTaskInfo(index, parentIndex);
        
        return {
            $node: $node, 
            $zone: $zone,
            taskInfo: taskInfo
        };
    }
    /**
     * 编辑的填充过程中，对目标node数据的筛选
     * 
     * @param {TaskInfo} taskInfo = taskInfo_backup
     */
    function getTarget(taskInfo = taskInfo_backup){
        return (!taskInfo.isSubNode) ? 
                DATA.nodes[taskInfo.index] :
                DATA.nodes[taskInfo.parentIndex].next
                    .nodes[taskInfo.index];
    }

    /**
     * 主要包括：
     * 1. 删除任务的事件
     * 2. 点击图片打开编辑框事件
     * 3. 重置模式的事件
     */
    const taskZoneHandler = () => {
        //鼠标在删除按钮上，对整个区域增加一个红色点框的样式
        $taskZone
        //hover 显示虚线红框
        .delegate(".delete-task", "mouseover", function(){
            $(this).parent().addClass("hover");
        })
        .delegate(".delete-task", "mouseout", function(){
            $(this).parent().removeClass("hover");
        })
        //点击 删除任务
        .delegate(".delete-task", "click", function(){
            let $zone = $(this).parent();
            $zone.removeClass("hover");
    
            if(!$taskZone.children().index($zone)){
                resetTaskZone();//删除一级，重置全部
                return;
            }
    
            //作为子节点
            let parentIndex = +$zone.data("parent"),
                id = '#' + $zone[0].id,
                $parent = TASKZONE.getTaskZone();
    
            //将父节点的样式恢复
            $parent.find(".img-zone.selected-parent")
                .removeClass("selected-parent")
                .parent().addClass("node-wrap");
    
            //从DATA中删除
            DATA.nodes[parentIndex].next = "";
            //从taskZone中删除
            $(id).remove();
            
            $parent.addClass("first-level");
            $parent.find(".node").eq(parentIndex)
                .find("span").removeClass("hasSubNode");
    
            //从学习任务中删除
            ZONE.deleteZones(parentIndex);
        })
        //点击图片 显示编辑框
        .delegate("img", "click", function(){
            let taskInfo = getTool(this).taskInfo;
    
            _show($edit);
            if(taskInfo_backup !== taskInfo) _scroll($edit.find("form"), "top");
            $edit.find(".panel-title label").eq(0)
                .html(` - ${taskInfo.nodename}`);   
                   
            taskInfo_backup = taskInfo;//备份
            initEditTaskHandler(taskInfo);//读入DATA中数据初始化$edit区域
        });
    
        //重置模式按钮
        $resetModal.click(function(){
            resetTaskZone();
            _hide($resetModal);
        });
    
        /**
         * 重置学习任务区域
         */
        function resetTaskZone(){
            //重置DATA、 学习活动与任务区域
            DATA = [];//重置DATA
            ZONE.deleteZones();//重置学习活动
        
            //重置任务区域
            _hide([$taskZone, $resetModal]).show($introZone);
            toggleTrigger("off");
    
            //将原先的选中取消
            [...$introZone.find("input")].forEach(radio => {
                radio.checked = false;
            });
        
            $taskZone.find(".subTaskZone").remove()
                .end().find(".node").remove();
        };
        _export(resetTaskZone);
    }
    /**
     * 添加二级任务的事件处理
     */
    const addSubNodeHandler = () => {
        $taskZone
        //点击箭头，弹出选择模式面板
        .delegate(".glyphicon-chevron-down", "click", function(){
            let taskInfo = getTool(this).taskInfo;

            //点击箭头，添加二级节点, 如果是子节点，跳过
            if(taskInfo.isSubNode) return;
            //已存在该结点的二级节点 - 显示/隐藏
            if(existsSubTask(taskInfo.index)){
                toggleSubTask(taskInfo.index);
                return;
            }
        
            //复制并准备二级节点菜单的容器
            taskInfo.$div.find(".init-panel").remove();
            let $panel = $initsubzone.clone()
                .toggleClass("hidden").removeAttr("id")
                .insertBefore($(this));
            TASKZONE.initTaskPanel($panel.find(".panel-body"));
        })
        //确认添加二级节点
        .delegate("#confirmAddSubTask", "click", function(){
            let {$node, $zone, taskInfo} = getTool(this),
                $body = $zone.find(".init-panel .panel-body"),
                val = $body.find("input[type='radio']:checked").val();
                
            if(_isundef(val)){
                alert("您没有选择子模式类型!");
                return;
            }

            hideSelectedTask();
            $node.find(".img-zone").addClass("selected-parent");
            $node.find(".glyphicon-chevron-down").addClass("hasSubNode");
            $node.find(".node-content").removeClass("node-wrap");
            hideSubTasks();
            TASKZONE.initSubTaskNodes(val, taskInfo.index);

            $("#cancelAddSubTask").click();
        })
        //关闭添加二级节点的菜单
        .delegate("#cancelAddSubTask", "click", function(){
            $(this).closest(".node").find(".init-panel")
                .toggleClass("hidden");
        });
    }
    /**
     * 编辑框相关的事件处理
     */
    const editTaskHandler = () => {
        /**
         * 编辑框的事件处理 - 确定/取消
         */

        let $confirmBtn = $("#design-confirmTaskEditBtn", $edit),
            $cancelBtn = $("#design-cancelTaskEditBtn", $edit);

        //点击按钮确定编辑
        $confirmBtn.click(() => {
            saveTaskHandler(taskInfo_backup);
            _hide($edit);
            return false;
        });

        //点击取消按钮关闭编辑区域
        $cancelBtn.click(() => {
            _hide($edit);
            return false;
        });

        //点击右上角的X关闭编辑区域
        $edit.find(".panel-title span").click(() => {
            $cancelBtn.click();
        });

        _multistep([
            editTaskEvidenceHandler,
            editTaskCoreQuestionHandler
        ]);
    }
    /**
     * 编辑框中的核心问题部分的事件处理
     */
    const editTaskCoreQuestionHandler = () => {
        let $coreQuestionZone = $("#taskCoreQuestion", $edit).parent();
        _inject($coreQuestionZone);
        let $addCQ      = _("#taskCoreQuestion-AddBtn"),
            $resetCQ    = _("#taskCoreQuestion-ResetBtn"),
            $showCQ     = _("#taskCoreQuestion-ShowZone"),
            $selectCQ   = _("#taskCoreQuestion-SelectZone");
        _reject();

        $coreQuestionZone
        .delegate("#taskCoreQuestion-AddBtn", "click", function(){
            _hide($showCQ).show($selectCQ);
            let str = "", 
                coreQuestions = getCoreQuestions();//见design-objectives.js

            if(coreQuestions.length == 0){
                //当前未填写核心问题
                str += `
                <p>${_space()}请先在<b>学习目标-问题设计-学科核心问题</b>中完善核心问题的内容
                    ，完善后请重新点击上方"+"按钮</p>
                <button class="btn btn-danger pull-right" 
                    id="taskCoreQuestion-cancelSelect">关闭</button>
                `.trim();
            }else{
                //填写了核心问题，组装复选框
                coreQuestions.forEach((q, index) => {
                    str += `
                    <label class="checkbox-inline">
                        <input type="checkbox" value="${index}">
                        ${q.value}${_space(2)}
                        <span class="badge pull-right badge-${q.type}">${q.typename}</span>
                    </label>
                    <br />
                    `.trim();
                });
                str += `
                <br />
                <div class="btn-group pull-right">
                    <button class="btn btn-danger" id="taskCoreQuestion-confirmSelect">确定</button>
                    <button class="btn btn-default" id="taskCoreQuestion-cancelSelect">取消</button>
                </div>
                `.trim();
            }
            $selectCQ.html(str);
            return false;
        })
        .delegate("#taskCoreQuestion-ResetBtn", "click", function(){
            $("#taskCoreQuestion-AddBtn").click();
            return false;
        })
        .delegate("#taskCoreQuestion-confirmSelect", "click", function(){
            let $checkboxes = $(this).parent().parent().find("input[type='checkbox']"),
                checked = [...$checkboxes].filter(checkbox => checkbox.checked),
                values = checked.map(checkbox => checkbox.value);

            if(values.length == 0){
                _hide([$selectCQ, $resetCQ]).show($addCQ);
                $showCQ.html("");
                return false;
            }

            let str = "<ul class='list-group'>",
                coreQuestions = getCoreQuestions();

            values.forEach(value => {
                let question = coreQuestions[value];
                str += `
                <li class="list-group-item">
                    <span class="badge badge-${question.type}">${question.typename}</span>
                    <span class="li-content">${question.value}</span>
                </li>
                `.trim();
            });
            str += "</ul>";

            $showCQ.html(str);
            _hide([$selectCQ, $addCQ]).show([$showCQ, $resetCQ]);
            return false;
        })
        .delegate("#taskCoreQuestion-cancelSelect", "click", function(){
            //重新读入 恢复show区域的显示
            let target = getTarget(),
                taskcorequestion = target["taskcorequestion"];

            $showCQ.html("");
            if(taskcorequestion && taskcorequestion.length){
                let str = "<ul class='list-group'>";
                taskcorequestion.forEach(corequestion => {
                    str += `
                    <li class="list-group-item">
                        <span class="badge badge-${questionTypeMap(corequestion.type)}">
                            ${corequestion.type}</span>
                        <span class="li-content">${corequestion.content}</span>
                    </li>
                    `.trim();
                });
                str += "</ul>";
                $showCQ.html(str);
                _hide($addCQ).show($resetCQ);
            }else{
                _hide($resetCQ).show($addCQ);
            }
            _hide($selectCQ).show($showCQ);
            return false;
        });
    }
    /**
     * 编辑框中的学习评价部分的事件处理
     */
    const editTaskEvidenceHandler = () => {
        //当前编辑框下已选核心问题
        let $selectedCQ = $("#taskCoreQuestion-ShowZone", $edit);
        //编辑框中的学习评价部分相关jQuery对象
        _inject($(".table-evidence", $edit));
        let $addBtn     = _("#addEvidence"),
            $body       = _("#evidence-body"),
            $template   = _("#evidence-template");
        _reject();
        //编辑框的学习评价列表对应的正在编辑的评价对象备份
        let $content_editing        = null,
            $coreQuestion_editing   = null,
            $evaluate_editing       = null;

        //添加学习证据模态框相关jQuery对象
        let $addEvidenceModal = $("#addEvidenceModal");
        _inject($addEvidenceModal);
        let $addSelectedCQ  = _("#add-evidenceSelectedQuestion"),
            $addContent     = _("#add-evidenceContent"),
            $addCQ          = _("#add-evidenceCoreQuestion"),
            $addEvaluate    = _("#add-evidenceEvaluate"),
            $addConfirm     = _("#confirmAddEvidence"),
            $addCancel      = _("#cancelAddEvidence");
        _reject();

        //编辑学习证据模态框相关jQuery对象
        let $editEvidenceModal = $("#editEvidenceModal");
        _inject($editEvidenceModal);
        let $editSelectedCQ = _("#edit-evidenceSelectedQuestion"),
            $editContent    = _("#edit-evidenceContent"),
            $editCQ         = _("#edit-evidenceCoreQuestion"),
            $editEvaluate   = _("#edit-evidenceEvaluate"),
            $editConfirm    = _("#confirmEditEvidence"),
            $editCancel     = _("#cancelEditEvidence");
        _reject();

        $addEvidenceModal.appendTo(document.body);
        $editEvidenceModal.appendTo(document.body);

        //点击开启添加学习证据的模态框
        $addBtn.click(() => {
            $addEvidenceModal.modal("show");
            $addSelectedCQ.html("").append($selectedCQ.html());
            
            //清除已填写的数据
            $addContent.val(""); $addCQ.val("");
            $addEvaluate.find("option").eq(0).prop("selected", true);
            return false;
        });

        //确认添加学习证据
        $addConfirm.click(() => {
            let $newRow = $template.clone().removeAttr("id").removeClass("hidden");
            const evidenceCls = ["evidenceContent", "evidenceCoreQuestion", "evidenceEvaluate"];
            evidenceCls.forEach(clsname => {
                $newRow.find(`td.${clsname}`).eq(0).html($(`#add-${clsname}`).val());
            });
            $body.append($newRow);
            $addCancel.click();
            return false;
        });

        $body
        //删除学习证据
        .delegate(".deleteEvidence", "click", function(){
            $(this).closest("tr").remove();
            return false;
        })
        //点击打开编辑学习证据框
        .delegate(".editEvidence", "click", function(){
            $editEvidenceModal.modal("show");
            _inject($(this).closest("tr"));
            $content_editing        = _(".evidenceContent"),
            $coreQuestion_editing   = _(".evidenceCoreQuestion"),
            $evaluate_editing       = _(".evidenceEvaluate");
            _reject();
            
            $editSelectedCQ.html("").append($selectedCQ.html());
            $editContent.val($content_editing.html());
            $editCQ.val($coreQuestion_editing.html());
            const Evaluates = ["请选择", "书面测试", "调查问卷", "口头汇报", 
                "同行评审", "概念图", "观察记录", "制作成果", "展示绩效"];
            let evaluate_index = Evaluates.indexOf($evaluate_editing.html());
            evaluate_index = (!~evaluate_index)?0:evaluate_index;
            $editEvaluate.find("option").eq(evaluate_index).prop("selected", true);
            return false;
        });

        //确认保存学习证据的编辑
        $editConfirm.click(() => {
            $content_editing.html($editContent.val());
            $coreQuestion_editing.html($editCQ.val());
            $evaluate_editing.html($editEvaluate.val());
            $editCancel.click();
            return false;
        });
        //关闭、取消学习证据的编辑
        $editCancel.click(() => {
            $content_editing = null;
            $coreQuestion_editing = null;
            $evaluate_editing = null;
            $editEvidenceModal.modal("hide");
            return false;
        });
    }
    /**
     * 点击图片节点时候调用，利用TaskInfo进行编辑框的内容填充
     * 
     * @param {TaskInfo} taskInfo 
     */
    const initEditTaskHandler = (taskInfo) => {
        let {
            taskname, taskcontent, 
            taskcorequestion, taskevidence
        } = getTarget(taskInfo);

        _inject($edit);
        //状填任务名称与任务描述
        _("#taskName").val(taskname);
        _("#taskContent").val(taskcontent);

        //装填核心问题区域
        let $addCQ      = _("#taskCoreQuestion-AddBtn"),
            $resetCQ    = _("#taskCoreQuestion-ResetBtn"),
            $showCQ     = _("#taskCoreQuestion-ShowZone");
        
        if(taskcorequestion && taskcorequestion.length){
            let str = "<ul class='list-group'>";
            taskcorequestion.forEach(corequestion => {
                str += `
                <li class="list-group-item">
                    <span class="badge badge-${questionTypeMap(corequestion.type)}">
                        ${corequestion.type}</span>
                    <span class="li-content">${corequestion.content}</span>
                </li>
                `.trim();
            });
            str += "</ul>";
            $showCQ.html(str);
            _hide($addCQ).show($resetCQ);
        }else{
            $showCQ.html("");
            _show($addCQ).hide($resetCQ);
        }
        _show($showCQ);

        //装填学习证据区域
        [...$("#evidence-body").children()].forEach((tr, index) => {
            if(index == 0) return;
            $(tr).remove();
        });
        if(taskevidence && taskevidence.length > 0){
            let $addEvidenceBtn = $("#confirmAddEvidence"),
                $content        = $("#add-evidenceContent"),
                $coreQuestion   = $("#add-evidenceCoreQuestion"),
                $evaluate       = $("#add-evidenceEvaluate");
            
            taskevidence.forEach(evidence => {
                $content.val(evidence.content);
                $coreQuestion.val(evidence.corequestion);
                for(let option of [...$evaluate.children()]){
                    $(option).prop("selected", false);
                    if($(option).val() == evidence.evaluate){
                        $(option).prop("selected", true);
                    }
                }
                $addEvidenceBtn.click();
            });
        }
        _reject();
    }
    /**
     * 编辑区域的保存 => 存入DATA
     * 
     * @param {TaskInfo} taskInfo 
     */
    const saveTaskHandler = (taskInfo) => {
        let target = getTarget(taskInfo);
        target.taskname = $("#taskName", $edit).val();
        target.taskcontent = $("#taskContent", $edit).val();

        //核心问题的存储处理
        target["taskcorequestion"] = [];
        let $selectedCQ = $edit.find("#taskCoreQuestion-ShowZone");
        if($selectedCQ.html() !== ""){
            [...$selectedCQ.find("li")].forEach(li => {
                let type = $(li).find("span.badge").html(),
                    content = $(li).find("span.li-content").html();
                target["taskcorequestion"].push({
                    type: type, content:content
                });
            });
        }

        //学习证据的存储处理
        target["taskevidence"] = [];
        [...$("#evidence-body").children()].forEach((tr, index) => {
            if(index == 0) return;//template 跳过
            _inject($(tr));
            target["taskevidence"].push({
                content: _(".evidenceContent").html(),
                corequestion: _(".evidenceCoreQuestion").html(),
                evaluate: _(".evidenceEvaluate").html()
            });
            _reject();
        });
    }

    return {
        init(){
            _multistep([
                taskZoneHandler,
                editTaskHandler,
                addSubNodeHandler,
            ]);
        }
    };
}();