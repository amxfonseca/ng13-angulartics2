import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
export class Angulartics2LaunchByAdobe {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.payload = {};
        if ('undefined' === typeof _satellite) {
            console.warn('Launch not found!');
        }
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
    }
    setUsername(userId) {
        if ('undefined' !== typeof userId && userId) {
            this.payload.userId = userId;
        }
    }
    setUserProperties(properties) {
        if ('undefined' !== typeof properties && properties) {
            this.payload.properties = properties;
        }
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
        this.payload = this.payload || {};
        this.payload.path = path;
        if ('undefined' !== typeof _satellite && _satellite) {
            _satellite.track('pageTrack', this.payload);
        }
    }
    /**
     * @param action associated with the event
     * @param properties associated with the event
     */
    eventTrack(action, properties) {
        properties = properties || {};
        // add properties to payload
        this.payload.action = action;
        this.payload.eventProperties = properties;
        if ('undefined' !== typeof _satellite && _satellite) {
            _satellite.track('eventTrack', this.payload);
        }
    }
}
Angulartics2LaunchByAdobe.ɵfac = function Angulartics2LaunchByAdobe_Factory(t) { return new (t || Angulartics2LaunchByAdobe)(i0.ɵɵinject(i1.Angulartics2)); };
Angulartics2LaunchByAdobe.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2LaunchByAdobe, factory: Angulartics2LaunchByAdobe.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2LaunchByAdobe, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvbGF1bmNoL2xhdW5jaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPM0MsTUFBTSxPQUFPLHlCQUF5QjtJQUdwQyxZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZoRCxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBR2hCLElBQUksV0FBVyxLQUFLLE9BQU8sVUFBVSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUF3QjtRQUNsQyxJQUFJLFdBQVcsS0FBSyxPQUFPLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELGlCQUFpQixDQUFDLFVBQWU7UUFDL0IsSUFBSSxXQUFXLEtBQUssT0FBTyxVQUFVLElBQUksVUFBVSxFQUFFO1lBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksV0FBVyxLQUFLLE9BQU8sVUFBVSxJQUFJLFVBQVUsRUFBRTtZQUNuRCxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLE1BQWMsRUFBRSxVQUFlO1FBQ3hDLFVBQVUsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFDO1FBRTlCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO1FBRTFDLElBQUksV0FBVyxLQUFLLE9BQU8sVUFBVSxJQUFJLFVBQVUsRUFBRTtZQUNuRCxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDOztrR0F2RFUseUJBQXlCOytFQUF6Qix5QkFBeUIsV0FBekIseUJBQXlCLG1CQURaLE1BQU07dUZBQ25CLHlCQUF5QjtjQURyQyxVQUFVO2VBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9hbmd1bGFydGljczItY29yZSc7XG5cbmRlY2xhcmUgY29uc3QgX3NhdGVsbGl0ZTogYW55O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkxhdW5jaEJ5QWRvYmUge1xuICBwYXlsb2FkOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBfc2F0ZWxsaXRlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0xhdW5jaCBub3QgZm91bmQhJyk7XG4gICAgfVxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoeCA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nIHwgYm9vbGVhbikge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIHVzZXJJZCAmJiB1c2VySWQpIHtcbiAgICAgIHRoaXMucGF5bG9hZC51c2VySWQgPSB1c2VySWQ7XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgcHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzKSB7XG4gICAgICB0aGlzLnBheWxvYWQucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRUcmFja2luZygpIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBheWxvYWQgPSB0aGlzLnBheWxvYWQgfHwge307XG4gICAgdGhpcy5wYXlsb2FkLnBhdGggPSBwYXRoO1xuXG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgX3NhdGVsbGl0ZSAmJiBfc2F0ZWxsaXRlKSB7XG4gICAgICBfc2F0ZWxsaXRlLnRyYWNrKCdwYWdlVHJhY2snLCB0aGlzLnBheWxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XG4gICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XG5cbiAgICAvLyBhZGQgcHJvcGVydGllcyB0byBwYXlsb2FkXG4gICAgdGhpcy5wYXlsb2FkLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB0aGlzLnBheWxvYWQuZXZlbnRQcm9wZXJ0aWVzID0gcHJvcGVydGllcztcblxuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIF9zYXRlbGxpdGUgJiYgX3NhdGVsbGl0ZSkge1xuICAgICAgX3NhdGVsbGl0ZS50cmFjaygnZXZlbnRUcmFjaycsIHRoaXMucGF5bG9hZCk7XG4gICAgfVxuICB9XG59XG4iXX0=