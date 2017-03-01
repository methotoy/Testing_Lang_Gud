<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Book as Book;

class ModelController extends Controller
{
    protected $book;

    public function __construct() {
    	$this->book = new Book;
    }
}
