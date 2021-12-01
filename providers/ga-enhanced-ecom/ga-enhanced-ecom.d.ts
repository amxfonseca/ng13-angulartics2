import { GaEnhancedEcomAction, GaEnhancedEcomActionFieldObject, GaEnhancedEcomImpressionFieldObject, GaEnhancedEcomProductFieldObject } from './ga-enhanced-ecom-options';
import * as i0 from "@angular/core";
export declare class Angulartics2GoogleAnalyticsEnhancedEcommerce {
    /**
     * Add impression in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
     */
    ecAddImpression(properties: Partial<GaEnhancedEcomImpressionFieldObject>): void;
    /**
     * Add product in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecAddProduct(product: Partial<GaEnhancedEcomProductFieldObject>): void;
    /**
     * Set action in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecSetAction(action: GaEnhancedEcomAction, properties: Partial<GaEnhancedEcomActionFieldObject>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2GoogleAnalyticsEnhancedEcommerce, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2GoogleAnalyticsEnhancedEcommerce>;
}
