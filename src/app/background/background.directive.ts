// Thanks to: https://gist.github.com/ghprod/314cd43a32a417f176d39a6084af5829
import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[background-image]'
})
export class BackgroundImage {
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input('background-image') path: string;

    ngAfterViewInit() {
        this.el.style.backgroundImage = 'url(' + this.path + ')';
    }
}
