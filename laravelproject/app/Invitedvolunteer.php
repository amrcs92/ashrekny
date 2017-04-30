<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invitedvolunteer extends Model
{
	public $table = 'invitedvolunteer';

	protected $hidden = ['volunteer_id','event_id'];

    public function invitedvolunteers(){
    	return $this->hasMany('App\Volunteer', 'volunteer_id');
    }
    public function invitedevents(){
    	return $this->hasMany('App\Event', 'event_id');
    }
}
