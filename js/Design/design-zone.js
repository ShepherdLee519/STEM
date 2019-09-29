/*
 * author: Shepherd.Lee
 * Date: 2019 - 08 - 27
 * info: 学习活动相关
 * index:
 *      Zone()
 *          > self()
 *          > insertBefore()
 *          > insertAfter()
 *          > deleteNode()
 * 
 *          > toSub()
 *          > getParent()
 *          > mark()
 *          > demark()
 * 
 *          > initFirstActivity()
 *          > initActivityBtnHandler()
 *          > adjustInitActivity()
 *          > resetActivityRadio()
 * 
 *          > addActivityNum()
 * 
 *          > getData()
 */


$(function(){
    _hello("design-zone");
});



/**
 * 通过表示不同模式的其中一个环节的tasknode对象组装出一个zone
 * 一个zone只表示模型中的一个环节 例如需求分析
 * 但一个zone可能包含N个Node对象，表示包含的诸多学习活动
 * @param {Object} tasknode -此处的tasknode等表示模型中一个环节的对象
 * @param {Number} nodeindex - 该区域的index值
 */
function Zone(tasknode, nodeindex = -1){
    let nodelist    = [],   //该区域包含的学习活动的对象
        num         = 1,    //原定义是每新建一个学习活动递增的学习活动的序列号，暂无实际用处
        index       = nodeindex,    //该区域本身的index，在新建区域加入zones的时候获得
        parent      = -1,   //对子节点而言，这个值是父节点的index
        that        = this, //该zone自身的引用备份
        activity    = new Activity(), //该zone对应的activity对象

        //从imgsrc中提取结点所属模式类型 eg pbl
        tasknode_type = ((tasknode.imgsrc).match(/(.*?)-(.*)/))[1];
    
    let initBtn = `
        <div class="init-act">
            <button class="btn btn-default">新建活动</button>
        </div>
        `.trim(),
        //Zone相关的html
        $self = $(`
        <div class="panel panel-info design-act-zone">

            <div class="panel-heading">
                <h3 class="panel-title design-act-zone-title">
                    <img src="image/nodes/${tasknode_type}/${tasknode.imgsrc}" 
                        class="pull-left design-act-zone-icon" />
                    <span>${tasknode.nodename}</span> - 学习活动
                    <span class="badge pull-right activity-number">0</span>
                </h3>
            </div>

            <div class="panel-body design-act-zone-content">
                ${initBtn}
            </div>
            <div class="menu-box"></div>
        </div>
        `.trim()),
        //新建活动的选择框的html相关
        $initActivity = $(`
        <div class="design-initActivityZone">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h3 class="panel-title">选择活动类型</h3>
                </div>
                <div class="panel-body">
                    ${activity.init()}
                </div>
            </div>
        </div>
        `.trim()),
        //对于有sub-zone的zone对象增加的折叠subzones的html
        hasSub = `
        <div class="design-act-zone-hassub">
            <span class="glyphicon glyphicon-chevron-down"></span>
        </div>
        `.trim(),

        //Zone区域的几个元素
        $heading = $self.find(".panel-heading"),
        $content = $self.find(".design-act-zone-content"),
        $number  = $self.find(".activity-number");
    
    //点击面板的header部分展开/收回面板
    $heading.click(() => {
        $content.toggleClass("hidden");
        clearActivityMenu();
    });


    /*-----------------------------------------------------------//
     * Zone对外可见的方法
     * --------------------------------
     * self - 返回自己的DOM引用
     * setIndex - 设置该结点的index
     * activity - 返回zone拥有的activity的引用
     * 
     * insertBefore - 在指定节点前插入节点
     * insertAfter - 在指定节点后插入节点
     * deleteNode - 删除指定节点
     * 
     * toSub - 将当前Zone转为子节点的特征，修改一些样式
     * getParent - 获取当前节点的父节点index(默认-1)
     * mark - 表示当前Zone有附属子节点，修改一些样式与功能
     * demark - 取消mark状态
     * 
     * initFirstActivity - 点击新建活动后添加的第一个活动节点
     * initActivityBtnHandler - 点击新建活动后的事件处理
     * adjustInitActivity - 调整$initActivity中的panel-title的内容
     * resetActivityRadio - 重置新建活动列表中的radio选项
     * pushActivity - 加载数据时，通过数据直接推入一个新的activity
     * 
     * getEvidence - 获取学习证据
     * filterEvidence - 过滤学习证据
     * 
     * addActivityNum - 修改节点数
     * 
     * getData - 返回管辖的所有Node的数据集合
     */
    //-----------------------------------------------------------//
    /**
     * 返回自身区域的jQuery对象引用
     * @returns {Object}
     */
    this.self = () => $self;
    /**
     * 设置该区域的index值
     * @param {Number} index
     */
    this.setIndex = (index) => {
        that.index = index;
    };
    /**
     * 返回自身对应的activity对象的引用
     * @returns {Object}
     */
    this.activity = () => activity;


    /**
     * 经由Node对象调用，在传入的target的前面插入新节点
     * @param {Object} target - Node对象的this
     */
    this.insertBefore = (target) => {
        that.initActivityBtnHandler(-1, target);
        target.self().find(".menu-box").eq(0).html(that.adjustInitActivity($initActivity, -1));
        that.resetActivityRadio();//重置选项
        $initActivity.find("input[name='activity-name']").eq(0).val("");//清空活动名	
    };
    /**
     * 经由Node对象调用，在传入的target的后面插入新节点
     * @param {Object} target - Node对象的this
     */
    this.insertAfter = (target) => {
        that.initActivityBtnHandler(1, target);
        target.self().find(".menu-box").eq(0).html(that.adjustInitActivity($initActivity, 1));
        that.resetActivityRadio();//重置选项
        $initActivity.find("input[name='activity-name']").eq(0).val("");//清空活动名	
    };
    /**
     * 经由Node对象调用，删除传入的target对应的Node对象
     * @param {Object} target - Node对象的this
     */
    this.deleteNode = (target) => {
        let index = nodelist.indexOf(target);

        nodelist.splice(index, 1);
        $content.children().eq(index).remove();
        that.addActivityNum(-1);
        if(nodelist.length == 0){
            //如果节点全删除，回复新建学习活动的按钮
            $content.append(initBtn);
            that.initFirstActivity();
            num = 1;
        }
    };


    /**
     * 将一个Zone装饰为sub-Zone
     * @param {Number} parentIndex 该subZone的对应父Zone的index
     */
    this.toSub = (parentIndex) => {
        $self.removeClass("design-act-zone").removeClass("panel-info");
        $self.addClass("design-act-subZone").addClass("panel-warning");
        parent = parentIndex;
    };
    /**
     * 返回该Zone的index值，对于非subZone，该值为-1
     * @returns {Number}
     */
    this.getParent = () => parent;
    /**
     * 为含有子区域的父区域增加hasSub的click-span
     */
    this.mark = () => {
        $self.children(".panel-body").after(hasSub);
        let $span = $self.find(".design-act-zone-hassub span");

        $span.click(() => {
            $self.next(".subZones").toggleClass("hidden");
            clearActivityMenu();
        });
    };
    /**
     * 当子区域被删除时候，取消hasSub
     */
    this.demark = () => {
        let $mark = $self.find(".panel-body").next(".design-act-zone-hassub");
        $mark.remove();
    };


    /**
     * 新建学习活动的按钮的click事件处理
     * 即当区域内无学习活动下，第一次新建学习活动时候的事件处理
     */
    this.initFirstActivity = () => {
        $button = $content.find("button").eq(0);

        $button.click(() => {
            that.initActivityBtnHandler();
            that.adjustInitActivity($initActivity, 0);
            $self.find(".menu-box").eq(0).html($initActivity);
            that.resetActivityRadio();//重置选项
            $initActivity.find("input[name='activity-name']").eq(0).val("");//清空活动名
        });
    };
    //这里要立即执行该函数，实现第一次初始化的新建
    this.initFirstActivity();

    /**
     * 新建学习活动/前后添加学习活动的具体时事件处理函数
     * @param {Number} pos - 0(default)新建，1 before，-1 after
     * @param {Object} target
     */
    this.initActivityBtnHandler = function(pos = 0, target){
        clearActivityMenu();
        _addClass($initActivity.find(".alert"), "hidden");
        let $btn = $initActivity.find(".confirm-addActivity").eq(0);
            
        //新建活动的确认按钮点击
        $btn.click(function(){
            //pos = 0 新建/ pos = 1 insertAfter/ pos = -1 insertBefore
            const NAME       = "activity-name",
                  SELECT     = "activity-type-select";
            let $radiozone   = $(this).parent().prev(),//此处的this相对于$btn
                $warnMsg     = $radiozone.find(".alert"),
                value        = $radiozone.find(`input[name=${SELECT}]:checked`).val(),
                activityname = $radiozone.find(`input[name='${NAME}']`).val();

            //活动名称填写与活动类型选择了
            if(!_isundef(value) && activityname !== ""){
                clearActivityMenu();
                _addClass($warnMsg, "hidden");

                //用于新建Node的activityInfo
                let activityInfo = {
                    type        : value, //pyramid
                    typename    : activity.typemap(value),//金字塔
                    activityname: activityname//具体的活动名
                };

                that.addActivityNum(1);//区域右上角显示的节点数增加
                if(pos !== 0){ //向前/后插入
                    let index   = nodelist.indexOf(target),
                        node    = new ActivityNode(num++, activityInfo);
                    node.bindZone(that);//绑定父Zone的引用

                    if(pos == 1){ //向后插入结点
                        nodelist.splice(index + 1, 0, node);
                        $content.children().eq(index).after(node.self());
                    }else if(pos == -1){ //向前插入结点
                        nodelist.splice(index, 0, node);
                        $content.children().eq(index).before(node.self());
                    }
                }else if(pos == 0){//默认值 新建节点
                    let node = new ActivityNode(num++, activityInfo);
                    node.bindZone(that);
                    nodelist.push(node);
                    $content.html("").append(node.self());
                }
                return false;   
            }else{
                $warnMsg.removeClass("hidden");
                return false;
            }
        });//end - $btn.click()
    };
    /**
     * 根据pos(1,-1)调整$initActivity中的panel-title的内容
     * @param {Object} $init - $initActivity引用
     * @param {Number} pos 1 before -1 after
     * @returns {Object} 返回修改后的$initActivity对象的引用
     */
    this.adjustInitActivity = ($init, pos) => {
        let $title = $init.find(".panel-title");
        if(pos == 1){
            $title.html("<b>向后添加新学习活动</b>");
        }else if(pos == -1){
            $title.html("<b>向前添加新学习活动</b>");
        }else{
            $title.html("选择活动类型");
        }
        $init.find("input[name='activity-name']").eq(0).val("");//清空活动名	
        return $init;
    };
    /**
     * 重置新建活动菜单中的radios的选中情况
     */
    this.resetActivityRadio = () => {
        let radios = document.getElementsByName("activity-type-select");
        for(let radio of [...radios]){
            radio.checked = false;
        }
    };
    /**
     * 加载数据时，手动向Zone内推入新的活动节点
     * 1. 去掉新建活动按钮 2. 新建Node并绑定zone
     * 3. Node推入nodelist 4. Node的html加入content
     * 5. activityNum++
     * @param {Object} activityInfo - type/typename/activityname
     * @param {Object} nodedata Node中的存储数据 通过node.saveData保存
     */
    this.pushActivity = (activityInfo, nodedata = null) => {
        if(nodelist.length == 0) $content.html("");
        let node = new ActivityNode(num++, activityInfo);
        node.bindZone(that);
        if(nodedata != null){
            node.saveData(nodedata);
        }
        nodelist.push(node);
        $content.append(node.self());
        that.addActivityNum(1);//区域右上角显示的节点数增加
    };


    /**
     * 获取学习证据 需要根据该Zone的index与parentIndex特点从DATA中获取
     * 并经由filterEvidence过滤
     * @returns {Object}
     */
    this.getEvidence = () => {
        let evidences = "";
        if(parent == -1){
            evidences = (DATA.nodes)[index].taskevidence;
        }else{ 
            evidences = ((((DATA.nodes)[parent]).next).nodes)[index].taskevidence;
        }

        return that.filterEvidence(evidences);
    };

    /**
     * 过滤学习证据，访问nodelist中的每个node，过滤掉已选的学习证据
     * @param {Object} evidences_before 过滤前该zone对应的所有学习证据
     */
    this.filterEvidence = (evidences_before) => {
        let evidences_after = [],
            evidences_selected = [],
            nodeEvidence;
        
        for(let node of nodelist){
            nodeEvidence = node.getMyEvidence();
            if(nodeEvidence != "")
                evidences_selected = evidences_selected.concat(nodeEvidence);
        }
        evidences_after = evidences_before.filter((evidence) => {
            let flag = false;
            evidences_selected.forEach(evi => {
                if(evi.content == evidence.content && 
                    evi.evaluate == evidence.evaluate){
                    flag = true;
                }
            });
            return !flag;
        });

        return evidences_after;
    };


    /**
     * 修改右上角区域显示的节点数，将已有值与传入的参数值相加
     * @param {Number} num 节点数的修改量
     */
    this.addActivityNum = (num) => {
        let num_old = Number.parseInt($number.html());
        $number.html(num_old + num);
    };



    /**
     * 返回该区域管辖的所有Node的数据(nodedata)
     * 并将这些nodedata封装成一个data返回
     * @returns {Object}
     */
    this.getData = () => {
        let data = {
            nodename: tasknode.nodename,
            activities: []
        };

        nodelist.forEach((node) => {
            data["activities"].push(node.getData());
        });

        return data;
    };
}


