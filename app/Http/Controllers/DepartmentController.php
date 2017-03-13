<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Department as Department;

class DepartmentController extends ModelController
{
    public function list() {
    	$data = Department::all();

    	return response()->json(compact('data'), 200);
    }
}
