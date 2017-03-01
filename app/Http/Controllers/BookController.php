<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookController extends ModelController
{
    public function getList() {
    	$data = $this->book->get();
    	return response()->json(compact('data'), 200);
    }

    public function delete(Request $request) {
    	if($request->has('id')){
    		if($this->book->destroy($request->id)) {
    			return response()->success('Success');
    		}
    	}
    	return response()->error('Error');
    }
}
