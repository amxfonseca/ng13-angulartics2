import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { delay, filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
export class AngularRouterTracking {
    constructor(router, location) {
        this.router = router;
        this.location = location;
    }
    trackLocation(settings) {
        return this.router.events.pipe(filter(e => e instanceof NavigationEnd), filter(() => !settings.developerMode), map((e) => {
            return { url: e.urlAfterRedirects };
        }), delay(0));
    }
    prepareExternalUrl(url) {
        return this.location.prepareExternalUrl(url);
    }
}
AngularRouterTracking.ɵfac = function AngularRouterTracking_Factory(t) { return new (t || AngularRouterTracking)(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.Location)); };
AngularRouterTracking.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AngularRouterTracking, factory: AngularRouterTracking.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AngularRouterTracking, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Router }, { type: i2.Location }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2FuZ3VsYXItcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBS3BEOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFvQixNQUFjLEVBQVUsUUFBa0I7UUFBMUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBRyxDQUFDO0lBRWxFLGFBQWEsQ0FBQyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksYUFBYSxDQUFDLEVBQ3ZDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFDckMsR0FBRyxDQUFDLENBQUMsQ0FBZ0IsRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEMsQ0FBQyxDQUFDLEVBQ0YsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQsa0JBQWtCLENBQUMsR0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7MEZBaEJVLHFCQUFxQjsyRUFBckIscUJBQXFCLFdBQXJCLHFCQUFxQixtQkFEUixNQUFNO3VGQUNuQixxQkFBcUI7Y0FEakMsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IGRlbGF5LCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUm91dGVybGVzc1RyYWNraW5nLCBUcmFja05hdmlnYXRpb25FbmQgfSBmcm9tICcuL3JvdXRlcmxlc3MnO1xuXG4vKipcbiAqIFRyYWNrIFJvdXRlIGNoYW5nZXMgZm9yIGFwcGxpY2F0aW9ucyB1c2luZyBBbmd1bGFyJ3NcbiAqIGRlZmF1bHQgcm91dGVyXG4gKlxuICogQGxpbmsgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9yb3V0ZXIvUm91dGVyXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhclJvdXRlclRyYWNraW5nIGltcGxlbWVudHMgUm91dGVybGVzc1RyYWNraW5nIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHt9XG5cbiAgdHJhY2tMb2NhdGlvbihzZXR0aW5ncyk6IE9ic2VydmFibGU8VHJhY2tOYXZpZ2F0aW9uRW5kPiB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmV2ZW50cy5waXBlKFxuICAgICAgZmlsdGVyKGUgPT4gZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLFxuICAgICAgZmlsdGVyKCgpID0+ICFzZXR0aW5ncy5kZXZlbG9wZXJNb2RlKSxcbiAgICAgIG1hcCgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICByZXR1cm4geyB1cmw6IGUudXJsQWZ0ZXJSZWRpcmVjdHMgfTtcbiAgICAgIH0pLFxuICAgICAgZGVsYXkoMCksXG4gICAgKTtcbiAgfVxuXG4gIHByZXBhcmVFeHRlcm5hbFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKHVybCk7XG4gIH1cbn1cbiJdfQ==