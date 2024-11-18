<?php

namespace App\Paypal;

use Illuminate\Support\Facades\Http;

class PaypalOrderCapture {

  /**
   * @var PaypalContext
   */
  protected $ctx;
  private $orderCapureResponse;

  public function __construct($ctx) {
    $this->ctx = $ctx;
  }

  public function capture($idToken) {

    $resultado = Http::withBasicAuth($this->ctx->getClientId(), $this->ctx->getSecretKey())
            ->contentType("application/json")    
            ->post("{$this->ctx->getUrl()}/v2/checkout/orders/{$idToken}/capture", null);

    if ($resultado->failed()) {
      $this->orderCapureResponse = null;
      return false;

    } else {
      $this->orderCapureResponse = $resultado->object();
      return true;
    }
    
  }

  public function response() {
    return $this->orderCapureResponse;
  }

  public function isCompleted() {
    if ($this->orderCapureResponse == null) return false;
    return $this->orderCapureResponse->status === "COMPLETED";
  }
}

?>