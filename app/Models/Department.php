<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
	public function profile() {
		return $this->hasMany(Profile::class, 'department');
	}
}
