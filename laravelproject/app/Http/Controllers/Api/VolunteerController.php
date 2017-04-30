<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Volunteer;

class VolunteerController extends Controller
{
    /**
     * Display volunteer data.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $volunteer = Volunteer::find($id);
        return response()->json(compact('volunteer'),200);
    }

    /**
     * display volunteer stories.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getStories($id)
    {
        $stories = Volunteer::find($id)->stories;
        return response()->json(compact('stories'),200);
    }

    /**
     * get Volunteer tasks.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getTasks($id)
    {
        $tasks = Volunteer::find($id)->tasks;
        return response()->json(compact('tasks'),200);
    }

    /**
     * get Volunteer events.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getEvents($id)
    {
        $tasks = Volunteer::find($id)->tasks;
        $events = [];
        foreach ($tasks as $task) {
            array_push($events, $task->event);
        }
        $events = array_unique($events);
        return response()->json(compact('events'),200);
    }

    /**
     * get Volunteer User.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUser($id)
    {
        $user = Volunteer::find($id)->user;
        return response()->json(compact('user'),200);
    }

    /**
     * get Volunteer categories.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCategories($id){
        $category = Volunteer::find($id)->categories;
        return response()->json(compact('category'),200);
    }
}
