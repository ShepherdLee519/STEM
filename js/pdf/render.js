$(function () {
    _hello("render");

    let downPdf = $("#renderPDF");
    downPdf.click(() => {
        html2canvas(document.body, {
            allowTaint: true,
            taintTest: false,
            scale: '2',
            background: '#fff',
            onrendered: function (canvas) {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                //一页pdf显示html页面生成的canvas高度;
                var pageHeight = contentWidth / 592.28 * 841.89;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //pdf页面偏移
                var position = 0;

 
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 595.28;
                var imgHeight = 592.28 / contentWidth * contentHeight;

                // var imgWidth = 555.28;  //左右边距20
                // var imgHeight = 555.28/contentWidth * contentHeight;  //左右边距20

                var pageData = canvas.toDataURL('image/jpeg', 1.0);

                var pdf = new jsPDF('', 'pt', 'a4');

                //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                //当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        //避免添加空白页
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }

                // let zoneHeights = [], index = 0;
                // for(let zone of [...$(".zone")]){
                //     zoneHeights.push(Number.parseFloat($(zone).css("height")));
                // };
                // let len = zoneHeights.length;

                // if(leftHeight < pageHeight) {
                //     pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight);
                // }else{
                //     while(leftHeight > 0){
                //         let sum = 0;
                //         for(let i = index; i < len; i++){
                //             if(sum + zoneHeights[index] < pageHeight){
                //                 sum += zoneHeights[index];
                //             }else{
                //                 index = i;
                //                 break;
                //             }
                //         }
                //         pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                //         leftHeight -= sum;
                //         position -= 841.89;
                //         //避免添加空白页
                //         if (leftHeight > 0) {
                //             pdf.addPage();
                //         }
                //     }
                // }
                

                pdf.save('content.pdf');
                // var datauri = pdf.output('dataurlstring');
                // //去掉前面的字符串后，就是文件的加密字符串
                // var base64 = datauri.substring(28);
                // $.post("./save.php", {data:base64}, (res) => {
                //     console.log(res);
                // });
            }
        })
    });

    $(".cover-title").click(() => {
        render();
    })
});



function render(){
    $("#renderPDF").click();
}