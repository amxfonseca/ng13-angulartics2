import { Location } from '@angular/common';
import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
export declare class Angulartics2AdobeAnalytics {
    private angulartics2;
    private location;
    constructor(angulartics2: Angulartics2, location: Location);
    startTracking(): void;
    pageTrack(path: string): void;
    /**
     * Track Event in Adobe Analytics
     *
     * @param action associated with the event
     * @param properties action detials
     *
     * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
     */
    eventTrack(action: string, properties: any): void;
    private setPageName;
    setUserProperties(properties: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2AdobeAnalytics, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2AdobeAnalytics>;
}
