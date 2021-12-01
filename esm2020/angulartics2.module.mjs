import { NgModule } from '@angular/core';
import { AngularRouterTracking } from './angular-router';
import { Angulartics2 } from './angulartics2-core';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { Angulartics2On, Angulartics2OnModule } from './angulartics2On';
import { RouterlessTracking } from './routerless';
import * as i0 from "@angular/core";
export class Angulartics2Module {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2Module,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                { provide: RouterlessTracking, useClass: AngularRouterTracking },
                Angulartics2,
            ],
        };
    }
}
Angulartics2Module.ɵfac = function Angulartics2Module_Factory(t) { return new (t || Angulartics2Module)(); };
Angulartics2Module.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: Angulartics2Module });
Angulartics2Module.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[Angulartics2OnModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Module, [{
        type: NgModule,
        args: [{
                imports: [Angulartics2OnModule],
                exports: [Angulartics2On],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Angulartics2Module, { imports: [Angulartics2OnModule], exports: [Angulartics2On] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYW5ndWxhcnRpY3MyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFNbEQsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixNQUFNLENBQUMsT0FBTyxDQUNaLFdBQTBDLEVBQUU7UUFFNUMsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN2RCxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUU7Z0JBQ2hFLFlBQVk7YUFDYjtTQUNGLENBQUM7SUFDSixDQUFDOztvRkFaVSxrQkFBa0I7b0VBQWxCLGtCQUFrQjt3RUFIcEIsQ0FBQyxvQkFBb0IsQ0FBQzt1RkFHcEIsa0JBQWtCO2NBSjlCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDL0IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzFCOzt3RkFDWSxrQkFBa0IsY0FIbkIsb0JBQW9CLGFBQ3BCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFyUm91dGVyVHJhY2tpbmcgfSBmcm9tICcuL2FuZ3VsYXItcm91dGVyJztcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMlNldHRpbmdzIH0gZnJvbSAnLi9hbmd1bGFydGljczItY29uZmlnJztcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuaW1wb3J0IHsgQU5HVUxBUlRJQ1MyX1RPS0VOIH0gZnJvbSAnLi9hbmd1bGFydGljczItdG9rZW4nO1xuaW1wb3J0IHsgQW5ndWxhcnRpY3MyT24sIEFuZ3VsYXJ0aWNzMk9uTW9kdWxlIH0gZnJvbSAnLi9hbmd1bGFydGljczJPbic7XG5pbXBvcnQgeyBSb3V0ZXJsZXNzVHJhY2tpbmcgfSBmcm9tICcuL3JvdXRlcmxlc3MnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQW5ndWxhcnRpY3MyT25Nb2R1bGVdLFxuICBleHBvcnRzOiBbQW5ndWxhcnRpY3MyT25dLFxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBzZXR0aW5nczogUGFydGlhbDxBbmd1bGFydGljczJTZXR0aW5ncz4gPSB7fSxcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBbmd1bGFydGljczJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJ0aWNzMk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEFOR1VMQVJUSUNTMl9UT0tFTiwgdXNlVmFsdWU6IHsgc2V0dGluZ3MgfSB9LFxuICAgICAgICB7IHByb3ZpZGU6IFJvdXRlcmxlc3NUcmFja2luZywgdXNlQ2xhc3M6IEFuZ3VsYXJSb3V0ZXJUcmFja2luZyB9LFxuICAgICAgICBBbmd1bGFydGljczIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==