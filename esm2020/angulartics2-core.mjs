import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DefaultConfig } from './angulartics2-config';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import * as i0 from "@angular/core";
import * as i1 from "./routerless";
export class Angulartics2 {
    constructor(tracker, setup) {
        this.tracker = tracker;
        this.pageTrack = new ReplaySubject(10);
        this.eventTrack = new ReplaySubject(10);
        this.exceptionTrack = new ReplaySubject(10);
        this.setAlias = new ReplaySubject(10);
        this.setUsername = new ReplaySubject(10);
        this.setUserProperties = new ReplaySubject(10);
        this.setUserPropertiesOnce = new ReplaySubject(10);
        this.setSuperProperties = new ReplaySubject(10);
        this.setSuperPropertiesOnce = new ReplaySubject(10);
        this.userTimings = new ReplaySubject(10);
        const defaultConfig = new DefaultConfig();
        this.settings = { ...defaultConfig, ...setup.settings };
        this.settings.pageTracking = {
            ...defaultConfig.pageTracking,
            ...setup.settings.pageTracking,
        };
        this.tracker
            .trackLocation(this.settings)
            .subscribe((event) => this.trackUrlChange(event.url));
    }
    /** filters all events when developer mode is true */
    filterDeveloperMode() {
        return filter((value, index) => !this.settings.developerMode);
    }
    trackUrlChange(url) {
        if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
            const clearedUrl = this.clearUrl(url);
            let path;
            if (this.settings.pageTracking.basePath.length) {
                path = this.settings.pageTracking.basePath + clearedUrl;
            }
            else {
                path = this.tracker.prepareExternalUrl(clearedUrl);
            }
            this.pageTrack.next({ path });
        }
    }
    /**
     * Use string literals or regular expressions to exclude routes
     * from automatic pageview tracking.
     *
     * @param url location
     */
    matchesExcludedRoute(url) {
        for (const excludedRoute of this.settings.pageTracking.excludedRoutes) {
            const matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
            if (matchesRegex || url.indexOf(excludedRoute) !== -1) {
                return true;
            }
        }
        return false;
    }
    /**
     * Removes id's from tracked route.
     *  EX: `/project/12981/feature` becomes `/project/feature`
     *
     * @param url current page path
     */
    clearUrl(url) {
        if (this.settings.pageTracking.clearIds ||
            this.settings.pageTracking.clearQueryParams ||
            this.settings.pageTracking.clearHash) {
            return url
                .split('/')
                .map(part => (this.settings.pageTracking.clearQueryParams ? part.split('?')[0] : part))
                .map(part => (this.settings.pageTracking.clearHash ? part.split('#')[0] : part))
                .filter(part => !this.settings.pageTracking.clearIds ||
                !part.match(this.settings.pageTracking.idsRegExp))
                .join('/');
        }
        return url;
    }
}
Angulartics2.ɵfac = function Angulartics2_Factory(t) { return new (t || Angulartics2)(i0.ɵɵinject(i1.RouterlessTracking), i0.ɵɵinject(ANGULARTICS2_TOKEN)); };
Angulartics2.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2, factory: Angulartics2.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.RouterlessTracking }, { type: undefined, decorators: [{
                type: Inject,
                args: [ANGULARTICS2_TOKEN]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyLWNvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2FuZ3VsYXJ0aWNzMi1jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBNEIsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQXdCLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTVFLE9BQU8sRUFBcUIsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSTdFLE1BQU0sT0FBTyxZQUFZO0lBY3ZCLFlBQ1UsT0FBMkIsRUFDUCxLQUF3QjtRQUQ1QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVpyQyxjQUFTLEdBQUcsSUFBSSxhQUFhLENBQXFCLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELGVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBc0IsRUFBRSxDQUFDLENBQUM7UUFDeEQsbUJBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBTSxFQUFFLENBQUMsQ0FBQztRQUM1QyxhQUFRLEdBQUcsSUFBSSxhQUFhLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDekMsZ0JBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBdUMsRUFBRSxDQUFDLENBQUM7UUFDMUUsc0JBQWlCLEdBQUcsSUFBSSxhQUFhLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDL0MsMEJBQXFCLEdBQUcsSUFBSSxhQUFhLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDbkQsdUJBQWtCLEdBQUcsSUFBSSxhQUFhLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDaEQsMkJBQXNCLEdBQUcsSUFBSSxhQUFhLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDcEQsZ0JBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBYyxFQUFFLENB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QUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDL0UsTUFBTSxDQUNMLElBQUksQ0FBQyxFQUFFLENBQ0wsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRO2dCQUNwQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQ3BEO2lCQUNBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzt3RUF2RlUsWUFBWSxrREFnQmIsa0JBQWtCO2tFQWhCakIsWUFBWSxXQUFaLFlBQVksbUJBREMsTUFBTTt1RkFDbkIsWUFBWTtjQUR4QixVQUFVO2VBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOztzQkFpQjdCLE1BQU07dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbiwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczJTZXR0aW5ncywgRGVmYXVsdENvbmZpZyB9IGZyb20gJy4vYW5ndWxhcnRpY3MyLWNvbmZpZyc7XG5pbXBvcnQgeyBFdmVudFRyYWNrLCBQYWdlVHJhY2ssIFVzZXJUaW1pbmdzIH0gZnJvbSAnLi9hbmd1bGFydGljczItaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBbmd1bGFydGljczJUb2tlbiwgQU5HVUxBUlRJQ1MyX1RPS0VOIH0gZnJvbSAnLi9hbmd1bGFydGljczItdG9rZW4nO1xuaW1wb3J0IHsgUm91dGVybGVzc1RyYWNraW5nLCBUcmFja05hdmlnYXRpb25FbmQgfSBmcm9tICcuL3JvdXRlcmxlc3MnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMiB7XG4gIHNldHRpbmdzOiBBbmd1bGFydGljczJTZXR0aW5ncztcblxuICBwYWdlVHJhY2sgPSBuZXcgUmVwbGF5U3ViamVjdDxQYXJ0aWFsPFBhZ2VUcmFjaz4+KDEwKTtcbiAgZXZlbnRUcmFjayA9IG5ldyBSZXBsYXlTdWJqZWN0PFBhcnRpYWw8RXZlbnRUcmFjaz4+KDEwKTtcbiAgZXhjZXB0aW9uVHJhY2sgPSBuZXcgUmVwbGF5U3ViamVjdDxhbnk+KDEwKTtcbiAgc2V0QWxpYXMgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmc+KDEwKTtcbiAgc2V0VXNlcm5hbWUgPSBuZXcgUmVwbGF5U3ViamVjdDx7IHVzZXJJZDogc3RyaW5nIHwgbnVtYmVyIH0gfCBzdHJpbmc+KDEwKTtcbiAgc2V0VXNlclByb3BlcnRpZXMgPSBuZXcgUmVwbGF5U3ViamVjdDxhbnk+KDEwKTtcbiAgc2V0VXNlclByb3BlcnRpZXNPbmNlID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxMCk7XG4gIHNldFN1cGVyUHJvcGVydGllcyA9IG5ldyBSZXBsYXlTdWJqZWN0PGFueT4oMTApO1xuICBzZXRTdXBlclByb3BlcnRpZXNPbmNlID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxMCk7XG4gIHVzZXJUaW1pbmdzID0gbmV3IFJlcGxheVN1YmplY3Q8VXNlclRpbWluZ3M+KDEwKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRyYWNrZXI6IFJvdXRlcmxlc3NUcmFja2luZyxcbiAgICBASW5qZWN0KEFOR1VMQVJUSUNTMl9UT0tFTikgc2V0dXA6IEFuZ3VsYXJ0aWNzMlRva2VuLFxuICApIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gbmV3IERlZmF1bHRDb25maWcoKTtcbiAgICB0aGlzLnNldHRpbmdzID0geyAuLi5kZWZhdWx0Q29uZmlnLCAuLi5zZXR1cC5zZXR0aW5ncyB9O1xuICAgIHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nID0ge1xuICAgICAgLi4uZGVmYXVsdENvbmZpZy5wYWdlVHJhY2tpbmcsXG4gICAgICAuLi5zZXR1cC5zZXR0aW5ncy5wYWdlVHJhY2tpbmcsXG4gICAgfTtcbiAgICB0aGlzLnRyYWNrZXJcbiAgICAgIC50cmFja0xvY2F0aW9uKHRoaXMuc2V0dGluZ3MpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogVHJhY2tOYXZpZ2F0aW9uRW5kKSA9PiB0aGlzLnRyYWNrVXJsQ2hhbmdlKGV2ZW50LnVybCkpO1xuICB9XG5cbiAgLyoqIGZpbHRlcnMgYWxsIGV2ZW50cyB3aGVuIGRldmVsb3BlciBtb2RlIGlzIHRydWUgKi9cbiAgZmlsdGVyRGV2ZWxvcGVyTW9kZTxUPigpOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4ge1xuICAgIHJldHVybiBmaWx0ZXIoKHZhbHVlLCBpbmRleCkgPT4gIXRoaXMuc2V0dGluZ3MuZGV2ZWxvcGVyTW9kZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdHJhY2tVcmxDaGFuZ2UodXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuYXV0b1RyYWNrVmlydHVhbFBhZ2VzICYmICF0aGlzLm1hdGNoZXNFeGNsdWRlZFJvdXRlKHVybCkpIHtcbiAgICAgIGNvbnN0IGNsZWFyZWRVcmwgPSB0aGlzLmNsZWFyVXJsKHVybCk7XG4gICAgICBsZXQgcGF0aDogc3RyaW5nO1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmJhc2VQYXRoLmxlbmd0aCkge1xuICAgICAgICBwYXRoID0gdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuYmFzZVBhdGggKyBjbGVhcmVkVXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF0aCA9IHRoaXMudHJhY2tlci5wcmVwYXJlRXh0ZXJuYWxVcmwoY2xlYXJlZFVybCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhZ2VUcmFjay5uZXh0KHsgcGF0aCB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHN0cmluZyBsaXRlcmFscyBvciByZWd1bGFyIGV4cHJlc3Npb25zIHRvIGV4Y2x1ZGUgcm91dGVzXG4gICAqIGZyb20gYXV0b21hdGljIHBhZ2V2aWV3IHRyYWNraW5nLlxuICAgKlxuICAgKiBAcGFyYW0gdXJsIGxvY2F0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgbWF0Y2hlc0V4Y2x1ZGVkUm91dGUodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBmb3IgKGNvbnN0IGV4Y2x1ZGVkUm91dGUgb2YgdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuZXhjbHVkZWRSb3V0ZXMpIHtcbiAgICAgIGNvbnN0IG1hdGNoZXNSZWdleCA9IGV4Y2x1ZGVkUm91dGUgaW5zdGFuY2VvZiBSZWdFeHAgJiYgZXhjbHVkZWRSb3V0ZS50ZXN0KHVybCk7XG4gICAgICBpZiAobWF0Y2hlc1JlZ2V4IHx8IHVybC5pbmRleE9mKGV4Y2x1ZGVkUm91dGUgYXMgc3RyaW5nKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGlkJ3MgZnJvbSB0cmFja2VkIHJvdXRlLlxuICAgKiAgRVg6IGAvcHJvamVjdC8xMjk4MS9mZWF0dXJlYCBiZWNvbWVzIGAvcHJvamVjdC9mZWF0dXJlYFxuICAgKlxuICAgKiBAcGFyYW0gdXJsIGN1cnJlbnQgcGFnZSBwYXRoXG4gICAqL1xuICBwcm90ZWN0ZWQgY2xlYXJVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgIHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmNsZWFySWRzIHx8XG4gICAgICB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5jbGVhclF1ZXJ5UGFyYW1zIHx8XG4gICAgICB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5jbGVhckhhc2hcbiAgICApIHtcbiAgICAgIHJldHVybiB1cmxcbiAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgLm1hcChwYXJ0ID0+ICh0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5jbGVhclF1ZXJ5UGFyYW1zID8gcGFydC5zcGxpdCgnPycpWzBdIDogcGFydCkpXG4gICAgICAgIC5tYXAocGFydCA9PiAodGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuY2xlYXJIYXNoID8gcGFydC5zcGxpdCgnIycpWzBdIDogcGFydCkpXG4gICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgcGFydCA9PlxuICAgICAgICAgICAgIXRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmNsZWFySWRzIHx8XG4gICAgICAgICAgICAhcGFydC5tYXRjaCh0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5pZHNSZWdFeHApLFxuICAgICAgICApXG4gICAgICAgIC5qb2luKCcvJyk7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cbn1cbiJdfQ==