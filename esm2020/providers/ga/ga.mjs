import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
export class GoogleAnalyticsDefaults {
    constructor() {
        this.additionalAccountNames = [];
        this.userId = null;
        this.transport = '';
        this.anonymizeIp = false;
    }
}
export class Angulartics2GoogleAnalytics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = [];
        const defaults = new GoogleAnalyticsDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.ga = {
            ...defaults,
            ...this.angulartics2.settings.ga,
        };
        this.settings = this.angulartics2.settings.ga;
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.exceptionTrack(x));
        this.angulartics2.userTimings
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.userTimings(x));
    }
    pageTrack(path) {
        if (typeof _gaq !== 'undefined' && _gaq) {
            _gaq.push(['_trackPageview', path]);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                _gaq.push([accountName + '._trackPageview', path]);
            }
        }
        if (typeof ga !== 'undefined' && ga) {
            if (this.angulartics2.settings.ga.userId) {
                ga('set', '&uid', this.angulartics2.settings.ga.userId);
                for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                    ga(accountName + '.set', '&uid', this.angulartics2.settings.ga.userId);
                }
            }
            if (this.angulartics2.settings.ga.anonymizeIp) {
                ga('set', 'anonymizeIp', true);
                for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                    ga(accountName + '.set', 'anonymizeIp', true);
                }
            }
            ga('send', 'pageview', path);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'pageview', path);
            }
        }
    }
    /**
     * Track Event in GA
     *
     * @param action Associated with the event
     * @param properties Comprised of:
     *  - category (string) and optional
     *  - label (string)
     *  - value (integer)
     *  - noninteraction (boolean)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    eventTrack(action, properties) {
        // Google Analytics requires an Event Category
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
        }
        // GA requires that eventValue be an integer, see:
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
        // https://github.com/luisfarzati/angulartics/issues/81
        if (properties.value) {
            const parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
        if (typeof ga !== 'undefined') {
            const eventOptions = {
                eventCategory: properties.category,
                eventAction: action,
                eventLabel: properties.label,
                eventValue: properties.value,
                nonInteraction: properties.noninteraction,
                page: properties.page || location.hash.substring(1) || location.pathname,
                userId: this.angulartics2.settings.ga.userId,
                hitCallback: properties.hitCallback,
                ...(this.angulartics2.settings.ga.transport && {
                    transport: this.angulartics2.settings.ga.transport,
                }),
            };
            // add custom dimensions and metrics
            this.setDimensionsAndMetrics(properties);
            ga('send', 'event', eventOptions);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'event', eventOptions);
            }
        }
        else if (typeof _gaq !== 'undefined') {
            _gaq.push([
                '_trackEvent',
                properties.category,
                action,
                properties.label,
                properties.value,
                properties.noninteraction,
            ]);
        }
    }
    /**
     * Exception Track Event in GA
     *
     * @param properties Comprised of the optional fields:
     *  - fatal (string)
     *  - description (string)
     *
     * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    exceptionTrack(properties) {
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.description;
        const eventOptions = {
            exFatal: properties.fatal,
            exDescription: properties.description,
        };
        ga('send', 'exception', eventOptions);
        for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
            ga(accountName + '.send', 'exception', eventOptions);
        }
    }
    /**
     * User Timings Event in GA
     *
     * @param properties Comprised of the mandatory fields:
     *  - timingCategory (string)
     *  - timingVar (string)
     *  - timingValue (number)
     * Properties can also have the optional fields:
     *  - timingLabel (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
     */
    userTimings(properties) {
        if (!properties ||
            !properties.timingCategory ||
            !properties.timingVar ||
            !properties.timingValue) {
            console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
            return;
        }
        if (typeof ga !== 'undefined') {
            ga('send', 'timing', properties);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'timing', properties);
            }
        }
    }
    setUsername(userId) {
        this.angulartics2.settings.ga.userId = userId;
        if (typeof ga === 'undefined') {
            return;
        }
        ga('set', 'userId', userId);
    }
    setUserProperties(properties) {
        this.setDimensionsAndMetrics(properties);
    }
    setDimensionsAndMetrics(properties) {
        if (typeof ga === 'undefined') {
            return;
        }
        // clean previously used dimensions and metrics that will not be overriden
        this.dimensionsAndMetrics.forEach(elem => {
            if (!properties.hasOwnProperty(elem)) {
                ga('set', elem, undefined);
                this.angulartics2.settings.ga.additionalAccountNames.forEach((accountName) => {
                    ga(`${accountName}.set`, elem, undefined);
                });
            }
        });
        this.dimensionsAndMetrics = [];
        // add custom dimensions and metrics
        Object.keys(properties).forEach(key => {
            if (key.lastIndexOf('dimension', 0) === 0 || key.lastIndexOf('metric', 0) === 0) {
                ga('set', key, properties[key]);
                this.angulartics2.settings.ga.additionalAccountNames.forEach((accountName) => {
                    ga(`${accountName}.set`, key, properties[key]);
                });
                this.dimensionsAndMetrics.push(key);
            }
        });
    }
}
Angulartics2GoogleAnalytics.ɵfac = function Angulartics2GoogleAnalytics_Factory(t) { return new (t || Angulartics2GoogleAnalytics)(i0.ɵɵinject(i1.Angulartics2)); };
Angulartics2GoogleAnalytics.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2GoogleAnalytics, factory: Angulartics2GoogleAnalytics.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2GoogleAnalytics, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2EuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9nYS9nYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFVM0MsTUFBTSxPQUFPLHVCQUF1QjtJQUFwQztRQUNFLDJCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUM1QixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGdCQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Q0FBQTtBQUdELE1BQU0sT0FBTywyQkFBMkI7SUFJdEMsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFIOUMseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBSXhCLE1BQU0sUUFBUSxHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUMvQywyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHO1lBQzlCLEdBQUcsUUFBUTtZQUNYLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtTQUNqQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FB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QUMsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztzR0E5TlUsMkJBQTJCO2lGQUEzQiwyQkFBMkIsV0FBM0IsMkJBQTJCLG1CQURkLE1BQU07dUZBQ25CLDJCQUEyQjtjQUR2QyxVQUFVO2VBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9hbmd1bGFydGljczItY29yZSc7XG5pbXBvcnQgeyBHb29nbGVBbmFseXRpY3NTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2FuZ3VsYXJ0aWNzMi1jb25maWcnO1xuaW1wb3J0IHsgVXNlclRpbWluZ3MgfSBmcm9tICcuLi8uLi9hbmd1bGFydGljczItaW50ZXJmYWNlcyc7XG5cbmRlY2xhcmUgdmFyIF9nYXE6IEdvb2dsZUFuYWx5dGljc0NvZGU7XG5kZWNsYXJlIHZhciBnYTogVW5pdmVyc2FsQW5hbHl0aWNzLmdhO1xuZGVjbGFyZSB2YXIgbG9jYXRpb246IGFueTtcblxuZXhwb3J0IGNsYXNzIEdvb2dsZUFuYWx5dGljc0RlZmF1bHRzIGltcGxlbWVudHMgR29vZ2xlQW5hbHl0aWNzU2V0dGluZ3Mge1xuICBhZGRpdGlvbmFsQWNjb3VudE5hbWVzID0gW107XG4gIHVzZXJJZCA9IG51bGw7XG4gIHRyYW5zcG9ydCA9ICcnO1xuICBhbm9ueW1pemVJcCA9IGZhbHNlO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkdvb2dsZUFuYWx5dGljcyB7XG4gIGRpbWVuc2lvbnNBbmRNZXRyaWNzID0gW107XG4gIHNldHRpbmdzOiBQYXJ0aWFsPEdvb2dsZUFuYWx5dGljc1NldHRpbmdzPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSBuZXcgR29vZ2xlQW5hbHl0aWNzRGVmYXVsdHMoKTtcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZm9yIHRoaXMgbW9kdWxlXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EgPSB7XG4gICAgICAuLi5kZWZhdWx0cyxcbiAgICAgIC4uLnRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLFxuICAgIH07XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoeCA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXhjZXB0aW9uVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLmV4Y2VwdGlvblRyYWNrKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi51c2VyVGltaW5nc1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMudXNlclRpbWluZ3MoeCkpO1xuICB9XG5cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgX2dhcSAhPT0gJ3VuZGVmaW5lZCcgJiYgX2dhcSkge1xuICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrUGFnZXZpZXcnLCBwYXRoXSk7XG4gICAgICBmb3IgKGNvbnN0IGFjY291bnROYW1lIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMpIHtcbiAgICAgICAgX2dhcS5wdXNoKFthY2NvdW50TmFtZSArICcuX3RyYWNrUGFnZXZpZXcnLCBwYXRoXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnICYmIGdhKSB7XG4gICAgICBpZiAodGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudXNlcklkKSB7XG4gICAgICAgIGdhKCdzZXQnLCAnJnVpZCcsIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnVzZXJJZCk7XG4gICAgICAgIGZvciAoY29uc3QgYWNjb3VudE5hbWUgb2YgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EuYWRkaXRpb25hbEFjY291bnROYW1lcykge1xuICAgICAgICAgIGdhKGFjY291bnROYW1lICsgJy5zZXQnLCAnJnVpZCcsIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hbm9ueW1pemVJcCkge1xuICAgICAgICBnYSgnc2V0JywgJ2Fub255bWl6ZUlwJywgdHJ1ZSk7XG4gICAgICAgIGZvciAoY29uc3QgYWNjb3VudE5hbWUgb2YgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EuYWRkaXRpb25hbEFjY291bnROYW1lcykge1xuICAgICAgICAgIGdhKGFjY291bnROYW1lICsgJy5zZXQnLCAnYW5vbnltaXplSXAnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCBwYXRoKTtcbiAgICAgIGZvciAoY29uc3QgYWNjb3VudE5hbWUgb2YgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EuYWRkaXRpb25hbEFjY291bnROYW1lcykge1xuICAgICAgICBnYShhY2NvdW50TmFtZSArICcuc2VuZCcsICdwYWdldmlldycsIHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFjayBFdmVudCBpbiBHQVxuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIEFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mOlxuICAgKiAgLSBjYXRlZ29yeSAoc3RyaW5nKSBhbmQgb3B0aW9uYWxcbiAgICogIC0gbGFiZWwgKHN0cmluZylcbiAgICogIC0gdmFsdWUgKGludGVnZXIpXG4gICAqICAtIG5vbmludGVyYWN0aW9uIChib29sZWFuKVxuICAgKlxuICAgKiBAbGluayBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ2Fqcy9ldmVudFRyYWNrZXJHdWlkZSNTZXR0aW5nVXBFdmVudFRyYWNraW5nXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9ldmVudHNcbiAgICovXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xuICAgIC8vIEdvb2dsZSBBbmFseXRpY3MgcmVxdWlyZXMgYW4gRXZlbnQgQ2F0ZWdvcnlcbiAgICBpZiAoIXByb3BlcnRpZXMgfHwgIXByb3BlcnRpZXMuY2F0ZWdvcnkpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xuICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSA9ICdFdmVudCc7XG4gICAgfVxuICAgIC8vIEdBIHJlcXVpcmVzIHRoYXQgZXZlbnRWYWx1ZSBiZSBhbiBpbnRlZ2VyLCBzZWU6XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2ZpZWxkLXJlZmVyZW5jZSNldmVudFZhbHVlXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2x1aXNmYXJ6YXRpL2FuZ3VsYXJ0aWNzL2lzc3Vlcy84MVxuICAgIGlmIChwcm9wZXJ0aWVzLnZhbHVlKSB7XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChwcm9wZXJ0aWVzLnZhbHVlLCAxMCk7XG4gICAgICBwcm9wZXJ0aWVzLnZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IDAgOiBwYXJzZWQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBnYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGV2ZW50T3B0aW9ucyA9IHtcbiAgICAgICAgZXZlbnRDYXRlZ29yeTogcHJvcGVydGllcy5jYXRlZ29yeSxcbiAgICAgICAgZXZlbnRBY3Rpb246IGFjdGlvbixcbiAgICAgICAgZXZlbnRMYWJlbDogcHJvcGVydGllcy5sYWJlbCxcbiAgICAgICAgZXZlbnRWYWx1ZTogcHJvcGVydGllcy52YWx1ZSxcbiAgICAgICAgbm9uSW50ZXJhY3Rpb246IHByb3BlcnRpZXMubm9uaW50ZXJhY3Rpb24sXG4gICAgICAgIHBhZ2U6IHByb3BlcnRpZXMucGFnZSB8fCBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSB8fCBsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgdXNlcklkOiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS51c2VySWQsXG4gICAgICAgIGhpdENhbGxiYWNrOiBwcm9wZXJ0aWVzLmhpdENhbGxiYWNrLFxuICAgICAgICAuLi4odGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudHJhbnNwb3J0ICYmIHtcbiAgICAgICAgICB0cmFuc3BvcnQ6IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnRyYW5zcG9ydCxcbiAgICAgICAgfSksXG4gICAgICB9O1xuXG4gICAgICAvLyBhZGQgY3VzdG9tIGRpbWVuc2lvbnMgYW5kIG1ldHJpY3NcbiAgICAgIHRoaXMuc2V0RGltZW5zaW9uc0FuZE1ldHJpY3MocHJvcGVydGllcyk7XG5cbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgZXZlbnRPcHRpb25zKTtcblxuICAgICAgZm9yIChjb25zdCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XG4gICAgICAgIGdhKGFjY291bnROYW1lICsgJy5zZW5kJywgJ2V2ZW50JywgZXZlbnRPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBfZ2FxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgX2dhcS5wdXNoKFtcbiAgICAgICAgJ190cmFja0V2ZW50JyxcbiAgICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSxcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBwcm9wZXJ0aWVzLmxhYmVsLFxuICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgICBwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uLFxuICAgICAgXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4Y2VwdGlvbiBUcmFjayBFdmVudCBpbiBHQVxuICAgKlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBDb21wcmlzZWQgb2YgdGhlIG9wdGlvbmFsIGZpZWxkczpcbiAgICogIC0gZmF0YWwgKHN0cmluZylcbiAgICogIC0gZGVzY3JpcHRpb24gKHN0cmluZylcbiAgICpcbiAgICogQGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9leGNlcHRpb25zXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9ldmVudHNcbiAgICovXG4gIGV4Y2VwdGlvblRyYWNrKHByb3BlcnRpZXM6IGFueSkge1xuICAgIGlmIChwcm9wZXJ0aWVzLmZhdGFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdObyBcImZhdGFsXCIgcHJvdmlkZWQsIHNlbmRpbmcgd2l0aCBmYXRhbD10cnVlJyk7XG4gICAgICBwcm9wZXJ0aWVzLmZhdGFsID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm9wZXJ0aWVzLmV4RGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uO1xuXG4gICAgY29uc3QgZXZlbnRPcHRpb25zID0ge1xuICAgICAgZXhGYXRhbDogcHJvcGVydGllcy5mYXRhbCxcbiAgICAgIGV4RGVzY3JpcHRpb246IHByb3BlcnRpZXMuZGVzY3JpcHRpb24sXG4gICAgfTtcblxuICAgIGdhKCdzZW5kJywgJ2V4Y2VwdGlvbicsIGV2ZW50T3B0aW9ucyk7XG4gICAgZm9yIChjb25zdCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XG4gICAgICBnYShhY2NvdW50TmFtZSArICcuc2VuZCcsICdleGNlcHRpb24nLCBldmVudE9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VyIFRpbWluZ3MgRXZlbnQgaW4gR0FcbiAgICpcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGRzOlxuICAgKiAgLSB0aW1pbmdDYXRlZ29yeSAoc3RyaW5nKVxuICAgKiAgLSB0aW1pbmdWYXIgKHN0cmluZylcbiAgICogIC0gdGltaW5nVmFsdWUgKG51bWJlcilcbiAgICogUHJvcGVydGllcyBjYW4gYWxzbyBoYXZlIHRoZSBvcHRpb25hbCBmaWVsZHM6XG4gICAqICAtIHRpbWluZ0xhYmVsIChzdHJpbmcpXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy91c2VyLXRpbWluZ3NcbiAgICovXG4gIHVzZXJUaW1pbmdzKHByb3BlcnRpZXM6IFVzZXJUaW1pbmdzKSB7XG4gICAgaWYgKFxuICAgICAgIXByb3BlcnRpZXMgfHxcbiAgICAgICFwcm9wZXJ0aWVzLnRpbWluZ0NhdGVnb3J5IHx8XG4gICAgICAhcHJvcGVydGllcy50aW1pbmdWYXIgfHxcbiAgICAgICFwcm9wZXJ0aWVzLnRpbWluZ1ZhbHVlXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAnUHJvcGVydGllcyB0aW1pbmdDYXRlZ29yeSwgdGltaW5nVmFyLCBhbmQgdGltaW5nVmFsdWUgYXJlIHJlcXVpcmVkIHRvIGJlIHNldC4nLFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZ2EoJ3NlbmQnLCAndGltaW5nJywgcHJvcGVydGllcyk7XG4gICAgICBmb3IgKGNvbnN0IGFjY291bnROYW1lIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMpIHtcbiAgICAgICAgZ2EoYWNjb3VudE5hbWUgKyAnLnNlbmQnLCAndGltaW5nJywgcHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS51c2VySWQgPSB1c2VySWQ7XG4gICAgaWYgKHR5cGVvZiBnYSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZ2EoJ3NldCcsICd1c2VySWQnLCB1c2VySWQpO1xuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgdGhpcy5zZXREaW1lbnNpb25zQW5kTWV0cmljcyhwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RGltZW5zaW9uc0FuZE1ldHJpY3MocHJvcGVydGllczogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBnYSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY2xlYW4gcHJldmlvdXNseSB1c2VkIGRpbWVuc2lvbnMgYW5kIG1ldHJpY3MgdGhhdCB3aWxsIG5vdCBiZSBvdmVycmlkZW5cbiAgICB0aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBpZiAoIXByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoZWxlbSkpIHtcbiAgICAgICAgZ2EoJ3NldCcsIGVsZW0sIHVuZGVmaW5lZCk7XG5cbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EuYWRkaXRpb25hbEFjY291bnROYW1lcy5mb3JFYWNoKChhY2NvdW50TmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgZ2EoYCR7YWNjb3VudE5hbWV9LnNldGAsIGVsZW0sIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MgPSBbXTtcblxuICAgIC8vIGFkZCBjdXN0b20gZGltZW5zaW9ucyBhbmQgbWV0cmljc1xuICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChrZXkubGFzdEluZGV4T2YoJ2RpbWVuc2lvbicsIDApID09PSAwIHx8IGtleS5sYXN0SW5kZXhPZignbWV0cmljJywgMCkgPT09IDApIHtcbiAgICAgICAgZ2EoJ3NldCcsIGtleSwgcHJvcGVydGllc1trZXldKTtcblxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzLmZvckVhY2goKGFjY291bnROYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBnYShgJHthY2NvdW50TmFtZX0uc2V0YCwga2V5LCBwcm9wZXJ0aWVzW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==