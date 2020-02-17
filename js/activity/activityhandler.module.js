const ActivityHandlerModule = function(){
    let $activityZone     = $("#design-activities-zone"),
        $activityEditZone = $("#design-editActivityZone");

    /**
     * 根据index与parentIndex从ZONE中获取对应zone对象返回
     * 
     * @param {Number} index 
     * @param {Number} parentIndex = -1
     */
    function getZone(index, parentIndex = -1){
        return (!~parentIndex) ?
            ZONE.zones[index] :
            ZONE.zones[ZONE.len][parentIndex][index];
    }

    /**
     * 关于面板收缩的事件处理函数
     */
    const togglePanelHandler = () => {
        const SPEED = 400;//slide-speed

        $activityZone
        //toggle - design-act-zone-content
        .delegate(".design-act-zone > .panel-heading", "click", function(){
            $(this).next().slideToggle(SPEED);
            return false;
        })
        .delegate(".design-act-subZone > .panel-heading", "click", function(){
            $(this).next().slideToggle(SPEED);
            return false;
        })
        //toggle - design-act-node-content
        .delegate(".design-act-node > .panel-heading", "click", function(){
            let $heading = $(this),
                $content = $heading.next(),
                $panel   = $heading.parent();
            
            $content.toggleClass("hidden");
            $panel.toggleClass("panel-default").toggleClass("panel-toggle");
            $heading.find(".panel-title b").html(
                $content.hasClass("hidden") ? 
                    $content.find(".design-activity-name").html() :
                    $panel.data("typename")
            );
            return false;
        })
        //toggle - subZones
        .delegate(".design-act-zone-hassub", "click", function(){
            $(this).parent().next(".subZones").slideToggle(SPEED);
            return false;
        });
    };

    /**
     * 组装选择学习活动的选择面板并返回
     * 
     * @param {String} type "init", "before"/"after" 
     * @returns {String}
     */
    const initSelectActivityPanel = (type) => {
        if(typeof initSelectActivityPanel.map != "object"){
            let map = new Map()
                .set("init", "选择活动类型")
                .set("before", "<b>向前添加新学习活动</b>")
                .set("after", "<b>向后添加新学习活动</b>");
            initSelectActivityPanel.map = map;

            let str = "<div class='activitiy-radio-zone'>";
            str += `
            <div class="form-group">
                <label for="" class="control-label">活动名称:</label>
                <div><input type="text" class="form-control" name="activity-name"
                    placeholder="学习活动的活动名"></div>
            </div><hr />
            <label class="control-label">活动类型:</label>
            `.trim();
            ACTIVITYTYPE.forEach(activity => {
                str += `
                <div class='radio'><label>
                    <input type='radio' name='activity-type-select' value="${activity.type}">
                    ${_space(2)}${activity.typename}
                </label></div>`.trim();
            });
            str += `
            <div class="alert alert-warning" style="display:none">
                <p>请选择活动类型并完善活动名称！</p>
            </div></div>
            `.trim();
            initSelectActivityPanel.panelBody = str;
        }
        let 
        str =  `
        <div class="design-initActivityZone">
        <div class="panel panel-success">
            <div class="panel-heading"><h3 class="panel-title">
                ${initSelectActivityPanel.map.get(type)}
            </h3></div>
            <div class="panel-body">
                ${initSelectActivityPanel.panelBody}
                <div class='btn-group pull-right'>
                    <button class='btn btn-success confirm-${type}'">确定</button>
                    <button class='btn btn-default cancel-select'>取消</button>
                </div>
            </div>
        </div>
        </div>`.trim();
        return str;
    };

    /**
     * 验证活动选择
     * 
     * @param {Object} $this confirm按钮对应的$(this)
     * @returns - false 未通过 - {activityname, type} 通过
     */
    const validateSelectActivity = ($this) => {
        let $panelBody = $this.parent().prev(),
            $input = $panelBody.find("input[type='text']"),
            $radios = $panelBody.find("input[type='radio']"),
            $warn = $panelBody.find(".alert"),
            //获取表单内容
            activityname = $input.val(),
            radio = [...$radios].filter(radio => radio.checked),
            type = (!!radio.length) ? radio[0].value : "";

        if(activityname === "" || type === ""){
            $warn.fadeIn("slow").delay(2000).fadeOut("slow");
            return false;
        }else{
            return {
                activityname: activityname, 
                type: type
            };
        }
    }

    /**
     * 选择活动的事件处理函数
     */
    const selectActivityHandler = () => {
        $activityZone
        .delegate(".init-act", "click", function(){
            let $menuBox = $(this).closest(".panel")
                .find(".menu-box");

            $activityZone.find(".menu-box").html("");
            $menuBox.append(initSelectActivityPanel("init"));
        })
        .delegate(".cancel-select", "click", function(){
            $(this).closest(".menu-box").html("");
            return false;
        })
        .delegate(".confirm-init", "click", function(){
            let $this = $(this),
                $zone = $this.closest(".menu-box").parent(),
                //获取对应zone
                zone = getZone(+$zone.data("index"), +$zone.data("parent")),
                //验证选择情况
                info = validateSelectActivity($this);

            if(info){
                zone.addActivity(info, "init");
                $this.next().click();
            }
            return false;
        });
    };

    /**
     * 点击插入新节点/删除节点/编辑节点的动态事件处理函数
     */
    const dynamicActivityHandler = () => {
        let getZoneIndex = ($that) => {
            let $node = $that.closest(".design-act-node-wrapper");
            return [
                getZone(+$node.data("index"), +$node.data("parent")), 
                $node.index() - 1 //init-act
            ]; 
        }; 

        $activityZone
        //点击插入节点的箭头 组装选择框
        .delegate(".insert-node", "click", function(){
            let $menuBox = $(this).parent().find(".menu-box"); 
            $activityZone.find(".menu-box").html("");
            $menuBox.append(initSelectActivityPanel($(this).data("type")));
            return false;
        })
        //确认向前插入节点
        .delegate(".confirm-before", "click", function(){
            let $this = $(this),
                //获取对应zone以及自身相对位置index
                [zone, index] = getZoneIndex($this),
                //验证选择情况
                info = validateSelectActivity($this);
            
            if(info){
                zone.addActivity(info, "before", index);
                $this.next().click();
            }
            return false;
        })
        //确认向后插入节点
        .delegate(".confirm-after", "click", function(){
            let $this = $(this),
                //获取对应zone以及自身相对位置index
                [zone, index] = getZoneIndex($this),
                //验证选择情况
                info = validateSelectActivity($this);
            
            if(info){
                zone.addActivity(info, "after", index);
                $this.next().click();
            }
            return false;
        })
        //点击删除学习活动节点
        .delegate(".remove-node", "click", function(){
            let $this = $(this),
                //获取对应zone以及自身相对位置index
                [zone, index] = getZoneIndex($this);
            
            zone.deleteActivity(index);
            return false;
        })
        //点击编辑打开编辑框
        .delegate(".edit-activity-btn", "click", function(){
            let $this = $(this),
                //获取对应zone以及自身相对位置index
                [zone, index] = getZoneIndex($this),
                node = zone.nodelist[index];
            
            let type = node.type,
                $editZone   = $(`#design-editActivityZone-${type}`),
                activityname = $this.prev().html();
            
            let flag = NODE !== node; 
            NODE = node;
            $edit_zone_now = $editZone;
            edit_type_now = type;
            loadActivityData();
            _hide($activityEditZone.children()).show($editZone);
            flag && _scroll($editZone.find(".panel-body"), "top");
            $editZone.find(".activity-name").val(activityname);
        });
    };

    /**
     * 编辑学习活动有关的事件处理函数
     */
    const editActivityHandler = () => {
        $activityEditZone
        .delegate(".design-editActivity-cancel", "click", function(){
            _hide($activityEditZone.children());
            return false;
        })
        .delegate(".activity-remove", "click", function(){
            _hide($activityEditZone.children());
            return false;
        })
        .delegate(".design-editActivity-confirm", "click", function(){
            saveActivityData();//保存数据
            $(this).next().click();//关闭
            return false;
        });

        _multistep([
            editActivityEvidenceHandler,
            editActivityLinkHandler,
            editActivityFileHandler
        ]);
    };

    /**
     * 编辑学习活动中的学习证据部分的事件处理
     */
    const editActivityEvidenceHandler = () => {
        //模态框相关的引用对象
        let $modal      = $("#activityEvidenceModal");
        $modal.appendTo(document.body);
        _inject($modal);
        let $select     = _("#activityEvidenceSelectZone"),
            $selected   = _("#activityEvidenceSelectedZone"),
            $show       = _("#activityEvidenceShowZone");
        _reject();
        
        /**
         * 组装学习证据的tr
         * 
         * @param {Object} $tbody tr填装的目的tbody 
         * @param {Array} evidences 学习证据对象的数组 
         * @param {Boolean} selected = false 是否默认选中 
         */
        function initEvidenceRow($tbody, evidences, selected = false){
            let str = "";
            evidences.forEach(evidence => {
                str += `
                <tr>
                    <td class="content-td">${evidence.content}</td>
                    <td class="evaluate-td">${evidence.evaluate}</td>
                    <td class="checkbox-td"><input type="checkbox" 
                        ${selected?"checked":""}></td>
                </tr>`.trim();
            });
            $tbody.html(str);
        }
        /**
         * 提取学习证据
         * 
         * @param {Object} $tbody
         * @return {Array} 
         */
        function extractEvidence($tbody){
            let evidences = [];
            [...$tbody.children()].forEach(tr => {
                _inject($(tr));
                if(_("input")[0].checked){
                    evidences.push({
                        content: _(".content-td").html(),
                        evaluate: _(".evaluate-td").html()
                    });
                }
                _reject();
            });
            return evidences;
        }

        $activityEditZone
        //点击打开选择学习证据模态框
        .delegate(".select-activityEvidence", "click", function(){
            $modal.modal("show");
            $(this).next().click();
            
            let [nowInfo, evidences, selectedInfo] = NODE.zone.evidences;
            //当前学习证据
            $show.parent().find("caption b").html(nowInfo.activityname);
            initEvidenceRow($show, nowInfo.evidences, true);
            //可选学习证据
            initEvidenceRow($select, evidences);
            //已选学习证据
            if(selectedInfo.length){
                _show([$selected, $selected.prev()]);
            }else{
                return false;
            }
            selectedInfo.forEach(info => {
                let $table = $selected.find("table").eq(0).clone(true);
                $table.find("caption b").html(info.activityname);
                $table.attr("data-id", info.id);
                initEvidenceRow(
                    $table.find(".selectedZone"), 
                    info.evidences, true
                );
                $table.removeClass("hidden").appendTo($selected);
            });
            return false;
        })
        //重置学习证据区域
        .delegate(".reset-activityEvidence", "click", function(){
            $select.html("");
            $show.html("");
            _hide([$selected, $selected.prev()]);
            $selected.find("table:not(:first)").remove();
            return false;
        });

        $modal
        //当前学习证据 - 取消 -> 可选学习证据
        .delegate("#activityEvidenceShowZone input", "change", function(){
            $(this).closest("tr").appendTo($select);
            return false;
        })
        //可选学习证据 - 确认 -> 当前学习证据
        .delegate("#activityEvidenceSelectZone input", "change", function(){
            $(this).closest("tr").appendTo($show);
            return false;
        })
        //已选学习证据 - 取消/确认 -> 可选学习证据
        .delegate(".selectedZone input", "change", function(){
            let $tr = $(this).closest("tr"),
                $table = $tr.closest("table"),
                id = $table.data("id") + '-' + $tr.index();
            $tr.attr("data-id", id);
            if($(this).prop("checked")){
                let $target = $select.find(`tr[data-id="${id}"]`);
                if($target.length){
                    $target.remove();
                    $tr.removeClass("cancel");
                }else{
                    $(this).prop("checked", false);
                }
            }else{
                $tr.clone().appendTo($select);
                $tr.addClass("cancel");
            }
            return false;
        })
        //确认 修改学习证据数据(显示警告信息) 修改$body
        .delegate("#confirmActivityEvidence", "click", function(){
            let $trs = $show.clone();
            $trs.find(".checkbox-td").remove();
            $edit_zone_now.find(".activityEvidenceBody").html($trs.html());

            let evidences_after = [{
                id: NODE.id,
                evidences: extractEvidence($show)
            }];
            [...$selected.find("table:not(:first)")].forEach(table => {
                evidences_after.push({
                    id: $(table).data("id"),
                    evidences: extractEvidence($(table).find(".selectedZone"))
                });
            });
            NODE.zone.evidences = evidences_after;
            $(this).next().click();//cancel
            return false;
        });
    }

    /**
     * 编辑学习活动中的链接部分的事件处理
     */
    const editActivityLinkHandler = () => {
        let $modal = $("#linkModal");
        $modal.appendTo(document.body);
        _inject($modal);
        let $showBody = _("#linkModal-show-body"),
            $showTemp = _("#linkModal-show-template"),

            $url = _("#linkModal-add-url"),
            $describe = _("#linkModal-add-describe");
        _reject();

        /**
         * 组装链接的tr 返回jquery对象
         * 
         * @param {String} describe 
         * @param {String} url 
         */
        function initLinkRow(describe, url){
            let $newRow = $showTemp.clone().removeClass("hidden");
            _inject($newRow);
            _(".linkModal-show-describe").val(describe);
            _(".linkModal-show-url").val(url);
            _reject();
            return $newRow;
        }
        /**
         * 从tr(jquery)对象中提取link数据
         * 
         * @param {Object} $tr 
         */
        function extractLink($tr){
            return {
                describe: $tr.find(".linkModal-show-describe").val(),
                url: $tr.find(".linkModal-show-url").val()
            };
        }

        $activityEditZone
        .delegate(".change-link", "click", function(){
            $modal.modal("show");
            let $body = $edit_zone_now.find(".link-body");

            //重置showBody
            $showBody.find("tr:not(:first)").remove();
            [...$body.children()].forEach(tr => {
                let $tr = $(tr);
                initLinkRow(
                    $tr.find(".link-tr-describe").html(),
                    $tr.find(".link-tr-url a").html()
                ).appendTo($showBody);                
            });
            return false;
        });

        $modal
        .delegate(".delete-link", "click", function(){
            $(this).closest("tr").remove();
            return false;
        })
        .delegate("#linkModal-add-btn", "click", function(){
            let url = $url.val(),
                describe = $describe.val();
            if(url !== ""){
                initLinkRow(describe, url).appendTo($showBody);
                $url.val("");
                $describe.val("");
            }
            return false;
        })
        .delegate("#confirmLink", "click", function(){
            //step.1 从$showBody 中获取数据
            let links = [];
            [...$showBody.find("tr:not(:first)")].forEach(tr => {
                links.push(extractLink($(tr)));
            });
            //step.2 装入link-body中
            let $body = $edit_zone_now.find(".link-body"),
                str = "";
            for(let link of links){
                str += `
                <tr>
                    <td class="link-tr-describe">${link.describe}</td>
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
     * 编辑学习活动中的文件上传部分的事件处理
     */
    const editActivityFileHandler = () => {
        let $modal = $("#fileModal");
        $modal.appendTo(document.body);
        _inject($modal.find("#fileModal-show"));
        let $showBody = _("#fileModal-show-body"),
            $showTemp = _("#fileModal-show-template");
        _reject();
        let $modalAdd = $modal.find("#fileModal-add");
        _inject($modalAdd);
        let $location   = _("#addFile-location"),
            $check      = _("#addFile-check"),
            $file       = _("#addFile-file"),
            $name       = _("#addFile-name"),
            $submit     = _("#addFile-submit"),
            $upload     = _("#addFile-upload"),
            $reset      = _("#addFile-reset");
        _reject();

        //上传文件的文件夹 - 注意末尾必须有/
        let path = SESSION_INFO.session ?
            `./userdata/${SESSION_INFO.userid}_${SESSION_INFO.username}/upload/` :
            "./upload/";

        /**
         * 组装文件信息的tr
         * 
         * @param {String} filename 
         * @param {String} fullpath 
         */
        function initFileRow(filename, fullpath){
            let $newRow = $showTemp.clone()
                .removeClass("hidden").removeAttr("id");
            initFileRow.pattern = initFileRow.pattern || /\.[^\.]+$/;
            let type = initFileRow.pattern.exec(fullpath)
                .toString().substring(1);

            _inject($newRow);
            _(".fileModal-show-filename").html(filename);
            _(".fileModal-show-filename").attr("data-fullpath", fullpath);
            _(".fileModal-show-type").html(type);
            _reject();
            return $newRow;
        }

        /**
         * 提取tr中的文件信息
         * 
         * @param {Object} $tbody 
         */
        function extractFile($tbody){
            let str = "",
                $filename;
            [...$tbody.find("tr:not(:first)")].forEach(tr => {
                $filename = $(tr).find(".fileModal-show-filename");
                str +=  `
                    <li class="list-group-item"
                        data-fullpath=${$filename.attr("data-fullpath")}>
                        ${$filename.html()}
                    </li>
                `.trim();
            });
            return str;
        }

        $activityEditZone
        .delegate(".change-file", "click", function(){
            let $fileUl = $edit_zone_now.find(".file-ul");
            $showBody.find("tr:not(:first)").remove();
            for(let file of [...$fileUl.children()]){
                initFileRow(
                    $(file).html(),
                    $(file).data("fullpath")
                ).appendTo($showBody);
            }
            $modal.modal("show");
            return false;
        });

        //上传相关的一些handler
        $file.change(() => $location.val($file.val()));
        $check.click(() => $file.click());
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

        $modal
        .delegate("#fileUpload-form", "submit", function(){
            let formData = new FormData($("#fileUpload-form")[0]);
            formData.append("userid", SESSION_INFO.userid);
            formData.append("username", SESSION_INFO.username);

            $.ajax({
                type: "POST",
                url: "./php/upload/upload_file.php",
                data: formData,
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                success(res){
                    log(res);
                    initFileRow(
                        res.filename,
                        path + res.fullname
                    ).appendTo($showBody);
                },
                error(res){
                    err(path);
                    err(res);
                    alert("File Upload Occured ERROR!");
                }
            });
            return false;
        })
        .delegate(".delete-file", "click", function(){
            let $tr = $(this).closest("tr"),
                fullpath = $tr.find(".fileModal-show-filename").data("fullpath");
            fullpath = fullpath.replace(path, '../.' + path);
            $.post("./php/upload/delete_file.php", {filepath: fullpath}, res => {
                if(!res) err("File Delete Occured ERROR!");
            });
            $tr.remove();
            return false;
        })
        .delegate(".file-ul li", "click", function(){
            let $a = $(`<a href="${$(this).data("fullpath")}" download></a>`)
            $a.addClass("hidden").appendTo(document.body);
            $a[0].click();
            $a.remove();
            // log($(this).data("fullpath"));
            return false;
        })
        .delegate("#confirmFile", "click", function(){
            let $fileUl = $edit_zone_now.find(".file-ul");
            $fileUl.html(extractFile($showBody));
            $modal.modal("hide");
            return false;
        });
    }


    return {
        init(){
            _multistep([
                togglePanelHandler,
                selectActivityHandler,
                dynamicActivityHandler,
                editActivityHandler
            ]);
        }
    };
}();