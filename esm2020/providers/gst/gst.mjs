import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
export class GoogleGlobalSiteTagDefaults {
    constructor() {
        this.trackingIds = [];
        if (typeof ga !== 'undefined' && ga) {
            // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/ga-object-methods-reference
            ga(() => {
                ga.getAll().forEach((tracker) => {
                    const id = tracker.get('trackingId');
                    // If set both in forRoot and HTML page, we want to avoid duplicates
                    if (id !== undefined && this.trackingIds.indexOf(id) === -1) {
                        this.trackingIds.push(id);
                    }
                });
            });
        }
    }
}
export class Angulartics2GoogleGlobalSiteTag {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = {};
        const defaults = new GoogleGlobalSiteTagDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.gst = { ...defaults, ...this.angulartics2.settings.gst };
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
            .subscribe((x) => this.exceptionTrack(x));
        this.angulartics2.userTimings
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.userTimings(this.convertTimings(x)));
        this.angulartics2.setUsername
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.setUserProperties(x));
    }
    /**
     * Manually track page view, see:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#tracking_virtual_pageviews
     *
     * @param path relative url
     */
    pageTrack(path) {
        if (typeof gtag !== 'undefined' && gtag) {
            const params = {
                page_path: path,
                page_location: window.location.protocol + '//' + window.location.host + path,
                ...this.dimensionsAndMetrics,
            };
            // Custom map must be reset with all config to stay valid.
            if (this.angulartics2.settings.gst.customMap) {
                params.custom_map = this.angulartics2.settings.gst.customMap;
            }
            if (this.angulartics2.settings.gst.userId) {
                params.user_id = this.angulartics2.settings.gst.userId;
            }
            if (this.angulartics2.settings.gst.anonymizeIp) {
                params.anonymize_ip = this.angulartics2.settings.gst.anonymizeIp;
            }
            for (const id of this.angulartics2.settings.gst.trackingIds) {
                gtag('config', id, params);
            }
        }
    }
    /**
     * Send interactions to gtag, i.e. for event tracking in Google Analytics. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/events
     *
     * @param action associated with the event
     */
    eventTrack(action, properties = {}) {
        this.eventTrackInternal(action, {
            event_category: properties.category || 'interaction',
            event_label: properties.label,
            value: properties.value,
            non_interaction: properties.noninteraction,
            ...properties.gstCustom,
        });
    }
    /**
     * Exception Track Event in GST. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
     *
     */
    exceptionTrack(properties) {
        // TODO: make interface
        //  @param {Object} properties
        //  @param {string} [properties.description]
        //  @param {boolean} [properties.fatal]
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.event ? properties.event.stack : properties.description;
        this.eventTrack('exception', {
            gstCustom: {
                description: properties.exDescription,
                fatal: properties.fatal,
                ...properties.gstCustom,
            },
        });
    }
    /**
     * User Timings Event in GST.
     *
     * @param properties Comprised of the mandatory fields:
     *  - name (string)
     *  - value (number - integer)
     * Properties can also have the optional fields:
     *  - category (string)
     *  - label (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
     */
    userTimings(properties) {
        if (!properties) {
            console.error('User timings - "properties" parameter is required to be set.');
            return;
        }
        this.eventTrackInternal('timing_complete', {
            name: properties.name,
            value: properties.value,
            event_category: properties.category,
            event_label: properties.label,
        });
    }
    convertTimings(properties) {
        return {
            name: properties.timingVar,
            value: properties.timingValue,
            category: properties.timingCategory,
            label: properties.timingLabel,
        };
    }
    setUsername(userId) {
        this.angulartics2.settings.gst.userId = userId;
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('set', { user_id: typeof userId === 'string' || !userId ? userId : userId.userId });
        }
    }
    setUserProperties(properties) {
        this.setDimensionsAndMetrics(properties);
    }
    setDimensionsAndMetrics(properties) {
        // We want the dimensions and metrics to accumulate, so we merge with previous value
        this.dimensionsAndMetrics = {
            ...this.dimensionsAndMetrics,
            ...properties,
        };
        // Remove properties that are null or undefined
        Object.keys(this.dimensionsAndMetrics).forEach(key => {
            const val = this.dimensionsAndMetrics[key];
            if (val === undefined || val === null) {
                delete this.dimensionsAndMetrics[key];
            }
        });
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('set', this.dimensionsAndMetrics);
        }
    }
    eventTrackInternal(action, properties = {}) {
        this.cleanProperties(properties);
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('event', action, properties);
        }
    }
    cleanProperties(properties) {
        // GA requires that eventValue be an non-negative integer, see:
        // https://developers.google.com/analytics/devguides/collection/gtagjs/events
        if (properties.value) {
            const parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
    }
}
Angulartics2GoogleGlobalSiteTag.ɵfac = function Angulartics2GoogleGlobalSiteTag_Factory(t) { return new (t || Angulartics2GoogleGlobalSiteTag)(i0.ɵɵinject(i1.Angulartics2)); };
Angulartics2GoogleGlobalSiteTag.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2GoogleGlobalSiteTag, factory: Angulartics2GoogleGlobalSiteTag.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2GoogleGlobalSiteTag, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvZ3N0L2dzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFVM0MsTUFBTSxPQUFPLDJCQUEyQjtJQUd0QztRQUZBLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBR3pCLElBQUksT0FBTyxFQUFFLEtBQUssV0FBVyxJQUFJLEVBQUUsRUFBRTtZQUNuQyw0R0FBNEc7WUFDNUcsRUFBRSxDQUFDLEdBQUcsRUFBRTtnQkFDTixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7b0JBQ25DLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3JDLG9FQUFvRTtvQkFDcEUsSUFBSSxFQUFFLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDM0I7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGO0FBR0QsTUFBTSxPQUFPLCtCQUErQjtJQUcxQyxZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZ4Qyx5QkFBb0IsR0FBMkIsRUFBRSxDQUFDO1FBR3hELE1BQU0sUUFBUSxHQUFHLElBQUksMkJBQTJCLEVBQUUsQ0FBQztRQUNuRCwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FB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O1NBQy9DO0lBQ0gsQ0FBQzs7OEdBM0xVLCtCQUErQjtxRkFBL0IsK0JBQStCLFdBQS9CLCtCQUErQixtQkFEbEIsTUFBTTt1RkFDbkIsK0JBQStCO2NBRDNDLFVBQVU7ZUFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFVzZXJUaW1pbmdzIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgR29vZ2xlR2xvYmFsU2l0ZVRhZ1NldHRpbmdzIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWNvbmZpZyc7XG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9hbmd1bGFydGljczItY29yZSc7XG5pbXBvcnQgeyBFdmVudEdzdCwgVXNlclRpbWluZ3NHc3QgfSBmcm9tICcuL2dzdC1pbnRlcmZhY2VzJztcblxuZGVjbGFyZSB2YXIgZ3RhZzogYW55O1xuZGVjbGFyZSB2YXIgZ2E6IGFueTtcblxuZXhwb3J0IGNsYXNzIEdvb2dsZUdsb2JhbFNpdGVUYWdEZWZhdWx0cyBpbXBsZW1lbnRzIEdvb2dsZUdsb2JhbFNpdGVUYWdTZXR0aW5ncyB7XG4gIHRyYWNraW5nSWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnICYmIGdhKSB7XG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9nYS1vYmplY3QtbWV0aG9kcy1yZWZlcmVuY2VcbiAgICAgIGdhKCgpID0+IHtcbiAgICAgICAgZ2EuZ2V0QWxsKCkuZm9yRWFjaCgodHJhY2tlcjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgaWQgPSB0cmFja2VyLmdldCgndHJhY2tpbmdJZCcpO1xuICAgICAgICAgIC8vIElmIHNldCBib3RoIGluIGZvclJvb3QgYW5kIEhUTUwgcGFnZSwgd2Ugd2FudCB0byBhdm9pZCBkdXBsaWNhdGVzXG4gICAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQgJiYgdGhpcy50cmFja2luZ0lkcy5pbmRleE9mKGlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2tpbmdJZHMucHVzaChpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkdvb2dsZUdsb2JhbFNpdGVUYWcge1xuICBwcml2YXRlIGRpbWVuc2lvbnNBbmRNZXRyaWNzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSBuZXcgR29vZ2xlR2xvYmFsU2l0ZVRhZ0RlZmF1bHRzKCk7XG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNldHRpbmdzIGZvciB0aGlzIG1vZHVsZVxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdCA9IHsgLi4uZGVmYXVsdHMsIC4uLnRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdCB9O1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5leGNlcHRpb25UcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLmV4Y2VwdGlvblRyYWNrKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi51c2VyVGltaW5nc1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMudXNlclRpbWluZ3ModGhpcy5jb252ZXJ0VGltaW5ncyh4KSkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcm5hbWUoeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IHRyYWNrIHBhZ2Ugdmlldywgc2VlOlxuICAgKlxuICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL3NpbmdsZS1wYWdlLWFwcGxpY2F0aW9ucyN0cmFja2luZ192aXJ0dWFsX3BhZ2V2aWV3c1xuICAgKlxuICAgKiBAcGFyYW0gcGF0aCByZWxhdGl2ZSB1cmxcbiAgICovXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGd0YWcgIT09ICd1bmRlZmluZWQnICYmIGd0YWcpIHtcbiAgICAgIGNvbnN0IHBhcmFtczogYW55ID0ge1xuICAgICAgICBwYWdlX3BhdGg6IHBhdGgsXG4gICAgICAgIHBhZ2VfbG9jYXRpb246IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIHBhdGgsXG4gICAgICAgIC4uLnRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MsXG4gICAgICB9O1xuXG4gICAgICAvLyBDdXN0b20gbWFwIG11c3QgYmUgcmVzZXQgd2l0aCBhbGwgY29uZmlnIHRvIHN0YXkgdmFsaWQuXG5cbiAgICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QuY3VzdG9tTWFwKSB7XG4gICAgICAgIHBhcmFtcy5jdXN0b21fbWFwID0gdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LmN1c3RvbU1hcDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QudXNlcklkKSB7XG4gICAgICAgIHBhcmFtcy51c2VyX2lkID0gdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LnVzZXJJZDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QuYW5vbnltaXplSXApIHtcbiAgICAgICAgcGFyYW1zLmFub255bWl6ZV9pcCA9IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC5hbm9ueW1pemVJcDtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBpZCBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QudHJhY2tpbmdJZHMpIHtcbiAgICAgICAgZ3RhZygnY29uZmlnJywgaWQsIHBhcmFtcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgaW50ZXJhY3Rpb25zIHRvIGd0YWcsIGkuZS4gZm9yIGV2ZW50IHRyYWNraW5nIGluIEdvb2dsZSBBbmFseXRpY3MuIFNlZTpcbiAgICpcbiAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9ldmVudHNcbiAgICpcbiAgICogQHBhcmFtIGFjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBQYXJ0aWFsPEV2ZW50R3N0PiA9IHt9KSB7XG4gICAgdGhpcy5ldmVudFRyYWNrSW50ZXJuYWwoYWN0aW9uLCB7XG4gICAgICBldmVudF9jYXRlZ29yeTogcHJvcGVydGllcy5jYXRlZ29yeSB8fCAnaW50ZXJhY3Rpb24nLFxuICAgICAgZXZlbnRfbGFiZWw6IHByb3BlcnRpZXMubGFiZWwsXG4gICAgICB2YWx1ZTogcHJvcGVydGllcy52YWx1ZSxcbiAgICAgIG5vbl9pbnRlcmFjdGlvbjogcHJvcGVydGllcy5ub25pbnRlcmFjdGlvbixcbiAgICAgIC4uLnByb3BlcnRpZXMuZ3N0Q3VzdG9tLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4Y2VwdGlvbiBUcmFjayBFdmVudCBpbiBHU1QuIFNlZTpcbiAgICpcbiAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9leGNlcHRpb25zXG4gICAqXG4gICAqL1xuICBleGNlcHRpb25UcmFjayhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICAvLyBUT0RPOiBtYWtlIGludGVyZmFjZVxuICAgIC8vICBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllc1xuICAgIC8vICBAcGFyYW0ge3N0cmluZ30gW3Byb3BlcnRpZXMuZGVzY3JpcHRpb25dXG4gICAgLy8gIEBwYXJhbSB7Ym9vbGVhbn0gW3Byb3BlcnRpZXMuZmF0YWxdXG4gICAgaWYgKHByb3BlcnRpZXMuZmF0YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coJ05vIFwiZmF0YWxcIiBwcm92aWRlZCwgc2VuZGluZyB3aXRoIGZhdGFsPXRydWUnKTtcbiAgICAgIHByb3BlcnRpZXMuZmF0YWwgPSB0cnVlO1xuICAgIH1cblxuICAgIHByb3BlcnRpZXMuZXhEZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZXZlbnQgPyBwcm9wZXJ0aWVzLmV2ZW50LnN0YWNrIDogcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcblxuICAgIHRoaXMuZXZlbnRUcmFjaygnZXhjZXB0aW9uJywge1xuICAgICAgZ3N0Q3VzdG9tOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBwcm9wZXJ0aWVzLmV4RGVzY3JpcHRpb24sXG4gICAgICAgIGZhdGFsOiBwcm9wZXJ0aWVzLmZhdGFsLFxuICAgICAgICAuLi5wcm9wZXJ0aWVzLmdzdEN1c3RvbSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlciBUaW1pbmdzIEV2ZW50IGluIEdTVC5cbiAgICpcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGRzOlxuICAgKiAgLSBuYW1lIChzdHJpbmcpXG4gICAqICAtIHZhbHVlIChudW1iZXIgLSBpbnRlZ2VyKVxuICAgKiBQcm9wZXJ0aWVzIGNhbiBhbHNvIGhhdmUgdGhlIG9wdGlvbmFsIGZpZWxkczpcbiAgICogIC0gY2F0ZWdvcnkgKHN0cmluZylcbiAgICogIC0gbGFiZWwgKHN0cmluZylcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy91c2VyLXRpbWluZ3NcbiAgICovXG4gIHVzZXJUaW1pbmdzKHByb3BlcnRpZXM6IFVzZXJUaW1pbmdzR3N0KSB7XG4gICAgaWYgKCFwcm9wZXJ0aWVzKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdVc2VyIHRpbWluZ3MgLSBcInByb3BlcnRpZXNcIiBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQgdG8gYmUgc2V0LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnRUcmFja0ludGVybmFsKCd0aW1pbmdfY29tcGxldGUnLCB7XG4gICAgICBuYW1lOiBwcm9wZXJ0aWVzLm5hbWUsXG4gICAgICB2YWx1ZTogcHJvcGVydGllcy52YWx1ZSxcbiAgICAgIGV2ZW50X2NhdGVnb3J5OiBwcm9wZXJ0aWVzLmNhdGVnb3J5LFxuICAgICAgZXZlbnRfbGFiZWw6IHByb3BlcnRpZXMubGFiZWwsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRUaW1pbmdzKHByb3BlcnRpZXM6IFVzZXJUaW1pbmdzKTogVXNlclRpbWluZ3NHc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBwcm9wZXJ0aWVzLnRpbWluZ1ZhcixcbiAgICAgIHZhbHVlOiBwcm9wZXJ0aWVzLnRpbWluZ1ZhbHVlLFxuICAgICAgY2F0ZWdvcnk6IHByb3BlcnRpZXMudGltaW5nQ2F0ZWdvcnksXG4gICAgICBsYWJlbDogcHJvcGVydGllcy50aW1pbmdMYWJlbCxcbiAgICB9O1xuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcgfCB7IHVzZXJJZDogc3RyaW5nIHwgbnVtYmVyIH0pIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QudXNlcklkID0gdXNlcklkO1xuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ3RhZykge1xuICAgICAgZ3RhZygnc2V0JywgeyB1c2VyX2lkOiB0eXBlb2YgdXNlcklkID09PSAnc3RyaW5nJyB8fCAhdXNlcklkID8gdXNlcklkIDogdXNlcklkLnVzZXJJZCB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICB0aGlzLnNldERpbWVuc2lvbnNBbmRNZXRyaWNzKHByb3BlcnRpZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREaW1lbnNpb25zQW5kTWV0cmljcyhwcm9wZXJ0aWVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgLy8gV2Ugd2FudCB0aGUgZGltZW5zaW9ucyBhbmQgbWV0cmljcyB0byBhY2N1bXVsYXRlLCBzbyB3ZSBtZXJnZSB3aXRoIHByZXZpb3VzIHZhbHVlXG4gICAgdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcyA9IHtcbiAgICAgIC4uLnRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MsXG4gICAgICAuLi5wcm9wZXJ0aWVzLFxuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgcHJvcGVydGllcyB0aGF0IGFyZSBudWxsIG9yIHVuZGVmaW5lZFxuICAgIE9iamVjdC5rZXlzKHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3Nba2V5XTtcbiAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3Nba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ3RhZykge1xuICAgICAgZ3RhZygnc2V0JywgdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBldmVudFRyYWNrSW50ZXJuYWwoYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSA9IHt9KSB7XG4gICAgdGhpcy5jbGVhblByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgaWYgKHR5cGVvZiBndGFnICE9PSAndW5kZWZpbmVkJyAmJiBndGFnKSB7XG4gICAgICBndGFnKCdldmVudCcsIGFjdGlvbiwgcHJvcGVydGllcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhblByb3BlcnRpZXMocHJvcGVydGllczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHZvaWQge1xuICAgIC8vIEdBIHJlcXVpcmVzIHRoYXQgZXZlbnRWYWx1ZSBiZSBhbiBub24tbmVnYXRpdmUgaW50ZWdlciwgc2VlOlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvZXZlbnRzXG4gICAgaWYgKHByb3BlcnRpZXMudmFsdWUpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHByb3BlcnRpZXMudmFsdWUsIDEwKTtcbiAgICAgIHByb3BlcnRpZXMudmFsdWUgPSBpc05hTihwYXJzZWQpID8gMCA6IHBhcnNlZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==