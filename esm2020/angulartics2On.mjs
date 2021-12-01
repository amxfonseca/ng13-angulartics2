import { Directive, Input, NgModule } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./angulartics2-core";
export class Angulartics2On {
    constructor(elRef, angulartics2, renderer) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.renderer = renderer;
        this.angularticsProperties = {};
    }
    ngAfterContentInit() {
        this.renderer.listen(this.elRef.nativeElement, this.angulartics2On || 'click', (event) => this.eventTrack(event));
    }
    eventTrack(event) {
        const action = this.angularticsAction; // || this.inferEventName();
        const properties = {
            ...this.angularticsProperties,
            eventType: event.type,
        };
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action,
            properties,
        });
    }
}
Angulartics2On.ɵfac = function Angulartics2On_Factory(t) { return new (t || Angulartics2On)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.Angulartics2), i0.ɵɵdirectiveInject(i0.Renderer2)); };
Angulartics2On.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: Angulartics2On, selectors: [["", "angulartics2On", ""]], inputs: { angulartics2On: "angulartics2On", angularticsAction: "angularticsAction", angularticsCategory: "angularticsCategory", angularticsLabel: "angularticsLabel", angularticsValue: "angularticsValue", angularticsProperties: "angularticsProperties" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2On, [{
        type: Directive,
        args: [{ selector: '[angulartics2On]' }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.Angulartics2 }, { type: i0.Renderer2 }]; }, { angulartics2On: [{
            type: Input,
            args: ['angulartics2On']
        }], angularticsAction: [{
            type: Input
        }], angularticsCategory: [{
            type: Input
        }], angularticsLabel: [{
            type: Input
        }], angularticsValue: [{
            type: Input
        }], angularticsProperties: [{
            type: Input
        }] }); })();
export class Angulartics2OnModule {
}
Angulartics2OnModule.ɵfac = function Angulartics2OnModule_Factory(t) { return new (t || Angulartics2OnModule)(); };
Angulartics2OnModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: Angulartics2OnModule });
Angulartics2OnModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({});
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2OnModule, [{
        type: NgModule,
        args: [{
                declarations: [Angulartics2On],
                exports: [Angulartics2On],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Angulartics2OnModule, { declarations: [Angulartics2On], exports: [Angulartics2On] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyT24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2FuZ3VsYXJ0aWNzMk9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFjLEtBQUssRUFBRSxRQUFRLEVBQWEsTUFBTSxlQUFlLENBQUM7OztBQUlwRyxNQUFNLE9BQU8sY0FBYztJQVN6QixZQUNVLEtBQWlCLEVBQ2pCLFlBQTBCLEVBQzFCLFFBQW1CO1FBRm5CLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUxwQiwwQkFBcUIsR0FBUSxFQUFFLENBQUM7SUFNdEMsQ0FBQztJQUVKLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU8sRUFBRSxDQUFDLEtBQVksRUFBRSxFQUFFLENBQzlGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQ3ZCLENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVk7UUFDckIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsNEJBQTRCO1FBQ25FLE1BQU0sVUFBVSxHQUFRO1lBQ3RCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQjtZQUM3QixTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUk7U0FDdEIsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUMxQztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNoQyxNQUFNO1lBQ04sVUFBVTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7OzRFQTFDVSxjQUFjO2lFQUFkLGNBQWM7dUZBQWQsY0FBYztjQUQxQixTQUFTO2VBQUMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7Z0hBR2hCLGNBQWM7a0JBQXRDLEtBQUs7bUJBQUMsZ0JBQWdCO1lBQ2QsaUJBQWlCO2tCQUF6QixLQUFLO1lBQ0csbUJBQW1CO2tCQUEzQixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ0cscUJBQXFCO2tCQUE3QixLQUFLOztBQW9EUixNQUFNLE9BQU8sb0JBQW9COzt3RkFBcEIsb0JBQW9CO3NFQUFwQixvQkFBb0I7O3VGQUFwQixvQkFBb0I7Y0FKaEMsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzFCOzt3RkFDWSxvQkFBb0IsbUJBM0RwQixjQUFjLGFBQWQsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE5nTW9kdWxlLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbYW5ndWxhcnRpY3MyT25dJyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMk9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnYW5ndWxhcnRpY3MyT24nKSBhbmd1bGFydGljczJPbjogc3RyaW5nO1xuICBASW5wdXQoKSBhbmd1bGFydGljc0FjdGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBhbmd1bGFydGljc0NhdGVnb3J5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFuZ3VsYXJ0aWNzTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgYW5ndWxhcnRpY3NWYWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBhbmd1bGFydGljc1Byb3BlcnRpZXM6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmFuZ3VsYXJ0aWNzMk9uIHx8ICdjbGljaycsIChldmVudDogRXZlbnQpID0+XG4gICAgICB0aGlzLmV2ZW50VHJhY2soZXZlbnQpLFxuICAgICk7XG4gIH1cblxuICBldmVudFRyYWNrKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuYW5ndWxhcnRpY3NBY3Rpb247IC8vIHx8IHRoaXMuaW5mZXJFdmVudE5hbWUoKTtcbiAgICBjb25zdCBwcm9wZXJ0aWVzOiBhbnkgPSB7XG4gICAgICAuLi50aGlzLmFuZ3VsYXJ0aWNzUHJvcGVydGllcyxcbiAgICAgIGV2ZW50VHlwZTogZXZlbnQudHlwZSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuYW5ndWxhcnRpY3NDYXRlZ29yeSkge1xuICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSA9IHRoaXMuYW5ndWxhcnRpY3NDYXRlZ29yeTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYW5ndWxhcnRpY3NMYWJlbCkge1xuICAgICAgcHJvcGVydGllcy5sYWJlbCA9IHRoaXMuYW5ndWxhcnRpY3NMYWJlbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuYW5ndWxhcnRpY3NWYWx1ZSkge1xuICAgICAgcHJvcGVydGllcy52YWx1ZSA9IHRoaXMuYW5ndWxhcnRpY3NWYWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrLm5leHQoe1xuICAgICAgYWN0aW9uLFxuICAgICAgcHJvcGVydGllcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qcHJpdmF0ZSBpc0NvbW1hbmQoKSB7XG4gICAgcmV0dXJuIFsnYTonLCAnYnV0dG9uOicsICdidXR0b246YnV0dG9uJywgJ2J1dHRvbjpzdWJtaXQnLCAnaW5wdXQ6YnV0dG9uJywgJ2lucHV0OnN1Ym1pdCddLmluZGV4T2YoXG4gICAgICBnZXRET00oKS50YWdOYW1lKHRoaXMuZWwpLnRvTG93ZXJDYXNlKCkgKyAnOicgKyAoZ2V0RE9NKCkudHlwZSh0aGlzLmVsKSB8fCAnJykpID49IDA7XG4gIH1cblxuICBwcml2YXRlIGluZmVyRXZlbnROYW1lKCkge1xuICAgIGlmICh0aGlzLmlzQ29tbWFuZCgpKSByZXR1cm4gZ2V0RE9NKCkuZ2V0VGV4dCh0aGlzLmVsKSB8fCBnZXRET00oKS5nZXRWYWx1ZSh0aGlzLmVsKTtcbiAgICByZXR1cm4gZ2V0RE9NKCkuZ2V0UHJvcGVydHkodGhpcy5lbCwgJ2lkJykgfHwgZ2V0RE9NKCkuZ2V0UHJvcGVydHkodGhpcy5lbCwgJ25hbWUnKSB8fCBnZXRET00oKS50YWdOYW1lKHRoaXMuZWwpO1xuICB9Ki9cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQW5ndWxhcnRpY3MyT25dLFxuICBleHBvcnRzOiBbQW5ndWxhcnRpY3MyT25dLFxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJPbk1vZHVsZSB7fVxuIl19