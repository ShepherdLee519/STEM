/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 00:16:14 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-04-13 21:56:43
 */

import { zones } from './zones';

const $toggleBtn = $('#togglebtn');

function addAnimations(type) {
    zones[0].addClass(`${type}-objectives`);
    zones[1].addClass(`${type}-tasks`);
    zones[2].addClass(`${type}-activities`);
}

function removeAnimations() {
    zones.forEach(zone => {
        let zone_class = $(zone).attr('class');
        zone_class = (zone_class.split(' '))[0];
        $(zone).attr('class', zone_class);
    });
}

$toggleBtn.click(function() {
    const right = '&gt;&gt;', left = '&lt;&lt;';
    removeAnimations();

    switch( $(this).attr('data-direction') ) {
        case 'left':
            $(this).html(right);
            $(this).attr('data-direction', 'right');
            addAnimations('toggleRight');
            break;
        case 'right':
            $(this).html(left);
            $(this).attr('data-direction', 'left');
            addAnimations('toggleLeft');
            break;
    }
});


export function toggleTrigger(type) {
    return new Promise(function(resolve) {
        let direction = $toggleBtn.attr('data-direction');

        switch(type) {
            case 'on':
                if(direction === 'left') resolve();
                break;
            case 'off':
                if(direction === 'right') resolve();
                break;
        }
    }).then( () => {
        $toggleBtn.click();
    });
}