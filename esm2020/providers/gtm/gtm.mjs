import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
export class GoogleTagManagerDefaults {
    constructor() {
        this.userId = null;
    }
}
export class Angulartics2GoogleTagManager {
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
Angulartics2GoogleTagManager.ɵfac = function Angulartics2GoogleTagManager_Factory(t) { return new (t || Angulartics2GoogleTagManager)(i0.ɵɵinject(i1.Angulartics2)); };
Angulartics2GoogleTagManager.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2GoogleTagManager, factory: Angulartics2GoogleTagManager.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2GoogleTagManager, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3RtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvZ3RtL2d0bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPM0MsTUFBTSxPQUFPLHdCQUF3QjtJQUFyQztRQUNFLFdBQU0sR0FBRyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBO0FBR0QsTUFBTSxPQUFPLDRCQUE0QjtJQUN2QyxZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM5Qyx3Q0FBd0M7UUFDeEMsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFO1lBQ2pELFNBQVMsR0FBSSxNQUFjLENBQUMsU0FBUyxHQUFJLE1BQWMsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1NBQ3pFO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hELDJDQUEyQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMs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QVc7WUFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxhQUFhO1NBQ2hDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLE1BQWM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDakQsQ0FBQzs7d0dBN0dVLDRCQUE0QjtrRkFBNUIsNEJBQTRCLFdBQTVCLDRCQUE0QixtQkFEZixNQUFNO3VGQUNuQiw0QkFBNEI7Y0FEeEMsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuaW1wb3J0IHsgR29vZ2xlVGFnTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWNvbmZpZyc7XG5cbmRlY2xhcmUgdmFyIGRhdGFMYXllcjogYW55O1xuXG5leHBvcnQgY2xhc3MgR29vZ2xlVGFnTWFuYWdlckRlZmF1bHRzIGltcGxlbWVudHMgR29vZ2xlVGFnTWFuYWdlclNldHRpbmdzIHtcbiAgdXNlcklkID0gbnVsbDtcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJHb29nbGVUYWdNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7XG4gICAgLy8gVGhlIGRhdGFMYXllciBuZWVkcyB0byBiZSBpbml0aWFsaXplZFxuICAgIGlmICh0eXBlb2YgZGF0YUxheWVyICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhTGF5ZXIpIHtcbiAgICAgIGRhdGFMYXllciA9ICh3aW5kb3cgYXMgYW55KS5kYXRhTGF5ZXIgPSAod2luZG93IGFzIGFueSkuZGF0YUxheWVyIHx8IFtdO1xuICAgIH1cbiAgICBjb25zdCBkZWZhdWx0cyA9IG5ldyBHb29nbGVUYWdNYW5hZ2VyRGVmYXVsdHMoKTtcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZm9yIHRoaXMgbW9kdWxlXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3RtID0geyAuLi5kZWZhdWx0cywgLi4udGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3RtIH07XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWUuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcm5hbWUoeCkpO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5leGNlcHRpb25UcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLmV4Y2VwdGlvblRyYWNrKHgpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnB1c2hMYXllcih7XG4gICAgICBldmVudDogJ1BhZ2UgVmlldycsXG4gICAgICAnY29udGVudC1uYW1lJzogcGF0aCxcbiAgICAgIHVzZXJJZDogdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3RtLnVzZXJJZCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIERhdGEgTGF5ZXJcbiAgICpcbiAgICogQGxheWVyIGRhdGEgbGF5ZXIgb2JqZWN0XG4gICAqL1xuICBwdXNoTGF5ZXIobGF5ZXI6IGFueSkge1xuICAgIGlmICh0eXBlb2YgZGF0YUxheWVyICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhTGF5ZXIpIHtcbiAgICAgIGRhdGFMYXllci5wdXNoKGxheWVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBpbnRlcmFjdGlvbnMgdG8gdGhlIGRhdGFMYXllciwgaS5lLiBmb3IgZXZlbnQgdHJhY2tpbmcgaW4gR29vZ2xlIEFuYWx5dGljc1xuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcbiAgICovXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xuICAgIC8vIFRPRE86IG1ha2UgaW50ZXJmYWNlXG4gICAgLy8gIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0aWVzLmNhdGVnb3J5XG4gICAgLy8gIEBwYXJhbSB7c3RyaW5nfSBbcHJvcGVydGllcy5sYWJlbF1cbiAgICAvLyAgQHBhcmFtIHtudW1iZXJ9IFtwcm9wZXJ0aWVzLnZhbHVlXVxuICAgIC8vICBAcGFyYW0ge2Jvb2xlYW59IFtwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uXVxuICAgIC8vIFNldCBhIGRlZmF1bHQgR1RNIGNhdGVnb3J5XG4gICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XG5cbiAgICB0aGlzLnB1c2hMYXllcih7XG4gICAgICBldmVudDogcHJvcGVydGllcy5ldmVudCB8fCAnaW50ZXJhY3Rpb24nLFxuICAgICAgdGFyZ2V0OiBwcm9wZXJ0aWVzLmNhdGVnb3J5IHx8ICdFdmVudCcsXG4gICAgICBhY3Rpb24sXG4gICAgICBsYWJlbDogcHJvcGVydGllcy5sYWJlbCxcbiAgICAgIHZhbHVlOiBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgaW50ZXJhY3Rpb25UeXBlOiBwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uLFxuICAgICAgdXNlcklkOiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5ndG0udXNlcklkLFxuICAgICAgLi4ucHJvcGVydGllcy5ndG1DdXN0b20sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXhjZXB0aW9uIFRyYWNrIEV2ZW50IGluIEdUTVxuICAgKlxuICAgKi9cbiAgZXhjZXB0aW9uVHJhY2socHJvcGVydGllczogYW55KSB7XG4gICAgLy8gVE9ETzogbWFrZSBpbnRlcmZhY2VcbiAgICAvLyAgQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXNcbiAgICAvLyAgQHBhcmFtIHtzdHJpbmd9IHByb3BlcnRpZXMuYXBwSWRcbiAgICAvLyAgQHBhcmFtIHtzdHJpbmd9IHByb3BlcnRpZXMuYXBwTmFtZVxuICAgIC8vICBAcGFyYW0ge3N0cmluZ30gcHJvcGVydGllcy5hcHBWZXJzaW9uXG4gICAgLy8gIEBwYXJhbSB7c3RyaW5nfSBbcHJvcGVydGllcy5kZXNjcmlwdGlvbl1cbiAgICAvLyAgQHBhcmFtIHtib29sZWFufSBbcHJvcGVydGllcy5mYXRhbF1cbiAgICBpZiAoIXByb3BlcnRpZXMgfHwgIXByb3BlcnRpZXMuYXBwSWQgfHwgIXByb3BlcnRpZXMuYXBwTmFtZSB8fCAhcHJvcGVydGllcy5hcHBWZXJzaW9uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdNdXN0IGJlIHNldHRlZCBhcHBJZCwgYXBwTmFtZSBhbmQgYXBwVmVyc2lvbi4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocHJvcGVydGllcy5mYXRhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZygnTm8gXCJmYXRhbFwiIHByb3ZpZGVkLCBzZW5kaW5nIHdpdGggZmF0YWw9dHJ1ZScpO1xuICAgICAgcHJvcGVydGllcy5leEZhdGFsID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm9wZXJ0aWVzLmV4RGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmV2ZW50ID8gcHJvcGVydGllcy5ldmVudC5zdGFjayA6IHByb3BlcnRpZXMuZGVzY3JpcHRpb247XG5cbiAgICB0aGlzLmV2ZW50VHJhY2soXG4gICAgICBgRXhjZXB0aW9uIHRocm93biBmb3IgJHtwcm9wZXJ0aWVzLmFwcE5hbWV9IDwke3Byb3BlcnRpZXMuYXBwSWR9QCR7cHJvcGVydGllcy5hcHBWZXJzaW9ufT5gLFxuICAgICAge1xuICAgICAgICBjYXRlZ29yeTogJ0V4Y2VwdGlvbicsXG4gICAgICAgIGxhYmVsOiBwcm9wZXJ0aWVzLmV4RGVzY3JpcHRpb24sXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVzZXJJZCBmb3IgdXNlIHdpdGggVW5pdmVyc2FsIEFuYWx5dGljcyBVc2VyIElEIGZlYXR1cmVcbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCB1c2VkIHRvIGlkZW50aWZ5IHVzZXIgY3Jvc3MtZGV2aWNlIGluIEdvb2dsZSBBbmFseXRpY3NcbiAgICovXG4gIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3RtLnVzZXJJZCA9IHVzZXJJZDtcbiAgfVxufVxuIl19