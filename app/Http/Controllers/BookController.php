<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Traits\Common;

class BookController extends ModelController
{
    use Common;

    public function list() {
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

    public function save(Request $request) {
        // validate required fields
        $this->validate($request,[
            'title'     => 'required',
            'author'    => 'required',
            'category'  => 'required'
        ]);

        if($request->has('id')) {
            $this->book = $this->book->find($request->id);
        }

        // fetch request data to the database fields
        $this->book->title = $request->title;
        $this->book->author = $request->author;
        $this->book->category = $request->category;
        $this->book->edition = $request->has('edition')? $request->edition : null;
        $this->book->pages = $request->has('pages')? $request->pages : null;
        $this->book->year = $request->has('year')? $request->year : null;
        $this->book->date_received = $request->has('date_received')? $this->formatDate($request->date_received,'Y-m-d') : null;
        $this->book->class = $request->has('class')? $request->class : null;
        $this->book->volume = $request->has('volume')? $request->volume : null;
        $this->book->source_of_fund = $request->has('source_of_fund')? $request->source_of_fund : null;
        $this->book->cost_price = $request->has('cost_price')? $request->cost_price : null;
        $this->book->publisher = $request->has('publisher')? $request->publisher : null;
        $this->book->remarks = $request->has('remarks')? $request->remarks : null;

        // save book to database
        if($this->book->save()) {
            return response()->success('Success');
        }

        return response()->json(compact("request"));
    }

    public function find(Request $request) {
        if($request->has('id')) {
            $data = $this->book->find($request->id);
            return response()->json(compact('data'), 200);
        }
        
        return response()->error('Error');
    }

}
