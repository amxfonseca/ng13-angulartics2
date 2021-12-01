import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
export class Angulartics2Hubspot {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    pageTrack(path) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['setPath', path]);
            _hsq.push(['trackPageView']);
        }
    }
    eventTrack(action, properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['trackEvent', properties]);
        }
    }
    setUserProperties(properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['identify', properties]);
        }
    }
}
Angulartics2Hubspot.ɵfac = function Angulartics2Hubspot_Factory(t) { return new (t || Angulartics2Hubspot)(i0.ɵɵinject(i1.Angulartics2)); };
Angulartics2Hubspot.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Hubspot, factory: Angulartics2Hubspot.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Hubspot, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVic3BvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcHJvdmlkZXJzL2h1YnNwb3QvaHVic3BvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLFVBQWU7UUFDeEMsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVELGlCQUFpQixDQUFDLFVBQWU7UUFDL0IsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7c0ZBL0JVLG1CQUFtQjt5RUFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQixtQkFETixNQUFNO3VGQUNuQixtQkFBbUI7Y0FEL0IsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuXG5kZWNsYXJlIHZhciBfaHNxOiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MySHVic3BvdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoeCA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBfaHNxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgX2hzcS5wdXNoKFsnc2V0UGF0aCcsIHBhdGhdKTtcbiAgICAgIF9oc3EucHVzaChbJ3RyYWNrUGFnZVZpZXcnXSk7XG4gICAgfVxuICB9XG5cbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBfaHNxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgX2hzcS5wdXNoKFsndHJhY2tFdmVudCcsIHByb3BlcnRpZXNdKTtcbiAgICB9XG4gIH1cblxuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIF9oc3EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfaHNxLnB1c2goWydpZGVudGlmeScsIHByb3BlcnRpZXNdKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==