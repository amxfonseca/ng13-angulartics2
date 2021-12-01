import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
export class Angulartics2BaiduAnalytics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof _hmt === 'undefined') {
            _hmt = [];
        }
        else {
            _hmt.push(['_setAutoPageview', false]);
        }
        this.angulartics2.setUsername
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .subscribe((x) => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventTrack(x.action, x.properties));
    }
    /**
     * Page Track in Baidu Analytics
     *
     * @param path Required url 'path'
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackPageview
     */
    pageTrack(path) {
        if (typeof _hmt !== 'undefined' && _hmt) {
            _hmt.push(['_trackPageview', path]);
        }
    }
    /**
     * Track Event in Baidu Analytics
     *
     * @param action Name associated with the event
     * @param properties Comprised of:
     *  - 'category' (string)
     *  - 'opt_label' (string)
     *  - 'opt_value' (string)
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackEvent
     */
    eventTrack(action, properties) {
        // baidu analytics requires category
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
            properties.opt_label = 'default';
            properties.opt_value = 'default';
        }
        if (typeof _hmt !== 'undefined' && _hmt) {
            _hmt.push([
                '_trackEvent',
                properties.category,
                action,
                properties.opt_label,
                properties.opt_value,
            ]);
        }
    }
    setUsername(userId) {
        // set default custom variables name to 'identity' and 'value'
        _hmt.push(['_setCustomVar', 1, 'identity', userId]);
    }
    setUserProperties(properties) {
        _hmt.push(['_setCustomVar', 2, 'user', JSON.stringify(properties)]);
    }
}
Angulartics2BaiduAnalytics.ɵfac = function Angulartics2BaiduAnalytics_Factory(t) { return new (t || Angulartics2BaiduAnalytics)(i0.ɵɵinject(i1.Angulartics2)); };
Angulartics2BaiduAnalytics.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2BaiduAnalytics, factory: Angulartics2BaiduAnalytics.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2BaiduAnalytics, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFpZHUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9iYWlkdS9iYWlkdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFRM0MsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM1QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUMvQixJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ1g7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXO2FBQzFCLFNBQVMsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCO2FBQ2hDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksRUFBRTtZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsVUFBVSxDQUFDLE1BQWMsRUFBRSxVQUFlO1FBQ3hDLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUN2QyxVQUFVLEdBQUcsVUFBVSxJQUFJLEVBQUUsQ0FBQztZQUM5QixVQUFVLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUM5QixVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUNqQyxVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksRUFBRTtZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNSLGFBQWE7Z0JBQ2IsVUFBVSxDQUFDLFFBQVE7Z0JBQ25CLE1BQU07Z0JBQ04sVUFBVSxDQUFDLFNBQVM7Z0JBQ3BCLFVBQVUsQ0FBQyxTQUFTO2FBQ3JCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFjO1FBQ3hCLDhEQUE4RDtRQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsVUFBZTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7b0dBekVVLDBCQUEwQjtnRkFBMUIsMEJBQTBCLFdBQTFCLDBCQUEwQixtQkFEYixNQUFNO3VGQUNuQiwwQkFBMEI7Y0FEdEMsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuXG5cbmRlY2xhcmUgdmFyIF9obXQ6IGFueTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJCYWlkdUFuYWx5dGljcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICBpZiAodHlwZW9mIF9obXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfaG10ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIF9obXQucHVzaChbJ19zZXRBdXRvUGFnZXZpZXcnLCBmYWxzZV0pO1xuICAgIH1cbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdlIFRyYWNrIGluIEJhaWR1IEFuYWx5dGljc1xuICAgKlxuICAgKiBAcGFyYW0gcGF0aCBSZXF1aXJlZCB1cmwgJ3BhdGgnXG4gICAqXG4gICAqIEBsaW5rIGh0dHA6Ly90b25namkuYmFpZHUuY29tL29wZW4vYXBpL21vcmU/cD1yZWZfdHJhY2tQYWdldmlld1xuICAgKi9cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgX2htdCAhPT0gJ3VuZGVmaW5lZCcgJiYgX2htdCkge1xuICAgICAgX2htdC5wdXNoKFsnX3RyYWNrUGFnZXZpZXcnLCBwYXRoXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIEV2ZW50IGluIEJhaWR1IEFuYWx5dGljc1xuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIE5hbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBDb21wcmlzZWQgb2Y6XG4gICAqICAtICdjYXRlZ29yeScgKHN0cmluZylcbiAgICogIC0gJ29wdF9sYWJlbCcgKHN0cmluZylcbiAgICogIC0gJ29wdF92YWx1ZScgKHN0cmluZylcbiAgICpcbiAgICogQGxpbmsgaHR0cDovL3RvbmdqaS5iYWlkdS5jb20vb3Blbi9hcGkvbW9yZT9wPXJlZl90cmFja0V2ZW50XG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICAvLyBiYWlkdSBhbmFseXRpY3MgcmVxdWlyZXMgY2F0ZWdvcnlcbiAgICBpZiAoIXByb3BlcnRpZXMgfHwgIXByb3BlcnRpZXMuY2F0ZWdvcnkpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSA9ICdFdmVudCc7XG4gICAgICBwcm9wZXJ0aWVzLm9wdF9sYWJlbCA9ICdkZWZhdWx0JztcbiAgICAgIHByb3BlcnRpZXMub3B0X3ZhbHVlID0gJ2RlZmF1bHQnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgX2htdCAhPT0gJ3VuZGVmaW5lZCcgJiYgX2htdCkge1xuICAgICAgX2htdC5wdXNoKFtcbiAgICAgICAgJ190cmFja0V2ZW50JyxcbiAgICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSxcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBwcm9wZXJ0aWVzLm9wdF9sYWJlbCxcbiAgICAgICAgcHJvcGVydGllcy5vcHRfdmFsdWUsXG4gICAgICBdKTtcbiAgICB9XG4gIH1cblxuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZykge1xuICAgIC8vIHNldCBkZWZhdWx0IGN1c3RvbSB2YXJpYWJsZXMgbmFtZSB0byAnaWRlbnRpdHknIGFuZCAndmFsdWUnXG4gICAgX2htdC5wdXNoKFsnX3NldEN1c3RvbVZhcicsIDEsICdpZGVudGl0eScsIHVzZXJJZF0pO1xuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgX2htdC5wdXNoKFsnX3NldEN1c3RvbVZhcicsIDIsICd1c2VyJywgSlNPTi5zdHJpbmdpZnkocHJvcGVydGllcyldKTtcbiAgfVxufVxuIl19