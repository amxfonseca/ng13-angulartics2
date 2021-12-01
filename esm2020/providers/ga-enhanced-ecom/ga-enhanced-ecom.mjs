import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class Angulartics2GoogleAnalyticsEnhancedEcommerce {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2EtZW5oYW5jZWQtZWNvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcHJvdmlkZXJzL2dhLWVuaGFuY2VkLWVjb20vZ2EtZW5oYW5jZWQtZWNvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVczQyxNQUFNLE9BQU8sNENBQTRDO0lBQ3ZEOzs7T0FHRztJQUNILGVBQWUsQ0FBQyxVQUF3RDtRQUN0RSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVksQ0FBQyxPQUFrRDtRQUM3RCxFQUFFLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXLENBQ1QsTUFBNEIsRUFDNUIsVUFBb0Q7UUFFcEQsRUFBRSxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7d0lBMUJVLDRDQUE0QztrR0FBNUMsNENBQTRDLFdBQTVDLDRDQUE0QyxtQkFEL0IsTUFBTTt1RkFDbkIsNENBQTRDO2NBRHhELFVBQVU7ZUFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBHYUVuaGFuY2VkRWNvbUFjdGlvbixcbiAgR2FFbmhhbmNlZEVjb21BY3Rpb25GaWVsZE9iamVjdCxcbiAgR2FFbmhhbmNlZEVjb21JbXByZXNzaW9uRmllbGRPYmplY3QsXG4gIEdhRW5oYW5jZWRFY29tUHJvZHVjdEZpZWxkT2JqZWN0LFxufSBmcm9tICcuL2dhLWVuaGFuY2VkLWVjb20tb3B0aW9ucyc7XG5cbmRlY2xhcmUgdmFyIGdhOiBVbml2ZXJzYWxBbmFseXRpY3MuZ2E7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyR29vZ2xlQW5hbHl0aWNzRW5oYW5jZWRFY29tbWVyY2Uge1xuICAvKipcbiAgICogQWRkIGltcHJlc3Npb24gaW4gR0EgZW5oYW5jZWQgZWNvbW1lcmNlIHRyYWNraW5nXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9lbmhhbmNlZC1lY29tbWVyY2UjbWVhc3VyaW5nLWFjdGl2aXRpZXNcbiAgICovXG4gIGVjQWRkSW1wcmVzc2lvbihwcm9wZXJ0aWVzOiBQYXJ0aWFsPEdhRW5oYW5jZWRFY29tSW1wcmVzc2lvbkZpZWxkT2JqZWN0Pikge1xuICAgIGdhKCdlYzphZGRJbXByZXNzaW9uJywgcHJvcGVydGllcyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHByb2R1Y3QgaW4gR0EgZW5oYW5jZWQgZWNvbW1lcmNlIHRyYWNraW5nXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9lY29tbWVyY2VcbiAgICovXG4gIGVjQWRkUHJvZHVjdChwcm9kdWN0OiBQYXJ0aWFsPEdhRW5oYW5jZWRFY29tUHJvZHVjdEZpZWxkT2JqZWN0Pikge1xuICAgIGdhKCdlYzphZGRQcm9kdWN0JywgcHJvZHVjdCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGFjdGlvbiBpbiBHQSBlbmhhbmNlZCBlY29tbWVyY2UgdHJhY2tpbmdcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2Vjb21tZXJjZVxuICAgKi9cbiAgZWNTZXRBY3Rpb24oXG4gICAgYWN0aW9uOiBHYUVuaGFuY2VkRWNvbUFjdGlvbixcbiAgICBwcm9wZXJ0aWVzOiBQYXJ0aWFsPEdhRW5oYW5jZWRFY29tQWN0aW9uRmllbGRPYmplY3Q+XG4gICkge1xuICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBhY3Rpb24sIHByb3BlcnRpZXMpO1xuICB9XG59XG4iXX0=