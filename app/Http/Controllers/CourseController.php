<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Course as Course;

class CourseController extends ModelController
{
    public function list() {
    	$data = Course::all();

    	return response()->json(compact('data'), 200);
    }
}
