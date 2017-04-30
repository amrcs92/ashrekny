<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Review extends Model
{
    protected $table = 'event_volunteer';

    public function volunteer(){
    	return $this->belongsTo('App\Volunteer');
    }

    public function event(){
    	return $this->belongsTo('App\Event');
    }
}
