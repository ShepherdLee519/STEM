/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-23 03:37:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:05:50
 */

import { common as $$ } from "../common/common";
import { DATA } from "../saveload/saveload";
import injectPreviewCover from "./inject/cover";
import injectPreviewTheme from "./inject/theme";
import injectPreviewCoreQuestion from "./inject/coreQuestion";
import injectPreviewTaskzone from "./inject/taskzone";
import injectPreviewCourse from "./inject/course";


$(function(){
    $$.hello("inject");
});

/**
 * 调用inject/下的各个函数，将数据注入preview中
 */
export default function injectPreview(){
    injectPreviewCover();
    injectPreviewTheme();
    injectPreviewCoreQuestion();
    if($$.isundef(DATA) || $$.isundef(DATA.tasktype)) return;
    injectPreviewTaskzone();
    injectPreviewCourse();
}