/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-23 04:13:55 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-04-15 22:30:05
 */

import { common as $$ } from "../../common/common";
import { SESSION_INFO } from "../../saveload/saveload";


/**
 * 将数据从DB.activity中取出 注入preview中的activity-wrapper，
 * 生成一个<section class="activity"></section>
 * @param {String} type activity类型
 * @param {Object} target 对象的activity节点
 * @param {Number} numebr activity自身的活动序号
 *  
 */
export default function injectPreviewCourseActivity(type, target, number){
    let $node,
        path = "image/activities/",
        $inject = $$._();

    if(type === "pair"){
        $node = $("#preview-activity-pair").clone().removeAttr("id");
        $$.inject($node);

        $$._(".activity-logo").attr("src", `${path}pair-icon.png`);
        $$._(".activity-number").html(`活动${number}：`);
        $$.html(target, ["activity","name"], $$._(".activity-name"));

        $$.html(target, ["activity", "student", "think"], $$._(".pair-student-think"));
        $$.html(target, ["activity", "student", "pair"], $$._(".pair-student-pair"));
        $$.html(target, ["activity", "student", "share"], $$._(".pair-student-share"));
        $$.html(target, ["activity", "teacher", "think"], $$._(".pair-teacher-think"));
        $$.html(target, ["activity", "teacher", "pair"], $$._(".pair-teacher-pair"));
        $$.html(target, ["activity", "teacher", "share"], $$._(".pair-teacher-share"));

        $$.html(target, ["common", "material", "text"], $$._(".pair-tool"));
        $$._(".pair-link").html(transformLink(target.common.material.link));
        $$._(".pair-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        $$.reject();
        $$.inject($inject);
        return $node;

    }else if(type === "game"){
        $node = $("#preview-activity-game").clone().removeAttr("id");
        $$.inject($node);

        $$._(".activity-logo").attr("src", `${path}game-icon.png`);
        $$._(".activity-number").html(`活动${number}：`);
        $$.html(target, ["activity", "name"], $$._(".activity-name"));

        $$.html(target, ["activity", "rule"], $$._(".game-rule"));
        $$.html(target, ["activity", "place"], $$._(".game-place"));
        $$.html(target, ["activity", "student"], $$._(".game-student"));
        $$.html(target, ["activity", "teacher"], $$._(".game-teacher"));
        $$.html(target, ["activity", "reward"], $$._(".game-reward"));

        $$.html(target, ["common", "material", "text"], $$._(".game-tool"));
        $$._(".game-link").html(transformLink(target.common.material.link));
        $$._(".game-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        $$.reject();
        $$.inject($inject);
        return $node;

    }else if(type === "exp"){
        $node = $("#preview-activity-exp").clone().removeAttr("id");
        $$.inject($node);

        $$._(".activity-logo").attr("src", `${path}exp-icon.png`);
        $$._(".activity-number").html(`活动${number}：`);
        $$.html(target, ["activity", "name"], $$._(".activity-name"));

        $$.html(target, ["activity", "step"], $$._(".exp-step"));
        $$.html(target, ["activity", "environment"], $$._(".exp-place"));
        $$.html(target, ["activity", "student"], $$._(".exp-student"));
        $$.html(target, ["activity", "teacher"], $$._(".exp-teacher"));

        $$.html(target, ["common", "material", "text"], $$._(".exp-tool"));
        $$._(".exp-link").html(transformLink(target.common.material.link));
        $$._(".exp-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        $$.reject();
        $$.inject($inject);
        return $node;

    }else if(type === "roleplay"){
        $node = $("#preview-activity-roleplay").clone().removeAttr("id");
        $$.inject($node);

        $$._(".activity-logo").attr("src", `${path}roleplay-icon.png`);
        $$._(".activity-number").html(`活动${number}：`);
        $$.html(target, ["activity", "name"], $$._(".activity-name"));

        $$.html(target, ["activity", "setting"], $$._(".roleplay-setting"));
        $$.html(target, ["activity", "student", "describe"], $$._(".roleplay-student-describe"));
        $$.html(target, ["activity", "student", "show"], $$._(".roleplay-student-show"));
        $$.html(target, ["activity", "student", "evaluate"], $$._(".roleplay-student-evaluate"));
        $$.html(target, ["activity", "teacher", "describe"], $$._(".roleplay-teacher-describe"));
        $$.html(target, ["activity", "teacher", "show"], $$._(".roleplay-teacher-show"));
        $$.html(target, ["activity", "teacher", "evaluate"], $$._(".roleplay-teacher-evaluate"));

        $$.html(target, ["common", "material", "text"], $$._(".roleplay-tool"));
        $$._(".roleplay-link").html(transformLink(target.common.material.link));
        $$._(".roleplay-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        $$.reject();
        $$.inject($inject);
        return $node;

    }else if(type === "jigsaw"){
        $node = $("#preview-activity-jigsaw").clone().removeAttr("id");
        $$.inject($node);

        $$._(".activity-logo").attr("src", `${path}jigsaw-icon.png`);
        $$._(".activity-number").html(`活动${number}：`);
        $$.html(target, ["activity", "name"], $$._(".activity-name"));

        $$.html(target, ["activity", "expert", "task"], $$._(".jigsaw-expert-task"));
        $$.html(target, ["activity", "expert", "student"], $$._(".jigsaw-expert-student"));
        $$.html(target, ["activity", "expert", "teacher"], $$._(".jigsaw-expert-teacher"));
        $$.html(target, ["activity", "former", "task"], $$._(".jigsaw-former-task"));
        $$.html(target, ["activity", "former", "student"], $$._(".jigsaw-former-student"));
        $$.html(target, ["activity", "former", "teacher"], $$._(".jigsaw-former-teacher"));

        $$.html(target, ["common", "material", "text"], $$._(".jigsaw-tool"));
        $$._(".jigsaw-link").html(transformLink(target.common.material.link));
        $$._(".jigsaw-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        $$.reject();
        $$.inject($inject);
        return $node;

    }else if(type === "pyramid"){
        $node = $("#preview-activity-pyramid").clone().removeAttr("id");
        $$.inject($node);

        $$._(".activity-logo").attr("src", `${path}pyramid-icon.png`);
        $$._(".activity-number").html(`活动${number}：`);
        $$.html(target, ["activity", "name"], $$._(".activity-name"));

        $$.html(target, ["activity", "question"], $$._(".pyramid-question"));
        $$.html(target, ["activity", "floor", "top"], $$._(".pyramid-floor-top"));
        $$.html(target, ["activity", "floor", "middle"], $$._(".pyramid-floor-middle"));
        $$.html(target, ["activity", "floor", "bottom"], $$._(".pyramid-floor-bottom"));

        $$.html(target, ["common", "material", "text"], $$._(".pyramid-tool"));
        $$._(".pyramid-link").html(transformLink(target.common.material.link));
        $$._(".pyramid-file").html(transformFile(target.common.material.file));
        hideEmptyMaterial();

        $$.reject();
        $$.inject($inject);
        return $node;

    }else{
        return null;
    }

    function hideEmptyMaterial(){
        if($$._(".tool-tr").find("td:last-child").html() === ""){
            $$._(".tool-tr").addClass("hidden");
        }
        if($$._(".link-tr").find("td:last-child").html() === ""){
            $$._(".link-tr").addClass("hidden");
        }
        if($$._(".file-tr").find("td:last-child").html() === ""){
            $$._(".file-tr").addClass("hidden");
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
    let userid = SESSION_INFO.userid,
        username = SESSION_INFO.username,
        path = `./userdata/${userid}_${username}/upload/`;

    let str = "", 
        $appendix = $("#appendixZone");
    files.forEach((file, index) => {
        if(index != 0){
            str += ", ";
        }
        str += file.filename;
        $appendix.append(`
            <p data-path="${(file.path).replace(path, "")}">${file.filename}</p>
        `);
    });
    return str;
}