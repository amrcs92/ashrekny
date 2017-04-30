<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    public function user(){
    	return $this->belongsTo('App\User');
    }

    public function categories(){
    	return $this->belongsToMany('App\Category');
    }

    public function phones(){
    	return $this->hasMany('App\Phone');
    }

    public function links(){
    	return $this->hasMany('App\Link');
    }

    public function album(){
    	return $this->hasMany('App\OrganizationAlbum');
    }

    public function events(){
    	return $this->hasMany('App\Event');
    }
}
