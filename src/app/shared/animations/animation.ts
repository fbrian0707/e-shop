import { animate, state, style, transition, trigger } from '@angular/animations';



export const slideIn = trigger('slideIn', [
state('*', style({
    transform: 'translateX(150%)'
})),
state('in', style({
    transform: 'translateX(0%)'
})),
state('out', style({
    transform: 'translateX(-100%)'
})),
transition('* => in', animate('400ms ease-out')),
transition('in => out', animate('400ms ease-out')),
]);

export const slideUp = trigger('slideUp', [
    state('down', style({
        opacity: '0'
    })),
    state('up', style({
        opacity: '1'
    })),
    transition('down => up', animate('400ms ease-in', style({ backgroundColor: 'red'})))
]);
