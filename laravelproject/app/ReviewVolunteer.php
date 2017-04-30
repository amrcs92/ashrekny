<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReviewVolunteer extends Model
{
    protected $table = 'event_organization_volunteer';

    public function volunteer(){
    	return $this->belongsTo('App\Volunteer');
    }

    public function organization(){
    	return $this->belongsTo('App\organization');
    }

    public function event(){
    	return $this->belongsTo('App\Event');
    }
}
