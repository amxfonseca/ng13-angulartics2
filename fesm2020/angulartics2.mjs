import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Directive, Input, NgModule } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, map, delay } from 'rxjs/operators';
import * as i1 from '@angular/router';
import { NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import * as i2 from '@angular/common';
import * as i2$1 from '@angular/platform-browser';

class DefaultConfig {
    constructor() {
        this.pageTracking = {
            autoTrackVirtualPages: true,
            basePath: '',
            excludedRoutes: [],
            clearIds: false,
            clearHash: false,
            clearQueryParams: false,
            idsRegExp: /^\d+$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        };
        this.developerMode = false;
        this.ga = {};
        this.appInsights = {};
        this.gtm = {};
        this.gst = {};
    }
}

const ANGULARTICS2_TOKEN = new InjectionToken('ANGULARTICS2');

class RouterlessTracking {
    trackLocation(settings) {
        return new BehaviorSubject({ url: '/' });
    }
    prepareExternalUrl(url) {
        return url;
    }
}

class Angulartics2 {
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
Angulartics2.ɵfac = function Angulartics2_Factory(t) { return new (t || Angulartics2)(i0.ɵɵinject(RouterlessTracking), i0.ɵɵinject(ANGULARTICS2_TOKEN)); };
Angulartics2.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2, factory: Angulartics2.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: RouterlessTracking }, { type: undefined, decorators: [{
                type: Inject,
                args: [ANGULARTICS2_TOKEN]
            }] }]; }, null); })();

/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
class AngularRouterTracking {
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

class Angulartics2On {
    constructor(elRef, angulartics2, renderer) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.renderer = renderer;
        this.angularticsProperties = {};
    }
    ngAfterContentInit() {
        this.renderer.listen(this.elRef.nativeElement, this.angulartics2On || 'click', (event) => this.eventTrack(event));
    }
    eventTrack(event) {
        const action = this.angularticsAction; // || this.inferEventName();
        const properties = {
            ...this.angularticsProperties,
            eventType: event.type,
        };
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action,
            properties,
        });
    }
}
Angulartics2On.ɵfac = function Angulartics2On_Factory(t) { return new (t || Angulartics2On)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(Angulartics2), i0.ɵɵdirectiveInject(i0.Renderer2)); };
Angulartics2On.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: Angulartics2On, selectors: [["", "angulartics2On", ""]], inputs: { angulartics2On: "angulartics2On", angularticsAction: "angularticsAction", angularticsCategory: "angularticsCategory", angularticsLabel: "angularticsLabel", angularticsValue: "angularticsValue", angularticsProperties: "angularticsProperties" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2On, [{
        type: Directive,
        args: [{ selector: '[angulartics2On]' }]
    }], function () { return [{ type: i0.ElementRef }, { type: Angulartics2 }, { type: i0.Renderer2 }]; }, { angulartics2On: [{
            type: Input,
            args: ['angulartics2On']
        }], angularticsAction: [{
            type: Input
        }], angularticsCategory: [{
            type: Input
        }], angularticsLabel: [{
            type: Input
        }], angularticsValue: [{
            type: Input
        }], angularticsProperties: [{
            type: Input
        }] }); })();
class Angulartics2OnModule {
}
Angulartics2OnModule.ɵfac = function Angulartics2OnModule_Factory(t) { return new (t || Angulartics2OnModule)(); };
Angulartics2OnModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: Angulartics2OnModule });
Angulartics2OnModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({});
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2OnModule, [{
        type: NgModule,
        args: [{
                declarations: [Angulartics2On],
                exports: [Angulartics2On],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Angulartics2OnModule, { declarations: [Angulartics2On], exports: [Angulartics2On] }); })();

class Angulartics2Module {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2Module,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                { provide: RouterlessTracking, useClass: AngularRouterTracking },
                Angulartics2,
            ],
        };
    }
}
Angulartics2Module.ɵfac = function Angulartics2Module_Factory(t) { return new (t || Angulartics2Module)(); };
Angulartics2Module.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: Angulartics2Module });
Angulartics2Module.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[Angulartics2OnModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Module, [{
        type: NgModule,
        args: [{
                imports: [Angulartics2OnModule],
                exports: [Angulartics2On],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Angulartics2Module, { imports: [Angulartics2OnModule], exports: [Angulartics2On] }); })();

class Angulartics2RouterlessModule {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2RouterlessModule,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                RouterlessTracking,
                Angulartics2,
            ],
        };
    }
}
Angulartics2RouterlessModule.ɵfac = function Angulartics2RouterlessModule_Factory(t) { return new (t || Angulartics2RouterlessModule)(); };
Angulartics2RouterlessModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: Angulartics2RouterlessModule });
Angulartics2RouterlessModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[Angulartics2OnModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2RouterlessModule, [{
        type: NgModule,
        args: [{
                imports: [Angulartics2OnModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(Angulartics2RouterlessModule, { imports: [Angulartics2OnModule] }); })();

class Angulartics2AdobeAnalytics {
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
Angulartics2AdobeAnalytics.ɵfac = function Angulartics2AdobeAnalytics_Factory(t) { return new (t || Angulartics2AdobeAnalytics)(i0.ɵɵinject(Angulartics2), i0.ɵɵinject(i2.Location)); };
Angulartics2AdobeAnalytics.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2AdobeAnalytics, factory: Angulartics2AdobeAnalytics.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2AdobeAnalytics, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }, { type: i2.Location }]; }, null); })();

class AppInsightsDefaults {
    constructor() {
        this.userId = null;
    }
}
class Angulartics2AppInsights {
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
Angulartics2AppInsights.ɵfac = function Angulartics2AppInsights_Factory(t) { return new (t || Angulartics2AppInsights)(i0.ɵɵinject(Angulartics2), i0.ɵɵinject(i2$1.Title), i0.ɵɵinject(i1.Router)); };
Angulartics2AppInsights.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2AppInsights, factory: Angulartics2AppInsights.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2AppInsights, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }, { type: i2$1.Title }, { type: i1.Router }]; }, null); })();

class Angulartics2BaiduAnalytics {
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
Angulartics2BaiduAnalytics.ɵfac = function Angulartics2BaiduAnalytics_Factory(t) { return new (t || Angulartics2BaiduAnalytics)(i0.ɵɵinject(Angulartics2)); };
Angulartics2BaiduAnalytics.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2BaiduAnalytics, factory: Angulartics2BaiduAnalytics.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2BaiduAnalytics, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

const facebookEventList = [
    'ViewContent',
    'Search',
    'AddToCart',
    'AddToWishlist',
    'InitiateCheckout',
    'AddPaymentInfo',
    'Purchase',
    'Lead',
    'CompleteRegistration',
];
class Angulartics2Facebook {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
    }
    startTracking() {
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     *
     * @param action action associated with the event
     */
    eventTrack(action, properties = {}) {
        if (typeof fbq === 'undefined') {
            return;
        }
        if (facebookEventList.indexOf(action) === -1) {
            return fbq('trackCustom', action, properties);
        }
        return fbq('track', action, properties);
    }
}
Angulartics2Facebook.ɵfac = function Angulartics2Facebook_Factory(t) { return new (t || Angulartics2Facebook)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Facebook.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Facebook, factory: Angulartics2Facebook.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Facebook, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class GoogleAnalyticsDefaults {
    constructor() {
        this.additionalAccountNames = [];
        this.userId = null;
        this.transport = '';
        this.anonymizeIp = false;
    }
}
class Angulartics2GoogleAnalytics {
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
Angulartics2GoogleAnalytics.ɵfac = function Angulartics2GoogleAnalytics_Factory(t) { return new (t || Angulartics2GoogleAnalytics)(i0.ɵɵinject(Angulartics2)); };
Angulartics2GoogleAnalytics.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2GoogleAnalytics, factory: Angulartics2GoogleAnalytics.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2GoogleAnalytics, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2GoogleAnalyticsEnhancedEcommerce {
    /**
     * Add impression in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
     */
    ecAddImpression(properties) {
        ga('ec:addImpression', properties);
    }
    /**
     * Add product in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecAddProduct(product) {
        ga('ec:addProduct', product);
    }
    /**
     * Set action in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecSetAction(action, properties) {
        ga('ec:setAction', action, properties);
    }
}
Angulartics2GoogleAnalyticsEnhancedEcommerce.ɵfac = function Angulartics2GoogleAnalyticsEnhancedEcommerce_Factory(t) { return new (t || Angulartics2GoogleAnalyticsEnhancedEcommerce)(); };
Angulartics2GoogleAnalyticsEnhancedEcommerce.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2GoogleAnalyticsEnhancedEcommerce, factory: Angulartics2GoogleAnalyticsEnhancedEcommerce.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2GoogleAnalyticsEnhancedEcommerce, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

class GoogleTagManagerDefaults {
    constructor() {
        this.userId = null;
    }
}
class Angulartics2GoogleTagManager {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        // The dataLayer needs to be initialized
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer = window.dataLayer = window.dataLayer || [];
        }
        const defaults = new GoogleTagManagerDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.gtm = { ...defaults, ...this.angulartics2.settings.gtm };
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
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
    }
    pageTrack(path) {
        this.pushLayer({
            event: 'Page View',
            'content-name': path,
            userId: this.angulartics2.settings.gtm.userId,
        });
    }
    /**
     * Send Data Layer
     *
     * @layer data layer object
     */
    pushLayer(layer) {
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer.push(layer);
        }
    }
    /**
     * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
     *
     * @param action associated with the event
     */
    eventTrack(action, properties) {
        // TODO: make interface
        //  @param {string} properties.category
        //  @param {string} [properties.label]
        //  @param {number} [properties.value]
        //  @param {boolean} [properties.noninteraction]
        // Set a default GTM category
        properties = properties || {};
        this.pushLayer({
            event: properties.event || 'interaction',
            target: properties.category || 'Event',
            action,
            label: properties.label,
            value: properties.value,
            interactionType: properties.noninteraction,
            userId: this.angulartics2.settings.gtm.userId,
            ...properties.gtmCustom,
        });
    }
    /**
     * Exception Track Event in GTM
     *
     */
    exceptionTrack(properties) {
        // TODO: make interface
        //  @param {Object} properties
        //  @param {string} properties.appId
        //  @param {string} properties.appName
        //  @param {string} properties.appVersion
        //  @param {string} [properties.description]
        //  @param {boolean} [properties.fatal]
        if (!properties || !properties.appId || !properties.appName || !properties.appVersion) {
            console.error('Must be setted appId, appName and appVersion.');
            return;
        }
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.exFatal = true;
        }
        properties.exDescription = properties.event ? properties.event.stack : properties.description;
        this.eventTrack(`Exception thrown for ${properties.appName} <${properties.appId}@${properties.appVersion}>`, {
            category: 'Exception',
            label: properties.exDescription,
        });
    }
    /**
     * Set userId for use with Universal Analytics User ID feature
     *
     * @param userId used to identify user cross-device in Google Analytics
     */
    setUsername(userId) {
        this.angulartics2.settings.gtm.userId = userId;
    }
}
Angulartics2GoogleTagManager.ɵfac = function Angulartics2GoogleTagManager_Factory(t) { return new (t || Angulartics2GoogleTagManager)(i0.ɵɵinject(Angulartics2)); };
Angulartics2GoogleTagManager.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2GoogleTagManager, factory: Angulartics2GoogleTagManager.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2GoogleTagManager, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class GoogleGlobalSiteTagDefaults {
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
class Angulartics2GoogleGlobalSiteTag {
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
Angulartics2GoogleGlobalSiteTag.ɵfac = function Angulartics2GoogleGlobalSiteTag_Factory(t) { return new (t || Angulartics2GoogleGlobalSiteTag)(i0.ɵɵinject(Angulartics2)); };
Angulartics2GoogleGlobalSiteTag.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2GoogleGlobalSiteTag, factory: Angulartics2GoogleGlobalSiteTag.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2GoogleGlobalSiteTag, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Hubspot {
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
Angulartics2Hubspot.ɵfac = function Angulartics2Hubspot_Factory(t) { return new (t || Angulartics2Hubspot)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Hubspot.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Hubspot, factory: Angulartics2Hubspot.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Hubspot, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Kissmetrics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof _kmq === 'undefined') {
            _kmq = [];
        }
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
    }
    pageTrack(path) {
        _kmq.push(['record', 'Pageview', { Page: path }]);
    }
    eventTrack(action, properties) {
        _kmq.push(['record', action, properties]);
    }
    setUsername(userId) {
        _kmq.push(['identify', userId]);
    }
    setUserProperties(properties) {
        _kmq.push(['set', properties]);
    }
}
Angulartics2Kissmetrics.ɵfac = function Angulartics2Kissmetrics_Factory(t) { return new (t || Angulartics2Kissmetrics)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Kissmetrics.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Kissmetrics, factory: Angulartics2Kissmetrics.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Kissmetrics, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2LaunchByAdobe {
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
Angulartics2LaunchByAdobe.ɵfac = function Angulartics2LaunchByAdobe_Factory(t) { return new (t || Angulartics2LaunchByAdobe)(i0.ɵɵinject(Angulartics2)); };
Angulartics2LaunchByAdobe.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2LaunchByAdobe, factory: Angulartics2LaunchByAdobe.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2LaunchByAdobe, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Mixpanel {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe(x => this.setUserPropertiesOnce(x));
        this.angulartics2.setSuperProperties.subscribe(x => this.setSuperProperties(x));
        this.angulartics2.setSuperPropertiesOnce.subscribe(x => this.setSuperPropertiesOnce(x));
        this.angulartics2.setAlias.subscribe(x => this.setAlias(x));
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
        try {
            mixpanel.track('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            mixpanel.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUsername(userId) {
        try {
            mixpanel.identify(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            mixpanel.people.set(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserPropertiesOnce(properties) {
        try {
            mixpanel.people.set_once(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setSuperProperties(properties) {
        try {
            mixpanel.register(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setSuperPropertiesOnce(properties) {
        try {
            mixpanel.register_once(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setAlias(alias) {
        try {
            mixpanel.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Mixpanel.ɵfac = function Angulartics2Mixpanel_Factory(t) { return new (t || Angulartics2Mixpanel)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Mixpanel.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Mixpanel, factory: Angulartics2Mixpanel.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Mixpanel, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Pyze {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername.subscribe((x) => this.setUserId(x));
        this.angulartics2.setUserProperties.subscribe(x => this.postTraits(x));
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
        try {
            Pyze.postPageView('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            PyzeEvents.postCustomEventWithAttributes(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserId(userId) {
        try {
            PyzeIdentity.setUserIdentifier(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    postTraits(properties) {
        try {
            PyzeIdentity.postTraits(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Pyze.ɵfac = function Angulartics2Pyze_Factory(t) { return new (t || Angulartics2Pyze)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Pyze.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Pyze, factory: Angulartics2Pyze.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Pyze, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Matomo {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof _paq === 'undefined') {
            console.warn('Matomo not found');
        }
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    pageTrack(path, title) {
        try {
            if (!window.location.origin) {
                window.location.origin =
                    window.location.protocol +
                        '//' +
                        window.location.hostname +
                        (window.location.port ? ':' + window.location.port : '');
            }
            _paq.push(['setDocumentTitle', title || window.document.title]);
            _paq.push(['setCustomUrl', window.location.origin + path]);
            _paq.push(['trackPageView']);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    resetUser() {
        try {
            _paq.push(['appendToTrackingUrl', 'new_visit=1']); // (1) forces a new visit
            _paq.push(['deleteCookies']); // (2) deletes existing tracking cookies to start the new visit
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * Track a basic event in Matomo, or send an ecommerce event.
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    eventTrack(action, properties) {
        let params = [];
        switch (action) {
            /**
             * @description Sets the current page view as a product or category page view. When you call
             * setEcommerceView it must be followed by a call to trackPageView to record the product or
             * category page view.
             *
             * @link https://matomo.org/docs/ecommerce-analytics/#tracking-product-page-views-category-page-views-optional
             * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
             *
             * @property productSKU (required) SKU: Product unique identifier
             * @property productName (optional) Product name
             * @property categoryName (optional) Product category, or array of up to 5 categories
             * @property price (optional) Product Price as displayed on the page
             */
            case 'setEcommerceView':
                params = [
                    'setEcommerceView',
                    properties.productSKU,
                    properties.productName,
                    properties.categoryName,
                    properties.price,
                ];
                break;
            /**
             * @description Adds a product into the ecommerce order. Must be called for each product in
             * the order.
             *
             * @link https://matomo.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
             * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
             *
             * @property productSKU (required) SKU: Product unique identifier
             * @property productName (optional) Product name
             * @property categoryName (optional) Product category, or array of up to 5 categories
             * @property price (recommended) Product price
             * @property quantity (optional, default to 1) Product quantity
             */
            case 'addEcommerceItem':
                params = [
                    'addEcommerceItem',
                    properties.productSKU,
                    properties.productName,
                    properties.productCategory,
                    properties.price,
                    properties.quantity,
                ];
                break;
            /**
             * @description Tracks a shopping cart. Call this javascript function every time a user is
             * adding, updating or deleting a product from the cart.
             *
             * @link https://matomo.org/docs/ecommerce-analytics/#tracking-add-to-cart-items-added-to-the-cart-optional
             * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
             *
             * @property grandTotal (required) Cart amount
             */
            case 'trackEcommerceCartUpdate':
                params = [
                    'trackEcommerceCartUpdate',
                    properties.grandTotal,
                ];
                break;
            /**
             * @description Tracks an Ecommerce order, including any ecommerce item previously added to
             * the order. orderId and grandTotal (ie. revenue) are required parameters.
             *
             * @link https://matomo.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
             * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
             *
             * @property orderId (required) Unique Order ID
             * @property grandTotal (required) Order Revenue grand total (includes tax, shipping, and subtracted discount)
             * @property subTotal (optional) Order sub total (excludes shipping)
             * @property tax (optional) Tax amount
             * @property shipping (optional) Shipping amount
             * @property discount (optional) Discount offered (set to false for unspecified parameter)
             */
            case 'trackEcommerceOrder':
                params = [
                    'trackEcommerceOrder',
                    properties.orderId,
                    properties.grandTotal,
                    properties.subTotal,
                    properties.tax,
                    properties.shipping,
                    properties.discount,
                ];
                break;
            /**
             * @description To manually trigger an outlink
             *
             * @link https://matomo.org/docs/tracking-goals-web-analytics/
             * @link https://developer.matomo.org/guides/tracking-javascript-guide#tracking-a-click-as-an-outlink-via-css-or-javascript
             *
             * @property url (required) link url
             * @property linkType (optional) type of link
             */
            case 'trackLink':
                params = [
                    'trackLink',
                    properties.url,
                    properties.linkType,
                ];
                break;
            /**
             * @description Tracks an Ecommerce goal
             *
             * @link https://matomo.org/docs/tracking-goals-web-analytics/
             * @link https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions
             *
             * @property goalId (required) Unique Goal ID
             * @property value (optional) passed to goal tracking
             */
            case 'trackGoal':
                params = [
                    'trackGoal',
                    properties.goalId,
                    properties.value,
                ];
                break;
            /**
             * @description Tracks a site search
             *
             * @link https://matomo.org/docs/site-search/
             * @link https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking
             *
             * @property keyword (required) Keyword searched for
             * @property category (optional) Search category
             * @property searchCount (optional) Number of results
             */
            case 'trackSiteSearch':
                params = [
                    'trackSiteSearch',
                    properties.keyword,
                    properties.category,
                    properties.searchCount,
                ];
                break;
            /**
             * @description Logs an event with an event category (Videos, Music, Games...), an event
             * action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional
             * event name and optional numeric value.
             *
             * @link https://matomo.org/docs/event-tracking/
             * @link https://developer.matomo.org/api-reference/tracking-javascript#using-the-tracker-object
             *
             * @property category
             * @property action
             * @property name (optional, recommended)
             * @property value (optional)
             */
            default:
                // PAQ requires that eventValue be an integer, see: http://matomo.org/docs/event-tracking
                if (properties.value) {
                    const parsed = parseInt(properties.value, 10);
                    properties.value = isNaN(parsed) ? 0 : parsed;
                }
                params = [
                    'trackEvent',
                    properties.category,
                    action,
                    properties.name ||
                        properties.label,
                    properties.value,
                ];
        }
        try {
            _paq.push(params);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUsername(userId) {
        try {
            _paq.push(['setUserId', userId]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * Sets custom dimensions if at least one property has the key "dimension<n>",
     * e.g. dimension10. If there are custom dimensions, any other property is ignored.
     *
     * If there are no custom dimensions in the given properties object, the properties
     * object is saved as a custom variable.
     *
     * If in doubt, prefer custom dimensions.
     * @link https://matomo.org/docs/custom-variables/
     */
    setUserProperties(properties) {
        const dimensions = this.setCustomDimensions(properties);
        try {
            if (dimensions.length === 0) {
                _paq.push([
                    'setCustomVariable',
                    properties.index,
                    properties.name,
                    properties.value,
                    properties.scope,
                ]);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * If you created a custom variable and then decide to remove this variable from
     * a visit or page view, you can use deleteCustomVariable.
     *
     * @link https://developer.matomo.org/guides/tracking-javascript-guide#deleting-a-custom-variable
     */
    deletedUserProperties(properties) {
        try {
            _paq.push(['deleteCustomVariable', properties.index, properties.scope]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setCustomDimensions(properties) {
        const dimensionRegex = /dimension[1-9]\d*/;
        const dimensions = Object.keys(properties).filter(key => dimensionRegex.exec(key));
        dimensions.forEach(dimension => {
            const number = Number(dimension.substr(9));
            _paq.push(['setCustomDimension', number, properties[dimension]]);
        });
        return dimensions;
    }
}
Angulartics2Matomo.ɵfac = function Angulartics2Matomo_Factory(t) { return new (t || Angulartics2Matomo)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Matomo.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Matomo, factory: Angulartics2Matomo.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Matomo, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Segment {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe(x => this.setUserProperties(x));
        this.angulartics2.setAlias.subscribe(x => this.setAlias(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#page
     *
     * analytics.page([category], [name], [properties], [options], [callback]);
     */
    pageTrack(path) {
        // TODO : Support optional parameters where the parameter order and type changes their meaning
        try {
            analytics.page(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#track
     *
     * analytics.track(event, [properties], [options], [callback]);
     */
    eventTrack(action, properties) {
        try {
            analytics.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#identify
     *
     * analytics.identify([userId], [traits], [options], [callback]);
     */
    setUserProperties(properties) {
        try {
            if (properties.userId) {
                analytics.identify(properties.userId, properties);
            }
            else {
                analytics.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset--logout
     *
     * analytics.reset();
     */
    unsetUserProperties() {
        analytics.reset();
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#alias
     *
     * analytics.alias(userId, previousId, options, callback);
     */
    setAlias(alias) {
        try {
            analytics.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Segment.ɵfac = function Angulartics2Segment_Factory(t) { return new (t || Angulartics2Segment)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Segment.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Segment, factory: Angulartics2Segment.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Segment, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Intercom {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe(x => this.setUserProperties(x));
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
        try {
            this.eventTrack('Pageview', {
                url: path,
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            Intercom('trackEvent', action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            if (properties.userId && !properties.user_id) {
                properties.user_id = properties.userId;
            }
            Intercom('boot', properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Intercom.ɵfac = function Angulartics2Intercom_Factory(t) { return new (t || Angulartics2Intercom)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Intercom.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Intercom, factory: Angulartics2Intercom.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Intercom, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Woopra {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof woopra === 'undefined') {
            console.warn('Woopra not found');
        }
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
        try {
            woopra.track('pv', {
                url: path,
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            woopra.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            if (properties.email) {
                woopra.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Woopra.ɵfac = function Angulartics2Woopra_Factory(t) { return new (t || Angulartics2Woopra)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Woopra.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Woopra, factory: Angulartics2Woopra.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Woopra, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Clicky {
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
Angulartics2Clicky.ɵfac = function Angulartics2Clicky_Factory(t) { return new (t || Angulartics2Clicky)(i0.ɵɵinject(Angulartics2), i0.ɵɵinject(i2$1.Title)); };
Angulartics2Clicky.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Clicky, factory: Angulartics2Clicky.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Clicky, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }, { type: i2$1.Title }]; }, null); })();

class Angulartics2Amplitude {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe((x) => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventTrack(x.action, x.properties));
    }
    pageTrack(path) {
        try {
            this.eventTrack('Pageview', {
                url: path,
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            amplitude.getInstance().logEvent(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUsername(userId) {
        try {
            amplitude.getInstance().setUserId(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            amplitude.getInstance().setUserProperties(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Amplitude.ɵfac = function Angulartics2Amplitude_Factory(t) { return new (t || Angulartics2Amplitude)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Amplitude.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Amplitude, factory: Angulartics2Amplitude.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Amplitude, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2Splunk {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof sp === 'undefined') {
            console.warn('Splunk not found');
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
        try {
            sp.pageview(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            sp.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Splunk.ɵfac = function Angulartics2Splunk_Factory(t) { return new (t || Angulartics2Splunk)(i0.ɵɵinject(Angulartics2)); };
Angulartics2Splunk.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Splunk, factory: Angulartics2Splunk.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Splunk, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2IBMDigitalAnalytics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof window['cmCreatePageviewTag'] !== 'function') {
            console.warn('Angulartics 2 IBM Digital Analytics Plugin: eluminate.js is not loaded');
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
    /**
     * Track Page in IBM Digital Analytics
     *
     * @param path location
     *
     * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_pageviewtag.html
     */
    pageTrack(path) {
        const cmCreatePageviewTag = window['cmCreatePageviewTag'];
        cmCreatePageviewTag(path, null, null, null);
    }
    /**
     * Track an event in IBM Digital Analytics
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    eventTrack(action, properties = {}) {
        const cmDisplayShops = window['cmDisplayShops'];
        switch (action) {
            /**
             * @description The Product View tag captures information about vdigitalDataiews of product detail pages.
             *  The Product View tag should be called on the lowest level detail page for products, which is typically
             *  the Product Details page. You can view example Product View tags below.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_prodviewtag.html
             */
            case 'cmCreateProductviewTag':
                const cmCreateProductviewTag = window['cmCreateProductviewTag'];
                cmCreateProductviewTag(properties.productId, properties.productName, properties.categoryId, properties.attrbute, properties.virtualCategory);
                break;
            /**
             * @description The Shop Action 5 tag captures data about selected products and which products are present in a shopping cart,
             *  if any, when the cart is viewed.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact5tag.html
             */
            case 'cmCreateShopAction5Tag':
                const cmCreateShopAction5Tag = window['cmCreateShopAction5Tag'];
                cmCreateShopAction5Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.categoryId, properties.attrbute, properties.extraFields, properties.virtualCategory);
                cmDisplayShops();
                break;
            /**
             * @description The Shop Action 9 tag captures data about what products were purchased by a customer.
             *  Like the Shop Action 5 tag, one tag should be sent for each product line item purchased. These tags should be sent
             *  on the receipt or other completion page confirming a successful order.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact9tag.html
             */
            case 'cmCreateShopAction9Tag':
                const cmCreateShopAction9Tag = window['cmCreateShopAction9Tag'];
                cmCreateShopAction9Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.registrationId, properties.orderId, properties.orderSubtotal, properties.categoryId, properties.attrbute, properties.extraFields);
                cmDisplayShops();
                break;
            /**
             * @description The Order tag captures order header information such as Registration ID, order ID, order subtotal,
             *  and shipping and handling. The Order tag should be sent on the receipt page confirming order completion.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_ordertag.html
             */
            case 'cmCreateOrderTag':
                const cmCreateOrderTag = window['cmCreateOrderTag'];
                cmCreateOrderTag(properties.orderId, properties.orderSubtotal, properties.orderShipping, properties.registrationId, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.attrbute, properties.extraFields);
                break;
            /**
             * @description The Registration tag creates a Lifetime Visitor Experience Profile (LIVE Profile) by associating a single
             *  common Registration ID with the IBM® Digital Analytics permanent cookie set in every browser visiting the tagged site.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_registrationtag.html
             */
            case 'cmCreateRegistrationTag':
                const cmCreateRegistrationTag = window['cmCreateRegistrationTag'];
                cmCreateRegistrationTag(properties.registrationId, properties.registrantEmail, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.registrantCountry, properties.attrbute);
                break;
            /**
             * @description The Element tag is used to track intra-page content in IBM® Digital Analytics. Data collected by
             *  the Element tag is used to populate values in the Element Categories and Top Viewed Elements reports.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_elementtag.html
             */
            case 'cmCreateElementTag':
                const cmCreateElementTag = window['cmCreateElementTag'];
                cmCreateElementTag(properties.elementId, properties.elementCategory, properties.attrbute);
                break;
            /**
             * @description The Conversion Event tag is employed for tracking of general non-commerce conversion events.
             * The Conversion Event tag is used to populate values in the Conversion Events Reports and to create Key Segments.
             * This tag and the reports it populates enable analysis of a wide variety of site activities.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_conversioneventtag.html
             */
            case 'cmCreateConversionEventTag':
                const cmCreateConversionEventTag = window['cmCreateConversionEventTag'];
                cmCreateConversionEventTag(properties.eventId, properties.actionType, properties.eventCategoryId, properties.points, properties.attrbute, properties.extraFields);
                break;
            default:
                console.warn('Unsupported Event Action');
        }
    }
}
Angulartics2IBMDigitalAnalytics.ɵfac = function Angulartics2IBMDigitalAnalytics_Factory(t) { return new (t || Angulartics2IBMDigitalAnalytics)(i0.ɵɵinject(Angulartics2)); };
Angulartics2IBMDigitalAnalytics.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2IBMDigitalAnalytics, factory: Angulartics2IBMDigitalAnalytics.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2IBMDigitalAnalytics, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

class Angulartics2GoSquared {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe(x => this.setUserProperties(x));
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
        try {
            _gs('track', path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            _gs('event', action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            _gs('identify', properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2GoSquared.ɵfac = function Angulartics2GoSquared_Factory(t) { return new (t || Angulartics2GoSquared)(i0.ɵɵinject(Angulartics2)); };
Angulartics2GoSquared.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2GoSquared, factory: Angulartics2GoSquared.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2GoSquared, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: Angulartics2 }]; }, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { ANGULARTICS2_TOKEN, AngularRouterTracking, Angulartics2, Angulartics2AdobeAnalytics, Angulartics2Amplitude, Angulartics2AppInsights, Angulartics2BaiduAnalytics, Angulartics2Clicky, Angulartics2Facebook, Angulartics2GoSquared, Angulartics2GoogleAnalytics, Angulartics2GoogleAnalyticsEnhancedEcommerce, Angulartics2GoogleGlobalSiteTag, Angulartics2GoogleTagManager, Angulartics2Hubspot, Angulartics2IBMDigitalAnalytics, Angulartics2Intercom, Angulartics2Kissmetrics, Angulartics2LaunchByAdobe, Angulartics2Matomo, Angulartics2Mixpanel, Angulartics2Module, Angulartics2On, Angulartics2OnModule, Angulartics2Pyze, Angulartics2RouterlessModule, Angulartics2Segment, Angulartics2Splunk, Angulartics2Woopra, AppInsightsDefaults, DefaultConfig, GoogleAnalyticsDefaults, GoogleGlobalSiteTagDefaults, GoogleTagManagerDefaults, RouterlessTracking };
//# sourceMappingURL=angulartics2.mjs.map
