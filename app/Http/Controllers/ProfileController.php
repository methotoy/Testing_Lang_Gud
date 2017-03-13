<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends ModelController
{
    public function details() {
    	$data = $this->user->profile->get();

    	return response()->json(compact('data'), 200); 
    }
}
