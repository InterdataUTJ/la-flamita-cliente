<?php

return [
  "mode" => env("PAYPAL_MODE", "sandbox"), // 'sandbox' o 'live'
  "currency" => env("PAYPAL_CURRENCY", "MXN"),
  "locale" => env("PAYPAL_LOCALE", "es-MX"),
  "return_url" => env("PAYPAL_RETURN_URL", "http://localhost:8001/paypal/aprovado"),
  "cancel_url" => env("PAYPAL_CANCEL_URL", "http://localhost:8001/paypal/cancelado"),
  "brand_name" => env("PAYPAL_BRAND_NAME", "La Flamita"),

  "sandbox" => [
    "client_id" => env("PAYPAL_SANDBOX_CLIENT_ID"),
    "secret_key" => env("PAYPAL_SANDDBOX_SECRET_KEY"),
    "url" => "https://api-m.sandbox.paypal.com"
  ],

  "live" => [
    "client_id" => env("PAYPAL_LIVE_CLIENT_ID"),
    "secret_key" => env("PAYPAL_LIVE_SECRET_KEY"),
    "url" => "https://api-m.paypal.com"
  ],
];

?>