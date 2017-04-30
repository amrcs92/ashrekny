<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public function volunteers()
    {
    	return $this->belongsToMany('App\Volunteer');
    }

     public function event()
    {
    	return $this->belongsTo('App\Event');
    }
}
