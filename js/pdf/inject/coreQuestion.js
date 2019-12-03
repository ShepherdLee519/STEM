/**
 * author: Shepherd.Lee
 * Date: 2019-09-21
 * info: 从QUESTION中加载数据到#preview-container中的#coreQuestionZone
 *      
 */

$(function(){
    // _hello("inject-coreQuestion");
});


/**
 * 将数据从QUESTION中取出 注入preview中的#coreQuestionZone
 */
function injectPreviewCoreQuestion(){
    log("    No.03 coreQuestion");

    _inject($("#coreQuestionZone"));

    //STD见desing-objectives.js
    STD.forEach((std) => {
        let str = "";
        stdData[std].forEach(standard => {
            str += `<li>${standard}</li>`
        });
        _(`.coreQuestion-standard-${std}`).html(str);

        str = "";
        let std_suffix = std.substring(0,1).toUpperCase() + "-Q";
        if(_isundef(QUESTION) || _isundef(QUESTION["coreQuestion"])) return;
        QUESTION["coreQuestion"][std].forEach((question, index) => {
            str += `
            <li><span class="coreQuestion-number">${std_suffix + (index+1)}</span>
                    <span class="coreQuestion-content">${question}</span></li>
            `.trim();
        });
        _(`.coreQuestion-question-${std}`).html(str);
    });

    _reject();
}