<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function volunteers(){
    	return $this->belongsToMany('App\Volunteer');
    }

    public function organizations(){
    	return $this->hasMany('App\Organization');
    }

    public function events(){
    	return $this->belongsToMany('App\Event');
    }
}
