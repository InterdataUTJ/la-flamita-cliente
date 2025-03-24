export default class PaypalContext {
  #config;
  #platform;
  #apiUrl = {
    "sandbox": "https://api-m.sandbox.paypal.com",
    "live": "https://api-m.paypal.com",
  };

  constructor(config, platform = "default") {
    this.#config = config;
    this.#platform = platform;
  }

  #getConfig(key) {
    return this.#config?.[this.#platform]?.[key]
    || this.#config?.default?.[key]
    || null;
  }

  #getModesConfig(key) {
    const mode = this.#getConfig("mode");
    return this.#getConfig(mode)[key];
  }

  getCurrency() { return this.#getConfig("currency"); }
  getBrandName() { return this.#getConfig("brand_name"); }
  getLocale() { return this.#getConfig("locale"); }
  getReturnUrl() { return this.#getConfig("return_url"); }
  getCancelUrl() { return this.#getConfig("cancel_url"); }
  getClientId() { return this.#getModesConfig("client_id"); }
  getSecretKey() { return this.#getModesConfig("secret_key"); }
  getApiUrl() { 
    return this.#apiUrl[this.#getConfig("mode")];
  }
}