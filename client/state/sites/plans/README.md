Site Plans
==========

A module for managing site plans data.

## Actions

Used in combination with the Redux store instance `dispatch` function, actions can be used in manipulating the current global state.

### `fetchSitePlans( siteId: Number )`

Fetches plans for the site with the given site ID.

### `fetchSitePlansCompleted( siteId: Number, plans: Object )`

Adds the plans to the set of plans for the given site ID.

```js
import { fetchSitePlans, fetchSitePlansCompleted } from 'state/sites/plans/actions';

dispatch( fetchSitePlans( 555555555 ) );
dispatch( fetchSitePlansCompleted( 555555555, { 1: { ... }, 1003: { ... }, 1008: { ... } } ) );
```

## Reducer
Data from the aforementioned actions is added to the global state tree, under `sites.plans`, with the following structure:

```js
state.sites.plans = {
	555555555: [
		{
			currentPlan: Boolean,
			expiry: String,
			expiryMoment: Moment,
			formattedDiscount: String,
			formattedPrice: String,
			freeTrial: Boolean,
			id: Number( plan.id ),
			productName: String,
			productSlug: String,
			rawDiscount: Number,
			rawPrice: Number,
			subscribedDate: String,
			subscribedDayMoment: Moment,
			userFacingExpiry: String,
			userFacingExpiryMoment: Moment
		},
		{ ... }
	]
}
```
