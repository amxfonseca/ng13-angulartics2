import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/router";
export class AppInsightsDefaults {
    constructor() {
        this.userId = null;
    }
}
export class Angulartics2AppInsights {
    constructor(angulartics2, title, router) {
        this.angulartics2 = angulartics2;
        this.title = title;
        this.router = router;
        this.loadStartTime = null;
        this.loadTime = null;
        this.metrics = null;
        this.dimensions = null;
        this.measurements = null;
        if (typeof appInsights === 'undefined') {
            console.warn('appInsights not found');
        }
        const defaults = new AppInsightsDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.appInsights = {
            ...defaults,
            ...this.angulartics2.settings.appInsights,
        };
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.exceptionTrack(x));
        this.router.events
            .pipe(this.angulartics2.filterDeveloperMode(), filter((event) => event instanceof NavigationStart))
            .subscribe((event) => this.startTimer());
        this.router.events
            .pipe(filter((event) => event instanceof NavigationError || event instanceof NavigationEnd))
            .subscribe((error) => this.stopTimer());
    }
    startTimer() {
        this.loadStartTime = Date.now();
        this.loadTime = null;
    }
    stopTimer() {
        this.loadTime = Date.now() - this.loadStartTime;
        this.loadStartTime = null;
    }
    /**
     * Page Track in Baidu Analytics
     *
     * @param path - Location 'path'
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
     */
    pageTrack(path) {
        appInsights.trackPageView(this.title.getTitle(), path, this.dimensions, this.metrics, this.loadTime);
    }
    /**
     * Log a user action or other occurrence.
     *
     * @param name Name to identify this event in the portal.
     * @param properties Additional data used to filter events and metrics in the portal. Defaults to empty.
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
     */
    eventTrack(name, properties) {
        appInsights.trackEvent(name, properties, this.measurements);
    }
    /**
     * Exception Track Event in GA
     *
     * @param properties - Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional fields 'fatal' (boolean) and 'description' (string), error
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
     */
    exceptionTrack(properties) {
        const description = properties.event || properties.description || properties;
        appInsights.trackException(description);
    }
    /**
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
     */
    setUsername(userId) {
        this.angulartics2.settings.appInsights.userId = userId;
        appInsights.setAuthenticatedUserContext(userId);
    }
    setUserProperties(properties) {
        if (properties.userId) {
            this.angulartics2.settings.appInsights.userId = properties.userId;
        }
        if (properties.accountId) {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId, properties.accountId);
        }
        else {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId);
        }
    }
}
Angulartics2AppInsights.ɵfac = function Angulartics2AppInsights_Factory(t) { return new (t || Angulartics2AppInsights)(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Title), i0.ɵɵinject(i3.Router)); };
Angulartics2AppInsights.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2AppInsights, factory: Angulartics2AppInsights.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2AppInsights, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }, { type: i2.Title }, { type: i3.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwaW5zaWdodHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9hcHBpbnNpZ2h0cy9hcHBpbnNpZ2h0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGVBQWUsR0FFaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBT3hDLE1BQU0sT0FBTyxtQkFBbUI7SUFBaEM7UUFDRSxXQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FBQTtBQUdELE1BQU0sT0FBTyx1QkFBdUI7SUFRbEMsWUFDVSxZQUEwQixFQUMxQixLQUFZLEVBQ1osTUFBYztRQUZkLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVnhCLGtCQUFhLEdBQVcsSUFBSSxDQUFDO1FBQzdCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEIsWUFBTyxHQUErQixJQUFJLENBQUM7UUFDM0MsZUFBVSxHQUErQixJQUFJLENBQUM7UUFDOUMsaUJBQVksR0FBK0IsSUFBSSxDQUFDO1FBTzlDLElBQUksT0FBTyxXQUFXLEtBQUssV0FBVyxFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUN2QztRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUMzQywyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHO1lBQ3ZDLEdBQUcsUUFBUTtZQUNYLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVztTQUMxQyxDQUFDO1FB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R0FDZixVQUFVLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDO1FBRTNELFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLE1BQWM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkQsV0FBVyxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxpQkFBaUIsQ0FDZixVQUEwRDtRQUUxRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3hCLFdBQVcsQ0FBQywyQkFBMkIsQ0FDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFDN0MsVUFBVSxDQUFDLFNBQVMsQ0FDckIsQ0FBQztTQUNIO2FBQU07WUFDTCxXQUFXLENBQUMsMkJBQTJCLENBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQzlDLENBQUM7U0FDSDtJQUNILENBQUM7OzhGQXRJVSx1QkFBdUI7NkVBQXZCLHVCQUF1QixXQUF2Qix1QkFBdUIsbUJBRFYsTUFBTTt1RkFDbkIsdUJBQXVCO2NBRG5DLFVBQVU7ZUFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcbiAgTmF2aWdhdGlvbkVuZCxcbiAgTmF2aWdhdGlvbkVycm9yLFxuICBOYXZpZ2F0aW9uU3RhcnQsXG4gIFJvdXRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQXBwSW5zaWdodHNTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2FuZ3VsYXJ0aWNzMi1jb25maWcnO1xuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuXG5kZWNsYXJlIGNvbnN0IGFwcEluc2lnaHRzOiBNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cy5JQXBwSW5zaWdodHM7XG5cbmV4cG9ydCBjbGFzcyBBcHBJbnNpZ2h0c0RlZmF1bHRzIGltcGxlbWVudHMgQXBwSW5zaWdodHNTZXR0aW5ncyB7XG4gIHVzZXJJZCA9IG51bGw7XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyQXBwSW5zaWdodHMge1xuICBsb2FkU3RhcnRUaW1lOiBudW1iZXIgPSBudWxsO1xuICBsb2FkVGltZTogbnVtYmVyID0gbnVsbDtcblxuICBtZXRyaWNzOiB7IFtuYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IG51bGw7XG4gIGRpbWVuc2lvbnM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9ID0gbnVsbDtcbiAgbWVhc3VyZW1lbnRzOiB7IFtuYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcbiAgICBwcml2YXRlIHRpdGxlOiBUaXRsZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge1xuICAgIGlmICh0eXBlb2YgYXBwSW5zaWdodHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ2FwcEluc2lnaHRzIG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRzID0gbmV3IEFwcEluc2lnaHRzRGVmYXVsdHMoKTtcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZm9yIHRoaXMgbW9kdWxlXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMgPSB7XG4gICAgICAuLi5kZWZhdWx0cyxcbiAgICAgIC4uLnRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmFwcEluc2lnaHRzLFxuICAgIH07XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWUuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcm5hbWUoeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzLnN1YnNjcmliZSgoeCkgPT5cbiAgICAgIHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeClcbiAgICApO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXhjZXB0aW9uVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXhjZXB0aW9uVHJhY2soeCkpO1xuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSxcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4gdGhpcy5zdGFydFRpbWVyKCkpO1xuXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKFxuICAgICAgICAgIChldmVudCkgPT5cbiAgICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yIHx8IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZFxuICAgICAgICApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChlcnJvcikgPT4gdGhpcy5zdG9wVGltZXIoKSk7XG4gIH1cblxuICBzdGFydFRpbWVyKCkge1xuICAgIHRoaXMubG9hZFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5sb2FkVGltZSA9IG51bGw7XG4gIH1cblxuICBzdG9wVGltZXIoKSB7XG4gICAgdGhpcy5sb2FkVGltZSA9IERhdGUubm93KCkgLSB0aGlzLmxvYWRTdGFydFRpbWU7XG4gICAgdGhpcy5sb2FkU3RhcnRUaW1lID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdlIFRyYWNrIGluIEJhaWR1IEFuYWx5dGljc1xuICAgKlxuICAgKiBAcGFyYW0gcGF0aCAtIExvY2F0aW9uICdwYXRoJ1xuICAgKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCN0cmFja3BhZ2V2aWV3XG4gICAqL1xuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgYXBwSW5zaWdodHMudHJhY2tQYWdlVmlldyhcbiAgICAgIHRoaXMudGl0bGUuZ2V0VGl0bGUoKSxcbiAgICAgIHBhdGgsXG4gICAgICB0aGlzLmRpbWVuc2lvbnMsXG4gICAgICB0aGlzLm1ldHJpY3MsXG4gICAgICB0aGlzLmxvYWRUaW1lXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2cgYSB1c2VyIGFjdGlvbiBvciBvdGhlciBvY2N1cnJlbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIHRvIGlkZW50aWZ5IHRoaXMgZXZlbnQgaW4gdGhlIHBvcnRhbC5cbiAgICogQHBhcmFtIHByb3BlcnRpZXMgQWRkaXRpb25hbCBkYXRhIHVzZWQgdG8gZmlsdGVyIGV2ZW50cyBhbmQgbWV0cmljcyBpbiB0aGUgcG9ydGFsLiBEZWZhdWx0cyB0byBlbXB0eS5cbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9BcHBsaWNhdGlvbkluc2lnaHRzLUpTL2Jsb2IvbWFzdGVyL0FQSS1yZWZlcmVuY2UubWQjdHJhY2tldmVudFxuICAgKi9cbiAgZXZlbnRUcmFjayhuYW1lOiBzdHJpbmcsIHByb3BlcnRpZXM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gICAgYXBwSW5zaWdodHMudHJhY2tFdmVudChuYW1lLCBwcm9wZXJ0aWVzLCB0aGlzLm1lYXN1cmVtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogRXhjZXB0aW9uIFRyYWNrIEV2ZW50IGluIEdBXG4gICAqXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIC0gQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGRzICdhcHBJZCcgKHN0cmluZyksICdhcHBOYW1lJyAoc3RyaW5nKSBhbmQgJ2FwcFZlcnNpb24nIChzdHJpbmcpIGFuZFxuICAgKiBvcHRpb25hbCBmaWVsZHMgJ2ZhdGFsJyAoYm9vbGVhbikgYW5kICdkZXNjcmlwdGlvbicgKHN0cmluZyksIGVycm9yXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvQXBwbGljYXRpb25JbnNpZ2h0cy1KUy9ibG9iL21hc3Rlci9BUEktcmVmZXJlbmNlLm1kI3RyYWNrZXhjZXB0aW9uXG4gICAqL1xuICBleGNlcHRpb25UcmFjayhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9XG4gICAgICBwcm9wZXJ0aWVzLmV2ZW50IHx8IHByb3BlcnRpZXMuZGVzY3JpcHRpb24gfHwgcHJvcGVydGllcztcblxuICAgIGFwcEluc2lnaHRzLnRyYWNrRXhjZXB0aW9uKGRlc2NyaXB0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCNzZXRhdXRoZW50aWNhdGVkdXNlcmNvbnRleHRcbiAgICovXG4gIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkID0gdXNlcklkO1xuICAgIGFwcEluc2lnaHRzLnNldEF1dGhlbnRpY2F0ZWRVc2VyQ29udGV4dCh1c2VySWQpO1xuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMoXG4gICAgcHJvcGVydGllczogUGFydGlhbDx7IHVzZXJJZDogc3RyaW5nOyBhY2NvdW50SWQ6IHN0cmluZyB9PlxuICApIHtcbiAgICBpZiAocHJvcGVydGllcy51c2VySWQpIHtcbiAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmFwcEluc2lnaHRzLnVzZXJJZCA9IHByb3BlcnRpZXMudXNlcklkO1xuICAgIH1cbiAgICBpZiAocHJvcGVydGllcy5hY2NvdW50SWQpIHtcbiAgICAgIGFwcEluc2lnaHRzLnNldEF1dGhlbnRpY2F0ZWRVc2VyQ29udGV4dChcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkLFxuICAgICAgICBwcm9wZXJ0aWVzLmFjY291bnRJZFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwSW5zaWdodHMuc2V0QXV0aGVudGljYXRlZFVzZXJDb250ZXh0KFxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5hcHBJbnNpZ2h0cy51c2VySWRcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=