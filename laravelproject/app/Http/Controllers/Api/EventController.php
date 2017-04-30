<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use App\Task;
use App\Review;
use App\User;
use App\Volunteer;
use App\Organization;
use App\Category;
use App\ReviewVolunteer;
use App\Invitedvolunteer;
use App\Http\Controllers\Api\EmailUtility;
     
class EventController extends Controller
{
    /**
     * Get All events.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $events = Event::with('categories')->get();
        return response()->json($events,200);
    }
    /**
     * Get All events paginated.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllPaginate()
    {
        $events = Event::paginate();    // default 15 per page
        return response()->json($events,200);
    }

    /**
     * get top 3 events.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getTop()
    {
        $events = Event::orderBy('avg_rate', 'DESC')->limit(3)->get();
        return response()->json($events,200);
    }

    /**
     * Get specific event.
     *
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $event= Event::find($id);
        return response()->json($event,200);
    }

    /**
     * Get event's organization.
     *
     * @return \Illuminate\Http\Response
     */
    public function getOrganization($id)
    {
        $organization= Event::find($id)->organization;
        return response()->json($organization,200);
    }

    /**REMOVE FROM EVENT CONTROLLER ..........................................
     * get event's tasks.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getTasks($id)
    {
        $tasks= Event::find($id)->tasks;
        return response()->json($tasks,200);
    }

    /**
     * get event's categories.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCategories($id)
    {
        $categories = Event::find($id)->categories;
        return response()->json($categories,200);
    }

    /**
     * get event's album.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getAlbum($id)
    {
        $album = Event::find($id)->album;
        return response()->json($album,200);
    }

    /**
     * get event review.
     *
     * @return \Illuminate\Http\Response
     */
    public function getReview($id)
    {
        $Reviews = Event::find($id)->reviews;
        return response()->json($Reviews,200);
    }

    /**
     * add new event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function add(Request $request)
    {
        $this->validate($request, [
            'title'       => 'required|max:100',
            'description' => 'required',
            'start_date'  => 'required|date',
            'end_date'    => 'date|after:start_date',
            'country'     => 'required|max:50',
            'city'        => 'required|max:50',
            'region'      => 'required|max:50',
            'full_address'=> 'max:200'
            ]);
         
        $title            = $request->get('title');
        $description      = $request->get('description');
        $start_date       = $request->get('start_date');
        $end_date         = $request->get('end_date');
        $country          = $request->get('country');
        $city             = $request->get('city');
        $region           = $request->get('region');
        $full_address     = $request->get('full_address');
        $organization_id  = $request->get('organization_id');
        $tasks            = $request->get('tasks');
        $logo             = $request->file('logo');
        $categories       = $request->get('categories');

        $event               = new Event;
        $event->title        = $title;
        $event->description = $description;
        $event->start_date  = $start_date;
        $event->end_date    = $end_date;
        $event->country     = $country ;
        $event->city        = $city;
        $event->region      = $region;
        $event->full_address  = $full_address;
        $event->organization_id = $organization_id;
        if($request->hasFile('logo'))
        {
            $event->logo = $logo->store('public/images/logos');
            // $event->logo = 'public/'.$event->logo;
        }

        $event->save();
        if(isset($tasks))
        {
            $tasks = json_decode($tasks);
            foreach ($tasks as $task) 
            {
                $newTask = new Task;
                $newTask->name = $task->name;
                if(isset($task->required_volunteers))
                {
                    $newTask->required_volunteers = $task->required_volunteers;
                }
                $newTask->event_id = $event->id;
                $newTask->save();
            }
        }
        if(isset($categories))
        {
            $categories = json_decode($categories);
            foreach ($categories as $category) 
            {
                $categoryID = Category::select('id')->where('name',$category)->get();
                if(isset($categoryID)){
                    $event->categories()->attach($categoryID);
                }else{
                    $newCategory = new Category;
                    $newCategory->name = $category;
                    $newCategory->save();
                    $event->categories()->attach($newCategory->id);
                }
            }
        }
        return response()->json("success",200);
    }

    /**
     * add reviews on event.
     *  TODO IN NEXT SPRINT
     * @return \Illuminate\Http\Response
     */
    public function addReview(Request $request)
    {
        
        $event_id = $request->get('id');
        $volunteer_id=$request->get('volunteer_id');
        $comment=$request->get('comment');
        $rate=$request->get('rate');
        $review = new Review;
        $review->event_id = $event_id;
        $review->volunteer_id = $volunteer_id;
        $review->comment = $comment;
        $review->rate = $rate;
        $review->save();
        return response()->json("successfully created",200);
    }
    /**
     * Update the specified event.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title'       => 'required|max:100',
            'description' => 'required',
            'start_date'  => 'required|date',
            'end_date'    => 'date|after:start_date',
            'country'     => 'required|max:50',
            'city'        => 'required|max:50',
            'region'      => 'required|max:50',
            'full_address'=> 'max:200'
            ]);
         
        $title            = $request->get('title');
        $description      = $request->get('description');
        $start_date       = $request->get('start_date');
        $end_date         = $request->get('end_date');
        $country          = $request->get('country');
        $city             = $request->get('city');
        $region           = $request->get('region');
        $full_address     = $request->get('full_address');
        $organization_id  = $request->get('organization_id');
        $tasks            = $request->get('tasks');
        $logo             = $request->file('logo');

        $event               = Event::find($id);
        $event->title        = $title;
        $event->description = $description;
        $event->start_date  = $start_date;
        $event->end_date    = $end_date;
        $event->country     = $country ;
        $event->city        = $city;
        $event->region      = $region;
        $event->full_address  = $full_address;
        $event->organization_id = $organization_id;
        if($request->hasFile('logo'))
        {
            $event->logo = $logo->store('public/images/logos');
        }

        $event->save();

        if(isset($tasks))
        {
            $tasks = json_decode($tasks);
            foreach ($tasks as $task) 
            {
                $newTask = new Task;
                $newTask->name = $task->name;
                if(isset($task->required_volunteers))
                {
                    $newTask->required_volunteers = $task->required_volunteers;
                }
                $newTask->event_id = $event->id;
                $newTask->save();
            }
        }
        return response()->json("success",200);
    }

    /**
     * Delete Specific Event.
     *
     * @return \Illuminate\Http\Response
     */

    public function delete($id)
    {
        $event = Event::find($id);
        $event->delete();
        return response()->json('Event Deleted Successfully',200);
    }
    /**
     * get rates on certain event and get volunteers who rated
     *
     * @return \Illuminate\Http\Response
     */
    public function getReviews($id)
    {
        $event=Event::find($id);
        $reviews = Event::find($id)->reviews;
        $reviewsvolunteers=[];
        foreach ($reviews as $review) {
            $reviewsvolunteers[$review->id]=Review::with('volunteer')->find($review->id);
        }
        $reviewsCount = $reviews->count('id');
        //get average rate for event
        $reviews_avgRate=$reviews->avg('rate');
        $event->avg_rate=$reviews_avgRate;
        $event->save();
        return response()->json(compact('reviewsvolunteers','reviewsCount'),200);
    }
        /**
     * get my events
     *
     * @return \Illuminate\Http\Response
     */
    public function getMyEvents($userid)
    {
        $user=User::find($userid);
        $volunteer=$user->volunteer;
        if($volunteer)
        {
            $role_id = $volunteer->id;
            $myevents=[];
            $tasks=Volunteer::find($role_id)->tasks;
            foreach ($tasks as $task)
            {   
                $myevents[$task->id] = Event::with('tasks')->find($task->event_id);
            }
            $myevents = array_unique($myevents);
        }
        else
        {
            $role_id = $user->organization->id;
            $myevents=Organization::find($role_id)->events;
        }
        return response()->json(compact('myevents'),200);
    }
    /**
     * get volunteers who partcipated in certain event
     *
     * @return \Illuminate\Http\Response
     */
    public function getvolunteers($id)
    {
        $eventid=$id;
        $eventname=Event::find($eventid)->title;
        $tasks = Event::find($eventid)->tasks;
        $volunteers=[];
        foreach ($tasks as $task) {
            $volunteers=Task::find($task->id)->volunteers;
        }
         // $volunteers= array_unique($volunteers);
        return response()->json(compact('volunteers','eventid','eventname'),200);

    }
    /**
     * add reviews on each volunteer participated in event.
     *  TODO IN NEXT SPRINT
     * @return \Illuminate\Http\Response
     */
    public function reviewvolunteers(Request $request)
    {        
        $event_id = $request->get('id');
        $volunteer_id=$request->get('volunteerid');
        $volunteer=Volunteer::find($volunteer_id);
        $comment=$request->get('comment');
        $rate=$request->get('rate');
        $attend=$request->get('attend');
        $organization_id=$request->get('organizationid');
        $review = new ReviewVolunteer;
        $review->event_id = $event_id;
        $review->volunteer_id = $volunteer_id;
        $review->organization_id=$organization_id;
        $review->comment = $comment;
        $review->rate = $rate;
        $review->attend = $attend;
        $review->save();
        //get average rate for volunteer
        $avgrate=ReviewVolunteer::where('volunteer_id',$volunteer_id)->avg('rate');       
        $volunteer->avg_rate=$avgrate;
        $volunteer->save();
        return response()->json("successfully added!",200);
    }

    public function invite ()
    {

        $data=Volunteer::find(2)->invitedvolunteers;
        $data2=Event::find(1)->invitedvolunteers;
        $data3=Invitedvolunteer::with('invitedvolunteers')->with('invitedevents')->get();
        return response()->json(compact('data','data2','data3'),200);
        
    }
    public function getRecommendedVolunteers ($id)
    {  
        $event=Event::find($id);
        $eventCategories=$event->categories;
        $sentMailVolunteers=$event->invitedvolunteers()->get();
 
     $recvolunteers= collect();

        foreach($eventCategories as $category)
        {
             
             $volunteers = $category->volunteers()->orderBy('avg_rate','dec')->get();
             foreach($volunteers as $volunteer)
        {     
           $recvolunteers->push($volunteer);
           
           }

              }

             
             $recommendedVolunteers = $recvolunteers->unique('id');
          


             foreach ( $recommendedVolunteers as $rec){
                 foreach($sentMailVolunteers as $sentVolunteer)
                 {  
             
                     
                      if($sentVolunteer['volunteer_id']==$rec->toArray()['id'])
                     {  array_add($rec, 'invited', 'true');
                     break;

                     
                     }
                 }
                
                    
           
     
 }
   return response()->json($recommendedVolunteers,200);
   }

              
        
        
    


   public function addInvitedVolunteers(Request $req)
   {   $eventID=$req->id;
        $eventurl='http://localhost/GP/angularproject/'.$eventID.'/eventdetails';
        $orgnizationname=Event::find($eventID)->organization->name;
    $subject="دعوة حضور ايفينت";
    $start="تدعوكم مؤسسة";
    $mid="   لحضور هذا الايفينت بناء علي اهتمامتك
    لمعرفة المزيد عن الايفينت افتح الرابط التالي";
    $content=$start.$orgnizationname.$mid.$eventurl;
    ;
      $orgnizationname=Event::find($eventID)->organization->name;
       $invitedVolunteers=$req->invitedVolunteers;
       foreach($invitedVolunteers as $invitedVolunteer)
       {
          $userEmail=Volunteer::find($invitedVolunteer)->user->email;
          
           EmailUtility::send($userEmail,$subject, $content);
           $newinvitedVolunteer= new Invitedvolunteer;
          $newinvitedVolunteer->event_id=$eventID;

        
           $newinvitedVolunteer->volunteer_id=$invitedVolunteer;
        
           $newinvitedVolunteer->save();


          }
      
      
   
    return response()->json("Done Inviting Volunteers",200);
 


   }
   
}




