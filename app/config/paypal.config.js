import PaypalContext from '#util/paypal/context.js';

const paypalConfig = {
  "default": {
    "mode": process.env.PAYPAL_MODE || "sandbox", // 'sandbox' o 'live'
    "currency": process.env.PAYPAL_CURRENCY || "MXN",
    "locale": process.env.PAYPAL_LOCALE || "es-MX",
    "brand_name": process.env.PAYPAL_BRAND_NAME || "La Flamita",
    "return_url": process.env.PAYPAL_RETURN_URL || "http://localhost:8080/api/venta/capturar",
    "cancel_url": process.env.PAYPAL_CANCEL_URL || "http://localhost:8080/api/venta/capturar",
  
    "sandbox": {
      "client_id": process.env.PAYPAL_SANDBOX_CLIENT_ID,
      "secret_key": process.env.PAYPAL_SANDDBOX_SECRET_KEY,
      "url": "https://api-m.sandbox.paypal.com"
    },
  
    "live": {
      "client_id": process.env.PAYPAL_LIVE_CLIENT_ID,
      "secret_key": process.env.PAYPAL_LIVE_SECRET_KEY,
      "url": "https://api-m.paypal.com"
    },
  }
};

const paypalContext = new PaypalContext(paypalConfig);
export default paypalContext;