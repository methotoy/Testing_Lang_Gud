<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
	public function profile() {
		return $this->hasMany(Profile::class, 'course');
	}
}
