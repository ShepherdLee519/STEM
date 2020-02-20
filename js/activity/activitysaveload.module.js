/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-02-20 02:37:44 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-02-20 21:23:16
 */

const ActivitySaveLoadModule = function(){
    /**
     * @constant
     * 对应datas/activity/下的不同学习活动的json格式的键名
     */ 
    const activity_keys = {
        "pair": [
            ["name"],
            ["student", ["think", "pair", "share"]],
            ["teacher", ["think", "pair", "share"]],
        ],
        "pyramid": [
            ["name"], ["question"],
            ["floor", ["top", "middle", "bottom"]],
        ],
        "jigsaw": [
            ["name"],
            ["expert", ["task", "student", "teacher"]],
            ["former", ["task", "student", "teacher"]],
        ],
        "roleplay": [
            ["name"], ["setting"], 
            ["student", ["describe", "show", "evaluate"]],
            ["teacher", ["describe", "show", "evaluate"]],
        ],
        "game": [
            ["name"], ["rule"], ["place"], 
            ["student"], ["teacher"], ["reward"],
        ],
        "exp": [
            ["name"], ["step"], 
            ["student"], ["teacher"], ["environment"],
        ],
    };
    /**
     * @constant
     * 存储类型名与展开后的键名数组的映射字典
     */
    const typemap = new Map();

    /**
     * 将缩略的键名数组展开
     * 
     * @example
     * input: pyramid
     * [
     *      ["name"], ["question"],
     *      ["floor", ["top", "middle", "bottom"]],
     * ]
     * output:
     * [
     *      ["activity", "name"],
     *      ["activity", "question"],
     *      ["activity", "floor", "top"],
     *      ["activity", "floor", "middle"],
     *      ["activity", "floor", "bottom"],
     * ]
     * @param {Array} keys 
     */
    function expand(keys){
        let arr = [];
        for(let row of keys){
            row = ["activity", ...row];
            let last = row.length - 1,
                lastElem = row[last];
            if(!Array.isArray(lastElem)) arr.push(row);
            else{
                let _row = row.slice(0, last);
                lastElem.forEach(elem => 
                    arr.push([..._row, elem]));
            }
        }
        return arr;
    }

    /**
     * 加载学习活动中的基本数据
     * 
     * @param {Object} target 对应的node数据
     * @param {String} type 学习活动类型
     */
    function loadData(target, type){
        let keys = typemap.get(type);
        if(_isundef(keys)){
            keys = expand(activity_keys[type]);
            typemap.set(type, keys);
        }
        keys.forEach(key => _withdraw(
            target, key, _('.' + key.join('-'))
        ));
    }
    /**
     * 保存学习活动中的基本数据
     * 
     * @param {Object} target 对应的node数据
     * @param {String} type 学习活动类型
     */
    function saveData(target, type){
        let keys = typemap.get(type);
        keys.forEach(key => _store(
            target, key, _('.' + key.join('-')).val()
        ));
    }

    /**
     * 加载学习活动中的学习证据
     * 
     * @param {Object} evidences 对应的evidences数据
     */
    function loadEvidence(evidences){
        evidences = (evidences !== "") ? evidences : [];
        let $evidences_body = _(".activityEvidenceBody"),
            str = "";
        for(let evidence of evidences){
            str += `
            <tr>
                <td class="content-td">${evidence.content}</td>
                <td class="evaluate-td">${evidence.evaluate}</td>
            </tr>`.trim();
        }
        $evidences_body.html(str);
    }
    /**
     * 保存学习活动中的学习证据
     * 
     * @param {Object} storeplace 对应的evidences数据保存处
     */
    function saveEvidence(storeplace){
        let evidences = [..._(".activityEvidenceBody").children()],
            arr = evidences.map(evidence => { return {   
                content: $(evidence).find(".content-td").html(),
                evaluate: $(evidence).find(".evaluate-td").html() 
            }});
        storeplace.evidence = (evidences.length == 0) ? "" : arr;
    }

    /**
     * 加载材料与工具区域的数据
     * 
     * @param {Object} target 对应的node的数据 
     */
    function loadMaterial({link, file, text}){
        // 1. 装填链接资源
        link = (link !== "") ? link : [];
        let $linkBody = _(".link-body"),
            str = "";
        for(let a of link){
            str += `
            <tr><td class="link-tr-describe">${a.describe}</td>
                <td class="link-tr-url">
                    <a href="${a.url}" target="_blank">${a.url}</a></td>
            </tr>`.trim();
        }
        $linkBody.html(str);

        // 2. 装填上传文件资源
        file = (file !== "") ? file : [];
        let $fileUl = _(".file-ul");
        str = "";
        for(let f of file){
            str += `
            <li class="list-group-item file-li"
                data-fullpath=${f.path}
                title="点击下载< ${f.filename.trim()} >">
                ${f.filename.trim()}</li>
            `.trim();
        }
        $fileUl.html(str);

        // 3. 装填材料与工具
        let $text = _(".material-text");
        $text.val(text);
    }
    /**
     * 保存材料与工具区域的数据
     * 
     * @param {Object} storeplace material保存位置
     */
    function saveMaterial(storeplace){
        // 1. 保存链接资源
        let links = [..._(".link-body").children()],
            arr_links = links.map(link => { return {
                describe: $(link).find(".link-tr-describe").html(),
                url: $(link).find(".link-tr-url a").html()
            }});
        storeplace.link = (links.length == 0) ? "" : arr_links; 

        // 2. 保存上传文件
        let files = [..._(".file-ul").children()],
            arr_files = files.map(file => { return {
                path: $(file).attr("data-fullpath"),
                filename: $(file).html()
            }});
        storeplace.file = (files.length == 0) ? "" : arr_files;

        // 3. 保存材料工具
        storeplace.text = _(".material-text").val();
    }

    /**
     * 专门负责在editActivity菜单中的数据的加载\
     * 1. 活动类型在: edit_type_now
     * 2. 目标区域在: $edit_zone_now
     * 3. 目标数据: NODE.nodedata
     */
    const loadActivityData = function(){
        let target = NODE.nodedata;
        _inject($edit_zone_now);
        loadData(target, edit_type_now);
        loadEvidence(target.common.evidence);
        loadMaterial(target.common.material);
        _reject();
    };
    /**
     * 专门负责在editActivity菜单中点击确认后的数据的保存\
     * 1. 活动类型在: edit_type_now
     * 2. 目标区域在: $edit_zone_now
     * 3. 目标数据: NODE.nodedata
     * 
     * 保存最后NODE.saveData();
     */
    const saveActivityData = function(){
        let target = NODE.nodedata;
        _inject($edit_zone_now);
        saveData(target, edit_type_now);
        saveEvidence(target.common);
        saveMaterial(target.common.material);
        _reject();
        NODE.saveData(target);
    };

    _export([
        loadActivityData,
        saveActivityData
    ]);
}();