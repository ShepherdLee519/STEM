/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-20 04:07:12 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 17:04:33
 */

import { common as $$ } from "../common/common";
import { togglePanelHandler } from "./handlers/activity.toggle";
import { selectActivityHandler } from "./handlers/activity.select";
import { dynamicActivityHandler } from "./handlers/activity.dynamic";
import { editActivityHandler } from "./handlers/activity.edit";

export const init = $$.once(function(){
    $$.multistep([
        togglePanelHandler,
        selectActivityHandler,
        dynamicActivityHandler,
        editActivityHandler
    ]);
});