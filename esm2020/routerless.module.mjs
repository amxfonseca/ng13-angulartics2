import { NgModule } from '@angular/core';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { Angulartics2OnModule } from './angulartics2On';
import { Angulartics2 } from './angulartics2-core';
import { RouterlessTracking } from './routerless';
import * as i0 from "@angular/core";
export class Angulartics2RouterlessModule {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2RouterlessModule,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                RouterlessTracking,
                Angulartics2,
            ],
        };
    }
}
Angulartics2RouterlessModule.ɵfac = function Angulartics2RouterlessModule_Factory(t) { return new (t || Angulartics2RouterlessModule)(); };
Angulartics2RouterlessModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: Angulartics2RouterlessModule });
Angulartics2RouterlessModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[Angulartics2OnModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2RouterlessModule, [{
        type: NgModule,
        args: [{
                imports: [Angulartics2OnModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Angulartics2RouterlessModule, { imports: [Angulartics2OnModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVybGVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3JvdXRlcmxlc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBS2hELE1BQU0sT0FBTyw0QkFBNEI7SUFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FDWixXQUEwQyxFQUFFO1FBRTVDLE9BQU87WUFDTCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdkQsa0JBQWtCO2dCQUNsQixZQUFZO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7d0dBWlUsNEJBQTRCOzhFQUE1Qiw0QkFBNEI7a0ZBRjlCLENBQUMsb0JBQW9CLENBQUM7dUZBRXBCLDRCQUE0QjtjQUh4QyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7YUFDaEM7O3dGQUNZLDRCQUE0QixjQUY3QixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FOR1VMQVJUSUNTMl9UT0tFTn0gZnJvbSAnLi9hbmd1bGFydGljczItdG9rZW4nO1xuaW1wb3J0IHtBbmd1bGFydGljczJTZXR0aW5nc30gZnJvbSAnLi9hbmd1bGFydGljczItY29uZmlnJztcbmltcG9ydCB7QW5ndWxhcnRpY3MyT25Nb2R1bGV9IGZyb20gJy4vYW5ndWxhcnRpY3MyT24nO1xuaW1wb3J0IHtBbmd1bGFydGljczJ9IGZyb20gJy4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuaW1wb3J0IHtSb3V0ZXJsZXNzVHJhY2tpbmd9IGZyb20gJy4vcm91dGVybGVzcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtBbmd1bGFydGljczJPbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMlJvdXRlcmxlc3NNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBzZXR0aW5nczogUGFydGlhbDxBbmd1bGFydGljczJTZXR0aW5ncz4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFuZ3VsYXJ0aWNzMlJvdXRlcmxlc3NNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJ0aWNzMlJvdXRlcmxlc3NNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBBTkdVTEFSVElDUzJfVE9LRU4sIHVzZVZhbHVlOiB7IHNldHRpbmdzIH0gfSxcbiAgICAgICAgUm91dGVybGVzc1RyYWNraW5nLFxuICAgICAgICBBbmd1bGFydGljczIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==