<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    public function course() {
    	return $this->belongsTo('App\Models\Course', 'course', 'id');
    }

    public function department() {
    	return $this->belongsTo('App\Models\Department', 'department', 'id');
    }
}
