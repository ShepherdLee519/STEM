/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-23 03:28:41 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-04-15 22:04:04
 */

import { common as $$ } from '../common/common';
import { SESSION_INFO } from './../saveload/saveload';

let $modal = $("#savePdfModal");
$modal.appendTo($("body").eq(0));

var RENDER_MODAL; // 全局的控制生成pdf的模态框的对象

RENDER_MODAL = new renderModal(); // 初始化save_pdf_modal的相关事件处理

initRenderPDF(); // 初始化渲染pdf
initRenderBtnHandler(); // 初始化提交报告按钮的点击事件


/**
 * 初始化save_pdf_modal的相关事件处理
 * modal_id: savePdfModal
 */
function renderModal(){
    let $modal = $("#savePdfModal"),
        that = this;

    this.hideBody = () => {
        $$.inject($modal);
        let $uploading = $$._("#savePdf-uploading");
        let $uploaded = $$._("#savePdf-uploaded");
        $$.reject();

        $$.hide([$uploading, $uploaded]);
    };
    this.exist = () => {
        let userid = SESSION_INFO.userid;
        let username = SESSION_INFO.username; 
        let result;
        $$.async();
        $.post("./php/pdf/pdf_check.php", 
            {userid: userid, username: username},
            (res) => {
            result = res;
        });
        $$.async();
        return result;
    };
    this.open = () => {
        $$.inject($modal);
        let $uploading = $$._("#savePdf-uploading");
        $$.reject();

        that.hideBody();
        $uploading.removeClass("hidden");
        $modal.modal("show");
    };
    this.uploaded = () => {
        $$.inject($modal);
        let $uploaded = $$._("#savePdf-uploaded");
        $$.reject();
        that.hideBody();
        $uploaded.removeClass("hidden");
    };
    this.close = () => {
        $modal.modal("hide");
    };
}


/**
 * 渲染pdf的主要操作
 */
function initRenderPDF(){
    let downPdf = $("#renderPDF");
    downPdf.click(() => {
    html2canvas(document.querySelector("#preview-container"), {
        allowTaint: true, 
        taintTest: false,
        scale: '2',
        background: '#fff',

        onrendered: canvas => {
            let contentWidth    = canvas.width,
                contentHeight   = canvas.height,

                //一页pdf显示html页面生成的canvas高度;
                pageHeight = contentWidth / 592.28 * 841.89,
                //未生成pdf的html页面高度
                leftHeight = contentHeight,
                //pdf页面偏移
                position = 0;


            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            let imgWidth    = 555.28,  //左右边距20
                imgHeight   = 555.28/contentWidth * contentHeight;  //左右边距20

            let pageData = canvas.toDataURL('image/jpeg', 1.0),
                pdf = new jsPDF('', 'pt', 'a4');

            //当内容未超过pdf一页显示的范围，无需分页
            if(leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
            }else{
                while(leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;

                    //避免添加空白页
                    if(leftHeight > 0){
                        pdf.addPage();
                    }
                }
            }

            // pdf.save('content.pdf');
            let datauri = pdf.output('dataurlstring');
            //去掉前面的字符串后，就是文件的加密字符串
            let base64 = datauri.substring(28);

            // let userid = sessionStorage.getItem("userid"),
            //     username = sessionStorage.getItem("username");
            let userid = SESSION_INFO.userid;
            let username = SESSION_INFO.username;

            $.post("./php/pdf/pdf_save.php", 
                {
                    data: base64, 
                    paths: getAppendixes(),
                    userid: userid,
                    username: username
                }, (res) => {
                console.log('reaction');
                if(res){
                    console.log(res);
                    RENDER_MODAL.uploaded();
                }
            });
        }//onrendered
    })//html2canvas
    });//downPdf.click
}


/**
 * 从appendixZone中获取附件的path封装成数组返回
 * 该paths返回数组需要以参数形式post用于形成报告的附件
 */
function getAppendixes(){
    let paths = [];
    [...$("#appendixZone").children()].forEach(appendix => {
        paths.push($(appendix).attr("data-path"));
    });
    return paths;
}


/**
 * 初始化提交报告按钮的点击事件
 */
function initRenderBtnHandler(){
    $("#savePDF").click(() => {
        console.log("生成中......");
        RENDER_MODAL.open();
        $("#renderPDF").click();
        return false;
    });

    $("#downloadPDF").click(() => {
        if(RENDER_MODAL.exist() == 0){
            alert("您尚未提交过报告");
            return false;
        }else{
            let userid = SESSION_INFO.userid;
            let username = SESSION_INFO.username;
            let $a = $(`<a href="./userdata/${userid}_${username}/report.zip" download></a>`);
            $("body").eq(0).append($a);
            $a[0].click();
            $a.remove();
            return false;
        }
    });
}