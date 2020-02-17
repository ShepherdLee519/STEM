
Object.assign(TaskZone.prototype, {
    initTools(){
        _inject($("#design-tasks"));
        let 
        $taskZone      = _("#design-tasksZone"),
        $resetModal    = _("#design-tasks-resetModal"),
        $introZone     = _("#design-introduction-zone");
        _reject();

        /**
         * 学习评价区域 选择学习模式的处理\
         * 包括调用INIT新建学习模式与introduction区域的隐藏等
         */
        (function selectModalTool(){
            let $input = $("input[name=design-taskSelect]", $introZone);
            $input.change(() => {
                let value = $input.filter(":checked").val();//获取radio值
                _isundef(value) || selectModal(value);
            });

            function selectModal(value){
                _exClass($introZone, $taskZone, "hidden");
                _show($resetModal);

                //界面收放动画效果
                toggleTrigger("on");

                let $div = $taskZone.children(".taskZone").eq(0);
                TASKZONE.initTaskNodes($div, value);//新建节点
            }
            _export(selectModal);
        })();
        /**
         * 与新建/显示子节点有关的辅助操作整合的辅助
         */
        (function subNodeHandlerTools(){
            /**
             * 点击主task的下拉箭头时候判定该节点是否存在对应二级task
             * 
             * @param {Number} index
             */
            function existsSubTask(index){
                let ids = [...$taskZone.children()]
                    .map(node => $(node).attr("id"));
                return ~ids.indexOf(`subTaskZone-${index}`);
            }
            /**
             * 将所有子模式区域隐藏
             */
            function hideSubTasks(){
                [...$taskZone.children(".subTaskZone")]
                    .forEach(node => _hide($(node)));
            }
            /**
             * 显示二级task时候对应一级task会添加selected-parent类\
             * 使用hideSelectedTask在二级节点收回时候取消该类
             */
            function hideSelectedTask(){
                [...$taskZone
                    .children(".taskZone").eq(0)
                    .children("div.node")].forEach(node => {
                    let $node = $(node);
                    $node.find(".img-zone").removeClass("selected-parent");
                    $node.find(".node-content").addClass("node-wrap");
                });
            }
            /**
             * 切换子节点的效果
             * 1. 已经点开的场合 又将之关闭 - if
             * 2. 已经点开的场合， 点开了另一个子模式 - else
             * 
             * @param {Number} index 
             */
            function toggleSubTask(index){
                hideSelectedTask();
                let $subTaskZone = $taskZone.find(`#subTaskZone-${index}`),
                    $firstTaskZone = $taskZone.children().eq(0);
                if(!$subTaskZone.hasClass("hidden")){
                    $firstTaskZone.addClass("first-level");
                    _hide($subTaskZone);
                }else{
                    hideSubTasks();
                    $firstTaskZone.removeClass("first-level");
                    _show($subTaskZone);
                    let $parentNodeImg = $firstTaskZone
                        .children("div.node").eq(index).find(".img-zone");
                    $parentNodeImg.addClass("selected-parent");
                    $parentNodeImg.parent().removeClass("node-wrap");
                }
            }
            
            _export([
                existsSubTask,
                hideSubTasks,
                hideSelectedTask,
                toggleSubTask
            ]);
        })();
    }
});