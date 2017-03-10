<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Book as Book;

use JWTAuth;

class ModelController extends Controller
{
    protected $book;

    protected $user;

    public function __construct() {

    	$this->user = JWTAuth::parseToken()->toUser();
    	
    	$this->book = new Book;
    	
    }
}
