<?php

namespace App\Paypal;

use Illuminate\Support\Facades\Http;

class PaypalOrder extends PaypalOrderCapture {

  private $orderResponse;

  public function __construct($ctx) {
    parent::__construct($ctx);
  }

  public function create($amountTotal, $mobile = false) {
    $paypalOrderBody = [
      "intent" => "CAPTURE", 
      "purchase_units" => [[
          "amount" => [
              "currency_code" => $this->ctx->getCurrency(), 
              "value" =>  strval($amountTotal)
          ] 
      ]], 
      "payment_source" => [
          "paypal" => [
              "experience_context" => [
                  "shipping_preference" => "NO_SHIPPING", 
                  "brand_name" => $this->ctx->getBrandName(), 
                  "locale" => $this->ctx->getLocale(), 
                  "user_action" => "PAY_NOW", 
                  "return_url" => $this->ctx->getReturnUrl($mobile), 
                  "cancel_url" => $this->ctx->getCancelUrl($mobile) 
              ] 
          ] 
      ] 
    ];

    $resultado = Http::withBasicAuth($this->ctx->getClientId(), $this->ctx->getSecretKey())
      ->contentType("application/json")    
      ->post($this->ctx->getUrl()."/v2/checkout/orders", $paypalOrderBody);

    if ($resultado->failed()) {
      $this->orderResponse = null;
      return false;

    } else {
      $this->orderResponse = $resultado->object();
      return true;
    }

  }

  public function response() {
    return $this->orderResponse;
  }

  public function id() {
    return $this->orderResponse->id;
  }

  public function link() {
    return $this->orderResponse->links[1]->href;
  }
}

?>