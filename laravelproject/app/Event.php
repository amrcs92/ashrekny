<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function categories(){
    	return $this->belongsToMany('App\Category');
    }

    public function volunteers(){
    	return $this->belongsToMany('App\Volunteer');
    }

    public function reviews(){
    	return $this->hasMany('App\Review');
    }

    public function tasks(){
    	return $this->hasMany('App\Task');
    }

    public function album(){
    	return $this->hasMany('App\EventAlbum');
    }

    public function organization(){
    	return $this->belongsTo('App\Organization');
    }
    public function invitedvolunteers(){
        return $this->hasMany('App\Invitedvolunteer', 'event_id');
    }
}