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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//middleware for fixing cross domain restrictions
Route::group(['middleware' => 'cors'], function(){
	//authentication methods don`t touch
		Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
	    Route::post('authenticate', 'AuthenticateController@authenticate');
	    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');


    //authenticated users routes here
    Route::group(['middleware' => 'jwt.auth'], function(){
		
		Route::group(['prefix' => 'user'], function(){
			Route::post('/update','Api\UserController@update');
		});
		Route::group(['prefix' => 'organization'], function(){
			
			Route::post('/update','Api\UserController@update');

		});
		Route::group(['prefix' => 'volunteer'], function(){
	
		});
		Route::group(['prefix' => 'category'], function(){
		

		});
		Route::group(['prefix' => 'event'], function(){


			Route::post('/add','Api\EventController@add');
			Route::post('/{id}/addReview','Api\EventController@addReview');
			Route::post('/{id}/update','Api\EventController@update');
			Route::post('/{id}/delete','Api\EventController@delete');
			Route::post('/edittasks','Api\EventController@editTasks');
			Route::get('/get/user/{id}','Api\EventController@getMyEvents');
			Route::get('/getvolunteers/{id}','Api\EventController@getVolunteers');
			Route::post('/reviewvolunteers/{id}','Api\EventController@reviewvolunteers');
			
		});
		Route::group(['prefix' => 'eventalbum'], function(){
		

		});
		Route::group(['prefix' => 'link'], function(){
		

		});
		Route::group(['prefix' => 'organizationalbum'], function(){
		

		});
		Route::group(['prefix' => 'phone'], function(){
		

		});
		Route::group(['prefix' => 'review'], function(){
		

		});
		
		Route::group(['prefix' => 'story'], function(){
			Route::post('/add','Api\StoryController@add');
			Route::post('/{id}/update','Api\StoryController@update');		

		});
		Route::group(['prefix' => 'task'], function(){
		 Route::post('/participate','Api\TaskController@participate');
		 Route::post('/cancelparticipate','Api\TaskController@cancelparticipate');
		 Route::post('/edit','Api\TaskController@edit');
		 Route::post('/{id}/delete','Api\TaskController@delete');
		});
	});


	//public routes here
    Route::group(['prefix' => 'user'], function(){
		Route::get('/get/{id}','Api\UserController@get');
		Route::get('/{id}/getdetails','Api\UserController@getDetails');
		Route::post('/add','Api\UserController@add');
	});
	Route::group(['prefix' => 'organization'], function(){

		Route::get('/get/{id}','Api\OrganizationController@get');
		Route::get('/getall','Api\OrganizationController@getAll');
		Route::get('/getallpaginate','Api\OrganizationController@getAllPaginate');
		Route::get('/gettop','Api\OrganizationController@getTop');
		Route::get('/{id}/getphones','Api\OrganizationController@getPhones');
		Route::get('/{id}/getlinks','Api\OrganizationController@getLinks');
		Route::get('/{id}/getalbum','Api\OrganizationController@getAlbum');
		Route::get('/{id}/getevents','Api\OrganizationController@getEvents');
		Route::get('/{id}/getcategories','Api\OrganizationController@getCategories');
		Route::get('/{id}/getuser','Api\OrganizationController@getUser');


	});
	Route::group(['prefix' => 'volunteer'], function(){
		
		Route::get('/get/{id}','Api\VolunteerController@get');
		Route::get('/{id}/getstories','Api\VolunteerController@getStories');
		Route::get('/{id}/gettasks','Api\VolunteerController@getTasks');
		Route::get('/{id}/getevents','Api\VolunteerController@getEvents');
		Route::get('/{id}/getcategories', 'Api\VolunteerController@getCategories');
		Route::get('/{id}/getuser','Api\VolunteerController@getUser');
		

	});
	Route::group(['prefix' => 'category'], function(){
		

	});
	Route::group(['prefix' => 'event'], function(){
			Route::get('/getAll','Api\EventController@getAll');
			Route::get('/getAllPaginate','Api\EventController@getAllPaginate');
			Route::get('/gettop','Api\EventController@getTop');
			Route::get('/{id}/get','Api\EventController@get');
			Route::get('/{id}/getOrganization','Api\EventController@getOrganization');
			Route::get('/{id}/gettasks','Api\EventController@getTasks');
			Route::get('/{id}/getCategories','Api\EventController@getCategories');
			Route::get('/{id}/getAlbum','Api\EventController@getAlbum');
			Route::get('/{id}/getReview','Api\EventController@getReview');
			Route::get('/{id}/getCategories','Api\EventController@getCategories');
			Route::get('/{id}/getReviews','Api\EventController@getReviews');
			Route::get('/{id}/getrecommendedvolunteers','Api\EventController@getRecommendedVolunteers');
			Route::post('/inviteVolunteers','Api\EventController@addInvitedVolunteers');

			 

	});
	Route::group(['prefix' => 'eventalbum'], function(){
		

	});
	Route::group(['prefix' => 'link'], function(){
		

	});
	Route::group(['prefix' => 'organizationalbum'], function(){
		

	});
	Route::group(['prefix' => 'phone'], function(){
		

	});
	Route::group(['prefix' => 'review'], function(){
		Route::get('/invitedvolunteer','Api\EventController@invite');

	});
	Route::group(['prefix' => 'story'], function(){

		Route::get('/getall','Api\StoryController@getAll');
		Route::get('/getpaginate','Api\StoryController@getAllPaginate');
		Route::get('/get/{id}','Api\StoryController@get');
		Route::get('/mostrecent', 'Api\StoryController@getMostRecent');
		Route::get('/getall/volunteer/{id}', 'Api\StoryController@getVolunteerStories');

	});
	Route::group(['prefix' => 'task'], function(){
		Route::get('/{id}/get','Api\TaskController@get');

	});
	Route::group(['prefix' => 'select'], function(){
		Route::get('/selected','Api\selectController@getSelected');
	});
	Route::post('/search','Api\SearchController@get');
});



