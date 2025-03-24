import PaypalOrderCapture from "./capture.js";

export default class PaypalOrderCreate extends PaypalOrderCapture {
  #orderResponse;

  constructor(ctx) {
    super(ctx);
  }

  async create(amountTotal) {
    const paypalOrderBody = {
      "intent": "CAPTURE",
      "purchase_units": [{
        "amount": {
          "currency_code": this._ctx.getCurrency(),
          "value": `${amountTotal}`
        }
      }],
      "payment_source": {
        "paypal": {
          "experience_context": {
            "shipping_preference": "NO_SHIPPING", 
            "brand_name": this._ctx.getBrandName(), 
            "locale": this._ctx.getLocale(), 
            "user_action": "PAY_NOW", 
            "return_url": this._ctx.getReturnUrl(), 
            "cancel_url": this._ctx.getCancelUrl() 
          }
        }
      }
    };

    const token = `${this._ctx.getClientId()}:${this._ctx.getSecretKey()}`;
    const auth = `Basic ${btoa(token)}`;
    const resultado = await fetch(`${this._ctx.getApiUrl()}/v2/checkout/orders`, {
      method: 'POST',
      body: JSON.stringify(paypalOrderBody),
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    });

    if (!resultado.ok) {
      this.#orderResponse = null;
      return false;
    }

    this.#orderResponse = await resultado.json();
    return true;
  }

  response() {
    return this.#orderResponse;
  }

  id() {
    return this.#orderResponse?.id;
  }

  link() {
    return this.#orderResponse?.links?.[1]?.href;
  }
}