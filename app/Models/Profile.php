<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
	public function user() {
		return $this->belongsTo(User::class, 'user_id');
	}

    public function courseName() {
    	return $this->belongsTo(Course::class, 'course', 'id');
    }

    public function departmentName() {
    	return $this->belongsTo(Department::class, 'department', 'id');
    }
}
