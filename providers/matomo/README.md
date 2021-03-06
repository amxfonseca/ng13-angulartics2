<img 
    src="../../../assets/svg/matomo.svg" 
    alt="Matomo logo"
    height="100px"
    width="200px" />

# Matomo
__homepage__: [matomo.org](https://matomo.org)  
__docs__: [developer.matomo.org](https://developer.matomo.org)  
__import__: `import { Angulartics2Matomo } from 'angulartics2';`  

## Setup
Add the standard matomo track code inside your index.html head tag:
```html
<!-- Matomo -->
<script type="text/javascript">
  var _paq = _paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  // _paq.push(['trackPageView']); // DELETE THIS LINE
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//matomo.YOUR-DOMAIN.com/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '11']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Code -->
```
Make sure "trackPageView" line is commented or deleted. It is not needed as page tracking will be trigger by the angular module on route change.

Replace YOUR-DOMAIN with your matomo domain (`//DOMAIN.innocraft.cloud` if you are using the innocraft cloud service).

Pass the Matomo provider to angulartics in app.module:
```ts
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2Matomo } from 'angulartics2';
@NgModule({
  imports: [
    Angulartics2Module.forRoot(),
    ...
```

Inject angulartics into your root component (usually appComponent)
```ts
import { Angulartics2Matomo } from 'angulartics2';
export class AppComponent {
  // inject Angulartics2Matomo in root component and initialize it
  constructor(private angulartics2Matomo: Angulartics2Matomo) {
    angulartics2Matomo.startTracking();
  }
}
```

Tracking Custom Variables
```ts
angulartics2.setUserProperties.next({index: 1, name: 'John', value: 123, scope: 'visit'});
```
Note: To track multiple custom variables, call setUserProperties multiple times

Tracking Custom Dimensions
```ts
angulartics2.setUserProperties.next({
    dimension1: 'v1.2.3',
    dimension2: 'german',
    dimension43: 'green',
});
```
Note: Custom Variables and Custom Dimensions cannot be tracked in the same call, and requires separate setUserProperties calls

To track full URLs if there is a hash (#), make sure to enable `settings=>websites=>settings=>page url fragments tracking` in the Matomo dashboard.

Once set up, Angulartics [usage](https://github.com/angulartics/angulartics2#usage) is the same regardless of provider
