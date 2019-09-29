/**
 * author: Shepherd.Lee
 * Date: 2019-09-26
 * info: 加载制定类型的Activity到对应task的activity-wrapper中
 *      
 */

$(function(){
    // _hello("inject-course-activity");
});


/**
 * 将数据从DB.activity中取出 注入preview中的activity-wrapper，
 * 生成一个<section class="activity"></section>
 * @param {String} type activity类型
 * @param {Object} target 对象的activity节点
 * @param {Number} numebr activity自身的活动序号
 *  
 */
function injectPreviewCourseActivity(type, target, number){
    let $node,
        path = "image/activities/",
        $inject = _();

    if(type === "pair"){
        $node = $("#preview-activity-pair").clone().removeAttr("id");
        _inject($node);

        _(".activity-logo").attr("src", `${path}pair-icon.png`);
        _(".activity-number").html(`活动${number}：`);
        _html(target, ["activity","name"], _(".activity-name"));

        _html(target, ["activity", "student", "think"], _(".pair-student-think"));
        _html(target, ["activity", "student", "pair"], _(".pair-student-pair"));
        _html(target, ["activity", "student", "share"], _(".pair-student-share"));
        _html(target, ["activity", "teacher", "think"], _(".pair-teacher-think"));
        _html(target, ["activity", "teacher", "pair"], _(".pair-teacher-pair"));
        _html(target, ["activity", "teacher", "share"], _(".pair-teacher-share"));

        _html(target, ["common", "material", "text"], _(".pair-tool"));
        _(".pair-link").html(transformLink(target.common.material.link));
        _(".pair-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        _reject();
        _inject($inject);
        return $node;

    }else if(type === "game"){
        $node = $("#preview-activity-game").clone().removeAttr("id");
        _inject($node);

        _(".activity-logo").attr("src", `${path}game-icon.png`);
        _(".activity-number").html(`活动${number}：`);
        _html(target, ["activity", "name"], _(".activity-name"));

        _html(target, ["activity", "rule"], _(".game-rule"));
        _html(target, ["activity", "place"], _(".game-place"));
        _html(target, ["activity", "student"], _(".game-student"));
        _html(target, ["activity", "teacher"], _(".game-teacher"));
        _html(target, ["activity", "reward"], _(".game-reward"));

        _html(target, ["common", "material", "text"], _(".game-tool"));
        _(".game-link").html(transformLink(target.common.material.link));
        _(".game-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        _reject();
        _inject($inject);
        return $node;

    }else if(type === "exp"){
        $node = $("#preview-activity-exp").clone().removeAttr("id");
        _inject($node);

        _(".activity-logo").attr("src", `${path}exp-icon.png`);
        _(".activity-number").html(`活动${number}：`);
        _html(target, ["activity", "name"], _(".activity-name"));

        _html(target, ["activity", "step"], _(".exp-step"));
        _html(target, ["activity", "environment"], _(".exp-place"));
        _html(target, ["activity", "student"], _(".exp-student"));
        _html(target, ["activity", "teacher"], _(".exp-teacher"));

        _html(target, ["common", "material", "text"], _(".exp-tool"));
        _(".exp-link").html(transformLink(target.common.material.link));
        _(".exp-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        _reject();
        _inject($inject);
        return $node;

    }else if(type === "roleplay"){
        $node = $("#preview-activity-roleplay").clone().removeAttr("id");
        _inject($node);

        _(".activity-logo").attr("src", `${path}roleplay-icon.png`);
        _(".activity-number").html(`活动${number}：`);
        _html(target, ["activity", "name"], _(".activity-name"));

        _html(target, ["activity", "setting"], _(".roleplay-setting"));
        _html(target, ["activity", "student", "describe"], _(".roleplay-student-describe"));
        _html(target, ["activity", "student", "show"], _(".roleplay-student-show"));
        _html(target, ["activity", "student", "evaluate"], _(".roleplay-student-evaluate"));
        _html(target, ["activity", "teacher", "describe"], _(".roleplay-teacher-describe"));
        _html(target, ["activity", "teacher", "show"], _(".roleplay-teacher-show"));
        _html(target, ["activity", "teacher", "evaluate"], _(".roleplay-teacher-evaluate"));

        _html(target, ["common", "material", "text"], _(".roleplay-tool"));
        _(".roleplay-link").html(transformLink(target.common.material.link));
        _(".roleplay-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        _reject();
        _inject($inject);
        return $node;

    }else if(type === "jigsaw"){
        $node = $("#preview-activity-jigsaw").clone().removeAttr("id");
        _inject($node);

        _(".activity-logo").attr("src", `${path}jigsaw-icon.png`);
        _(".activity-number").html(`活动${number}：`);
        _html(target, ["activity", "name"], _(".activity-name"));

        _html(target, ["activity", "expert", "task"], _(".jigsaw-expert-task"));
        _html(target, ["activity", "expert", "student"], _(".jigsaw-expert-student"));
        _html(target, ["activity", "expert", "teacher"], _(".jigsaw-expert-teacher"));
        _html(target, ["activity", "former", "task"], _(".jigsaw-former-task"));
        _html(target, ["activity", "former", "student"], _(".jigsaw-former-student"));
        _html(target, ["activity", "former", "teacher"], _(".jigsaw-former-teacher"));

        _html(target, ["common", "material", "text"], _(".jigsaw-tool"));
        _(".jigsaw-link").html(transformLink(target.common.material.link));
        _(".jigsaw-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        _reject();
        _inject($inject);
        return $node;

    }else if(type === "pyramid"){
        $node = $("#preview-activity-pyramid").clone().removeAttr("id");
        _inject($node);

        _(".activity-logo").attr("src", `${path}pyramid-icon.png`);
        _(".activity-number").html(`活动${number}：`);
        _html(target, ["activity", "name"], _(".activity-name"));

        _html(target, ["activity", "question"], _(".pyramid-question"));
        _html(target, ["activity", "floor", "top"], _(".pyramid-floor-top"));
        _html(target, ["activity", "floor", "middle"], _(".pyramid-floor-middle"));
        _html(target, ["activity", "floor", "bottom"], _(".pyramid-floor-bottom"));

        _html(target, ["common", "material", "text"], _(".pyramid-tool"));
        _(".pyramid-link").html(transformLink(target.common.material.link));
        _(".pyramid-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        _reject();
        _inject($inject);
        return $node;

    }else{
        return null;
    }

    function hideEmptyMaterial(){
        if(_(".tool-tr").find("td:last-child").html() === ""){
            _(".tool-tr").addClass("hidden");
        }
        if(_(".link-tr").find("td:last-child").html() === ""){
            _(".link-tr").addClass("hidden");
        }
        if(_(".file-tr").find("td:last-child").html() === ""){
            _(".file-tr").addClass("hidden");
        }
    }
}






/**
 * 处理material-link的数组 将之转为可填入表格中的数据格式
 * @param {Array<Object>} links
 */
function transformLink(links){
    if(links == "") return "";

    let str = "";
    links.forEach(link => {
        str += `
            ${link.describe} - ${link.url}<br />
        `
    });
    return str;
}



/**
 * 处理material-file的数组，将之转为可填入表格中的数据格式
 * @param {Array<Object>} files 
 */
function transformFile(files){
    if(files === "") return "";

    let str = "", 
        $appendix = $("#appendixZone");
    files.forEach((file, index) => {
        if(index != 0){
            str += ", ";
        }
        str += file.filename;
        $appendix.append(`
            <p data-path="${(file.path).replace("./upload/", "")}">${file.filename}</p>
        `);
    });
    return str;
}