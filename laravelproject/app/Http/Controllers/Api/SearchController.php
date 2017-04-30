<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\organization;
use App\Event;
use App\Story;
class SearchController extends Controller
{
    /**
     * get event's tasks.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request)
    {
    	$results=[];
    	$searchText = $request->get('data');
    	$organizations=organization::with('categories')->where('name', 'LIKE', '%' . $searchText . '%')->get();
    	$events=Event::with('categories')->where('title', 'LIKE', '%' . $searchText . '%')->get();
    	$stories=Story::where('title', 'LIKE', '%' . $searchText . '%')->get();
    	// array_push($results,compact('organizations','events','stories'));
        

        return response()->json(compact('organizations','events','stories'),200);
    }
}
