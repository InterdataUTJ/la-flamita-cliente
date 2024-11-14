<?php

namespace App\Models\Sanctum;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken; 

class PersonalAccessToken extends SanctumPersonalAccessToken {
  protected $table = 'api_acceso_tokens';
}