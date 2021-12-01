import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
import * as i2 from "@angular/common";
export class Angulartics2AdobeAnalytics {
    constructor(angulartics2, location) {
        this.angulartics2 = angulartics2;
        this.location = location;
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
        if (typeof s !== 'undefined' && s) {
            s.clearVars();
            s.t({ pageName: path });
        }
    }
    /**
     * Track Event in Adobe Analytics
     *
     * @param action associated with the event
     * @param properties action detials
     *
     * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
     */
    eventTrack(action, properties) {
        // TODO: make interface
        // @property {string} properties.category
        // @property {string} properties.label
        // @property {number} properties.value
        // @property {boolean} properties.noninteraction
        if (!properties) {
            properties = properties || {};
        }
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                this.setUserProperties(properties);
            }
            if (action) {
                // if linkName property is passed, use that; otherwise, the action is the linkName
                const linkName = properties['linkName'] ? properties['linkName'] : action;
                // note that 'this' should refer the link element, but we can't get that in this function. example:
                // <a href="http://anothersite.com" onclick="s.tl(this,'e','AnotherSite',null)">
                // if disableDelay property is passed, use that to turn off/on the 500ms delay; otherwise, it uses this
                const disableDelay = !!properties['disableDelay'] ? true : this;
                // if action property is passed, use that; otherwise, the action remains unchanged
                if (properties['action']) {
                    action = properties['action'];
                }
                this.setPageName();
                if (action.toUpperCase() === 'DOWNLOAD') {
                    s.tl(disableDelay, 'd', linkName);
                }
                else if (action.toUpperCase() === 'EXIT') {
                    s.tl(disableDelay, 'e', linkName);
                }
                else {
                    s.tl(disableDelay, 'o', linkName);
                }
            }
        }
    }
    setPageName() {
        const path = this.location.path(true);
        const hashNdx = path.indexOf('#');
        if (hashNdx > 0 && hashNdx < path.length) {
            s.pageName = path.substring(hashNdx + 1);
        }
        else {
            s.pageName = path;
        }
    }
    setUserProperties(properties) {
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                for (const key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        s[key] = properties[key];
                    }
                }
            }
        }
    }
}
Angulartics2AdobeAnalytics.ɵfac = function Angulartics2AdobeAnalytics_Factory(t) { return new (t || Angulartics2AdobeAnalytics)(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Location)); };
Angulartics2AdobeAnalytics.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2AdobeAnalytics, factory: Angulartics2AdobeAnalytics.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2AdobeAnalytics, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }, { type: i2.Location }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvYmVhbmFseXRpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9hZG9iZWFuYWx5dGljcy9hZG9iZWFuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTzNDLE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFBb0IsWUFBMEIsRUFBVSxRQUFrQjtRQUF0RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDeEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFdBQVcsSUFBSSxDQUFDLEVBQUU7WUFDakMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFD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QUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9hbmd1bGFydGljczItY29yZSc7XG5cbmRlY2xhcmUgY29uc3QgczogYW55O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkFkb2JlQW5hbHl0aWNzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMiwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoeCA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBzICE9PSAndW5kZWZpbmVkJyAmJiBzKSB7XG4gICAgICBzLmNsZWFyVmFycygpO1xuICAgICAgcy50KHsgcGFnZU5hbWU6IHBhdGggfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIEV2ZW50IGluIEFkb2JlIEFuYWx5dGljc1xuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgYWN0aW9uIGRldGlhbHNcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9tYXJrZXRpbmcuYWRvYmUuY29tL3Jlc291cmNlcy9oZWxwL2VuX1VTL3NjL2ltcGxlbWVudC9qc19pbXBsZW1lbnRhdGlvbi5odG1sXG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICAvLyBUT0RPOiBtYWtlIGludGVyZmFjZVxuICAgIC8vIEBwcm9wZXJ0eSB7c3RyaW5nfSBwcm9wZXJ0aWVzLmNhdGVnb3J5XG4gICAgLy8gQHByb3BlcnR5IHtzdHJpbmd9IHByb3BlcnRpZXMubGFiZWxcbiAgICAvLyBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy52YWx1ZVxuICAgIC8vIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvcGVydGllcy5ub25pbnRlcmFjdGlvblxuICAgIGlmICghcHJvcGVydGllcykge1xuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzICE9PSAndW5kZWZpbmVkJyAmJiBzKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BlcnRpZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMuc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgIC8vIGlmIGxpbmtOYW1lIHByb3BlcnR5IGlzIHBhc3NlZCwgdXNlIHRoYXQ7IG90aGVyd2lzZSwgdGhlIGFjdGlvbiBpcyB0aGUgbGlua05hbWVcbiAgICAgICAgY29uc3QgbGlua05hbWUgPSBwcm9wZXJ0aWVzWydsaW5rTmFtZSddID8gcHJvcGVydGllc1snbGlua05hbWUnXSA6IGFjdGlvbjtcbiAgICAgICAgLy8gbm90ZSB0aGF0ICd0aGlzJyBzaG91bGQgcmVmZXIgdGhlIGxpbmsgZWxlbWVudCwgYnV0IHdlIGNhbid0IGdldCB0aGF0IGluIHRoaXMgZnVuY3Rpb24uIGV4YW1wbGU6XG4gICAgICAgIC8vIDxhIGhyZWY9XCJodHRwOi8vYW5vdGhlcnNpdGUuY29tXCIgb25jbGljaz1cInMudGwodGhpcywnZScsJ0Fub3RoZXJTaXRlJyxudWxsKVwiPlxuICAgICAgICAvLyBpZiBkaXNhYmxlRGVsYXkgcHJvcGVydHkgaXMgcGFzc2VkLCB1c2UgdGhhdCB0byB0dXJuIG9mZi9vbiB0aGUgNTAwbXMgZGVsYXk7IG90aGVyd2lzZSwgaXQgdXNlcyB0aGlzXG4gICAgICAgIGNvbnN0IGRpc2FibGVEZWxheSA9ICEhcHJvcGVydGllc1snZGlzYWJsZURlbGF5J10gPyB0cnVlIDogdGhpcztcbiAgICAgICAgLy8gaWYgYWN0aW9uIHByb3BlcnR5IGlzIHBhc3NlZCwgdXNlIHRoYXQ7IG90aGVyd2lzZSwgdGhlIGFjdGlvbiByZW1haW5zIHVuY2hhbmdlZFxuICAgICAgICBpZiAocHJvcGVydGllc1snYWN0aW9uJ10pIHtcbiAgICAgICAgICBhY3Rpb24gPSBwcm9wZXJ0aWVzWydhY3Rpb24nXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBhZ2VOYW1lKCk7XG5cbiAgICAgICAgaWYgKGFjdGlvbi50b1VwcGVyQ2FzZSgpID09PSAnRE9XTkxPQUQnKSB7XG4gICAgICAgICAgcy50bChkaXNhYmxlRGVsYXksICdkJywgbGlua05hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi50b1VwcGVyQ2FzZSgpID09PSAnRVhJVCcpIHtcbiAgICAgICAgICBzLnRsKGRpc2FibGVEZWxheSwgJ2UnLCBsaW5rTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcy50bChkaXNhYmxlRGVsYXksICdvJywgbGlua05hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRQYWdlTmFtZSgpIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5sb2NhdGlvbi5wYXRoKHRydWUpO1xuICAgIGNvbnN0IGhhc2hOZHggPSBwYXRoLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaE5keCA+IDAgJiYgaGFzaE5keCA8IHBhdGgubGVuZ3RoKSB7XG4gICAgICBzLnBhZ2VOYW1lID0gcGF0aC5zdWJzdHJpbmcoaGFzaE5keCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzLnBhZ2VOYW1lID0gcGF0aDtcbiAgICB9XG4gIH1cblxuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICd1bmRlZmluZWQnICYmIHMpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==