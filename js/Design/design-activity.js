/*
 * author: Shepherd.Lee
 * Date: 2019-09-16
 * version: 2.0.0
 * info: 学习活动中 具体的创建不同类型的活动
 * index:
 *      clearActivityMenu()
 *      Activity()
 *          - init()
 *          - typemap()
 * 
 *          - editActivityZone()
 *          - hideEditActivityZones()
 *          - initEditActivityHandlers()
 *      initActivityEvidenceHandler()
 *      initActivityMaterialHandler()
 */


/**
 * @global 当前正在编辑的type
 */
var edit_type_now  = null;
/**
 * @global 当前操作的edit区域引用
 */
var $edit_zone_now = null;
/**
 * @global 是否初始化了activity的基本handlers
 * 避免重复的进行handlers的增加
 */
var INIT_ACTIVITY_HANDLERS = false;


$(function(){
    _hello("design-activity");

    initActivityEvidenceHandler();
    initActivityMaterialHandler();
});



/**
 * 将所有的菜单清空
 * 
 * 会发生在 点击取消 - 折叠菜单(zone/subnode) 等
 * 考虑点击空白处就让菜单消失
 */
function clearActivityMenu(){
    let $activitiesZone = $("#design-activities-zone");
    $activitiesZone.find(".menu-box").html("");
}


/**
 * 学习活动的活动功能对象
 * 包含新建、编辑活动的必要操作等
 */
function Activity(){
    let that = this;//自身的引用的备份
    let ActivityType = {
        "type" : [
            "pair",  "pyramid",  "jigsaw", 
            "roleplay", "game", "exp"
        ],
        "typename" : [
            "思考-配对-共享", "金字塔", "拼图策略", 
            "角色扮演", "游戏教学", "实验教学"
        ]
    };
    
    /*-----------------------------------------------------------//
     * Activity对外可见的方法
     * --------------------------------
     * init - 初始化活动类型的面板的html
     * typename - 将type与typename相互转化
     * 
     * editActivityZone - 找寻对应的editActivity菜单并显示
     * hideEditActivityZones - 隐藏所有已有的activity编辑区域
     * initEditActivityHandlers - 编辑学习活动的菜单内的相关按钮的事件初始化
     */
    //-----------------------------------------------------------//
    /**
     * @returns {String} 用于初始化学习活动的选择面板的html
     */
    this.init = () => {
        let str = "<div class='activitiy-radio-zone'>";
        str += `
        <div class="form-group">
            <label for="" class="control-label">活动名称:</label>
            <div>
                <input type="text" class="form-control" name="activity-name"
                    placeholder="学习活动的活动名">
            </div>
        </div>
        <hr />
        <label class="control-label">活动类型:</label>
        `.trim();

        [...ActivityType.type].forEach((type, index) => {
            str += `
            <div class='radio'>
                <label>
                    <input type='radio' name='activity-type-select' value="${type}">
                    ${_space(2)}${ActivityType.typename[index]}
                </label>
            </div>`.trim();
        });
        str += `
        <div class="alert alert-warning">
            <p>请选择活动类型并完善活动名称！</p>
        </div>
        </div>
        <div class='btn-group pull-right'>
            <button class='btn btn-success confirm-addActivity'">确定</button>
            <button class='btn btn-default' onclick="clearActivityMenu();">取消</button>
        </div>
        `.trim();

        return str;
    };
    /**
     * 将type与typename进行转换
     * @param {String} key
     * @returns {String} 转化后的值
     */
    this.typemap = (key) => {
        //将对应的type与typename值相互转化 pyramid - 金字塔
        let index = ActivityType.type.indexOf(key);
        if(index >= 0){
            return ActivityType.typename[index];
        }else{
            index = ActivityType.typename.indexOf(key);
            if(index >= 0){
                return ActivityType.type[index];
            }
        }
        return;
    };
    /**
     * 根据key 找寻对应的editActivity菜单并显示
     * @param {String} key - typename eg.金字塔
     * @param {String} activityName 活动的名称
     */
    this.editActivityZone = (key, activityName) => {
        let type        = that.typemap(key),
            $editZone   = $(`#design-editActivityZone-${type}`);

        $edit_zone_now  = $editZone;
        edit_type_now   = type;
        loadActivityData();

        that.hideEditActivityZones();
        $editZone.removeClass("hidden");
        //活动名称的input赋值
        $editZone.find(".activity-name").val(activityName); 
    };
    /**
     * 将所有的editActivity菜单隐藏
     */
    this.hideEditActivityZones = () => {
        [...$(".design-editActivityZone")].forEach((editzone) => {
            _addClass($(editzone), "hidden");
        });
    };

    /**
     * 编辑学习活动的菜单内的相关按钮的事件初始化
     * 若window.INIT_ACTIVITY_HANDLERS真 不进行，即只初始化一次
     */
    this.initEditActivityHandlers = () => {
        if(window.INIT_ACTIVITY_HANDLERS) return;

        //editActivity菜单中的取消按钮的事件
        $(".design-editActivity-cancel").click(() => {
            that.hideEditActivityZones();
        });

        //panel-title中的×的点击关闭效果
        $(".activity-remove").click(() => {
            that.hideEditActivityZones();
        });

        //editActivity菜单中的确认按钮的事件
        $(".design-editActivity-confirm").click(() => {
            if($edit_zone_now == null || edit_type_now == null){
                err("WRONG!!!!!");
                return;
            }
            saveActivityData();//保存数据
            that.hideEditActivityZones();
        });
        window.INIT_ACTIVITY_HANDLERS = true;
    };
    this.initEditActivityHandlers();//立即调用并初始化
}



/**
 * 学习活动中选择学习证据的相关实现 包括模态框
 */
function initActivityEvidenceHandler(){
    let $selectBtn  = $(".select-activityEvidence"),
        $resetBtn   = $(".reset-activityEvidence"),
        $zone       = null,
        $body       = null,

        //模态框相关的引用对象
        $modal      = $("#activityEvidenceModal"),
        $show       = $("#activityEvidenceShowZone"),
        $cancel     = $("#cancelActivityEvidence"),
        $confirm    = $("#confirmActivityEvidence");
    
    //将模态框代码放到<body>下
    $modal.appendTo($("body").eq(0));

    //点击触发模态框
    [...$selectBtn].forEach(select => {
        $(select).click(function(e){
            e.preventDefault();
            $modal.modal("show");
            $(this).next().click();
            $zone = $(this).ancestor(2).next();
            $body = $zone.find(".activityEvidenceBody");

            let evidences = NODE.getEvidence(),
                str = "";
            
            evidences.forEach((evidence) => {
                str += `
                <tr>
                    <td class="content-td">${evidence.content}</td>
                    <td class="evaluate-td">${evidence.evaluate}</td>
                    <td class="checkbox-td"><input class="form-control" type="checkbox"></td>
                </tr>`.trim();
            });
            $show.html(str);
            return false;
        });
    });

    //点击清空重置activity
    [...$resetBtn].forEach(reset => {
        $(reset).click(function(e){
            e.preventDefault();
            $zone = $(this).ancestor(2).next();
            $body = $zone.find(".activityEvidenceBody");
            if($body.html() === "") return;
            else $body.html("");
            NODE.setMyEvidence("");
            // _exClass($(this), $(this).prev(), "hidden");
            return false;
        });
    });

    //确认选择并添加
    $confirm.click(() => {
        $body.html("");
        let flag = false;
        [...$show.children()].forEach(tr => {
            if($(tr).find("input").is(":checked")){
                let $td = $(tr).clone();
                $td.find(".checkbox-td").remove();
                $body.append($td);
                flag = true;
            }
        });
        if(flag){
            // _exClass(
            //     $edit_zone_now.find(".select-activityEvidence"),
            //     $edit_zone_now.find(".reset-activityEvidence"), 
            //     "hidden"
            // );
        }
        // $zone.removeClass("hidden");
        $modal.modal("hide");
    });

    //取消选择，回复原来的数据
    $cancel.click(() => {
        let target = NODE.getData();
        //装填学习证据
        $body.html("");//先清空

        if(target.common.evidence != ""){
            let str = "";
            for(let evidence of target.common.evidence){
                str += `
                <tr>
                    <td class="content-td">${evidence.content}</td>
                    <td class="evaluate-td">${evidence.evaluate}</td>
                </tr>`.trim();
            }
            $body.html(str);
        }
        $modal.modal("hide");
    });
}




/**
 * 学习活动中材料和工具区域的事件处理
 */
function initActivityMaterialHandler(){
    initActivityLinkHandler();
    initActivityFileHandler();
}




/**
 * 学习活动中的材料和工具区域中的链接管理部分
 */
function initActivityLinkHandler(){
    let $btn        = $(".change-link"),

        //模态框相关的引用
        $modal      = $("#linkModal"),
        $show       = $("#linkModal-show"),
        $showBody   = $("#linkModal-show-body"),
        $showTemp   = $("#linkModal-show-template"),
        
        $cancel     = $("#cancelLink"),
        $confirm    = $("#confirmLink");

    _inject($("#linkModal-add"));
    let $add        = _("#linkModal-add-btn"),
        $url        =  _("#linkModal-add-url"),
        $describe   = _("#linkModal-add-describe");
    _reject();

    $modal.appendTo($("body").eq(0));    
    
    //点击触发模态框
    [...$btn].forEach(btn => {
        $(btn).click(function(e){
            e.preventDefault();
            $modal.modal("show");
            _inject($edit_zone_now);
            let $body = _(".link-body");
            _reject();

            //重置showBody
            $showBody.html("").append($showTemp);

            [...$body.children()].forEach(tr => {
                let $newrow = $showTemp.clone().removeClass("hidden").removeAttr("id");
                _inject($newrow);
                _(".linkModal-show-describe").val($(tr).find(".link-tr-describe").html());
                _(".linkModal-show-url").val($(tr).find(".link-tr-url a").html());
                _(".delete-link").click(function(){ $(this).ancestor(2).remove();})
                _reject();
                $showBody.append($newrow);
            });
            return false;
        });
    });

    //添加新的链接资源
    $add.click(function(e){
        let url = $url.val(),
            describe = $describe.val();
        
        if(url !== ""){
            let $newrow = $showTemp.clone().removeClass("hidden").removeAttr("id");
            _inject($newrow);
            _(".linkModal-show-describe").val(describe);
            _(".linkModal-show-url").val(url);
            _(".delete-link").click(function(){ $(this).ancestor(2).remove();})
            _reject();
            $showBody.append($newrow);

            $url.val("");
            $describe.val("");
        }
        return false;
    });

    //确认保存链接资源
    $confirm.click(function(e){
        e.preventDefault();

        //step.1 从$showBody中获取数据
        let links = [];
        [...$showBody.children()].forEach((tr, index) => {
            if(index == 0) return;//跳过template
            _inject($(tr));
            links.push({
                describe: _(".linkModal-show-describe").val(),
                url:_(".linkModal-show-url").val()
            });
            _reject();
        });
        log(links);

        //step.2 装入link-body中
        _inject($edit_zone_now);
        let $body = _(".link-body");
        _reject();
        $body.html("");
        let str = "";
        for(let link of links){
            str += `
            <tr><td class="link-tr-describe">${link.describe}</td>
                <td class="link-tr-url">
                    <a href="${link.url}" target="_blank">${link.url}</a>
                </td>
            </tr>`.trim();
        }
        $body.html(str);

        $modal.modal("hide");
        return false;
    });
}





/**
 * 学习活动中的材料和工具区域中的文件资源上传部分
 */
function initActivityFileHandler(){
    let Path = "./upload/";//这个路径是相对于index.php的 末尾需要/
    let $btn        = $(".change-file"),
        //模态框相关的引用部分
        $modal      = $("#fileModal"),
        $form       = $("#fileUpload-form"),
        $cancel     = $("#cancelFile"),
        $confirm    = $("#confirmFile");
    
    _inject($("#fileModal-show"));
    let $showBody   = _("#fileModal-show-body"),
        $showTemp   = _("#fileModal-show-template");
    _reject();

    _inject($("#fileModal-add"));
    let $location   = _("#addFile-location"),
        $check      = _("#addFile-check"),
        $file       = _("#addFile-file"),
        $name       = _("#addFile-name"),
        $submit     = _("#addFile-submit"),
        $upload     = _("#addFile-upload"),
        $reset      = _("#addFile-reset");
    _reject();

    $modal.appendTo($("body").eq(0));    

    //点击触发模态框
    [...$btn].forEach(btn => {
        $(btn).click(function(e){
            e.preventDefault();
            _inject($edit_zone_now);
            $showBody.html("").append($showTemp);
            let $fileUl = _(".file-ul");
            _reject();
            for(let file of [...$fileUl.children()]){
                let $newrow = $showTemp.clone().removeClass("hidden").removeAttr("id");
                _inject($newrow);
                _(".fileModal-show-filename").html($(file).html());
                _(".fileModal-show-filename").attr("data-fullpath", $(file).attr("data-fullpath"));
                let type = /\.[^\.]+$/.exec($(file).attr("data-fullpath")); 
                _(".fileModal-show-type").html(type.toString().substring(1));
                _(".delete-file").click(function(e){
                    e.preventDefault();
                    let $that = $(this);
                    let path = $(this).ancestor(2)
                        .find(".fileModal-show-filename").eq(0)
                        .attr("data-fullpath");
                    path = path.replace(Path, "../../upload/");
                    $.post("./php/upload/delete_file.php", {filepath:path},function(res){
                        if(res){
                            $that.ancestor(2).remove();
                        }else{
                            err("Error deleting file!");
                        }
                    });
                    return false;
                });
                _reject();
                $showBody.append($newrow);
            }
            $modal.modal("show");
            return false;
        });
    });

    //上传相关的一些handler
    $file.change(() => {
        $location.val($file.val());
    });
    $check.click(() => {
        $file.click();
    });
    $upload.click(() => {
        $submit.click();
        return false;
    });
    $reset.click(() => {
        $name.val("");
        $location.val("");
        $file.val("");
        return false;
    });
    $form.submit(function(e){
        e.preventDefault();

        var formData = new FormData($form[0]);
        // formData.append("XX", XXX);

        $.ajax({
            type:"POST",
            url:"./php/upload/upload_file.php",
            data: formData, cache:false, dataType:"json",
            contentType:false,processData:false,
            success:function(res){
                log(res);

                let $newrow = $showTemp.clone().removeClass("hidden").removeAttr("id");
                _inject($newrow);
                _(".fileModal-show-filename").html(res.filename);
                _(".fileModal-show-filename").attr("data-fullpath", `${Path}${res.fullname}`);
                _(".fileModal-show-type").html(res.suffix);
                _(".delete-file").click(function(e){
                    e.preventDefault();
                    let $that = $(this);
                    let path = $(this).ancestor(2)
                        .find(".fileModal-show-filename").eq(0)
                        .attr("data-fullpath");
                    path = path.replace(Path, "../../upload/");
                    $.post("./php/upload/delete_file.php", {filepath:path},function(res){
                        if(res){
                            $that.ancestor(2).remove();
                        }else{
                            err("Error deleting file!");
                        }
                    });
                    return false;
                });
                _reject();
                $showBody.append($newrow);
            },
            error:function(res){
                err(res);
                alert("文件上传失败！");
            }
        });

        return false;
    });

    //点击确认组装上传资源区域
    $confirm.click(function(e){
        e.preventDefault();
        _inject($edit_zone_now);
        let $ul = _(".file-ul");
        _reject();

        $ul.html("");
        let str = "";
        [...$showBody.children()].forEach((tr, index) => {
            if(index == 0) return;
            _inject($(tr));
            str +=  `
                <li class="list-group-item"
                    data-fullpath=${_(".fileModal-show-filename").attr("data-fullpath")}>
                    ${_(".fileModal-show-filename").html()}
                </li>
            `.trim();
            _reject();
        });
        $ul.html(str);

        [...$ul.find("li")].forEach(li => {
            $(li).click(function(){
                let $a = $(`<a href="${$(this).attr("data-fullpath")}" download></a>`);
                $("body").eq(0).append($a);
                $a[0].click();
                $a.remove();
                log($(this).attr("data-fullpath"));
                return false;
            });
        });
        $modal.modal("hide");
        return false;
    });
}