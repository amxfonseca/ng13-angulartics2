import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
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
export class Angulartics2Facebook {
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
Angulartics2Facebook.ɵfac = function Angulartics2Facebook_Factory(t) { return new (t || Angulartics2Facebook)(i0.ɵɵinject(i1.Angulartics2)); };
Angulartics2Facebook.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Angulartics2Facebook, factory: Angulartics2Facebook.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Angulartics2Facebook, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.Angulartics2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9mYWNlYm9vay9mYWNlYm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0MsTUFBTSxpQkFBaUIsR0FBRztJQUN4QixhQUFhO0lBQ2IsUUFBUTtJQUNSLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsTUFBTTtJQUNOLHNCQUFzQjtDQUN2QixDQUFDO0FBR0YsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFJLENBQUM7SUFFbkQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFVBQVUsQ0FBQyxNQUFjLEVBQUUsYUFBa0IsRUFBRTtRQUM3QyxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtZQUM5QixPQUFPO1NBQ1I7UUFDRCxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM1QyxPQUFPLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxQyxDQUFDOzt3RkF0QlUsb0JBQW9COzBFQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CLG1CQURQLE1BQU07dUZBQ25CLG9CQUFvQjtjQURoQyxVQUFVO2VBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9hbmd1bGFydGljczItY29yZSc7XG5cbmRlY2xhcmUgY29uc3QgZmJxOiBmYWNlYm9vay5QaXhlbC5FdmVudDtcblxuY29uc3QgZmFjZWJvb2tFdmVudExpc3QgPSBbXG4gICdWaWV3Q29udGVudCcsXG4gICdTZWFyY2gnLFxuICAnQWRkVG9DYXJ0JyxcbiAgJ0FkZFRvV2lzaGxpc3QnLFxuICAnSW5pdGlhdGVDaGVja291dCcsXG4gICdBZGRQYXltZW50SW5mbycsXG4gICdQdXJjaGFzZScsXG4gICdMZWFkJyxcbiAgJ0NvbXBsZXRlUmVnaXN0cmF0aW9uJyxcbl07XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyRmFjZWJvb2sge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7IH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgaW50ZXJhY3Rpb25zIHRvIHRoZSBQaXhlbCwgaS5lLiBmb3IgZXZlbnQgdHJhY2tpbmcgaW4gUGl4ZWxcbiAgICpcbiAgICogQHBhcmFtIGFjdGlvbiBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55ID0ge30pIHtcbiAgICBpZiAodHlwZW9mIGZicSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGZhY2Vib29rRXZlbnRMaXN0LmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBmYnEoJ3RyYWNrQ3VzdG9tJywgYWN0aW9uLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZicSgndHJhY2snLCBhY3Rpb24sIHByb3BlcnRpZXMpO1xuICB9XG59XG4iXX0=