import { isUndefined, isNull, isArray } from 'lodash/core';
import { Subscription } from 'rxjs/Rx';

/**
 * Handles a subscription or array of subscription by unsubscribing them all and setting them to undef
 *
 * @export
 * @param sub the subscription or array of subscriptions to handle
 */
export function handleSub(sub: Subscription | Subscription[]) {
  if (isUndefined(sub) || isNull(sub) || (isArray(sub) && (sub as Subscription[]).length === 0)) {
    return;
  } else if (!isArray(sub)) {
    (sub as Subscription).unsubscribe();
    sub = undefined;
  } else {
    const len = (sub as Subscription[]).length;
    for (let i = 0; i < len; i++) {
      sub[i].unsubscribe();
      sub[i] = undefined;
    }

    sub = [];
  }
}
