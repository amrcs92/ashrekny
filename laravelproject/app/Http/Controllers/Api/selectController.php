<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use App\User;
use Session;
class selectController extends Controller
{	

	// public function __construct() {
	// 	return $this->middleware('ahmed');
	// }

	public function test()
	{
		// dd(session()->get('api_token'));
		//dd(Session::get('api_token'));
		return response()->json("Test Done",200);

	}

	public function getSelected()
    {
    	
    	$categories = Category::all();
    	$users = User::all();

    	return response()->json(['categories'=>$categories,'users'=>$users]);
    }
}