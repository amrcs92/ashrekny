<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use App\Task;
use App\Volunteer;
use App\Http\Controllers\Api\EmailUtility;
class TaskController extends Controller
{
     /**
     * get event's tasks.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $tasks= Event::find($id)->tasks;
        return response()->json($tasks,200);
    }
    /**
     * participate in certain task.
     *
     * @return \Illuminate\Http\Response
     */
    public function participate(Request $request)
    {
        // dd($request->all());
        $is_participated=false;
        $task =  Task::find($request->get('task_id'));
        $vol_intask=$task->volunteers;
        $volunteerID = $request->get('volunteer_id');
        foreach ($vol_intask as $vol) {

            if($vol->id == $volunteerID)
            {
                $is_participated=true;
            }
        }
        //dd($volunteerID );
        if(!$is_participated)
        {
        $task->volunteers()->attach($volunteerID);
        $task->required_volunteers = ($task->required_volunteers);
        $task->going_volunteers = ($task->going_volunteers)+1;
        $task->save();
        $eventName=$task->event->title;
        $eventID=$task->event->id;
        $eventStartdate=$task->event->start_date;
        $organizationName=$task->event->organization->name;
        $mail= Volunteer::find( $volunteerID)->user->email;
        $subject="اشتراك فى ايفنت";
        $eventurl='<a href="http://localhost/GP/angularproject/'.$eventID.'/eventdetails">الرابط</a>';
        $content="لقد إشتركت فى ايفنت : ".$eventName." المنظم تحت إشراف : ".$organizationName."و الذى سيبدأ فى : ".$eventStartdate." نحن فى انتظارك!"." : رابط الايفنت للمتابعة ".$eventurl;
        EmailUtility::send($mail,$subject,$content);
        $volname=Volunteer::find( $volunteerID)->first_name;
        $emailorg=$task->event->organization->user->email;
        $subjectorg="اشتراك فى ايفنت";
        $eventurlorg='<a href="http://localhost/GP/angularproject/'.$eventID.'/eventdetails">الرابط</a>';
        $contentorg="لقد إشترك".$volname." فى ايفنت : ".$eventName." المنظم تحت إشرافكم : رابط الايفنت للمتابعة ".$eventurl;
        EmailUtility::send($emailorg,$subjectorg,$contentorg);

        return response()->json(["required_volunteers" => $task->required_volunteers,
                                 "going_volunteers" => $task->going_volunteers,
                                 "participation"=>$is_participated],200);
        }
    }

    /**
     * cancel participation in certain task.
     *
     * @return \Illuminate\Http\Response
     */
    public function cancelparticipate(Request $request)
    {
        $task =  Task::find($request->get('task_id'));
        $volunteerID = $request->get('volunteer_id');
        $task->volunteers()->detach($volunteerID);
        $task->required_volunteers = ($task->required_volunteers);
        $task->going_volunteers = ($task->going_volunteers)-1;
        $task->save();
        $eventName=$task->event->title;
        $eventID=$task->event->id;
        $organizationName=$task->event->organization->name;
        $mail= Volunteer::find( $volunteerID)->user->email;
        $subject="الغاء الاشتراك فى ايفنت";
        $eventurl='<a href="http://localhost/GP/angularproject/'.$eventID.'/eventdetails">الرابط</a>';
        $content="لقد تم الغاء اشتراكك فى :  ".$eventName." المنظم تحت إشراف : ".$organizationName." : رابط الايفنت للمتابعة ".$eventurl;
        EmailUtility::send($mail,$subject,$content);
        return response()->json(["required_volunteers" => $task->required_volunteers,
                                 "going_volunteers" => $task->going_volunteers],200);

    }

    /**
     * edit task.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $tasks = $request->all();
        for($i=0; $i<count($tasks); $i++){
            $element = $tasks[$i];
            $id = $element['id'];
            $task = Task::find($id);
            $task->name = $element['name'];
            $task->required_volunteers = $element['required_volunteers'];
            $task->save();
        }
        return response()->json('successfully edited', 200);
    }

    /**
     * delete task.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $task = Task::find($id);
        $task->delete();
    }   
}
