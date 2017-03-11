<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\BookRequest as BR;

class BookRequestController extends ModelController
{
    public function list() {
    	$data = $this->user->bookRequests()->get();

        if( !$data->isEmpty() ) {
            $count = 0;

            foreach( $data as $list ) {
                $data[$count]->book_info = $this->book->find($list->book_id);
                switch ( $list->request_status ) {
                    case 0:
                        $data[$count]->request_status = 'Pending';
                        break;

                    case 1:
                        $data[$count]->request_status = 'Approved';
                        break;

                    case 2:
                        $data[$count]->request_status = 'Disapproved';
                        break;

                    case 3:
                        $data[$count]->request_status = 'Cancelled';
                        break;
                }
                $count++;
            }
        }

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
        $bookRequest = new BR;

        // validate required fields
        $this->validate($request,[
            'book'     => 'required',
            'days'    => 'required'
        ]);

        // fetch request data to the database fields
        $bookRequest->user_id = $this->user->id;
        $bookRequest->book_id = $request->book['id'];
        $bookRequest->days = $request->days;
        $bookRequest->request_status = 0;

        // save request to database
        if( $bookRequest->save() ) {
            $this->book = $this->book->find($request->book['id']);

            $this->book->available = 0;

            if( $this->book->save() ) {
                return response()->success('Success');
            }
        }

        return response()->error('Error');
    }
}
