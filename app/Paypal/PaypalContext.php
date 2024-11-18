<?php

namespace App\Paypal;

class PaypalContext {
  public $apiContext;

  public function __construct($config) {
    $this->apiContext = $config;
    $this->apiContext["current_mode"] = $this->apiContext[$this->apiContext["mode"]];
  }

  public function getCurrency() {
    return $this->apiContext["currency"];
  }

  public function getBrandName() {
    return $this->apiContext["brand_name"];
  }

  public function getLocale() {
    return $this->apiContext["locale"];
  }

  public function getReturnUrl() {
    return $this->apiContext["return_url"];
  }

  public function getCancelUrl() {
    return $this->apiContext["cancel_url"];
  }

  public function getClientId() {
    return $this->apiContext["current_mode"]["client_id"];
  }

  public function getSecretKey() {
    return $this->apiContext["current_mode"]["secret_key"];
  }

  public function getUrl() {
    return $this->apiContext["current_mode"]["url"];
  }
}

?>