<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\BookRequest as BR;

class BookRequestController extends ModelController
{
    public function list( $option = null ) {
        if( $option !== null ) {
            switch ( $option ) {
                case 'Pending':
                    $status = 0;
                    break;
                
                case 'Approved':
                    $status = 1;
                    break;

                case 'Disapproved':
                    $status = 2;
                    break;

                case 'Cancelled':
                    $status = 3;
                    break;
            }

            $data = $this->user->bookRequests()
                    ->where('request_status',$status)
                    ->get();
        } else {
            $data = $this->user->bookRequests()->get();
        }
    	
        if( !$data->isEmpty() ) {
            $count = 0;

            foreach( $data as $list ) {
                $data[$count]->book_info = $this->book->find( $list->book_id );
                    
                $data[$count]->approver_info = $this->user->find( $list->approved_by );

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

    public function save(Request $request, $option = null) {
        $bookRequest = new BR;
        $bookAvailabe = 1;

        if( $option === null ) {
            $book_id = $request->book['id'];

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
            $bookAvailabe = 0;
        } else {
            $book_id = $request->book_id;
            $bookRequest = $bookRequest->find($request->id);

            switch ( $option ) {
                case 'approve':
                    $bookRequest->request_status = 1;
                    $bookAvailabe = 0;
                    break;

                case 'disapprove':
                    $bookRequest->request_status = 2;
                    $bookAvailabe = 1;
                    break;

                case 'cancel':
                    $bookRequest->request_status = 3;
                    $bookAvailabe = 1;
                    break;
            }
        }

        

        // save request to database
        if( $bookRequest->save() ) {
            $this->book = $this->book->find($book_id);

            $this->book->available = $bookAvailabe;

            if( $this->book->save() ) {
                return response()->success('Success');
            }
        }

        return response()->error('Error');
    }
}
