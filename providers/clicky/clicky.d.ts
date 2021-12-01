import { Title } from '@angular/platform-browser';
import { Angulartics2 } from '../../angulartics2-core';
import { ClickyProperties } from './clicky.interfaces';
import * as i0 from "@angular/core";
export declare class Angulartics2Clicky {
    private angulartics2;
    private titleService;
    constructor(angulartics2: Angulartics2, titleService: Title);
    startTracking(): void;
    /**
     * Track Page in Clicky
     *
     * @param path location
     *
     * @link https://clicky.com/help/custom/manual#log
     */
    pageTrack(path: string): void;
    /**
     * Track Event Or Goal in Clicky
     *
     * @param action Action name
     * @param properties Definition of 'properties.goal' determines goal vs event tracking
     *
     * @link https://clicky.com/help/custom/manual#log
     * @link https://clicky.com/help/custom/manual#goal
     */
    eventOrGoalTrack(action: string, properties: Partial<ClickyProperties>): void;
    private validateType;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2Clicky, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2Clicky>;
}
