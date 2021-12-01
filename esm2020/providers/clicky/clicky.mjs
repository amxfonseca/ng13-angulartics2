import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
import * as i2 from "@angular/platform-browser";
export class Angulartics2Clicky {
    constructor(angulartics2, titleService) {
        this.angulartics2 = angulartics2;
        this.titleService = titleService;
        if (typeof clicky === 'undefined') {
            console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
        }
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventOrGoalTrack(x.action, x.properties));
    }
    /**
     * Track Page in Clicky
     *
     * @param path location
     *
     * @link https://clicky.com/help/custom/manual#log
     */
    pageTrack(path) {
        const title = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    }
    /**
     * Track Event Or Goal in Clicky
     *
     * @param action Action name
     * @param properties Definition of 'properties.goal' determines goal vs event tracking
     *
     * @link https://clicky.com/help/custom/manual#log
     * @link https://clicky.com/help/custom/manual#goal
     */
    eventOrGoalTrack(action, properties) {
        if (typeof properties.goal === 'undefined') {
            const title = properties.title || null;
            const type = properties.type != null ? this.validateType(properties.type) : null;
            clicky.log(action, title, type);
        }
        else {
            const goalId = properties.goal;
            const revenue = properties.revenue;
            clicky.goal(goalId, revenue, !!properties.noQueue);
        }
    }
    validateType(type) {
        const EventType = ['pageview', 'click', 'download', 'outbound'];
        return EventType.indexOf(type) > -1 ? type : 'pageview';
    }
}
Angulartics2Clicky.ɵfac = function Angulartics2Clicky_Factory(t) { return new (t || Angulartics2Clicky)(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Title)); };
Angulartics2Clicky.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Clicky, factory: Angulartics2Clicky.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Clicky, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }, { type: i2.Title }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2t5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvY2xpY2t5L2NsaWNreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBUzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBb0IsWUFBMEIsRUFBVSxZQUFtQjtRQUF2RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFPO1FBQ3pFLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsU0FBUyxDQUFDLElBQVk7UUFDcEIsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsZ0JBQWdCLENBQUMsTUFBYyxFQUFFLFVBQXFDO1FBQ3BFLElBQUksT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUMxQyxNQUFNLEtBQUssR0FBVyxVQUFVLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUMvQyxNQUFNLElBQUksR0FBVyxVQUFVLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN6RixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLE1BQU0sTUFBTSxHQUFXLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDdkMsTUFBTSxPQUFPLEdBQVcsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRDtJQUNILENBQUM7SUFFTyxZQUFZLENBQUMsSUFBWTtRQUMvQixNQUFNLFNBQVMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDMUQsQ0FBQzs7b0ZBcERVLGtCQUFrQjt3RUFBbEIsa0JBQWtCLFdBQWxCLGtCQUFrQixtQkFETCxNQUFNO3VGQUNuQixrQkFBa0I7Y0FEOUIsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4uLy4uL2FuZ3VsYXJ0aWNzMi1jb3JlJztcbmltcG9ydCB7IENsaWNreVByb3BlcnRpZXMgfSBmcm9tICcuL2NsaWNreS5pbnRlcmZhY2VzJztcblxuZGVjbGFyZSB2YXIgY2xpY2t5OiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyQ2xpY2t5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMiwgcHJpdmF0ZSB0aXRsZVNlcnZpY2U6IFRpdGxlKSB7XG4gICAgaWYgKHR5cGVvZiBjbGlja3kgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0FuZ3VsYXJ0aWNzIDIgQ2xpY2t5IFBsdWdpbjogY2xpY2t5IGdsb2JhbCBub3QgZm91bmQnKTtcbiAgICB9XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLmV2ZW50T3JHb2FsVHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIFBhZ2UgaW4gQ2xpY2t5XG4gICAqXG4gICAqIEBwYXJhbSBwYXRoIGxvY2F0aW9uXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vY2xpY2t5LmNvbS9oZWxwL2N1c3RvbS9tYW51YWwjbG9nXG4gICAqL1xuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgY29uc3QgdGl0bGU6IHN0cmluZyA9IHRoaXMudGl0bGVTZXJ2aWNlLmdldFRpdGxlKCk7XG4gICAgY2xpY2t5LmxvZyhwYXRoLCB0aXRsZSwgJ3BhZ2V2aWV3Jyk7XG4gIH1cblxuICAvKipcbiAgICogVHJhY2sgRXZlbnQgT3IgR29hbCBpbiBDbGlja3lcbiAgICpcbiAgICogQHBhcmFtIGFjdGlvbiBBY3Rpb24gbmFtZVxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBEZWZpbml0aW9uIG9mICdwcm9wZXJ0aWVzLmdvYWwnIGRldGVybWluZXMgZ29hbCB2cyBldmVudCB0cmFja2luZ1xuICAgKlxuICAgKiBAbGluayBodHRwczovL2NsaWNreS5jb20vaGVscC9jdXN0b20vbWFudWFsI2xvZ1xuICAgKiBAbGluayBodHRwczovL2NsaWNreS5jb20vaGVscC9jdXN0b20vbWFudWFsI2dvYWxcbiAgICovXG4gIGV2ZW50T3JHb2FsVHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IFBhcnRpYWw8Q2xpY2t5UHJvcGVydGllcz4pIHtcbiAgICBpZiAodHlwZW9mIHByb3BlcnRpZXMuZ29hbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IHRpdGxlOiBzdHJpbmcgPSBwcm9wZXJ0aWVzLnRpdGxlIHx8IG51bGw7XG4gICAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBwcm9wZXJ0aWVzLnR5cGUgIT0gbnVsbCA/IHRoaXMudmFsaWRhdGVUeXBlKHByb3BlcnRpZXMudHlwZSkgOiBudWxsO1xuICAgICAgY2xpY2t5LmxvZyhhY3Rpb24sIHRpdGxlLCB0eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ29hbElkOiBzdHJpbmcgPSBwcm9wZXJ0aWVzLmdvYWw7XG4gICAgICBjb25zdCByZXZlbnVlOiBudW1iZXIgPSBwcm9wZXJ0aWVzLnJldmVudWU7XG4gICAgICBjbGlja3kuZ29hbChnb2FsSWQsIHJldmVudWUsICEhcHJvcGVydGllcy5ub1F1ZXVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlVHlwZSh0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IEV2ZW50VHlwZSA9IFsncGFnZXZpZXcnLCAnY2xpY2snLCAnZG93bmxvYWQnLCAnb3V0Ym91bmQnXTtcbiAgICByZXR1cm4gRXZlbnRUeXBlLmluZGV4T2YodHlwZSkgPiAtMSA/IHR5cGUgOiAncGFnZXZpZXcnO1xuICB9XG59XG4iXX0=