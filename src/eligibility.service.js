const { CONDITIONS } = require('./conditions');

class EligibilityService {
  /**
   * Compare cart data with criteria to compute eligibility.
   * If all criteria are fulfilled then the cart is eligible (return true).
   *
   * @param cart
   * @param criteria
   * @return {boolean}
   */

  static getField(key, cart) {
    for (const keyCart of key.split('.')) {
      if (Array.isArray(cart)) {
        cart = cart.flatMap((item) => this.getField(keyCart, item));
      } else {
        cart = cart[keyCart];
      }
    }
    return cart;
  }

  checkCondition(key, criterion, value) {
    let eligibility = [];
    if (typeof criterion === 'object' && !Array.isArray(criterion)) {
      for (const [subKey, subValue] of Object.entries(criterion)) {
        eligibility.push(this.checkCondition(subKey, subValue, value));
      }
    } else {
      const conditionFunction = CONDITIONS[key] ?? CONDITIONS.eq;
      eligibility.push(conditionFunction(value, criterion));
    }
    if (key === 'and' || key === 'or') {
      return eligibility = CONDITIONS[key](eligibility);
    }
    return eligibility?.[0];
  }

  isEligible(cart, criteria) {
    if (!criteria || Object.keys(criteria).length === 0)
      return true;
    else if (!cart || Object.keys(cart).length === 0)
      return false;
    for (const [key, criterion] of Object.entries(criteria)) {
      const value = EligibilityService.getField(key, cart);
      const check = this.checkCondition(key, criterion, value);
      if (!check)
        return false;
    }
    return true;
  }
}

module.exports = {
  EligibilityService,
};
