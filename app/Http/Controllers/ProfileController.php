<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Carbon\Carbon;

use App\Models\Course as Course;

use App\Models\Department as Department;

use App\Models\User as User;

use App\Traits\Common;

class ProfileController extends ModelController
{
	use Common;

    public function details() {
    	$data = $this->user->profile;

        $data->setAttribute('department_name', Department::find($data->department)->name);

        $data->setAttribute('course_name', Course::find($data->course)->name);

    	return response()->json(compact('data'), 200); 
    }

    public function save(Request $request) {

    	// validate required fields
        $this->validate($request,[
            'student_id'     => 'required',
            'first_name'    => 'required',
            'last_name'    => 'required',
            'age'    => 'required',
            'gender'    => 'required',
            'birthday'    => 'required',
            'department'    => 'required',
            'course'    => 'required',
            'year'    => 'required',
        ]);

        // fetch request data to the database fields
        $this->user->profile->student_id = $request->student_id;
        $this->user->profile->first_name = $request->first_name;        
        $this->user->profile->last_name = $request->last_name;        
        $this->user->profile->age = $request->age;        
        $this->user->profile->gender = $request->gender;        
        $this->user->profile->birthday = $this->formatDate($request->birthday,'Y-m-d');        
        $this->user->profile->department = Department::where('name',$request->department['name'])->get()[0]->id;        
        $this->user->profile->course = Course::where('name',$request->course['name'])->get()[0]->id;        
        $this->user->profile->year = $request->year;        
        $this->user->profile->last_activity = Carbon::now();        

        // save profile to database
        if( $this->user->profile->save() ) {

            return response()->success('Success');

        }

        return response()->error('Error');
    }
}
