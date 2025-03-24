export default class PaypalOrderCapture {
  _ctx;
  #orderResponse;

  constructor(ctx) {
    this._ctx = ctx;
  }

  async capture(idToken) {
    try {
      const token = `${this._ctx.getClientId()}:${this._ctx.getSecretKey()}`;
      const auth = `Basic ${btoa(token)}`;
      const resultado = await fetch(`${this._ctx.getApiUrl()}/v2/checkout/orders/${idToken}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        }
      });

      this.#orderResponse = await resultado.json();
      return resultado.ok;
      
    } catch (error) {
      return null;
    }
  }

  response() {
    return this.#orderResponse;
  }

  isCompleted() {
    if (this.#orderResponse == null) return false;

    if (this.#orderResponse?.status) 
      return this.#orderResponse?.status === "COMPLETED";
      
    if (this.#orderResponse?.details?.[0]?.issue)
      return this.#orderResponse?.details?.[0]?.issue === "ORDER_ALREADY_CAPTURED";

    return false;
  }
}