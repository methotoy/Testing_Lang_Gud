<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/login', 'Auth\AuthController@login');
Route::post('auth/register', 'Auth\AuthController@register');

Route::post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
Route::get('auth/password/verify', 'Auth\PasswordResetController@verify');
Route::post('auth/password/reset', 'Auth\PasswordResetController@reset');


//protected API routes with JWT (must be logged in)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::group(['middleware' => ['api']], function () {

	// Book Group
	Route::group(['prefix' => 'book'], function () {
		Route::post('list/{option?}', 'BookController@list');
		Route::post('delete', 'BookController@delete');
		Route::post('save', 'BookController@save');
	});

	// Book Request Group
	Route::group(['prefix' => 'request'], function () {
		Route::post('list/{option?}', 'BookRequestController@list');
		Route::post('delete', 'BookRequestController@delete');
		Route::post('save/{option?}', 'BookRequestController@save');
	});

	// Profile Group
	Route::group(['prefix' => 'profile'], function () {
		Route::post('details', 'ProfileController@details');
		Route::post('save', 'ProfileController@save');
	});

	// Course Group
	Route::group(['prefix' => 'course'], function () {
		Route::post('list', 'CourseController@list');
		Route::post('save', 'CourseController@save');
	});

	// Department Group
	Route::group(['prefix' => 'department'], function () {
		Route::post('list', 'DepartmentController@list');
		Route::post('save', 'DepartmentController@save');
	});

});
