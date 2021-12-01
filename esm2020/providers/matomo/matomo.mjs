import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
export class Angulartics2Matomo {
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
Angulartics2Matomo.ɵfac = function Angulartics2Matomo_Factory(t) { return new (t || Angulartics2Matomo)(i0.ɵɵinject(i1.Angulartics2)); };
Angulartics2Matomo.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Matomo, factory: Angulartics2Matomo.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Matomo, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0b21vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvbWF0b21vL21hdG9tby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUF5STNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFvQyxFQUFFLEVBQUUsQ0FDckYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQVksRUFBRSxLQUFjO1FBQ3BDLElBQUk7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxRQUFnQixDQUFDLE1BQU07b0JBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUTt3QkFDeEIsSUFBSTt3QkFDSixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVE7d0JBQ3hCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDNUQ7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDOUI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLHFCQUFxQixFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7WUFDNUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQywrREFBK0Q7U0FDOUY7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQWNEOzs7OztPQUtHO0lBQ0gsVUFBVSxDQUFDLE1BQXdCLEVBQUUsVUFBdUM7UUFDMUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFFBQVEsTUFBTSxFQUFFO1lBQ2Q7Ozs7Ozs7Ozs7OztlQVlHO1lBQ0gsS0FBSyxrQkFBa0I7Z0JBQ3JCLE1BQU0sR0FBRztvQkFDUCxrQkFBa0I7b0JBQ2pCLFVBQStDLENBQUMsVUFBVTtvQkFDMUQsVUFBK0MsQ0FBQyxXQUFXO29CQUMzRCxVQUErQyxDQUFDLFlBQVk7b0JBQzVELFVBQStDLENBQUMsS0FBSztpQkFDdkQsQ0FBQztnQkFDRixNQUFNO1lBRVI7Ozs7Ozs7Ozs7OztlQVlHO1lBQ0gsS0FBSyxrQkFBa0I7Z0JBQ3JCLE1BQU0sR0FBRztvQkFDUCxrQkFBa0I7b0JBQ2pCLFVBQXlDLENBQUMsVUFBVTtvQkFDcEQsVUFBeUMsQ0FBQyxXQUFXO29CQUNyRCxVQUF5QyxDQUFDLGVBQWU7b0JBQ3pELFVBQXlDLENBQUMsS0FBSztvQkFDL0MsVUFBeUMsQ0FBQyxRQUFRO2lCQUNwRCxDQUFDO2dCQUNGLE1BQU07WUFFUjs7Ozs7Ozs7ZUFRRztZQUNILEtBQUssMEJBQTBCO2dCQUM3QixNQUFNLEdBQUc7b0JBQ1AsMEJBQTBCO29CQUN6QixVQUF1RCxDQUFDLFVBQVU7aUJBQ3BFLENBQUM7Z0JBQ0YsTUFBTTtZQUVSOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxLQUFLLHFCQUFxQjtnQkFDeEIsTUFBTSxHQUFHO29CQUNQLHFCQUFxQjtvQkFDcEIsVUFBa0QsQ0FBQyxPQUFPO29CQUMxRCxVQUFrRCxDQUFDLFVBQVU7b0JBQzdELFVBQWtELENBQUMsUUFBUTtvQkFDM0QsVUFBa0QsQ0FBQyxHQUFHO29CQUN0RCxVQUFrRCxDQUFDLFFBQVE7b0JBQzNELFVBQWtELENBQUMsUUFBUTtpQkFDN0QsQ0FBQztnQkFDRixNQUFNO1lBRVI7Ozs7Ozs7O2VBUUc7WUFDSCxLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxHQUFHO29CQUNQLFdBQVc7b0JBQ1YsVUFBd0MsQ0FBQyxHQUFHO29CQUM1QyxVQUF3QyxDQUFDLFFBQVE7aUJBQ25ELENBQUM7Z0JBQ0YsTUFBTTtZQUVSOzs7Ozs7OztlQVFHO1lBQ0gsS0FBSyxXQUFXO2dCQUNkLE1BQU0sR0FBRztvQkFDUCxXQUFXO29CQUNWLFVBQXdDLENBQUMsTUFBTTtvQkFDL0MsVUFBd0MsQ0FBQyxLQUFLO2lCQUNoRCxDQUFDO2dCQUNGLE1BQU07WUFFUjs7Ozs7Ozs7O2VBU0c7WUFDSCxLQUFLLGlCQUFpQjtnQkFDcEIsTUFBTSxHQUFHO29CQUNQLGlCQUFpQjtvQkFDaEIsVUFBOEMsQ0FBQyxPQUFPO29CQUN0RCxVQUE4QyxDQUFDLFFBQVE7b0JBQ3ZELFVBQThDLENBQUMsV0FBVztpQkFDNUQsQ0FBQztnQkFDRixNQUFNO1lBRVI7Ozs7Ozs7Ozs7OztlQVlHO1lBQ0g7Z0JBQ0UseUZBQXlGO2dCQUN6RixJQUFLLFVBQXlDLENBQUMsS0FBSyxFQUFFO29CQUNwRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUUsVUFBeUMsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3BGLFVBQXlDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBQy9FO2dCQUVELE1BQU0sR0FBRztvQkFDUCxZQUFZO29CQUNYLFVBQXlDLENBQUMsUUFBUTtvQkFDbkQsTUFBTTtvQkFDTCxVQUF5QyxDQUFDLElBQUk7d0JBQzVDLFVBQXlDLENBQUMsS0FBSztvQkFDakQsVUFBeUMsQ0FBQyxLQUFLO2lCQUNqRCxDQUFDO1NBQ0w7UUFDRCxJQUFJO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQXdCO1FBQ2xDLElBQUk7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbEM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILGlCQUFpQixDQUFDLFVBQTZDO1FBQzdELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxJQUFJO1lBQ0YsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDUixtQkFBbUI7b0JBQ25CLFVBQVUsQ0FBQyxLQUFLO29CQUNoQixVQUFVLENBQUMsSUFBSTtvQkFDZixVQUFVLENBQUMsS0FBSztvQkFDaEIsVUFBVSxDQUFDLEtBQUs7aUJBQ2pCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gscUJBQXFCLENBQUMsVUFBZ0Q7UUFDcEUsSUFBSTtZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3pFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksY0FBYyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtJQUNILENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxVQUE2QztRQUN2RSxNQUFNLGNBQWMsR0FBVyxtQkFBbUIsQ0FBQztRQUNuRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRixVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7b0ZBMVRVLGtCQUFrQjt3RUFBbEIsa0JBQWtCLFdBQWxCLGtCQUFrQixtQkFETCxNQUFNO3VGQUNuQixrQkFBa0I7Y0FEOUIsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuXG5kZWNsYXJlIHZhciBfcGFxOiBhbnk7XG5cbmV4cG9ydCB0eXBlIEV2ZW50VHJhY2tBY3Rpb24gPVxuICB8ICdzZXRFY29tbWVyY2VWaWV3J1xuICB8ICdhZGRFY29tbWVyY2VJdGVtJ1xuICB8ICd0cmFja0Vjb21tZXJjZUNhcnRVcGRhdGUnXG4gIHwgJ3RyYWNrRWNvbW1lcmNlT3JkZXInXG4gIHwgJ3RyYWNrTGluaydcbiAgfCAndHJhY2tHb2FsJ1xuICB8ICd0cmFja1NpdGVTZWFyY2gnXG4gIHwgc3RyaW5nO1xuXG5leHBvcnQgdHlwZSBTY29wZU1hdG9tbyA9ICd2aXNpdCcgfCAncGFnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGltZW5zaW9uc01hdG9tb1Byb3BlcnRpZXMge1xuICBkaW1lbnNpb24wPzogc3RyaW5nO1xuICBkaW1lbnNpb24xPzogc3RyaW5nO1xuICBkaW1lbnNpb24yPzogc3RyaW5nO1xuICBkaW1lbnNpb24zPzogc3RyaW5nO1xuICBkaW1lbnNpb240Pzogc3RyaW5nO1xuICBkaW1lbnNpb241Pzogc3RyaW5nO1xuICBkaW1lbnNpb242Pzogc3RyaW5nO1xuICBkaW1lbnNpb243Pzogc3RyaW5nO1xuICBkaW1lbnNpb244Pzogc3RyaW5nO1xuICBkaW1lbnNpb245Pzogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgcHJvZHVjdFNLVTogc3RyaW5nO1xuICAvKiogQGNsYXNzIFNldEVjb21tZXJjZVZpZXdNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHByb2R1Y3ROYW1lOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgY2F0ZWdvcnlOYW1lOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgcHJpY2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMgKi9cbiAgcHJvZHVjdFNLVTogc3RyaW5nO1xuICAvKiogQGNsYXNzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzICovXG4gIHByb2R1Y3ROYW1lOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMgKi9cbiAgcHJvZHVjdENhdGVnb3J5OiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMgKi9cbiAgcHJpY2U6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcyAqL1xuICBxdWFudGl0eTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZU1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgZ3JhbmRUb3RhbDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzIHtcbiAgLyoqIEBjbGFzcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyAqL1xuICBvcmRlcklkOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgZ3JhbmRUb3RhbDogc3RyaW5nO1xuICAvKiogQGNsYXNzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHN1YlRvdGFsOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgdGF4OiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgc2hpcHBpbmc6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyAqL1xuICBkaXNjb3VudDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrTGlua01hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrTGlua01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tMaW5rTWF0b21vUHJvcGVydGllcyAqL1xuICBsaW5rVHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrR29hbE1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrR29hbE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgZ29hbElkOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tHb2FsTWF0b21vUHJvcGVydGllcyAqL1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAga2V5d29yZDogc3RyaW5nO1xuICAvKiogQGNsYXNzIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgY2F0ZWdvcnk6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja1NpdGVTZWFyY2hNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHNlYXJjaENvdW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgbmFtZT86IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcyAqL1xuICBsYWJlbD86IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcyAqL1xuICB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldEN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyBleHRlbmRzIERpbWVuc2lvbnNNYXRvbW9Qcm9wZXJ0aWVzIHtcbiAgLyoqIEBjbGFzcyBTZXRDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgaW5kZXg6IG51bWJlcjtcbiAgLyoqIEBjbGFzcyBTZXRDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKiogQGNsYXNzIFNldEN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyAqL1xuICB2YWx1ZTogc3RyaW5nO1xuICAvKiogQGNsYXNzIFNldEN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyAqL1xuICBzY29wZTogU2NvcGVNYXRvbW87XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVsZXRlQ3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzIHtcbiAgLyoqIEBjbGFzcyBEZWxldGVDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgaW5kZXg6IG51bWJlcjtcbiAgLyoqIEBjbGFzcyBEZWxldGVDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgc2NvcGU6IFNjb3BlTWF0b21vO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudFRyYWNrYWN0aW9uUHJvcGVydGllcyA9XG4gIHwgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXNcbiAgfCBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllc1xuICB8IFRyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZU1hdG9tb1Byb3BlcnRpZXNcbiAgfCBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllc1xuICB8IFRyYWNrTGlua01hdG9tb1Byb3BlcnRpZXNcbiAgfCBUcmFja0dvYWxNYXRvbW9Qcm9wZXJ0aWVzXG4gIHwgVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllc1xuICB8IFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMk1hdG9tbyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICBpZiAodHlwZW9mIF9wYXEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ01hdG9tbyBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWUuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcm5hbWUoeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzLnN1YnNjcmliZSgoeDogU2V0Q3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzKSA9PlxuICAgICAgdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSxcbiAgICApO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcsIHRpdGxlPzogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuICAgICAgICAod2luZG93LmxvY2F0aW9uIGFzIGFueSkub3JpZ2luID1cbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgK1xuICAgICAgICAgICcvLycgK1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArXG4gICAgICAgICAgKHdpbmRvdy5sb2NhdGlvbi5wb3J0ID8gJzonICsgd2luZG93LmxvY2F0aW9uLnBvcnQgOiAnJyk7XG4gICAgICB9XG4gICAgICBfcGFxLnB1c2goWydzZXREb2N1bWVudFRpdGxlJywgdGl0bGUgfHwgd2luZG93LmRvY3VtZW50LnRpdGxlXSk7XG4gICAgICBfcGFxLnB1c2goWydzZXRDdXN0b21VcmwnLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgcGF0aF0pO1xuICAgICAgX3BhcS5wdXNoKFsndHJhY2tQYWdlVmlldyddKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXRVc2VyKCkge1xuICAgIHRyeSB7XG4gICAgICBfcGFxLnB1c2goWydhcHBlbmRUb1RyYWNraW5nVXJsJywgJ25ld192aXNpdD0xJ10pOyAvLyAoMSkgZm9yY2VzIGEgbmV3IHZpc2l0XG4gICAgICBfcGFxLnB1c2goWydkZWxldGVDb29raWVzJ10pOyAvLyAoMikgZGVsZXRlcyBleGlzdGluZyB0cmFja2luZyBjb29raWVzIHRvIHN0YXJ0IHRoZSBuZXcgdmlzaXRcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXZlbnRUcmFjayhhY3Rpb246ICdzZXRFY29tbWVyY2VWaWV3JywgcHJvcGVydGllczogU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMpOiB2b2lkO1xuICBldmVudFRyYWNrKGFjdGlvbjogJ2FkZEVjb21tZXJjZUl0ZW0nLCBwcm9wZXJ0aWVzOiBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soXG4gICAgYWN0aW9uOiAndHJhY2tFY29tbWVyY2VDYXJ0VXBkYXRlJyxcbiAgICBwcm9wZXJ0aWVzOiBUcmFja0Vjb21tZXJjZUNhcnRVcGRhdGVNYXRvbW9Qcm9wZXJ0aWVzLFxuICApOiB2b2lkO1xuICBldmVudFRyYWNrKGFjdGlvbjogJ3RyYWNrRWNvbW1lcmNlT3JkZXInLCBwcm9wZXJ0aWVzOiBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiAndHJhY2tMaW5rJywgcHJvcGVydGllczogVHJhY2tMaW5rTWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiAndHJhY2tHb2FsJywgcHJvcGVydGllczogVHJhY2tHb2FsTWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiAndHJhY2tTaXRlU2VhcmNoJywgcHJvcGVydGllczogVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzKTogdm9pZDtcblxuICAvKipcbiAgICogVHJhY2sgYSBiYXNpYyBldmVudCBpbiBNYXRvbW8sIG9yIHNlbmQgYW4gZWNvbW1lcmNlIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIEEgc3RyaW5nIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGUgb2YgZXZlbnQgdGhhdCBuZWVkcyB0byBiZSB0cmFja2VkLlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0aGF0IG5lZWQgdG8gYmUgbG9nZ2VkIHdpdGggdGhlIGV2ZW50LlxuICAgKi9cbiAgZXZlbnRUcmFjayhhY3Rpb246IEV2ZW50VHJhY2tBY3Rpb24sIHByb3BlcnRpZXM/OiBFdmVudFRyYWNrYWN0aW9uUHJvcGVydGllcykge1xuICAgIGxldCBwYXJhbXMgPSBbXTtcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgY3VycmVudCBwYWdlIHZpZXcgYXMgYSBwcm9kdWN0IG9yIGNhdGVnb3J5IHBhZ2Ugdmlldy4gV2hlbiB5b3UgY2FsbFxuICAgICAgICogc2V0RWNvbW1lcmNlVmlldyBpdCBtdXN0IGJlIGZvbGxvd2VkIGJ5IGEgY2FsbCB0byB0cmFja1BhZ2VWaWV3IHRvIHJlY29yZCB0aGUgcHJvZHVjdCBvclxuICAgICAgICogY2F0ZWdvcnkgcGFnZSB2aWV3LlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vbWF0b21vLm9yZy9kb2NzL2Vjb21tZXJjZS1hbmFseXRpY3MvI3RyYWNraW5nLXByb2R1Y3QtcGFnZS12aWV3cy1jYXRlZ29yeS1wYWdlLXZpZXdzLW9wdGlvbmFsXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5tYXRvbW8ub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCNlY29tbWVyY2VcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgcHJvZHVjdFNLVSAocmVxdWlyZWQpIFNLVTogUHJvZHVjdCB1bmlxdWUgaWRlbnRpZmllclxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3ROYW1lIChvcHRpb25hbCkgUHJvZHVjdCBuYW1lXG4gICAgICAgKiBAcHJvcGVydHkgY2F0ZWdvcnlOYW1lIChvcHRpb25hbCkgUHJvZHVjdCBjYXRlZ29yeSwgb3IgYXJyYXkgb2YgdXAgdG8gNSBjYXRlZ29yaWVzXG4gICAgICAgKiBAcHJvcGVydHkgcHJpY2UgKG9wdGlvbmFsKSBQcm9kdWN0IFByaWNlIGFzIGRpc3BsYXllZCBvbiB0aGUgcGFnZVxuICAgICAgICovXG4gICAgICBjYXNlICdzZXRFY29tbWVyY2VWaWV3JzpcbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICdzZXRFY29tbWVyY2VWaWV3JyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcykucHJvZHVjdFNLVSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcykucHJvZHVjdE5hbWUsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMpLmNhdGVnb3J5TmFtZSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcykucHJpY2UsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBBZGRzIGEgcHJvZHVjdCBpbnRvIHRoZSBlY29tbWVyY2Ugb3JkZXIuIE11c3QgYmUgY2FsbGVkIGZvciBlYWNoIHByb2R1Y3QgaW5cbiAgICAgICAqIHRoZSBvcmRlci5cbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1lY29tbWVyY2Utb3JkZXJzLWl0ZW1zLXB1cmNoYXNlZC1yZXF1aXJlZFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3RTS1UgKHJlcXVpcmVkKSBTS1U6IFByb2R1Y3QgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgICAqIEBwcm9wZXJ0eSBwcm9kdWN0TmFtZSAob3B0aW9uYWwpIFByb2R1Y3QgbmFtZVxuICAgICAgICogQHByb3BlcnR5IGNhdGVnb3J5TmFtZSAob3B0aW9uYWwpIFByb2R1Y3QgY2F0ZWdvcnksIG9yIGFycmF5IG9mIHVwIHRvIDUgY2F0ZWdvcmllc1xuICAgICAgICogQHByb3BlcnR5IHByaWNlIChyZWNvbW1lbmRlZCkgUHJvZHVjdCBwcmljZVxuICAgICAgICogQHByb3BlcnR5IHF1YW50aXR5IChvcHRpb25hbCwgZGVmYXVsdCB0byAxKSBQcm9kdWN0IHF1YW50aXR5XG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ2FkZEVjb21tZXJjZUl0ZW0nOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ2FkZEVjb21tZXJjZUl0ZW0nLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKS5wcm9kdWN0U0tVLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKS5wcm9kdWN0TmFtZSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcykucHJvZHVjdENhdGVnb3J5LFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKS5wcmljZSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcykucXVhbnRpdHksXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUcmFja3MgYSBzaG9wcGluZyBjYXJ0LiBDYWxsIHRoaXMgamF2YXNjcmlwdCBmdW5jdGlvbiBldmVyeSB0aW1lIGEgdXNlciBpc1xuICAgICAgICogYWRkaW5nLCB1cGRhdGluZyBvciBkZWxldGluZyBhIHByb2R1Y3QgZnJvbSB0aGUgY2FydC5cbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1hZGQtdG8tY2FydC1pdGVtcy1hZGRlZC10by10aGUtY2FydC1vcHRpb25hbFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IGdyYW5kVG90YWwgKHJlcXVpcmVkKSBDYXJ0IGFtb3VudFxuICAgICAgICovXG4gICAgICBjYXNlICd0cmFja0Vjb21tZXJjZUNhcnRVcGRhdGUnOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZScsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tFY29tbWVyY2VDYXJ0VXBkYXRlTWF0b21vUHJvcGVydGllcykuZ3JhbmRUb3RhbCxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIFRyYWNrcyBhbiBFY29tbWVyY2Ugb3JkZXIsIGluY2x1ZGluZyBhbnkgZWNvbW1lcmNlIGl0ZW0gcHJldmlvdXNseSBhZGRlZCB0b1xuICAgICAgICogdGhlIG9yZGVyLiBvcmRlcklkIGFuZCBncmFuZFRvdGFsIChpZS4gcmV2ZW51ZSkgYXJlIHJlcXVpcmVkIHBhcmFtZXRlcnMuXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9tYXRvbW8ub3JnL2RvY3MvZWNvbW1lcmNlLWFuYWx5dGljcy8jdHJhY2tpbmctZWNvbW1lcmNlLW9yZGVycy1pdGVtcy1wdXJjaGFzZWQtcmVxdWlyZWRcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1hdG9tby5vcmcvYXBpLXJlZmVyZW5jZS90cmFja2luZy1qYXZhc2NyaXB0I2Vjb21tZXJjZVxuICAgICAgICpcbiAgICAgICAqIEBwcm9wZXJ0eSBvcmRlcklkIChyZXF1aXJlZCkgVW5pcXVlIE9yZGVyIElEXG4gICAgICAgKiBAcHJvcGVydHkgZ3JhbmRUb3RhbCAocmVxdWlyZWQpIE9yZGVyIFJldmVudWUgZ3JhbmQgdG90YWwgKGluY2x1ZGVzIHRheCwgc2hpcHBpbmcsIGFuZCBzdWJ0cmFjdGVkIGRpc2NvdW50KVxuICAgICAgICogQHByb3BlcnR5IHN1YlRvdGFsIChvcHRpb25hbCkgT3JkZXIgc3ViIHRvdGFsIChleGNsdWRlcyBzaGlwcGluZylcbiAgICAgICAqIEBwcm9wZXJ0eSB0YXggKG9wdGlvbmFsKSBUYXggYW1vdW50XG4gICAgICAgKiBAcHJvcGVydHkgc2hpcHBpbmcgKG9wdGlvbmFsKSBTaGlwcGluZyBhbW91bnRcbiAgICAgICAqIEBwcm9wZXJ0eSBkaXNjb3VudCAob3B0aW9uYWwpIERpc2NvdW50IG9mZmVyZWQgKHNldCB0byBmYWxzZSBmb3IgdW5zcGVjaWZpZWQgcGFyYW1ldGVyKVxuICAgICAgICovXG4gICAgICBjYXNlICd0cmFja0Vjb21tZXJjZU9yZGVyJzpcbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICd0cmFja0Vjb21tZXJjZU9yZGVyJyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcykub3JkZXJJZCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcykuZ3JhbmRUb3RhbCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcykuc3ViVG90YWwsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMpLnRheCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcykuc2hpcHBpbmcsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMpLmRpc2NvdW50LFxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVG8gbWFudWFsbHkgdHJpZ2dlciBhbiBvdXRsaW5rXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9tYXRvbW8ub3JnL2RvY3MvdHJhY2tpbmctZ29hbHMtd2ViLWFuYWx5dGljcy9cbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1hdG9tby5vcmcvZ3VpZGVzL3RyYWNraW5nLWphdmFzY3JpcHQtZ3VpZGUjdHJhY2tpbmctYS1jbGljay1hcy1hbi1vdXRsaW5rLXZpYS1jc3Mtb3ItamF2YXNjcmlwdFxuICAgICAgICpcbiAgICAgICAqIEBwcm9wZXJ0eSB1cmwgKHJlcXVpcmVkKSBsaW5rIHVybFxuICAgICAgICogQHByb3BlcnR5IGxpbmtUeXBlIChvcHRpb25hbCkgdHlwZSBvZiBsaW5rXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrTGluayc6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAndHJhY2tMaW5rJyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0xpbmtNYXRvbW9Qcm9wZXJ0aWVzKS51cmwsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tMaW5rTWF0b21vUHJvcGVydGllcykubGlua1R5cGUsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUcmFja3MgYW4gRWNvbW1lcmNlIGdvYWxcbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy90cmFja2luZy1nb2Fscy13ZWItYW5hbHl0aWNzL1xuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9ndWlkZXMvdHJhY2tpbmctamF2YXNjcmlwdC1ndWlkZSNtYW51YWxseS10cmlnZ2VyLWdvYWwtY29udmVyc2lvbnNcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgZ29hbElkIChyZXF1aXJlZCkgVW5pcXVlIEdvYWwgSURcbiAgICAgICAqIEBwcm9wZXJ0eSB2YWx1ZSAob3B0aW9uYWwpIHBhc3NlZCB0byBnb2FsIHRyYWNraW5nXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrR29hbCc6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAndHJhY2tHb2FsJyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0dvYWxNYXRvbW9Qcm9wZXJ0aWVzKS5nb2FsSWQsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tHb2FsTWF0b21vUHJvcGVydGllcykudmFsdWUsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUcmFja3MgYSBzaXRlIHNlYXJjaFxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vbWF0b21vLm9yZy9kb2NzL3NpdGUtc2VhcmNoL1xuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9ndWlkZXMvdHJhY2tpbmctamF2YXNjcmlwdC1ndWlkZSNpbnRlcm5hbC1zZWFyY2gtdHJhY2tpbmdcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkga2V5d29yZCAocmVxdWlyZWQpIEtleXdvcmQgc2VhcmNoZWQgZm9yXG4gICAgICAgKiBAcHJvcGVydHkgY2F0ZWdvcnkgKG9wdGlvbmFsKSBTZWFyY2ggY2F0ZWdvcnlcbiAgICAgICAqIEBwcm9wZXJ0eSBzZWFyY2hDb3VudCAob3B0aW9uYWwpIE51bWJlciBvZiByZXN1bHRzXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrU2l0ZVNlYXJjaCc6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAndHJhY2tTaXRlU2VhcmNoJyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja1NpdGVTZWFyY2hNYXRvbW9Qcm9wZXJ0aWVzKS5rZXl3b3JkLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMpLmNhdGVnb3J5LFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMpLnNlYXJjaENvdW50LFxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gTG9ncyBhbiBldmVudCB3aXRoIGFuIGV2ZW50IGNhdGVnb3J5IChWaWRlb3MsIE11c2ljLCBHYW1lcy4uLiksIGFuIGV2ZW50XG4gICAgICAgKiBhY3Rpb24gKFBsYXksIFBhdXNlLCBEdXJhdGlvbiwgQWRkIFBsYXlsaXN0LCBEb3dubG9hZGVkLCBDbGlja2VkLi4uKSwgYW5kIGFuIG9wdGlvbmFsXG4gICAgICAgKiBldmVudCBuYW1lIGFuZCBvcHRpb25hbCBudW1lcmljIHZhbHVlLlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vbWF0b21vLm9yZy9kb2NzL2V2ZW50LXRyYWNraW5nL1xuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjdXNpbmctdGhlLXRyYWNrZXItb2JqZWN0XG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IGNhdGVnb3J5XG4gICAgICAgKiBAcHJvcGVydHkgYWN0aW9uXG4gICAgICAgKiBAcHJvcGVydHkgbmFtZSAob3B0aW9uYWwsIHJlY29tbWVuZGVkKVxuICAgICAgICogQHByb3BlcnR5IHZhbHVlIChvcHRpb25hbClcbiAgICAgICAqL1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gUEFRIHJlcXVpcmVzIHRoYXQgZXZlbnRWYWx1ZSBiZSBhbiBpbnRlZ2VyLCBzZWU6IGh0dHA6Ly9tYXRvbW8ub3JnL2RvY3MvZXZlbnQtdHJhY2tpbmdcbiAgICAgICAgaWYgKChwcm9wZXJ0aWVzIGFzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzKS52YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KChwcm9wZXJ0aWVzIGFzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzKS52YWx1ZSBhcyBhbnksIDEwKTtcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcykudmFsdWUgPSBpc05hTihwYXJzZWQpID8gMCA6IHBhcnNlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAndHJhY2tFdmVudCcsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMpLmNhdGVnb3J5LFxuICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcykubmFtZSB8fFxuICAgICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMpLmxhYmVsLCAvLyBDaGFuZ2VkIGluIGZhdm91ciBvZiBNYXRvbW8gZG9jdW1lbnRhdGlvbi4gQWRkZWQgZmFsbGJhY2sgc28gaXQncyBiYWNrd2FyZHMgY29tcGF0aWJsZS5cbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcykudmFsdWUsXG4gICAgICAgIF07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBfcGFxLnB1c2gocGFyYW1zKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcgfCBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgIF9wYXEucHVzaChbJ3NldFVzZXJJZCcsIHVzZXJJZF0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBjdXN0b20gZGltZW5zaW9ucyBpZiBhdCBsZWFzdCBvbmUgcHJvcGVydHkgaGFzIHRoZSBrZXkgXCJkaW1lbnNpb248bj5cIixcbiAgICogZS5nLiBkaW1lbnNpb24xMC4gSWYgdGhlcmUgYXJlIGN1c3RvbSBkaW1lbnNpb25zLCBhbnkgb3RoZXIgcHJvcGVydHkgaXMgaWdub3JlZC5cbiAgICpcbiAgICogSWYgdGhlcmUgYXJlIG5vIGN1c3RvbSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiBwcm9wZXJ0aWVzIG9iamVjdCwgdGhlIHByb3BlcnRpZXNcbiAgICogb2JqZWN0IGlzIHNhdmVkIGFzIGEgY3VzdG9tIHZhcmlhYmxlLlxuICAgKlxuICAgKiBJZiBpbiBkb3VidCwgcHJlZmVyIGN1c3RvbSBkaW1lbnNpb25zLlxuICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9jdXN0b20tdmFyaWFibGVzL1xuICAgKi9cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogU2V0Q3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuc2V0Q3VzdG9tRGltZW5zaW9ucyhwcm9wZXJ0aWVzKTtcbiAgICB0cnkge1xuICAgICAgaWYgKGRpbWVuc2lvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIF9wYXEucHVzaChbXG4gICAgICAgICAgJ3NldEN1c3RvbVZhcmlhYmxlJyxcbiAgICAgICAgICBwcm9wZXJ0aWVzLmluZGV4LFxuICAgICAgICAgIHByb3BlcnRpZXMubmFtZSxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgICAgIHByb3BlcnRpZXMuc2NvcGUsXG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgeW91IGNyZWF0ZWQgYSBjdXN0b20gdmFyaWFibGUgYW5kIHRoZW4gZGVjaWRlIHRvIHJlbW92ZSB0aGlzIHZhcmlhYmxlIGZyb21cbiAgICogYSB2aXNpdCBvciBwYWdlIHZpZXcsIHlvdSBjYW4gdXNlIGRlbGV0ZUN1c3RvbVZhcmlhYmxlLlxuICAgKlxuICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5tYXRvbW8ub3JnL2d1aWRlcy90cmFja2luZy1qYXZhc2NyaXB0LWd1aWRlI2RlbGV0aW5nLWEtY3VzdG9tLXZhcmlhYmxlXG4gICAqL1xuICBkZWxldGVkVXNlclByb3BlcnRpZXMocHJvcGVydGllczogRGVsZXRlQ3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIF9wYXEucHVzaChbJ2RlbGV0ZUN1c3RvbVZhcmlhYmxlJywgcHJvcGVydGllcy5pbmRleCwgcHJvcGVydGllcy5zY29wZV0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEN1c3RvbURpbWVuc2lvbnMocHJvcGVydGllczogU2V0Q3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGRpbWVuc2lvblJlZ2V4OiBSZWdFeHAgPSAvZGltZW5zaW9uWzEtOV1cXGQqLztcbiAgICBjb25zdCBkaW1lbnNpb25zID0gT2JqZWN0LmtleXMocHJvcGVydGllcykuZmlsdGVyKGtleSA9PiBkaW1lbnNpb25SZWdleC5leGVjKGtleSkpO1xuICAgIGRpbWVuc2lvbnMuZm9yRWFjaChkaW1lbnNpb24gPT4ge1xuICAgICAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGRpbWVuc2lvbi5zdWJzdHIoOSkpO1xuICAgICAgX3BhcS5wdXNoKFsnc2V0Q3VzdG9tRGltZW5zaW9uJywgbnVtYmVyLCBwcm9wZXJ0aWVzW2RpbWVuc2lvbl1dKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgfVxufVxuIl19