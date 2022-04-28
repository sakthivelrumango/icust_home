import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[rumWidgetToggle]'
})
export class RumWidgetToggleDirective {
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    ) {
    }
}
